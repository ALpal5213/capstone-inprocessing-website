import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TaskTable.css';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next'



export const TaskTabs = () => {
    const [allTasks, setAllTasks] = useState([]);
    const navigate = useNavigate();

    const taskIcons = {
        pending: <Icon.HourglassSplit />,
        complete: <Icon.PatchCheckFill />,
        highP: <Icon.ExclamationOctagonFill />,
        medP: <Icon.ExclamationDiamondFill />,
        lowP: <Icon.ExclamationLg />
    }

    const [installationTasks, setInstallationTasks] = useState([]);
    const [unitTasks, setUnitTasks] = useState([]);
    const [jobTasks, setJobTasks] = useState([]);
    const [personalTasks, setPersonalTasks] = useState([]);
    const [task, setTask]=useState({});

    useEffect(() => {
        fetch('http://localhost:3001/tasks-locations/20')
            .then(res => res.json())
            .then(data => {
                setInstallationTasks(data.filter((task) => task.task_type === 'installation'))
                setJobTasks(data.filter((task) => task.task_type === 'job'))
                setUnitTasks(data.filter((task) => task.task_type === 'unit'))
                setPersonalTasks(data.filter((task) => task.task_type === 'personal'))
            })
    }, [])

    const columns = [
        
        {text: 'Name', dataField: 'task_name'},
        { text: 'Priority', dataField: 'priority', sort: true },
        { text: 'Due Date', dataField: 'due_date', sort: true },
        { text: 'Status', dataField: 'status', sort: true }
    ];

    const rowEvents = {
        onClick: (e,cell) => {
            setTask(cell);
            navigate('/details', {state:cell})

        }
    }

    return (
        <div className="Task-Tabs-Div">
            <Tabs>
                <TabList>
                    <Tab>
                        <p className='installation-title'>Installation</p>
                    </Tab>
                    <Tab>
                        <p>Unit</p>
                    </Tab>
                    <Tab>
                        <p>Job</p>
                    </Tab>
                    <Tab>
                        <p>Personal</p>
                    </Tab>
                </TabList>
                <div>
                    <TabPanel>
                        <div className="panel-content">
                            <div className = 'taskTable-div' style={{ maxWidth: '100%' }}>
                                <BootstrapTable columns={columns} data={installationTasks} rowEvents={rowEvents} keyField='id' />
                            </div>
                        </div>
                    </TabPanel>
                </div>

                <TabPanel>
                    <div className="panel-content">
                        <div style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={unitTasks} keyField='id' />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <div style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={jobTasks} keyField='id' />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <div style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={personalTasks} keyField='id' />
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}