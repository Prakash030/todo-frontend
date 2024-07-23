import React from 'react'
import { Modal } from 'antd';

const TaskViewModal = ({openView, setOpenView, task}) => {
    const handleCancel = () => {
        setOpenView(false);
    }
  return (
    <div><Modal
    open={openView}
    title="Task View"
    onOk={handleCancel}
    onCancel={handleCancel}
    footer={[
        // <button key="back" onClick={handleCancel} className='border py-2 rounded-md w-[100px] bg-gray-300 hover:opacity-[90%] font-bold'>
        //     Cancel
        // </button>,
        <button key="submit" onClick={handleCancel} className="ml-2 bg-[#E9522C] py-2 rounded-md hover:opacity-[90%] w-[100px] text-white font-bold">
            Close
        </button>
    ]}
>
    <div>
        <p className='mt-5 text-xl font-bold'>{task?.title}</p>
        <p className='mt-2 text-lg'>Description: {task?.description}</p>
        <p className='mt-2 text-sm text-gray-500'>Created At: {new Date(task?.createdAt).toDateString()}</p>
       
    </div>

</Modal></div>
  )
}

export default TaskViewModal