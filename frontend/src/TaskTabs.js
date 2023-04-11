import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TabTasks.css';
import * as Icon from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';



export const TaskTabs = () => {
    const [allTasks, setAllTasks] = useState([]);

    const columns = [
        { text: 'Name', dataField: 'task_name' },
        { text: 'Priority', dataField: 'priority' },
        { text: 'Due Date', dataField: 'due_date' },
        { text: 'Status', dataField: 'status' }
    ];

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

    useEffect(() => {
        fetch('http://localhost:3001/table/Tasks')
            .then(res => res.json())
            .then(data => {
                setInstallationTasks(data.filter((task) => task.task_type === 'installation'))
                setJobTasks(data.filter((task) => task.task_type === 'job'))
                setUnitTasks(data.filter((task) => task.task_type === 'unit'))
                setPersonalTasks(data.filter((task) => task.task_type === 'personal'))
            })
    }, [])


    return (
        <div className="Task-Tabs-Div">
            <h1>Sample</h1>
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
                            <div style={{ maxWidth: '100%' }}>
                                <BootstrapTable columns={columns} data={installationTasks.slice(0, 9)} keyField='id' />
                            </div>
                        </div>
                    </TabPanel>
                </div>

                <TabPanel>
                    <div className="panel-content">
                    <div style={{ maxWidth: '100%' }}>
                                <BootstrapTable columns={columns} data={unitTasks.slice(0, 9)} keyField='id' />
                            </div>
                        <input type="checkbox"></input>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                    <div style={{ maxWidth: '100%' }}>
                                <BootstrapTable columns={columns} data={jobTasks.slice(0, 9)} keyField='id' />
                            </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                    <div style={{ maxWidth: '100%' }}>
                                <BootstrapTable columns={columns} data={personalTasks.slice(0, 9)} keyField='id' />
                            </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}