
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Table() {
  const users = useSelector(state => state.users)

  return (
    <div className="">
      <div className='row mx-0 px-4 mb-5 pb-5'>
        <div className='col-12 boxTable'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h4 className='mb-0'>User Table</h4>
            <Link to='/' className='btn btn-primary'>Register</Link>
          </div>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {users.map(item => {
                  return <tr key={item.id}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.mobile_number}</td>
                    <td>{item.email_address}</td>
                    <td>{item.password}</td>
                  </tr>
                })}
                {users.length <= 0 ? <tr><td colSpan='5' className='text-center'>No records found</td></tr> : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
