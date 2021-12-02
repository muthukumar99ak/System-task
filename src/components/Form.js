

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

function Form() {

    const [ formLabel, setFormLabel ]= useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [isError, setError] = useState('');
    const [ formData, setFormData ] = useState({
        first_name: '',
        last_name: '',
        email_address: '',
        password: '',
        mobile_number: ''
    })
    const users = useSelector(state => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getFormLabel = async() => {
            const response = await fetch('https://api.jsonbin.io/v3/b/619f91500ddbee6f8b11bcae',{
            headers: {
                'X-Master-Key': '$2b$10$ieHPz3ypFksS.SQUJGtaveIS9398.r2oZDdp52kyDQTGdojjv5Gr2'
            }
            })
            const data = await response.json();
            setFormLabel(data.record)
            setIsLoading(false);
        }
        getFormLabel().catch(error => {
        setError(error.message)
        throw new Error("Something went wrong")
        });
    },[])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const haveData = users.filter(user => {
            return user.email_address === formData.email_address
        })
        haveData.length > 0 ? alert('Email already registered') : dispatch({type: "ADD_DATA", value: {...formData, id: Date.now()}})
        if(haveData.length <= 0){ 
            setFormData({
                first_name: '',
                last_name: '',
                email_address: '',
                password: '',
                mobile_number: ''
            })
            navigate("/user-table");
        }
        
  }

  const inputChangeHandler = (e) => {
    setFormData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  return (
    <div className="formCont">
      {!isLoading && isError ? <p className='text-center mt-5'>{isError}</p> : null}
      <form onSubmit={formSubmitHandler}>
        <div className='containerBox'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='text-center'>Form</h3>
              {isLoading && !isError ? 
                <div className='text-center mt-5'>
                  <div className="spinner-border  text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div> : null}
            </div>
            {formLabel.map(item => {
              return (
                <div className='col-12' key={item.id}>
                    <label className='form-label' htmlFor={item.name}>{item.label}</label>
                    <input 
                      className='form-control' 
                      onChange={inputChangeHandler}
                      value={formData[item.name]}
                      type={item.type} 
                      name={item.name} 
                      id={item.name} 
                      placeholder={`Enter ${item.label.toLowerCase()}`} 
                      required
                    />
                </div>
              )
            })}
            <div className='col-12 text-end mt-4'>
                <button type='submit' className='btn btn-primary px-4 py-1'>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
