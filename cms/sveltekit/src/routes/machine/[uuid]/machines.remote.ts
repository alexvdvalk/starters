import { getRequestEvent, query } from "$app/server";
import { useDirectus } from "$lib/directus/directus";
import { readItem } from "@directus/sdk";


export const getMachine = query(async () => {
    const { fetch, params } = getRequestEvent();


    if (!params.uuid) {
        return null;
    }
    const { getDirectus } = useDirectus();
    const directus = getDirectus(fetch);

    const machine = await directus.request(readItem('machines', params.uuid, {
        fields: ['*', {
            machine_telemetry: ['*']
        }, {
                maintenance_records: ['*']
            }
        ]
    }));
    return machine;
    // const machines = await directus.request(readItem('machines', {
    //     filter: { uuid: { _eq: params.uuid } },
    // }));
    // return machines;
});