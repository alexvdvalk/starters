<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from '../filesapp/[slug]/$types';

	let { data }: PageProps = $props();
</script>

<img src={`/filesapp/frisbee`} alt="File" />
