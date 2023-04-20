
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './ManageTasks.css'
import { TaskModify } from '../TaskModify/TaskModify'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../../App';
import { CreateTask } from '../CreateTask/CreateTask';

export const ManageTasks = () => {

  const { userLogin, modifyTableShow, setModifyTableShow, modifyTableQuery, setmodifyTableQuery, reFetch, setReFetch, manageRoute, setManageRoute} = useContext(GlobalContext)
  const navigate = useNavigate();
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
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    </svg>
  )
  const dashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
    </svg>
  )

  const unfiltered = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-square filterIcon" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>
  )

  const filtered = (
    <div className='filterIconDiv' onClick={() => clearFilter()}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-square-fill filterIcon" viewBox="0 0 16 16">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1zM4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </div>
  )

  const xBox = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square-fill textIcon" viewBox="0 0 16 16">
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
    </svg>
  )

  const hourglass = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hourglass-split textIcon" viewBox="0 0 16 16">
      <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
    </svg>
  )

  const ckBox = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square-fill textIcon" viewBox="0 0 16 16">
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
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
  const [statusSortIcon, setStatusSortIcon] = useState(dashIcon);
  const [subordinates, setSubordinates] = useState();
  const [filterIcon, setFilterIcon] = useState(unfiltered);
  const [unitMembers, setUnitMembers] = useState();


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
        {
          <>
            {`${tablePage} of ${filteredTasks ? Math.floor(filteredTasks.length / 30) + 1 : ''}`}
            {filterIcon}
          </>
        }
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
    if (typeof manageRoute === 'string') {
      setManageRoute(0)
    } else {
      setManageRoute('ck')
    }
  },[])

  useEffect(() => {
    let urlArr = window.location.href.split('/')
    let page = urlArr[urlArr.length - 1]

    if (page === 'subordinates' && userLogin) {
      console.log('test')
      fetch(`http://localhost:3001/supervisor/${userLogin.id}`)
        .then(res => res.json())
        .then(subs => {
          const subIds = subs.map(sub => sub.subordinate_id)
          fetch(`http://localhost:3001/tasks-users`)
            .then(res => res.json())
            .then(tasks => {
              setAllTasks(tasks.filter(task => task.status !== 'complete' && subIds.includes(task.user_id)))
              setFilteredTasks(tasks.filter(task => task.status !== 'complete' && subIds.includes(task.user_id)))
            })
        })
    }

    if (page === 'unit') {
      fetch(`http://localhost:3001/commander/${userLogin.id}`)
        .then(res => res.json())
        .then(mbrs => {
          setUnitMembers(mbrs)
          const mbrIds = mbrs.map(mbr => mbr.unitMemberId)
          fetch(`http://localhost:3001/tasks-users`)
            .then(res => res.json())
            .then(tasks => {
              setAllTasks(tasks.filter(task => task.status !== 'complete' && mbrIds.includes(task.user_id)))
              setFilteredTasks(tasks.filter(task => task.status !== 'complete' && mbrIds.includes(task.user_id)))
            })
        })
    }
    
    if (page === 'manage-all') {
      fetch(`http://localhost:3001/tasks-users`)
        .then(res => res.json())
        .then(tasks => {
          setAllTasks(tasks.filter(task => task.status !== 'complete'))
          setFilteredTasks(tasks.filter(task => task.status !== 'complete'))
        })
    }

  }, [manageRoute])

  useEffect(() => {
    if (filteredTasks) {
      if (pageIndex === 0) {
        setPageIndex(-.1)
      } else {
        setPageIndex(0)
      }
    }
  }, [filteredTasks])

  const handleModifyShow = (e) => {
    setmodifyTableQuery(e.target.parentElement.id)
    setReFetch()
    setModifyTableShow(true)
  }
  useEffect(() => {
    if (pageIndex !== undefined) {
      setNewTableData(
        filteredTasks.map((task, i) => {
          return (
            i > pageIndex - 1 ?
              i < pageIndex + 30 ?
                <tr className="task tableCol" key={i} id={task.task_id} onClick={handleModifyShow}>
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
                    {task.status === 'pending' ? <span className='taskText pendingTask'>{task.status}{hourglass}</span> : task.status === 'incomplete' ? <span className='taskText incompleteTask'>{task.status}{xBox}</span> : <span className='taskText completeTask'>{task.status}{ckBox}</span>}
                  </td>
                </tr> :
                '' :
              ''
          )
        })
      )
    }
  }, [pageIndex, reFetch])

  const nextPageControl = () => {

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
    setFilterIcon(filtered)
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
    setFilterIcon(filtered)
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

  const clearFilter = () => {
    setFilterIcon(unfiltered)
    document.getElementById('task_id').value = ''
    document.getElementById('task_name').value = ''
    document.getElementById('task_type').value = ''
    document.getElementById('fullname').value = ''
    document.getElementById('due_date').value = ''
    document.getElementById('status').value = ''
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
    setIdSortIcon(downIcon)
    setIdSort('a')
    setManageRoute(Date.now())
  }

  return (
    <>
      <div className='allTaskTableDiv'>
        {pageButtons}
        <Table className="taskTable table-fixed text-nowrap">
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
      <CreateTask />
    </>

  )
}