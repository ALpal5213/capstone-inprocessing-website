import React, { useEffect, useState, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TaskTable.css';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next'
import { GlobalContext } from '../../App';
import AddTask from "./AddTask"
// import ProgressBar from "./ProgressBar"
import {Container, Row, Col, ProgressBar} from 'react-bootstrap'

export const TaskTabs = () => {
    const navigate = useNavigate();
    const { userLogin,reFetch,setReFetch } = useContext(GlobalContext);

    const [installationTasks, setInstallationTasks] = useState([]);
    const [unitTasks, setUnitTasks] = useState([]);
    const [jobTasks, setJobTasks] = useState([]);
    const [personalTasks, setPersonalTasks] = useState([]);

    useEffect(() => {
        if (userLogin) {
          fetch(`http://localhost:3001/tasks-locations/${userLogin.id}`)
            .then(res => res.json())
            .then(data => {
                setInstallationTasks(data.filter((task) => task.task_type === 'installation'))
                setJobTasks(data.filter((task) => task.task_type === 'job'))
                setUnitTasks(data.filter((task) => task.task_type === 'unit'))
                setPersonalTasks(data.filter((task) => task.task_type === 'personal'))
            })
        }
    }, [userLogin, reFetch])

    const statusFormatter =(cell,row,formatExtraData)=>{
      if(cell === 'pending')
        return(
        <span><Icon.HourglassSplit size={25} /></span>
      )
      else if(cell ==='complete')
      return(
        <span><Icon.PatchCheckFill color="green" size={25}/></span>
      )
      else return(
        <span><Icon.XSquareFill color="red" size={25}/></span>
      )
    }

    const dateFormatter =(cell, row, formatExtraData)=>{
        let split = cell.split('T')
        cell = split[0]
        return(
            <span>{cell}</span>
          )
    }

    const columns = [
        { text: 'Name', dataField: 'task_name' },
        { text: 'Priority', dataField: 'priority', sort: true },
        { text: 'Due Date', dataField: 'due_date',
        formatter: dateFormatter,
        sort: true},
        { text: 'status', dataField: 'status', 
        formatter: statusFormatter,
           sort: true }
    ];

    const rowEvents = {
        onClick: (row, cell) => {
            navigate('/details/', { state: cell })
        }
    }

    const calcProgress = (taskArray) => {
        let count = 0;
        let total = taskArray.length === 0 ? 1 : taskArray.length;
        if(taskArray.length > 0) {
            for(let i = 0; i < taskArray.length; i++) {
                if(taskArray[i].status === 'complete') {
                    count++;
                }
            }
        }
        
        return taskArray.length === 0 ? 100 : Math.round((count / total) * 100);
    }

    return (
        <div className="table-wrapper">
            
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

                <TabPanel>
                    <div className="panel-content">
                        <div className="p-bar-center">
                            <ProgressBar 
                                className="p-bar" 
                                variant={calcProgress(installationTasks) === 100 ? "success" : "info"}
                                now={calcProgress(installationTasks)} 
                                label={calcProgress(installationTasks) === 0 ? '' : `${calcProgress(installationTasks)}%`}
                            />
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={installationTasks} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                </TabPanel>

                <TabPanel >
                    <div className="panel-content">
                        <div className="p-bar-center">
                            <ProgressBar 
                                className="p-bar" 
                                variant={calcProgress(unitTasks) === 100 ? "success" : "info"} 
                                now={calcProgress(unitTasks)} 
                                label={calcProgress(unitTasks) === 0 ? '' : `${calcProgress(unitTasks)}%`}
                            />
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={unitTasks} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="panel-content">
                        <div className="p-bar-center">
                            <ProgressBar 
                                className="p-bar" 
                                variant={calcProgress(jobTasks) === 100 ? "success" : "info"}
                                now={calcProgress(jobTasks)} 
                                label={calcProgress(jobTasks) === 0 ? '' : `${calcProgress(jobTasks)}%`}
                            />
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={jobTasks} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="panel-content">
                        <div className="p-bar-center">
                            <ProgressBar 
                                className="p-bar" 
                                variant={calcProgress(personalTasks) === 100 ? "success" : "info"}
                                now={calcProgress(personalTasks)} 
                                label={calcProgress(personalTasks) === 0 ? '' : `${calcProgress(personalTasks)}%`}
                            />
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={personalTasks} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                    <AddTask />
                </TabPanel>
            </Tabs>
        </div>
        </div>
    )
}