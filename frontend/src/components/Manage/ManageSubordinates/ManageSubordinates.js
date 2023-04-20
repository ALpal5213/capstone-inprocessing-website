import { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import Table from 'react-bootstrap/Table';
// import { TaskModify } from '../TaskModify/TaskModify'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../App';

const ManageSubordinates = () => {
  const { reFetch, setReFetch, userLogin } = useContext(GlobalContext);
  const [members, setMembers] = useState([]);
  // const [tableData, setTableData] = useState();

    console.log(userLogin);
  useEffect(() => {
    fetch(`http://localhost:3001/members/${userLogin.id}`)
      .then(res => res.json())
      .then(data => setMembers(data))
  }, [])

  const tableData = members.map((member) => {
    return (
      <tr>
        <td>{member.fullname}</td>
      </tr>
    )
  })

  return ( 
    <div className='user-table-wrapper'>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Military/Civilian</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </Table>
    </div>
   );
}
 
export default ManageSubordinates;