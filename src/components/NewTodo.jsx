import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { updateTodoDrag, getTodos, addTodo } from '../Services';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import TaskViewModal from './TaskViewModal';
import { Modal, Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskDeleteModal from './TaskDeleteModal';
import TaskUpdateModal from './TaskUpdateModal';

const ItemType = 'TASK';
const { Option } = Select;

const Task = ({ task, index, moveTask, status, getTodoApi }) => {
    const [openView, setOpenView] = useState(false);
    const [deleteView, setDeleteView] = useState(false);
    const [updateView, setUpdateView] = useState(false);


    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { ...task, index, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    console.log("task", task);

    return (
        <>
            <div
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    padding: 16,
                    color: 'white',
                    cursor: 'move',
                    fontWeight: 'bold',
                }}
                className='bg-gray-500'
            >
                <p>{task?.title}</p>
                <p className='text-gray-300 font-normal'>Description: {task?.description}</p>
                <p className='text-xs mt-1'>{`CreatedAt: ${new Date(task?.createdAt).toDateString()}`}</p>
            </div>
            <div className='flex items-center justify-end gap-5 bg-gray-500  pb-3 pr-2 mb-3'>
                <FaRegEdit className='text-blue-500 cursor-pointer' onClick={() => setUpdateView(true)} />
                <MdDelete className='text-red-500 cursor-pointer' onClick={() => setDeleteView(true)} />
                <RxEyeOpen className='text-green-500 cursor-pointer' onClick={() => setOpenView(true)} />
            </div>
            <TaskViewModal openView={openView} setOpenView={setOpenView} task={task} />
            <TaskDeleteModal deleteView={deleteView} setDeleteView={setDeleteView} task={task} getTodoApi={getTodoApi} />
            <TaskUpdateModal editView={updateView} setEditView={setUpdateView} title={task?.title} description={task?.description} getTodoApi={getTodoApi} task={task} />
        </>
    );
};

const Column = ({ column, status, moveTask, getTodoApi }) => {
    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item) => {
            if (item.status !== status) {
                moveTask(item, status);
            }
        },
    });

    return (
        <div
            ref={drop}
            style={{
                margin: 8,
                padding: 8,
                backgroundColor: 'lightgray',
                minHeight: '500px',
                width: "35%",
                marginTop: '20px',
                borderRadius: '10px',

            }}
        >
            <h2 className='text-black font-bold text-xl mb-1'>{column?.name}</h2>
            <div
                style={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    maxHeight: '65vh', // Set the maximum height for the scrollable area
                }}
            >
                {column?.items?.map((task, index) => (
                    <Task key={task?.id} task={task} index={index} moveTask={moveTask} status={status} getTodoApi={getTodoApi} />
                ))}
            </div>
        </div>
    );
};

