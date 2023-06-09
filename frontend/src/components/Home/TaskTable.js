import React, { useEffect, useState, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TaskTable.css';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next'
import { GlobalContext } from '../../App';
import AddTask from "./AddTask"
import {ProgressBar} from 'react-bootstrap'

export const TaskTabs = () => {
    const navigate = useNavigate();
    const { userLogin, reFetch, setReFetch } = useContext(GlobalContext);
    const [installationTasks, setInstallationTasks] = useState([]);
    const [unitTasks, setUnitTasks] = useState([]);
    const [jobTasks, setJobTasks] = useState([]);
    const [personalTasks, setPersonalTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);

    useEffect(() => {
        if (userLogin) {
          fetch(`http://localhost:3001/tasks-locations/${userLogin.id}`)
            .then(res => res.json())
            .then(data => {
                setInstallationTasks(data.filter((task) => task.task_type === 'installation'))
                setJobTasks(data.filter((task) => task.task_type === 'job'))
                setUnitTasks(data.filter((task) => task.task_type === 'unit'))
                setPersonalTasks(data.filter((task) => task.task_type === 'personal'))
                setCompletedTasks(data.filter((task) => task.status === 'complete'))
                setPendingTasks(data.filter((task) => task.status === 'pending'))
            })
        }
    }, [userLogin, reFetch])


    //Replaces status categories with corresponding icons
    const statusFormatter =(cell,row,formatExtraData)=>{
      if(cell === 'pending') return <span><Icon.HourglassSplit size={25} /></span>
      else if(cell ==='complete') return <span><Icon.PatchCheckFill color="green" size={25}/></span>
      else return <span><Icon.XSquareFill color="red" size={25}/></span>
    }

    //Formats Date Columns to take off Time
    const dateFormatter =(cell, row, formatExtraData)=>{
        let split = cell.split('T')
        cell = split[0]
        return(
            <span>{cell}</span>
        )
    }

    //Create Columns for Table
    const columns = [
        { text: 'Name', dataField: 'task_name', sort: true },
        { text: 'Priority', dataField: 'priority', sort: true },
        { text: 'Due Date', dataField: 'due_date',
        formatter: dateFormatter,
        sort: true},
        { text: 'Status', dataField: 'status', 
        formatter: statusFormatter,
            sort: true }
    ];

    //Navigate to details Table helper Functions
    const rowEvents = {
        onClick: (row, cell) => {
            navigate('/details', { state: cell })
        }
    }

    //these tasks are the ones completed and will not be selectable
    const getCompletedTasks = () => {

        let arr = [];

        for(let task of completedTasks){
            arr.push(task.id)
        }

        return arr;
    }

    //these tasks will be checked on load
    const getCheckedTasks = () => {
        let arr = [];

        for(let task of completedTasks){
            arr.push(task.id);
        }

        for(let task of pendingTasks){
            arr.push(task.id);
        }

        return arr;
    }

    const selectRow = {
        mode: 'checkbox',
        //clickToSelect: true,
        classes: 'selection-row',
        hideSelectAll: true,
        selected: getCheckedTasks(),
        nonSelectable: getCompletedTasks(),
        onSelect: (row, isSelect, rowIndex, e) => {
            if (row.status === "incomplete") {
                fetch(`http://localhost:3001/tasks/${row.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "pending" })
                })
                    .then(() => {
                        setPendingTasks([...pendingTasks, row])
                        setReFetch(!reFetch);
                    })
                //change to pending
                //check the box
                //patch the task
                //change the icon
            } else if (row.status === "pending"){
                fetch(`http://localhost:3001/tasks/${row.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "incomplete" })
                })
                    .then(() => {
                        setPendingTasks(pendingTasks.filter(task => task !== row));
                        setReFetch(!reFetch);
                    })
            } else{
                return false;
            }
          }
    };

    //Progress Bar Calculator Function
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
                        <div>
                            <div className="p-bar-center">Tasks Completed</div>
                            <div className="p-bar-center">
                                <ProgressBar 
                                    className="p-bar" 
                                    variant={calcProgress(installationTasks) === 100 ? "success" : "info"}
                                    now={calcProgress(installationTasks)} 
                                    label={calcProgress(installationTasks) === 0 ? '' : `${calcProgress(installationTasks)}%`}
                                />
                            </div>
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={installationTasks} selectRow={selectRow} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                </TabPanel>

                <TabPanel >
                    <div className="panel-content">
                        <div>
                            <div className="p-bar-center">Tasks Completed</div>
                            <div className="p-bar-center">
                                <ProgressBar 
                                    className="p-bar" 
                                    variant={calcProgress(unitTasks) === 100 ? "success" : "info"} 
                                    now={calcProgress(unitTasks)} 
                                    label={calcProgress(unitTasks) === 0 ? '' : `${calcProgress(unitTasks)}%`}
                                />
                            </div>
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={unitTasks} selectRow={selectRow} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="panel-content">
                        <div>
                            <div className="p-bar-center">Tasks Completed</div>
                            <div className="p-bar-center">
                                <ProgressBar 
                                    className="p-bar" 
                                    variant={calcProgress(jobTasks) === 100 ? "success" : "info"}
                                    now={calcProgress(jobTasks)} 
                                    label={calcProgress(jobTasks) === 0 ? '' : `${calcProgress(jobTasks)}%`}
                                />
                            </div>
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={jobTasks} selectRow={selectRow} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="panel-content">
                        <div>
                            <div className="p-bar-center">Tasks Completed</div>
                            <div className="p-bar-center">
                                <ProgressBar 
                                    className="p-bar" 
                                    variant={calcProgress(personalTasks) === 100 ? "success" : "info"}
                                    now={calcProgress(personalTasks)} 
                                    label={calcProgress(personalTasks) === 0 ? '' : `${calcProgress(personalTasks)}%`}
                                />
                            </div>
                        </div>
                        <div className='taskTable-div' style={{ maxWidth: '100%' }}>
                            <BootstrapTable columns={columns} data={personalTasks} selectRow={selectRow} rowEvents={rowEvents} keyField='id' />
                        </div>
                    </div>
                    <AddTask />
                </TabPanel>
            </Tabs>
        </div>
        </div>
    )
}