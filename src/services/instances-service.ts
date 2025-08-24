import {Instance} from '@/data/instance';
import {InstanceStatus} from '@/data/instance-status';
import {InstanceState} from '@/data/instance-state';

export class InstancesService {
    async getAllInstances(): Promise<Instance[]> {
        return [
            {
                id: 'unique-id-1',
                name: 'My server 1',
                coreName: 'spigot',
                versionName: '1.12.2',
            },
        ];
    }

    async getInstanceState(id: string): Promise<InstanceState> {
        return {
            versionName: '1.12.2',
            status: InstanceStatus.Shutdown,
            address: '10.22.28.1',
            port: 25565,
            maxPlayersCount: 8,
            playersCount: 0,
        };
    }
}
