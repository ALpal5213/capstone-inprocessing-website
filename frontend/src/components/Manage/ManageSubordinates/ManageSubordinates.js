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
  const [members, setMembers] = useState();
    console.log(userLogin);
  useEffect(() => {
    fetch(`http://localhost:3001/members/${userLogin.id}`)
      .then(res => res.json())
      .then(data => setMembers(data))
  }, [])

  return ( 
    <div className='user-table-wrapper'>
      <Table hover className="userTable">
        <thead>
          <tr className='tableCol'>
            <th>Name</th>
            <th>Unit</th>
            <th>Military/Civilian</th>
          </tr>
        </thead>
        <tbody>
          {/* {newTableData} */}
        </tbody>
      </Table>
    </div>
   );
}
 
export default ManageSubordinates;