import React from 'react'
import { Modal } from 'antd';
import { deleteTodo } from '../Services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskDeleteModal = ({deleteView, setDeleteView, task, getTodoApi}) => {
    const loading = false;

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('todoToken');
            const response = await deleteTodo(token, id);
            if (response?.status) {
                toast.success(response?.message);
                setDeleteView(false);
                getTodoApi();
            }
        } catch (error) {
            console.log("Something went wrong");
        }
    }

  return (
    <Modal
                open={deleteView}
                title="Delete Task"
                onOk={() => { handleDelete(task?._id) }}
                onCancel={() => setDeleteView(false)}
                footer={[
                    <button key="back" onClick={() => setDeleteView(false)} className='border py-2 rounded-md w-[100px] bg-gray-300 hover:opacity-[90%] font-bold'>
                        Cancel
                    </button>,
                    <button key="submit" loading={loading} onClick={() => { handleDelete(task?._id) }} className="ml-2 bg-[#E9522C] py-2 rounded-md hover:opacity-[90%] w-[100px] text-white font-bold">
                        Yes
                    </button>
                ]}
            >
                <div>
                    <p className='text-xl font-bold'>Are you sure you want to delete this task?</p>
                </div>
            </Modal>
  )
}

export default TaskDeleteModal