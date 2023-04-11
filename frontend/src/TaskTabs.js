import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Form from 'react-bootstrap/Form';
import './TabTasks.css';
import * as Icon from 'react-bootstrap-icons';



export const TaskTabs = () => {

    const taskList = [1, 2, 3, 4, 5, 6]
    const taskIcons = {
        pending: <Icon.HourglassSplit />,
        complete: <Icon.PatchCheckFill />,
        highP: <Icon.ExclamationOctagonFill />,
        medP: <Icon.ExclamationDiamondFill />,
        lowP: <Icon.ExclamationLg />
    }

    const columns = [
        { text: 'Title', dataField: 'title' },
        { text: 'Author', dataField: 'authors' },
        { text: 'Page Count', dataField: 'num_pages' },
        { text: 'Rating', dataField: 'rating' }
      ];

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
                            <h5>progreess bar</h5>
                            <div className='task-header-div'>
                                <h6>Name</h6>
                                <h6>Priority</h6>
                                <h6>Due Date</h6>
                                <h6>Status</h6>
                            </div>
                            {taskList.map((task, index) => (
                                <div key = {index} className='taskLine'>
                                    <input type='checkbox'></input>
                                    <p>Task Name</p>
                                    <p> <Icon.ExclamationTriangleFill/></p>
                                    <p> 4/16/2023</p>
                                    <p><Icon.PatchCheckFill/></p>
                                    </div>
                            ))}
                        </div>
                    </TabPanel>
                </div>

                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 2</h2>
                        <input type="checkbox"></input>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 3</h2>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 4</h2>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}