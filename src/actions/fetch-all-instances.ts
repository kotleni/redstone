'use server';
import {InstancesService} from '@/services/instances-service';

const instancesService = new InstancesService();

export async function fetchAllInstances() {
    return await instancesService.getAllInstances();
}
