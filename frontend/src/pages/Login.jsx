import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaSignInAlt } from 'react-icons/fa'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError){
      toast.error(message)
    }
    if(isSuccess || user ){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, //get the state before setFormData is called
      [e.target.name]: e.target.value, //find the name of the field then set = value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email, 
      password
    }
    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Sign In</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit} >
          <div className="form-group">
            <input type="email"
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter Email'
              onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password"
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter Password'
              onChange={onChange} />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Sign In</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login