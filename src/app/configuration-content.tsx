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

    const getAvailableCores = async () => {
        const availableCores = await fetchAvailableCores();
        setAvailableCores(availableCores);

        const currentCore = availableCores.find(
            it => it.name === instance?.coreName,
        );
        if (currentCore !== undefined) setSelectedCore(currentCore);
        else if (availableCores.length > 0) setSelectedCore(availableCores[0]);
    };

    const handleChangeCore = (event: SelectChangeEvent) => {
        setSelectedCore(avalableCores[parseInt(event.target.value)]);
    };

    const handleChangeVersion = (event: SelectChangeEvent) => {
        setSelectedVersion(event.target.value as string);
    };

    useEffect(() => {
        void getAvailableCores();
    }, [instance?.id]);

    return (
        <div className="flex flex-col gap-2">
            <Alert
                icon={<ReportProblemIcon fontSize="inherit" />}
                severity="error"
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
                className="w-full items-stretch justify-stretch"
            >
                <TextField
                    variant="outlined"
                    placeholder="Server name"
                    className="grow"
                />
                <TextField
                    variant="outlined"
                    placeholder="Server ip"
                    className="grow"
                />
                <TextField
                    variant="outlined"
                    placeholder="Server port"
                    className="grow"
                />
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                className="w-full items-stretch justify-stretch"
            >
                <FormControlLabel control={<Switch />} label="Online mode" />
                <FormControlLabel control={<Switch />} label="PVP" />
                <FormControlLabel control={<Switch />} label="Command block" />
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
