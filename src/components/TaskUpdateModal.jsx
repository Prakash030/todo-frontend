import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { updateTodo } from '../Services';
import { useState } from 'react';


const TaskUpdateModal = ({
    editView,
    setEditView,
    title,
    description,
    getTodoApi,
    task
}) => {
    const [loading, setLoading] = useState(false);
    const [newTitle, setTitle] = useState(title);
    const [newDescription, setDescription] = useState(description);
    const handleEditCancel = () => {
        setEditView(false);
    }

    const handleUpdate = async () => {
        if (!title || !description) {
            return toast.error('Please fill all fields');
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('todoToken');
            const response = await updateTodo(token, task?._id, newTitle, newDescription);
            if (response?.status) {
                toast.success(response?.message);
                setEditView(false);
                getTodoApi();
            }
        } catch (error) {
            console.log("Something went wrong");
        } finally {
            setLoading(false);
            setTitle('');
            setDescription('');
        }
    }

  return (
    <Modal
                open={editView}
                title="Edit Task"
                onOk={handleUpdate}
                onCancel={handleEditCancel}
                footer={[
                    <button key="back" onClick={handleEditCancel} className='border py-2 rounded-md w-[100px] bg-gray-300 hover:opacity-[90%] font-bold'>
                        Cancel
                    </button>,
                    <button key="submit" loading={loading} onClick={handleUpdate} className="ml-2 bg-[#E9522C] py-2 rounded-md hover:opacity-[90%] w-[100px] text-white font-bold">
                        Submit
                    </button>
                ]}
            >
                <div>
                    <input
                        className="mt-2 w-full px-5 py-3 rounded-lg  font-medium border-2 border placeholder-gray-500 text-sm focus:border-2  focus:outline  text-black focus:border-white"
                        type="text"
                        value={newTitle}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Task Title" />
                    <textarea
                        className="mt-5 w-full px-5 py-3 rounded-lg  font-medium border-2 border placeholder-gray-500 text-sm focus:border-2  focus:outline  text-black focus:border-white"
                        rows={5}
                        value={newDescription}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Task Description" />
                </div>

            </Modal>
  )
}

export default TaskUpdateModal