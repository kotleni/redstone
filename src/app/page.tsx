'use client';

import {Alert, Box, CircularProgress} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from 'react';
import {Instance} from '@/data/instance';
import {fetchAllInstances} from '@/actions/fetch-all-instances';
import Image from 'next/image';
import Logo from '@/images/logo.webp';
import {DashboardContent} from '@/app/dashboard-content';
import {ConfigurationContent} from '@/app/configuration-content';

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
