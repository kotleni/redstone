'use server';
import {InstancesService} from '@/services/instances-service';

const instancesService = new InstancesService();

export async function fetchInstanceState(id: string) {
    return await instancesService.getInstanceState(id);
}
