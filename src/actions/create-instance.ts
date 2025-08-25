'use server';

import {InstancesService} from '@/services/instances-service';

const instancesService = new InstancesService();
export async function createInstance() {
    return await instancesService.createInstance();
}
