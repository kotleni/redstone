'use client';

import {Alert, Box, Button, CircularProgress, Stack} from '@mui/material';
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
                <Alert
                    icon={<ReportProblemIcon fontSize="inherit" />}
                    severity="error"
                >
                    You have no any downloaded java runtimes yet.
                </Alert>
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
                                <Tab label="Downloads" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <DashboardContent instance={selectedInstance} />
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </div>
            </div>
        </div>
    );
}
