import * as fs from 'fs/promises';

export interface Core {
    name: string;
    versions: string[];
}

export class CoresService {
    private coresFolderPath = './cores/';
    private urlBase = 'https://cdn.getbukkit.org/spigot/spigot-';

    //  `./${this.coresFolderPath}/core-${versionName}.jar`;
    async downloadCore(versionName: string, filePath: string) {
        const url = `${this.urlBase}${versionName}.jar`;
        const result = await fetch(url);
        const bytes = await result.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(bytes));
    }

    async fetchAvailableCores(): Promise<Core[]> {
        return [
            {
                name: 'spigot',
                versions: ['1.8', '1.12.2', '1.21.8'],
            },
        ];
    }
}
