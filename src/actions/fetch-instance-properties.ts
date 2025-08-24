'use server';

import {ServerProperties} from '@/data/server-properties';
import {InstancesService} from '@/services/instances-service';

const instanceService = new InstancesService();
export async function fetchInstasnceProperties(
    id: string,
): Promise<ServerProperties> {
    return await instanceService.getInstanceProperties(id);
}
