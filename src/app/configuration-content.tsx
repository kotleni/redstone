import {Instance} from '@/data/instance';
import {useEffect, useState} from 'react';
import {Core} from '@/services/cores-service';
import {fetchAvailableCores} from '@/actions/fetch-available-cores';
import {
    Alert,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Switch,
    TextField,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {fetchInstasnceProperties} from '@/actions/fetch-instance-properties';
import {ServerProperties} from '@/data/server-properties';

interface ConfigurationContentProps {
    instance: Instance | undefined;
}

export function ConfigurationContent({instance}: ConfigurationContentProps) {
    const [avalableCores, setAvailableCores] = useState<Core[]>([]);
    const [selectedCore, setSelectedCore] = useState<Core | undefined>(
        undefined,
    );
    const [selectedVersion, setSelectedVersion] = useState(
        instance?.versionName ?? '',
    );
    const [serverProperties, setServerProperties] =
        useState<ServerProperties>();

    const getAvailableCores = async () => {
        const availableCores = await fetchAvailableCores();
        setAvailableCores(availableCores);

        const currentCore = availableCores.find(
            it => it.name === instance?.coreName,
        );
        if (currentCore !== undefined) setSelectedCore(currentCore);
        else if (availableCores.length > 0) setSelectedCore(availableCores[0]);
    };

    const getServerProperties = async () => {
        const properties = await fetchInstasnceProperties(instance?.id ?? '');
        setServerProperties(properties);
    };

    const handleChangeCore = (event: SelectChangeEvent) => {
        setSelectedCore(avalableCores[parseInt(event.target.value)]);
    };

    const handleChangeVersion = (event: SelectChangeEvent) => {
        setSelectedVersion(event.target.value as string);
    };

    useEffect(() => {
        void getAvailableCores();
        void getServerProperties();
    }, [instance?.id]);

    return (
        <div className="flex flex-col gap-2">
            <Alert
                icon={<ReportProblemIcon fontSize="inherit" />}
                severity="error"
                variant="filled"
            >
                You need to install core first.
            </Alert>

            <FormControl fullWidth>
                <InputLabel id="select-label-core">Core</InputLabel>
                <Select
                    labelId="select-label-core"
                    id="select-core"
                    value={selectedCore?.name ?? ''}
                    label="Core"
                    onChange={handleChangeCore}
                >
                    {avalableCores.map((core, index) => {
                        return (
                            <MenuItem key={index} value={core.name}>
                                {core.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="select-label-version">Version</InputLabel>
                <Select
                    labelId="select-label-version"
                    id="select-version"
                    value={selectedVersion}
                    label="Version"
                    onChange={handleChangeVersion}
                >
                    {selectedCore?.versions?.map((version, index) => {
                        return (
                            <MenuItem key={index} value={version}>
                                {version}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                disabled={
                    selectedCore === undefined || selectedVersion.length === 0
                }
            >
                Download & Install
            </Button>

            <Divider orientation="horizontal" />

            <Stack
                direction="row"
                spacing={2}
                className="w-full items-stretch justify-stretch pb-1"
            >
                <TextField
                    variant="filled"
                    label="Server name"
                    className="grow"
                    value={serverProperties?.motd.toString() ?? ''}
                    onChange={e => {
                        setServerProperties({
                            ...serverProperties!,
                            motd: e.target.value,
                        });
                    }}
                />
                <TextField
                    variant="filled"
                    label="Server ip"
                    className="grow"
                    value={serverProperties?.serverIp.toString() ?? ''}
                    onChange={e => {
                        setServerProperties({
                            ...serverProperties!,
                            serverIp: e.target.value,
                        });
                    }}
                />
                <TextField
                    variant="filled"
                    label="Server port"
                    className="grow"
                    type="number"
                    value={serverProperties?.serverPort.toString() ?? ''}
                    onChange={e => {
                        setServerProperties({
                            ...serverProperties!,
                            serverPort: parseInt(e.target.value),
                        });
                    }}
                />
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                className="w-full items-stretch justify-stretch"
            >
                <TextField
                    variant="filled"
                    label="Gamemode"
                    className="grow"
                    type="number"
                    value={serverProperties?.gamemode.toString() ?? ''}
                    onChange={e => {
                        setServerProperties({
                            ...serverProperties!,
                            gamemode: parseInt(e.target.value),
                        });
                    }}
                />
                <TextField
                    variant="filled"
                    label="View distance"
                    className="grow"
                    type="number"
                    value={serverProperties?.viewDistance.toString() ?? ''}
                    onChange={e => {
                        setServerProperties({
                            ...serverProperties!,
                            viewDistance: parseInt(e.target.value),
                        });
                    }}
                />
                <TextField
                    variant="filled"
                    label="Max players"
                    className="grow"
                    type="number"
                    value={serverProperties?.maxPlayers.toString() ?? ''}
                    onChange={e => {
                        setServerProperties({
                            ...serverProperties!,
                            maxPlayers: parseInt(e.target.value),
                        });
                    }}
                />
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                className="w-full items-stretch justify-stretch"
            >
                <FormControlLabel
                    control={
                        <Switch
                            checked={serverProperties?.onlineMode ?? false}
                            onChange={e => {
                                setServerProperties({
                                    ...serverProperties!,
                                    onlineMode: e.target.checked,
                                });
                            }}
                        />
                    }
                    label="Online mode"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={serverProperties?.pvp ?? false}
                            onChange={e => {
                                setServerProperties({
                                    ...serverProperties!,
                                    pvp: e.target.checked,
                                });
                            }}
                        />
                    }
                    label="PVP"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={
                                serverProperties?.enableCommandBlock ?? false
                            }
                            onChange={e => {
                                setServerProperties({
                                    ...serverProperties!,
                                    enableCommandBlock: e.target.checked,
                                });
                            }}
                        />
                    }
                    label="Command block"
                />
            </Stack>

            <Stack
                direction="row"
                spacing={2}
                className="w-full items-stretch justifty-stretch"
            >
                <Button className="grow" variant="contained">
                    Save & restart
                </Button>
                <Button className="grow" variant="contained">
                    Just save
                </Button>
            </Stack>
        </div>
    );
}
