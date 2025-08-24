import {ServerProperties} from '@/data/server-properties';
import * as fs from 'fs/promises';

function mapServerPropertiesToMojangNamedObject(
    prop: ServerProperties,
): object {
    return {
        'view-distance': prop.viewDistance,
        'max-build-height': prop.maxBuildHeight,
        'server-ip': prop.serverIp,
        'level-seed': prop.levelSeed,
        gamemode: prop.gamemode,
        'server-port': prop.serverPort,
        'enable-command-block': prop.enableCommandBlock,
        'allow-nether': prop.allowNether,
        'enable-rcon': prop.enableRcon,
        'op-permission-level': prop.opPermissionLevel,
        'enable-query': prop.enableQuery,
        'generator-settings': prop.generatorSettings,
        'resource-pack': prop.resourcePack,
        'resource-pack-hash': prop.resourcePackHash,
        'player-idle-timeout': prop.playerIdleTimeout,
        'level-name': prop.levelName,
        motd: prop.motd,
        'announce-player-achievements': prop.announcePlayerAchievements,
        'force-gamemode': prop.forceGamemode,
        hardcore: prop.hardcore,
        'white-list': prop.whiteList,
        pvp: prop.pvp,
        'spawn-npcs': prop.spawnNpcs,
        'generate-structures': prop.generateStructures,
        'spawn-animals': prop.spawnAnimals,
        'snooper-enabled': prop.snooperEnabled,
        difficulty: prop.difficulty,
        'network-compression-threshold': prop.networkCompressionThreshold,
        'level-type': prop.levelType,
        'spawn-monsters': prop.spawnMonsters,
        'max-players': prop.maxPlayers,
        'online-mode': prop.onlineMode,
        'allow-flight': prop.allowFlight,
        'max-world-size': prop.maxWorldSize,
    };
}

export function generateServerPropertiesContent(
    serverProperties: ServerProperties,
): string {
    const mojangStyledObject =
        mapServerPropertiesToMojangNamedObject(serverProperties);
    const keys = Object.keys(mojangStyledObject);
    return keys
        .map(key => `${key}=${(mojangStyledObject as any)[key]}`)
        .join('\n');
}

export async function generateAndWriteServerProperties(
    serverProperties: ServerProperties,
    filePath: string,
) {
    const content = generateServerPropertiesContent(serverProperties);
    await fs.writeFile(filePath, content);
}

export function createDefaultServerProperties(): ServerProperties {
    return {
        allowFlight: true,
        allowNether: true,
        announcePlayerAchievements: true,
        difficulty: 1,
        enableCommandBlock: false,
        enableQuery: true,
        enableRcon: true,
        forceGamemode: false,
        gamemode: 0,
        generateStructures: true,
        generatorSettings: '',
        hardcore: false,
        levelName: 'world',
        levelSeed: parseInt((Math.random() * 9999999).toString()),
        levelType: 'DEFAULT',
        maxBuildHeight: 256,
        maxPlayers: 8,
        maxWorldSize: 29999984,
        motd: 'Server name',
        networkCompressionThreshold: 256,
        onlineMode: true,
        opPermissionLevel: 4,
        playerIdleTimeout: 0,
        pvp: true,
        resourcePack: '',
        resourcePackHash: '',
        serverIp: '',
        serverPort: 25565,
        snooperEnabled: true,
        spawnAnimals: true,
        spawnMonsters: true,
        spawnNpcs: true,
        viewDistance: 22,
        whiteList: false,
    };
}
