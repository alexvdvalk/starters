<script lang="ts">
	import type { PageProps } from './$types';
	import { getMachine } from './machines.remote';
	import type { Machine } from '$lib/types/directus-schema';

	let { data }: PageProps = $props();

	let machine = $derived(await getMachine());

	// Helper function to format dates
	function formatDate(dateString: string | null | undefined): string {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	// Helper function to get status badge color
	function getStatusColor(status: string | null | undefined): string {
		switch (status) {
			case 'operational':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'maintenance':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'offline':
				return 'bg-red-100 text-red-800 border-red-200';
			case 'decommissioned':
				return 'bg-gray-100 text-gray-800 border-gray-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	}

	// Helper to check if machine has generator-specific fields
	function isGenerator(machine: any): boolean {
		if (!machine) return false;
		return !!(
			machine.fuel_type ||
			machine.fuel_capacity_liters ||
			machine.engine_model ||
			machine.engine_hours
		);
	}

	// Helper to check if machine has solar-specific fields
	function isSolar(machine: any): boolean {
		if (!machine) return false;
		return !!(machine.panel_count || machine.panel_capacity_w || machine.inverter_model);
	}

	// Type guard for telemetry
	function isTelemetryObject(
		telemetry: string | any
	): telemetry is { timestamp: string; [key: string]: any } {
		return typeof telemetry === 'object' && telemetry !== null && 'timestamp' in telemetry;
	}

	// Type guard for maintenance records
	function isMaintenanceRecordObject(
		record: string | any
	): record is { maintenance_date: string; [key: string]: any } {
		return typeof record === 'object' && record !== null && 'maintenance_date' in record;
	}

	// Helper to check if machine has battery-specific fields
	function isBattery(machine: any): boolean {
		if (!machine) return false;
		return !!(machine.battery_capacity_kwh || machine.battery_type || machine.battery_voltage);
	}
</script>

<div class="min-h-screen bg-gray-50 px-4 py-6 pb-20">
	<div class="mx-auto max-w-2xl space-y-4">
		{#if machine}
			<!-- Header Card -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<div class="mb-4 flex items-start justify-between">
					<div class="flex-1">
						<h1 class="text-2xl font-bold text-gray-900">{machine.name}</h1>
						{#if machine.machine_type}
							<p class="mt-1 text-sm text-gray-600">
								{typeof machine.machine_type === 'object'
									? machine.machine_type.name
									: machine.machine_type}
							</p>
						{/if}
					</div>
					{#if machine.status}
						<span
							class="rounded-full border px-3 py-1 text-xs font-semibold {getStatusColor(
								machine.status
							)}"
						>
							{machine.status}
						</span>
					{/if}
				</div>
			</div>

			<!-- Identification Card -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-lg font-semibold text-gray-900">Identification</h2>
				<div class="space-y-3">
					{#if machine.manufacturer}
						<div class="flex justify-between border-b border-gray-100 pb-2">
							<span class="text-sm font-medium text-gray-600">Manufacturer</span>
							<span class="text-sm text-gray-900">{machine.manufacturer}</span>
						</div>
					{/if}
					{#if machine.model}
						<div class="flex justify-between border-b border-gray-100 pb-2">
							<span class="text-sm font-medium text-gray-600">Model</span>
							<span class="text-sm text-gray-900">{machine.model}</span>
						</div>
					{/if}
					{#if machine.serial_number}
						<div class="flex justify-between border-b border-gray-100 pb-2">
							<span class="text-sm font-medium text-gray-600">Serial Number</span>
							<span class="font-mono text-sm text-gray-900">{machine.serial_number}</span>
						</div>
					{/if}
					{#if machine.site}
						<div class="flex justify-between border-b border-gray-100 pb-2">
							<span class="text-sm font-medium text-gray-600">Site</span>
							<span class="text-sm text-gray-900">
								{typeof machine.site === 'object' && machine.site !== null
									? machine.site.title || machine.site.id
									: machine.site}
							</span>
						</div>
					{/if}
					{#if machine.area}
						<div class="flex justify-between pb-2">
							<span class="text-sm font-medium text-gray-600">Area</span>
							<span class="text-sm text-gray-900">
								{typeof machine.area === 'object' && machine.area !== null
									? machine.area.id
									: machine.area}
							</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Power Specifications Card -->
			{#if machine.power_rating_kw || machine.voltage || machine.current_rating || machine.frequency}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Power Specifications</h2>
					<div class="grid grid-cols-2 gap-4">
						{#if machine.power_rating_kw}
							<div class="rounded-lg bg-gray-50 p-3">
								<p class="text-xs font-medium text-gray-600">Power Rating</p>
								<p class="mt-1 text-lg font-semibold text-gray-900">
									{machine.power_rating_kw} kW
								</p>
							</div>
						{/if}
						{#if machine.voltage}
							<div class="rounded-lg bg-gray-50 p-3">
								<p class="text-xs font-medium text-gray-600">Voltage</p>
								<p class="mt-1 text-lg font-semibold text-gray-900">
									{machine.voltage} V
								</p>
							</div>
						{/if}
						{#if machine.current_rating}
							<div class="rounded-lg bg-gray-50 p-3">
								<p class="text-xs font-medium text-gray-600">Current Rating</p>
								<p class="mt-1 text-lg font-semibold text-gray-900">
									{machine.current_rating} A
								</p>
							</div>
						{/if}
						{#if machine.frequency}
							<div class="rounded-lg bg-gray-50 p-3">
								<p class="text-xs font-medium text-gray-600">Frequency</p>
								<p class="mt-1 text-lg font-semibold text-gray-900">
									{machine.frequency} Hz
								</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Generator-Specific Card -->
			{#if isGenerator(machine)}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Generator Details</h2>
					<div class="space-y-3">
						{#if machine.fuel_type}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Fuel Type</span>
								<span class="text-sm text-gray-900">{machine.fuel_type}</span>
							</div>
						{/if}
						{#if machine.fuel_capacity_liters}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Fuel Capacity</span>
								<span class="text-sm text-gray-900">{machine.fuel_capacity_liters} L</span>
							</div>
						{/if}
						{#if machine.engine_model}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Engine Model</span>
								<span class="text-sm text-gray-900">{machine.engine_model}</span>
							</div>
						{/if}
						{#if machine.engine_hours !== null && machine.engine_hours !== undefined}
							<div class="flex justify-between pb-2">
								<span class="text-sm font-medium text-gray-600">Engine Hours</span>
								<span class="text-sm text-gray-900"
									>{machine.engine_hours.toLocaleString()} hrs</span
								>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Solar-Specific Card -->
			{#if isSolar(machine)}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Solar System Details</h2>
					<div class="space-y-3">
						{#if machine.panel_count}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Panel Count</span>
								<span class="text-sm text-gray-900">{machine.panel_count} panels</span>
							</div>
						{/if}
						{#if machine.panel_capacity_w}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Panel Capacity</span>
								<span class="text-sm text-gray-900">{machine.panel_capacity_w} W</span>
							</div>
						{/if}
						{#if machine.inverter_model}
							<div class="flex justify-between pb-2">
								<span class="text-sm font-medium text-gray-600">Inverter Model</span>
								<span class="text-sm text-gray-900">{machine.inverter_model}</span>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Battery-Specific Card -->
			{#if isBattery(machine)}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Battery Details</h2>
					<div class="space-y-3">
						{#if machine.battery_capacity_kwh}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Capacity</span>
								<span class="text-sm text-gray-900">{machine.battery_capacity_kwh} kWh</span>
							</div>
						{/if}
						{#if machine.battery_type}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Battery Type</span>
								<span class="text-sm text-gray-900">{machine.battery_type}</span>
							</div>
						{/if}
						{#if machine.battery_voltage}
							<div class="flex justify-between pb-2">
								<span class="text-sm font-medium text-gray-600">Battery Voltage</span>
								<span class="text-sm text-gray-900">{machine.battery_voltage} V</span>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Dates Card -->
			{#if machine.installation_date || machine.warranty_expiry}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Important Dates</h2>
					<div class="space-y-3">
						{#if machine.installation_date}
							<div class="flex justify-between border-b border-gray-100 pb-2">
								<span class="text-sm font-medium text-gray-600">Installation Date</span>
								<span class="text-sm text-gray-900">{formatDate(machine.installation_date)}</span>
							</div>
						{/if}
						{#if machine.warranty_expiry}
							<div class="flex justify-between pb-2">
								<span class="text-sm font-medium text-gray-600">Warranty Expiry</span>
								<span class="text-sm text-gray-900">{formatDate(machine.warranty_expiry)}</span>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Telemetry Card -->
			{#if machine.telemetry && Array.isArray(machine.telemetry) && machine.telemetry.length > 0}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Recent Telemetry</h2>
					<div class="space-y-4">
						{#each machine.telemetry.slice(0, 5) as telemetry}
							{#if isTelemetryObject(telemetry)}
								<div class="rounded-lg border border-gray-100 bg-gray-50 p-4">
									<div class="mb-2 flex items-center justify-between">
										<span class="text-xs font-medium text-gray-600">
											{formatDate(telemetry.timestamp)}
										</span>
										{#if telemetry.operational_status}
											<span
												class="rounded-full border px-2 py-0.5 text-xs font-medium {getStatusColor(
													telemetry.operational_status
												)}"
											>
												{telemetry.operational_status}
											</span>
										{/if}
									</div>
									<div class="grid grid-cols-2 gap-2 text-xs">
										{#if telemetry.power_output_kw !== null && telemetry.power_output_kw !== undefined}
											<div>
												<span class="text-gray-600">Power Output:</span>
												<span class="ml-1 font-semibold text-gray-900">
													{telemetry.power_output_kw} kW
												</span>
											</div>
										{/if}
										{#if telemetry.voltage !== null && telemetry.voltage !== undefined}
											<div>
												<span class="text-gray-600">Voltage:</span>
												<span class="ml-1 font-semibold text-gray-900">
													{telemetry.voltage} V
												</span>
											</div>
										{/if}
										{#if telemetry.temperature !== null && telemetry.temperature !== undefined}
											<div>
												<span class="text-gray-600">Temperature:</span>
												<span class="ml-1 font-semibold text-gray-900">
													{telemetry.temperature}°C
												</span>
											</div>
										{/if}
										{#if telemetry.battery_state_of_charge !== null && telemetry.battery_state_of_charge !== undefined}
											<div>
												<span class="text-gray-600">Battery SOC:</span>
												<span class="ml-1 font-semibold text-gray-900">
													{telemetry.battery_state_of_charge}%
												</span>
											</div>
										{/if}
										{#if telemetry.fuel_level_percent !== null && telemetry.fuel_level_percent !== undefined}
											<div>
												<span class="text-gray-600">Fuel Level:</span>
												<span class="ml-1 font-semibold text-gray-900">
													{telemetry.fuel_level_percent}%
												</span>
											</div>
										{/if}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			<!-- Maintenance Records Card -->
			{#if machine.maintenance_records && Array.isArray(machine.maintenance_records) && machine.maintenance_records.length > 0}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Maintenance Records</h2>
					<div class="space-y-3">
						{#each machine.maintenance_records.slice(0, 5) as record}
							{#if isMaintenanceRecordObject(record)}
								<div class="rounded-lg border border-gray-100 bg-gray-50 p-4">
									<div class="mb-2 flex items-center justify-between">
										<span class="text-sm font-semibold text-gray-900">
											{record.maintenance_type || 'Maintenance'}
										</span>
										<span class="text-xs text-gray-600">
											{formatDate(record.maintenance_date)}
										</span>
									</div>
									{#if record.description}
										<p class="text-sm text-gray-600">{record.description}</p>
									{/if}
									{#if record.next_maintenance_date}
										<p class="mt-2 text-xs text-gray-500">
											Next: {formatDate(record.next_maintenance_date)}
										</p>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			<!-- Notes Card -->
			{#if machine.notes}
				<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Notes</h2>
					<p class="whitespace-pre-wrap text-sm text-gray-700">{machine.notes}</p>
				</div>
			{/if}
		{:else}
			<!-- Loading/Error State -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
				<p class="text-gray-600">Loading machine data...</p>
			</div>
		{/if}
	</div>
</div>
