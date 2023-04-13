import React, { useEffect, useState, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TaskTable.css';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next'
import { GlobalContext } from '../../App';


export const TaskTabs = () => {
    const navigate = useNavigate();
    const { userLogin } = useContext(GlobalContext);


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
        fetch(`http://localhost:3001/tasks-locations/${userLogin.id}`)
            .then(res => res.json())
            .then(data => {
                setInstallationTasks(data.filter((task) => task.task_type === 'installation'))
                setJobTasks(data.filter((task) => task.task_type === 'job'))
                setUnitTasks(data.filter((task) => task.task_type === 'unit'))
                setPersonalTasks(data.filter((task) => task.task_type === 'personal'))
            })
    }, [userLogin])

    const statusFormatter =(cell,row,formatExtraData)=>{
      if(cell === 'pending')
        return(
        <span><Icon.HourglassSplit size={52} /></span>
      )
      else if(cell ==='complete')
      return(
        <span><Icon.PatchCheckFill color="green" size={52}/></span>
      )
      else return(
        <span><Icon.XSquareFill color="red" size={52}/></span>
      )
    }

    const columns = [
        { text: 'Name', dataField: 'task_name' },
        { text: 'Priority', dataField: 'priority', sort: true },
        { text: 'Due Date', dataField: 'due_date', sort: true},
        { text: 'status', dataField: 'status', 
        //formatter: statusFormatter,
           sort: true }
    ];

    let statusList = ['complete', 'pending', 'incomplete']

    const rowEvents = {
        onClick: (row, cell) => {
            console.log(cell)
            navigate('/details/', { state: cell })

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
                            <div className='taskTable-div' style={{ maxWidth: '100%' }}>
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