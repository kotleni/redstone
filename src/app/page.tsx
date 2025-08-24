'use client';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
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
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from 'react';
import {Instance} from '@/data/instance';
import {fetchAllInstances} from '@/actions/fetch-all-instances';
import {InstanceState} from '@/data/instance-state';
import {fetchInstanceState} from '@/actions/fetch-instance-state';
import {InstanceStatus} from '@/data/instance-status';
import Image from 'next/image';
import Logo from '@/images/logo.webp';
import {Core} from '@/services/cores-service';
import {fetchAvailableCores} from '@/actions/fetch-available-cores';

interface DashboardContentProps {
    instance: Instance | undefined;
}

function DashboardContent({instance}: DashboardContentProps) {
    const [instanceState, setInstanceState] = useState<
        InstanceState | undefined
    >(undefined);

    const getInstanceState = async () => {
        if (instance === undefined) return;
        const instanceState = await fetchInstanceState(instance.id);
        setInstanceState(instanceState);
    };

    useEffect(() => {
        void getInstanceState();
    }, [instance?.id]);

    return (
        <div className="flex flex-col gap-2">
            <CircularProgress hidden={instanceState !== undefined} />

            <div
                className="flex flex-col gap-2"
                hidden={instanceState === undefined}
            >
                {/*<Alert*/}
                {/*    icon={<ReportProblemIcon fontSize="inherit" />}*/}
                {/*    severity="error"*/}
                {/*>*/}
                {/*    You need to install Java runtime first.*/}
                {/*</Alert>*/}
                <Alert
                    icon={<ReportProblemIcon fontSize="inherit" />}
                    severity="error"
                >
                    You have no any downloaded server cores yet.
                </Alert>
                <Stack
                    direction="row"
                    spacing={2}
                    useFlexGap
                    sx={{flexWrap: 'nowrap'}}
                >
                    <Button
                        variant="contained"
                        disabled={
                            instanceState?.status !== InstanceStatus.Shutdown
                        }
                        sx={{width: '100%'}}
                    >
                        Start
                    </Button>
                    <Button
                        variant="contained"
                        disabled={
                            instanceState?.status !== InstanceStatus.Running
                        }
                    >
                        Stop
                    </Button>
                </Stack>
                <Stack>
                    <p>Status: {instanceState?.status}</p>
                    <p>Version: {instanceState?.versionName}</p>
                    <p>
                        IP/PORT: {instanceState?.address}:{instanceState?.port}
                    </p>
                    <p>
                        Players: {instanceState?.playersCount} /{' '}
                        {instanceState?.maxPlayersCount}
                    </p>
                </Stack>
            </div>
        </div>
    );
}

interface ConfigurationContentProps {
    instance: Instance | undefined;
}

function ConfigurationContent({instance}: ConfigurationContentProps) {
    const [avalableCores, setAvailableCores] = useState<Core[]>([]);
    const [selectedCore, setSelectedCore] = useState<Core | undefined>(
        undefined,
    );
    const [selectedVersion, setSelectedVersion] = useState('');

    const getAvailableCores = async () => {
        const availableCores = await fetchAvailableCores();
        setAvailableCores(availableCores);
        if (availableCores.length > 0) setSelectedCore(availableCores[0]);
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

export default function Home() {
    const [value, setValue] = useState('1');
    const [isLoading, setIsLoading] = useState(true);
    const [instances, setInstances] = useState<Instance[]>([]);
    const [selectedInstance, setSelectedInstance] = useState<
        Instance | undefined
    >(undefined);

    const getAllInstances = async () => {
        const instances = await fetchAllInstances();
        setInstances(instances);
        if (instances.length > 0) setSelectedInstance(instances[0]);
        setIsLoading(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        void getAllInstances();
    }, []);

    return (
        <div className="w-full flex flex-row justify-center">
            <div className="flex flex-col gap-2 p-4 w-full md:container px-4 sm:px-4 md:px-16 lg:px-42 xl:px-72">
                <CircularProgress hidden={!isLoading} />
                <Alert
                    hidden={isLoading || instances.length > 0}
                    icon={<ReportProblemIcon fontSize="inherit" />}
                    severity="error"
                >
                    You have no any instances yet.
                </Alert>
                <div className="flex flex-row gap-2 items-center">
                    <Image src={Logo} width={26} height={26} alt="Logo" />
                    {selectedInstance?.name}
                </div>
                <div
                    hidden={
                        isLoading ||
                        instances.length === 0 ||
                        selectedInstance === undefined
                    }
                >
                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList
                                onChange={handleChange}
                                aria-label="Tabs betwen main pages"
                            >
                                <Tab label="Dashboard" value="1" />
                                <Tab label="Configuration" value="2" />
                                {/*<Tab label="Downloads" value="3" />*/}
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <DashboardContent instance={selectedInstance} />
                        </TabPanel>
                        <TabPanel value="2">
                            <ConfigurationContent instance={selectedInstance} />
                        </TabPanel>
                        {/*<TabPanel value="3">Item Three</TabPanel>*/}
                    </TabContext>
                </div>
            </div>
        </div>
    );
}
