import { form, getRequestEvent } from "$app/server";

export const submitForm = form("unchecked", async (...event) => {
    // const event = getRequestEvent();

    console.log("formData", event)
    // const data = await request.formData();
    return {
        success: true
    }
});