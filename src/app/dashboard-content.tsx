import {Instance} from '@/data/instance';
import {useEffect, useState} from 'react';
import {InstanceState} from '@/data/instance-state';
import {fetchInstanceState} from '@/actions/fetch-instance-state';
import {Alert, Button, CircularProgress, Stack} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {InstanceStatus} from '@/data/instance-status';

interface DashboardContentProps {
    instance: Instance | undefined;
}

export function DashboardContent({instance}: DashboardContentProps) {
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
                {/*    severity="error" variant="filled"*/}
                {/*>*/}
                {/*    You need to install Java runtime first.*/}
                {/*</Alert>*/}
                <Alert
                    icon={<ReportProblemIcon fontSize="inherit" />}
                    severity="error"
                    variant="filled"
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
