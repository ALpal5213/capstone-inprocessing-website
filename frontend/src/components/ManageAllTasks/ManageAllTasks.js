
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import Table from 'react-bootstrap/Table';
import './ManageAllTasks.css'
import { TaskModify } from '../TaskModify/TaskModify'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../App';
import Form from 'react-bootstrap/Form';

export const ManageAllTasks = () => {

  const { setModifyTableShow, setmodifyTableQuery } = useContext(GlobalContext)
  const [allTasks, setAllTasks] = useState();
  const [filteredTasks, setFilteredTasks] = useState();
  const [newTableData, setNewTableData] = useState();
  const [tablePage, setTablePage] = useState(1);
  const [pageIndex, setPageIndex] = useState();

  const upIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
    </svg>
  )
  const downIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" classNmae="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  )
  const dashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
    </svg>
  )
  
  const [idSort, setIdSort] = useState('a');
  const [idSortIcon, setIdSortIcon] = useState(downIcon)
  const [taskNameSort, setTaskNameSort] = useState('d');
  const [taskNameSortIcon, setTaskNameSortIcon] = useState(dashIcon)
  const [taskTypeSort, setTaskTypeSort] = useState('d');
  const [taskTypeSortIcon, setTaskTypeSortIcon] = useState(dashIcon)
  const [fullnameSort, setFullnameSort] = useState('d');
  const [fullnameSortIcon, setFullnameSortIcon] = useState(dashIcon)
  const [dueDateSort, setDueDateSort] = useState('a');
  const [dueDateSortIcon, setDueDateSortIcon] = useState(dashIcon)
  const [statusSort, setStatusSort] = useState('a');
  const [statusSortIcon, setStatusSortIcon] = useState(dashIcon)


  const pageButtons = (
    <div className='pageCtrlDiv'>
      <button className='pageCtrlBtn pageCtrlBtnLeft' onClick={() => firstPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
      </button>
      <button className='pageCtrlBtn' onClick={() => backPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
      </button>
      <div className='pageNumArea'>
        {tablePage}
      </div>
      <button className='pageCtrlBtn' onClick={() => nextPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
      <button className='pageCtrlBtn pageCtrlBtnRight' onClick={() => lastPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
          <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </div>
  )
  
  useEffect(() => {
    fetch(`http://localhost:3001/tasks-users`)
    .then(res => res.json())
    .then(tasks => {
      setAllTasks(tasks)
      setFilteredTasks(tasks.filter(task => task.status !== 'complete'))
    })
  }, [])
  
  useEffect(() => {
    if (filteredTasks) {
      setPageIndex(0)
    }
  }, [filteredTasks])
  
  const handleModifyShow = (e) => {
    setmodifyTableQuery(e.target.parentElement.id)
    setModifyTableShow(true)
  }
  useEffect(() => {
    if (pageIndex !== undefined) {
      setNewTableData(
        filteredTasks.map((task, i) => {
          return (
            i > pageIndex - 1 ?
              i < pageIndex + 30 ?
                <tr className="task tableCol" key={i} id={task.id} onClick={handleModifyShow}>
                  <td>
                    {task.task_id}
                  </td>
                  <td>
                    {task.task_name}
                  </td>
                  <td>
                    {task.task_type}
                  </td>
                  <td>
                    {task.fullname}
                  </td>
                  <td>
                    {task.due_date}
                  </td>
                  <td>
                    {task.status}
                  </td>
                </tr> :
                '' :
              ''
          )
        })
      )
    }
  }, [pageIndex])

  const nextPageControl = () => {
    console.log(tablePage + 1)

    if (pageIndex < filteredTasks.length - 30) {
      if (pageIndex < 0) {
        setPageIndex(0 + 30)
      } else {
        setPageIndex(pageIndex + 30)
      }
      setTablePage(tablePage + 1)
    }
  }

  const backPageControl = () => {
    if (pageIndex >= 30) {
      setTablePage(tablePage - 1)
      setPageIndex(pageIndex - 30)
    }
  }

  const firstPageControl = () => {
    setTablePage(1)
    setPageIndex(0)
  }

  const lastPageControl = () => {
    setTablePage(Math.floor(filteredTasks.length / 30) + 1)
    let lastPageSize = filteredTasks.length - ((Math.floor(filteredTasks.length / 30)) * 30)
    setPageIndex(filteredTasks.length - lastPageSize)
  }

  const sortByCol = (setIconFunction, setSortFunction, sortDir, col, sortType) => {
    if (col === 'task_id') {
      setTaskNameSortIcon(dashIcon)
      setTaskNameSort('d')
      setTaskTypeSortIcon(dashIcon)
      setTaskTypeSort('d')
      setFullnameSortIcon(dashIcon)
      setFullnameSort('d')
      setDueDateSortIcon(dashIcon)
      setDueDateSort('a')
      setStatusSortIcon(dashIcon)
      setStatusSort('a')
    } else {
      setIdSortIcon(dashIcon)
      setIdSort('d')
    }
    if (sortDir === 'a') {
      setIconFunction(upIcon)
      if (sortType === 'num') {
        filteredTasks.sort((a, b) => {return b[col] - a[col]});
      } 
      if (sortType === 'string') {
        filteredTasks.sort((a, b) => {
          let fa = a[col].toLowerCase(), fb = b[col].toLowerCase();
          if (fa > fb) return -1;
          if (fa < fb) return 1;
          return 0;
        });
      }
      setSortFunction('d')
    } else {
      setIconFunction(downIcon)
      if (sortType === 'num') {
        filteredTasks.sort((a, b) => {return a[col] - b[col]});
      }
      if (sortType === 'string') {
        filteredTasks.sort((a, b) => {
          let fa = a[col].toLowerCase(), fb = b[col].toLowerCase();
          if (fa < fb) return -1;
          if (fa > fb) return 1;
          return 0;
        });
      }
      setSortFunction('a')
    }
    if (pageIndex > 0) {
      setPageIndex(0)
    } else {
      if (pageIndex === -.1) {
        setPageIndex(0)
      } else {
        setPageIndex(-.1)
      }
    }
    setTablePage(1)
  }

  const filterBy = () => {
    var items = allTasks;
    if (document.getElementById('task_id').value) {
      items = items.filter(task => `${task['task_id']}`.match(document.getElementById('task_id').value))
    }
    if (document.getElementById('task_name').value) {
      items = items.filter(task => task['task_name'].toLowerCase().match(document.getElementById('task_name').value.toLowerCase()))
    }
    if (document.getElementById('task_type').value) {
      items = items.filter(task => task['task_type'].toLowerCase().match(document.getElementById('task_type').value.toLowerCase()))
    }
    if (document.getElementById('fullname').value) {
      items = items.filter(task => task['fullname'].toLowerCase().match(document.getElementById('fullname').value.toLowerCase()))
    }
    if (document.getElementById('due_date').value) {
      items = items.filter(task => task['due_date'].match(`${document.getElementById('due_date').value}`))
    }
    if (document.getElementById('status').value) {
      items = items.filter(task => task['status'].toLowerCase().match(document.getElementById('status').value.toLowerCase()))
    }
    
    
    setFilteredTasks(items)
    setNewTableData(
      items.map((task, i) => {
        return (
          i > pageIndex - 1 ?
            i < pageIndex + 30 ?
              <tr className="task tableCol" key={i} id={task.id} onClick={handleModifyShow}>
                <td>
                  {task.task_id}
                </td>
                <td>
                  {task.task_name}
                </td>
                <td>
                  {task.task_type}
                </td>
                <td>
                  {task.fullname}
                </td>
                <td>
                  {task.due_date}
                </td>
                <td>
                  {task.status}
                </td>
              </tr> :
              '' :
            ''
        )
      })
    )
  }

  return(
    <>
      <div className='allTaskTableDiv'>
        {pageButtons}
        <Table hover className="taskTable table-fixed text-nowrap">
          <thead>
            <tr className='tableCol'>
              <th className='idCol'>
                <input id='task_id' className='filterBox idBox' type="text" placeholder="Id" onChange={(event) => filterBy(event.target.value, event.target.id)}/>
                <button className='sortButton' onClick={() => sortByCol(setIdSortIcon, setIdSort, idSort, 'task_id','num')}>{idSortIcon}</button>
              </th>
              <th className='taskCol'>
                <input id='task_name' className='filterBox taskBox' type="text" placeholder="Task" onChange={(event) => filterBy(event.target.value, event.target.id)}/>
                <button className='sortButton' onClick={() => sortByCol(setTaskNameSortIcon, setTaskNameSort, taskNameSort, 'task_name', 'string')}>{taskNameSortIcon}</button>
              </th>
              <th className='typeCol'>
                <input id='task_type' className='filterBox typeBox' type="text" placeholder="Type" onChange={(event) => filterBy(event.target.value, event.target.id)}/>
                <button className='sortButton' onClick={() => sortByCol(setTaskTypeSortIcon, setTaskTypeSort, taskTypeSort, 'task_type', 'string')}>{taskTypeSortIcon}</button>
              </th>
              <th className='userCol'>
                <input id='fullname' className='filterBox userBox' type="text" placeholder="User" onChange={(event) => filterBy(event.target.value, event.target.id)}/>
                <button className='sortButton' onClick={() => sortByCol(setFullnameSortIcon, setFullnameSort, fullnameSort, 'fullname', 'string')}>{fullnameSortIcon}</button>
              </th>
              <th className='dueByCol'>
                <input id='due_date' className='filterBox dueByBox' type="text" placeholder="Due By" onChange={(event) => filterBy(event.target.value, event.target.id)}/>
                <button className='sortButton' onClick={() => sortByCol(setDueDateSortIcon, setDueDateSort, dueDateSort, 'due_date', 'string')}>{dueDateSortIcon}</button>
              </th>
              <th className='statusCol'>
              <input id='status' className='filterBox statusBox' type="text" placeholder="Status" onChange={(event) => filterBy(event.target.value, event.target.id)}/>
                <button className='sortButton' onClick={() => sortByCol(setStatusSortIcon, setStatusSort, statusSort, 'status', 'string')}>{statusSortIcon}</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {newTableData}
          </tbody>
        </Table>
        {pageButtons}
      </div>
      <TaskModify />
    </>
    
  )
}