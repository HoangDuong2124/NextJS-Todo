"use client"

import React, { useState, useEffect, Children, useMemo } from 'react'
import ToDoItem from './ToDoItem'
import AddTodo from './AddTodo'
export interface IToDo {
    id: string
    idTask: string
    status: string
    name: string
    dueDate: string
    isCheck?: boolean
    isUpdate?: boolean
}

export interface Status {
    id: string
    name: string
}


interface ITaskGroup {
    id: string;
    name?: string
    children: IToDo[]
}

export interface NewTodo {
    id: string
    idTask: string
    status: string
    name: string
    dueDate: string
    type: string
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
    dueDate: string
    status: string
    isUpdate: boolean
}
const randomId = () => {
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

const TestPage = () => {

    const fetchTodo = async () => {
        const data = await fetch('/api/todo', {
            method: "GET"
        })
        const body = await data.json()
        setTodo(body)
    }


    const [todo, setTodo] = useState<IToDo[]>([])
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
        name: "",
        dueDate: "",
        status: "In Progress",
        type: "",
        isCreate: false,
    }

    const initStatus = {
        id: randomId(),
        name: "",
        isCreate: false,
    }

    const [newTodo, setNewTodo] = useState<NewTodo>(init)

    const [newStatus, setNewStatus] = useState<NewStatus>(initStatus)

    const [updateTodos, setUpdateTodos] = useState<UpdateTodo>({ id: "", name: "", status: "", dueDate: "", isUpdate: false })


    useEffect(() => {
        fetchTodo()
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
            else {
                prev.push(
                    {
                        id: "3",
                        children: [next]
                    }
                )
            }


        }

        return prev

    }, [])

    return (
        <div className=" font- text-shadow- rounded-3xl shadow-2xl bg-white p-8 m-10">
            <div className=' w-full  grid grid-cols-6 text-gray-400'>

                <div className='font-bold  border-r-2 border-r-slate-400 col-span-2  '>Tasks</div>
                <div className='font-bold text-center border-r-2 border-r-slate-400'>Day</div>
                <div className='font-bold text-center border-r-2 border-r-slate-400'>Status</div>
                <div className='font-bold text-center  border-r-2 border-r-slate-400'>Update</div>
                <div className='font-bold text-center  border-r-2 border-r-slate-400 col-span-1 '>Delete</div>
            </div>
            <div>
                {group.map((groupItem) => (
                    <div key={groupItem.id} className="">
                        <div className='flex '>
                            <h3 className='font-bold text-lg mr-2'>{groupItem.name}</h3>
                            {groupItem.id === "1" && <button className=' w-6 h-6 flex justify-center items-center  border-[3px] rounded-full border-stone-500 '
                                onClick={() => setNewTodo((prev) => {
                                    return {
                                        ...prev,
                                        idTask: groupItem.id,
                                        type: "2",
                                        isCreate: true
                                    }
                                })}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                    <path className=' fill-stone-500' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                                    />
                                </svg>
                            </button>}
                            {groupItem.id === "2" && <button className=' w-6 h-6 flex justify-center items-center  border-[3px] rounded-full border-stone-500 '
                                onClick={() => setNewTodo((prev) => {
                                    return {
                                        ...prev,
                                        idTask: groupItem.id,
                                        type: "2",
                                        isCreate: true
                                    }
                                })}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                    <path className=' fill-stone-500' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                                    />
                                </svg>
                            </button>}
                        </div>


                        <React.Fragment key={groupItem.id}>
                            {groupItem.children.map((item) => (
                                <ToDoItem
                                    allTodo={todo}
                                    todo={item} key={item.id}
                                    setTodo={setTodo}
                                    setUpdateTodos={setUpdateTodos}
                                />

                            ))}
                        </React.Fragment>
                    </div>
                ))}

            </div>
            <div>
                {/* <button className='rounded-full bg-red-500 text-white w-auto p-1 font-bold ' onClick={() => setNewStatus((prev) => {


                    return {
                        ...prev,
                        isCreate: true
                    }
                })}>Add Status</button> */}
                <button className='ml-5 rounded-full bg-red-500 text-white w-auto p-1 font-bold'
                    onClick={() => setNewTodo((prev) => {
                        return {
                            ...prev,
                            type: "1",
                            isCreate: true
                        }
                    })}>Add Task</button>
            </div>
            <AddTodo
                setTodo={setTodo}
                newTodo={newTodo}
                setNewTodo={setNewTodo}
            />
        </div>

    )
}

export default TestPage


