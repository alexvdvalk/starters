import { form } from '$app/server';
import { useDirectus } from '$lib/directus/directus';
import { createItem, readItem, uploadFiles, withToken } from '@directus/sdk';
import { DIRECTUS_SERVER_TOKEN } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { FormField, DirectusFile, FormSubmission, FormSubmissionValue } from '$lib/types/directus-schema';
import { z } from 'zod';



export const submitForm = form("unchecked", async (data) => {

    console.log("formdata", data)

    const formId = data.formId


    const { getDirectus } = useDirectus()
    const directus = getDirectus(fetch)

    const submissionValues: Omit<FormSubmissionValue, 'id'>[] = [];

    if (!formId || typeof formId !== 'string') {
        throw error(400, 'Form ID is required');
    }

    // Add server validation here?
    // Check if form exists

    // Get form and all associated fields
    const directusForm = await directus.request(withToken(DIRECTUS_SERVER_TOKEN, readItem('forms', formId, { fields: ["id", "on_success", "title", "success_message", "success_redirect_url", "is_active", "success_redirect_url", { fields: ["required", "type", "name", "label", "id"] }] })));

    // Form fields cannot have hyphens in their name
    // so the dashes are replaced with empty strings on the frontend and backend
    for (const field of directusForm.fields || []) {
        const name = field.name?.replace(/-/g, '') || '';
        const value = data[name];
        if (value && field.type !== 'file') {
            submissionValues.push({ field: field.id, value: value.toString() })
        } else if (field.type === 'file' && value && value instanceof File && value.size > 0) {

            // Upload the file to the server and get the file ID
            const blob = new Blob([value], { type: value.type });
            const formData = new FormData();
            formData.append('file', blob, value.name);
            console.log("uploading file for field", field.name)
            const uploadedFile = await directus.request(withToken(DIRECTUS_SERVER_TOKEN, uploadFiles(formData, { fields: ["id"] }))) as {
                id: string;
            };
            // Add the file ID to the submission values
            submissionValues.push({ field: field.id, file: uploadedFile.id as string })
        }
    }
    console.log("submissionValues", submissionValues)





    const payload: Partial<FormSubmission> = {
        form: formId,
        values: submissionValues as FormSubmissionValue[], // We don't have an ID for the submission values so we need to cast it to the FormSubmissionValue type
    };
    await directus.request(withToken(DIRECTUS_SERVER_TOKEN, createItem('form_submissions', payload)));

    if (directusForm.success_redirect_url && directusForm.on_success === 'redirect') {
        return redirect(303, directusForm.success_redirect_url)
    }


    return {
        success: true,
        message: directusForm.success_message || "Form submitted successfully"
    }


})