const TodoList = () => {
    const [columns, setColumns] = useState({
        pending: { name: 'Pending', items: [] },
        ongoing: { name: 'Ongoing', items: [] },
        done: { name: 'Done', items: [] },
    });
    const [originalColumns, setOriginalColumns] = useState({
        pending: { name: 'Pending', items: [] },
        ongoing: { name: 'Ongoing', items: [] },
        done: { name: 'Done', items: [] },
    });
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('default');

    console.log(columns);
    const userInfo = useSelector((state) => state.user.userInfo);

    const getTodoApi = async () => {
        try {
            const token = localStorage.getItem('todoToken');
            const response = await getTodos(token);
            const tasks = response?.tasks;

            const pending = tasks.filter(task => task.status === 'pending');
            const ongoing = tasks.filter(task => task.status === 'ongoing');
            const done = tasks.filter(task => task.status === 'done');

            const newColumns = {
                pending: { name: 'Pending', items: pending },
                ongoing: { name: 'Ongoing', items: ongoing },
                done: { name: 'Done', items: done },
            };

            setColumns(newColumns);
            setOriginalColumns(newColumns);

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    useEffect(() => {
        getTodoApi();
    }, [])

    

    const handleSubmit = async () => {
        if (!title || !description) {
            return toast.error('Please fill all fields');
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('todoToken');
            const response = await addTodo(token, title, description);
            console.log(response);
            if (response?.status) {
                console.log(response);
                toast.success(response?.message);
                setOpen(false);
                getTodoApi();
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
            setTitle('');
            setDescription('');
        }
    }

    const handleCancel = () => {
        setOpen(false);
        setTitle('');
        setDescription('');
    };


    const moveTask = async (task, newStatus) => {

        const sourceColumn = columns[task.status];
        const destColumn = columns[newStatus];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(task.index, 1);
        removed.status = newStatus;
        destItems.push(removed);


        // Update the task status
        try {
            console.log("task here");
            const token = localStorage.getItem('todoToken');
            await updateTodoDrag(token, task?._id, task?.title, task?.description, newStatus);
            getTodoApi();
        } catch (error) {
            console.error('Failed to update task status', error);
        }

        setColumns({
            ...columns,
            [task.status]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [newStatus]: {
                ...destColumn,
                items: destItems,
            },
        });
    };

    const handleFilterChange = (value) => {
        setFilter(value);
        if (value === 'recent') {
            setColumns({
                pending: {
                    name: 'Pending',
                    items: columns.pending.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                },
                ongoing: {
                    name: 'Ongoing',
                    items: columns.ongoing.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                },
                done: {
                    name: 'Done',
                    items: columns.done.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                },
            });
        } else {
            getTodoApi();
        }
    }

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);

        const filterTasks = (tasks) => tasks.filter(task => task.title.toLowerCase().includes(searchTerm));

        setColumns({
            pending: {
                name: 'Pending',
                items: filterTasks(originalColumns.pending.items),
            },
            ongoing: {
                name: 'Ongoing',
                items: filterTasks(originalColumns.ongoing.items),
            },
            done: {
                name: 'Done',
                items: filterTasks(originalColumns.done.items),
            },
        });
    };

    return (
        <>
            <div className='flex items-center justify-between'>
                <button onClick={() => setOpen(true)} className=" mt-5 ml-2 bg-[#E9522C] px-4 py-2 rounded-md hover:opacity-[90%] w-[150px]">Add Task</button>
                <div className='flex items-center justify-between'>
                <input
                        className="px-3 py-1 rounded-md border border-gray-300 bg-gray-500 text-white"
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search tasks..."
                    />
                    <Select defaultValue="default" 
                    className='w-[150px] ml-2'
                    onChange={handleFilterChange}
                    >
                        <Option value="default">Default</Option>
                        <Option value="recent">Recent First</Option>
                    </Select>
                    </div>

            </div>
            <Modal
                open={open}
                title="Add Task"
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <button key="back" onClick={handleCancel} className='border py-2 rounded-md w-[100px] bg-gray-300 hover:opacity-[90%] font-bold'>
                        Cancel
                    </button>,
                    <button key="submit" loading={loading} onClick={handleSubmit} className="ml-2 bg-[#E9522C] py-2 rounded-md hover:opacity-[90%] w-[100px] text-white font-bold">
                        Submit
                    </button>
                ]}
            >
                <div>
                    <input
                        className="mt-2 w-full px-5 py-3 rounded-lg  font-medium border-2 border placeholder-gray-500 text-sm focus:border-2  focus:outline  text-black focus:border-white"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Task Title" />
                    <textarea
                        className="mt-5 w-full px-5 py-3 rounded-lg  font-medium border-2 border placeholder-gray-500 text-sm focus:border-2  focus:outline  text-black focus:border-white"
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Task Description" />
                </div>

            </Modal>
            <DndProvider backend={HTML5Backend}>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Column key={columnId} column={column} status={columnId} moveTask={moveTask} getTodoApi={getTodoApi} />
                    ))}
                </div>
            </DndProvider>
            <ToastContainer />
        </>
    );
};

export default TodoList;
