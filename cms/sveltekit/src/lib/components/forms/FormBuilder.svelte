<script lang="ts">
	import type { Form, FormField } from '$lib/types/directus-schema';
	import { cn } from '$lib/utils';
	import { CheckCircle } from '@lucide/svelte';
	import DynamicForm from './DynamicForm.svelte';
	import { submitForm } from './forms.remote';

	interface FormBuilderProps {
		class?: string;
		form: Form;
	}

	const { form, class: className }: FormBuilderProps = $props();

	let error = $state<string | null>(null);

	let onSuccessMessage = $state<string | null>(null);

	const onFormSuccess = (message: string) => {
		onSuccessMessage = message;
	};
</script>

{#if form.is_active}
	{#if submitForm.result?.success}
		<div class="flex flex-col items-center justify-center space-y-4 p-6 text-center">
			<CheckCircle class="size-12 text-green-500" />
			<p class="text-gray-600">
				{form.success_message || 'Your form has been submitted successfully.'}
			</p>
		</div>
	{:else}
		<div class={cn('border-input space-y-6 rounded-lg border p-8', className)}>
			{#if error}
				<div class="rounded-md bg-red-100 p-4 text-red-500">
					<strong>Error:</strong>
					{error}
				</div>
			{/if}
			<DynamicForm
				fields={form.fields as FormField[]}
				submitLabel={form.submit_label || 'Submit'}
				id={form.id}
			/>
		</div>
	{/if}
{/if}
