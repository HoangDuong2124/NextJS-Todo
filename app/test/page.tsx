"use client"

import React, { useState, useEffect, Children, useMemo } from 'react'
import ToDoItem from './ToDoItem'
import CrudTodo from './CrudTodo'

export interface IToDo {
    id: string
    idTask: string
    status: string
    name: string
    dueDate?: Date
    isCheck?: boolean
}

export interface Status {
    id: string
    name: string
}


interface ITaskGroup {
    id: string;
    name: string
    children: IToDo[]
}

export interface NewTask {
    id: string
    idTask: string
    status: string
    name: string
    isCreate: boolean
}

export interface NewStatus {
    id: string
    name: string
    isCreate: boolean
}
export interface UpdateTodo {
    id: string
    name: string
    isUpdate: boolean
}
const randomId = () => {
    return Math.random().toString(36).slice(2)
}
const randomName = () => {
    return Math.random().toString(36).slice(2)
}

const globalInitStatus = [
    {
        id: "1",
        name: "High Priority"
    },
    {
        id: "2",
        name: "Medium Priority"
    }
]
const globalInitTodo = [
    {
        id: "1",
        idTask: "1",
        status: "In Progress",
        name: "Học Nextjs với F8",

    },
    {
        id: "etr",
        idTask: "2",
        status: "In Progress",
        name: "Học reactjs với F8",
    },
    {
        id: "222",
        idTask: "2",
        status: "In Progress",
        name: "Học php với F8",
    },
    {
        id: "e444",
        idTask: "1",
        status: "Complete",
        name: "Học nodejs với F8",
    }
]
const TestPage = () => {


    const [todo, setTodo] = useState<IToDo[]>([
        {
            id: "1",
            idTask: "1",
            status: "In Progress",
            name: "Học Nextjs với F8",

        },
        {
            id: "etr",
            idTask: "2",
            status: "In Progress",
            name: "Học reactjs với F8",
        },
        {
            id: "222",
            idTask: "2",
            status: "In Progress",
            name: "Học php với F8",
        },
        {
            id: "e444",
            idTask: "1",
            status: "Complete",
            name: "Học nodejs với F8",
        }
    ])
    const [status, setStatus] = useState<Status[]>([
        {
            id: "1",
            name: "High Priority"
        },
        {
            id: "2",
            name: "Medium Priority"
        }
    ])

    const init = {
        id: randomId(),
        idTask: "",
        status: "Pending",
        name: "",
        isCreate: false,
    }

    const initStatus = {
        id: randomId(),
        name: "",
        isCreate: false,
    }

    const [newTask, setNewTask] = useState<NewTask>(init)

    const [newStatus, setNewStatus] = useState<NewStatus>(initStatus)

    const [updateTodos, setUpdateTodos] = useState<UpdateTodo>({ id: "", name: "", isUpdate: false })

    useEffect(() => {
        const localTodo = localStorage.getItem('localTodo')
        setTodo(localTodo ? JSON.parse(localTodo) : globalInitTodo)
    }, [])

    useEffect(() => {
        const localStatus = localStorage.getItem('localStatus')


        setStatus(localStatus ? JSON.parse(localStatus) : globalInitStatus)

    }, [])

    const group = todo.reduce((prev: ITaskGroup[], next) => {
        const exits = prev.find((item) => item.id === next.idTask)
        if (exits) {
            exits.children.push(next)
        } else {
            const statuses = status.find((item) => item.id === next.idTask)
            if (statuses) {
                prev.push({
                    id: statuses!.id,
                    name: statuses!.name,
                    children: [next]
                })
            }


        }

        return prev

    }, [])

    return (
        <div className=" font- text-shadow- rounded-3xl shadow-2xl bg-white p-8 m-10">
            <div className=' w-full  grid grid-cols-5 text-gray-400'>

                <div className='font-bold  border-r-2 border-r-slate-400 col-span-2 '>Tasks</div>
                <div className='font-bold text-center border-r-2 border-r-slate-400'>Day</div>
                <div className='font-bold text-center border-r-2 border-r-slate-400'>Status</div>
                <div className='font-bold text-center  border-r-2 border-r-slate-400'>Update</div>
            </div>
            <div>
                {group.map((groupItem) => (
                    <div key={groupItem.id} className="">
                        <div className='flex'>
                            <h3 className='font-bold text-lg mr-2'>{groupItem.name}</h3>
                            <button className=' w-6 h-6 flex justify-center items-center  border-[3px] rounded-full border-stone-500 '
                                onClick={() => setNewTask((prev) => {
                                    return {
                                        ...prev,
                                        idTask: groupItem.id,
                                        isCreate: true
                                    }
                                })}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                    <path className=' fill-stone-500' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                                    />
                                </svg>
                            </button>
                        </div>


                        <React.Fragment key={groupItem.id}>
                            {groupItem.children.map((item) => (
                                <ToDoItem todo={item} key={item.id}
                                    setTodo={setTodo}
                                    setUpdateTodos={setUpdateTodos}
                                    updateData={{ id: item.id, name: item.name, isCheck: item.isCheck }}
                                />
                            ))}
                        </React.Fragment>
                    </div>
                ))}

            </div>
            <div>
                <button onClick={() => setNewStatus((prev) => {


                    return {
                        ...prev,
                        isCreate: true
                    }
                })}>Add Status</button>


                <button className='ml-5' onClick={() => setNewTask((prev) => {


                    return {
                        ...prev,
                        isCreate: true
                    }
                })}>Add Todo</button>
            </div>
            <CrudTodo newTask={newTask}
                newStatus={newStatus}
                updateTodo={updateTodos}
                setTodo={setTodo}
                setStatus={setStatus}
                setNewStatus={setNewStatus}
                setNewTask={setNewTask}
                setUpdateTodo={setUpdateTodos}
                setUpdateTodos={setUpdateTodos}
            />
        </div>

    )
}

export default TestPage


