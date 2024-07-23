import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../Utils/userActions';
import NewTodoList from '../components/NewTodo';

const Todo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  
  useEffect(()=>{
    const token = localStorage.getItem('todoToken')
    if(!userInfo || !token){
      navigate('/login')
      dispatch(clearUserInfo());
    }
  },[])

  console.log(userInfo)

  return (
    <div className='px-10 pt-8'>
        <Header />
        <NewTodoList />
    </div>
  )
}

export default Todo