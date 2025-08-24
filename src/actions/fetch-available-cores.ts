'use server';

import {Core, CoresService} from '@/services/cores-service';

const coresService = new CoresService();
export async function fetchAvailableCores(): Promise<Core[]> {
    return await coresService.fetchAvailableCores();
}
