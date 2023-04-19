
import {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import Table from 'react-bootstrap/Table';
import './ManageAllTasks.css'

export const ManageAllTasks = () => {
  const [allTasks, setAllTasks] = useState();
  const [filteredTasks, setFilteredTasks] = useState();
  const [tableData, setTableData] = useState();
  const [newTableData, setNewTableData] = useState();
  const [tablePage, setTablePage] = useState(1);
  const [pageIndex, setPageIndex] = useState();
  const [idSort, setIdSort] = useState('a');
  const [idSortIcon, setIdSortIcon] = useState(
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" classNmae="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
)
  const pageButtons = (
    <div className='pageCtrlDiv'>
      <button className='pageCtrlBtn pageCtrlBtnLeft' onClick={() => firstPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <button className='pageCtrlBtn' onClick={() => backPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <div className='pageNumArea'>
        {tablePage}
      </div>
      <button className='pageCtrlBtn' onClick={() => nextPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
      <button className='pageCtrlBtn pageCtrlBtnRight' onClick={() => lastPageControl()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
          <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
  )

  const columns = [
    {dataField: 'task_name', text: '1'}, 
    {dataField: 'task_description', text: '2'}
  ];

  const options = {
    paginationSize: 15,
    pageStartIndex: 0,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    sizePerPageList: [{
      text: 'show 15', value: 15
    }, {
      text: 'show 30', value: 30
    }, {
      text: 'Show all', value: allTasks ? allTasks.length : 0
    }]
  };

  useEffect(() => {
    fetch(`http://localhost:3001/tasks-users`)
      .then(res => res.json())
      .then(tasks => {
        setAllTasks(tasks)
        setFilteredTasks(tasks)
      })
  },[])

  useEffect(() => {
    if (filteredTasks) {
      setPageIndex(0)
    }
  },[filteredTasks])

  useEffect(() => {
    if (pageIndex !== undefined) {
      setNewTableData(
        filteredTasks.map((task, i) => {
          return (
            i > pageIndex - 1 ?
              i < pageIndex + 30 ? 
              <tr className="task tableCol" key={i} id={task.id}>
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
  },[pageIndex])

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
    setTablePage(Math.floor(filteredTasks.length / 30 ) + 1)
    let lastPageSize = filteredTasks.length - ((Math.floor(filteredTasks.length / 30 )) * 30)
    setPageIndex(filteredTasks.length - lastPageSize)
  }

  const sortById = (event) => {
    var idSortedTasks;
    if (idSort === 'a') {
      setIdSortIcon(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>
      )
      idSortedTasks = filteredTasks.sort((a, b) => {return b.task_id - a.task_id});
      setIdSort('d')
    } else {
      setIdSortIcon(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" classNmae="bi bi-chevron-down" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
      )
      idSortedTasks = filteredTasks.sort((a, b) => {return a.task_id - b.task_id});
      setIdSort('a')
    }
    if (pageIndex > 0) {
      setPageIndex(0)
    } else {
      setPageIndex(pageIndex - 1)
    }
    setTablePage(1)
  }

  return(
    <div className='allTaskTableDiv'>
      {pageButtons}
      <Table hover className="taskTable">
        <thead>
          <tr className='tableCol'>
            <th>
              Task Id
              <button id='sortIdButton' className='sortButton' onClick={(event) => sortById(event)}>{idSortIcon}</button>
            </th>
            <th>
              Task
            </th>
            <th>
              Type
            </th>
            <th>
              User
            </th>
            <th>
              Due
            </th>
            <th>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {newTableData}
        </tbody>
      </Table>
      {pageButtons}
    </div>
  )
}