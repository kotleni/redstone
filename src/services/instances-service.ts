import {Instance} from '@/data/instance';
import {InstanceStatus} from '@/data/instance-status';
import {InstanceState} from '@/data/instance-state';
import {ServerProperties} from '@/data/server-properties';
import {
    createDefaultServerProperties,
    mapServerPropertiesFromPrismaJson,
} from '@/helper/server-properties-helper';
import {Prisma, PrismaClient} from '@/generated/prisma/client';

export class InstancesService {
    private prisma = new PrismaClient();

    async getAllInstances(): Promise<Instance[]> {
        const instances = await this.prisma.instance.findMany({});
        return instances.map(instance => {
            return {
                id: instance.id,
                name: instance.name,
                coreName: instance.coreName,
                versionName: instance.versionName,
            };
        });
    }

    async getInstanceState(id: string): Promise<InstanceState> {
        const instance = await this.prisma.instance.findUnique({
            where: {
                id: id,
            },
        });
        if (instance === null) throw Error('');
        const properties = instance.properties as Prisma.JsonObject;
        return {
            versionName: instance.versionName,
            status: InstanceStatus.Shutdown, // TODO
            address: properties.serverIp as string,
            port: properties.serverPort as number,
            maxPlayersCount: properties.maxPlayers as number,
            playersCount: 0, // TODO
        };
    }

    async getInstanceProperties(id: string): Promise<ServerProperties> {
        const instance = await this.prisma.instance.findUnique({
            where: {
                id: id,
            },
        });
        if (instance === null) throw Error('');
        return mapServerPropertiesFromPrismaJson(
            instance.properties as Prisma.JsonObject,
        );
    }
}
