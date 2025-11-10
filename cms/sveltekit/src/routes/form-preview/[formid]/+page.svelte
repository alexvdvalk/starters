<script lang="ts">
	import FormBuilder from '$lib/components/forms/FormBuilder.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { form } = $derived(data);
	// Convert null values to undefined to match FormBuilder's expected types
	const normalizedForm = $derived({
		...form,
		submit_label: form.submit_label ?? undefined,
		fields: form.fields ?? []
	});
</script>

<Container>
	<FormBuilder form={normalizedForm} />
</Container>
