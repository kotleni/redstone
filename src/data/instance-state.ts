import {InstanceStatus} from '@/data/instance-status';

export interface InstanceState {
    status: InstanceStatus;
    versionName: string;
    playersCount: number;
    maxPlayersCount: number;
    address: string;
    port: number;
}
