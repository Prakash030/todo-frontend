import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUserInfo } from '../Utils/userActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   const token = localStorage.getItem('todoToken')
  //   if(!userInfo || !token){
  //     navigate('/login')
  //     dispatch(clearUserInfo());
  //   }
  // },[])

  const handleLogout = () => {
    toast.success('Logged out successfully');
    localStorage.removeItem('todoToken');
    dispatch(clearUserInfo());
    navigate('/login');
  }
  const user = useSelector((state) => state.user.userInfo);
  return (
    <>
      <div className='flex items-center justify-between bg-gray-500 rounded-md px-5 py-2'>
        <h1 className='text-xl font-bold '>Todo List</h1>
        <div className='flex items-center justify-center gap-10'>
          <img
            src={user?.profilePicture ? user.profilePicture : `https://ui-avatars.com/api/?name=${user?.name}`}
            alt={user?.name || "User"}
            height={20}
            width={50}
            className='rounded-full'
          />
          <button className="bg-black hover:bg-[#E9522C] px-4 py-2 rounded-md" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {/* <ToastContainer />    */}
    </>
  )
}

export default Header