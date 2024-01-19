import React, { Component } from 'react'
import { IToDo } from './page'
import { NewTodo } from './page'
interface IAddTodo {
    newTodo: NewTodo
    setTodo: React.Dispatch<React.SetStateAction<IToDo[]>>
    setNewTodo: React.Dispatch<React.SetStateAction<NewTodo>>
}

const AddTodo = ({ newTodo, setNewTodo, setTodo }: IAddTodo) => {

    const fetchAdd = async (data: IToDo) => {
        const res = await fetch('/api/todo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.DATA_API_KEY!,
            },
            body: JSON.stringify(data),
        })

        const result = await res.json()

        return result
    }
    const randomID = () => Math.random().toString(36).slice(2)
    const init = {
        id: randomID(),
        idTask: "",
        name: "",
        dueDate: "",
        status: "In Progress",
        type: "",
        isCreate: false,
    }
    const addNewTodo = async () => {
        try {
            setTodo(prev => {
                const add = [...prev, newTodo]
                return add
            })
            const data = await fetchAdd(newTodo)
            setTodo(prev =>{
               const updateID = prev.map((item)=>
                  item.id===newTodo.id ? {...item,id:data.id}:item
               )
               return updateID
            }) 
            setNewTodo({ ...init })
        } catch (error) {

        }

    }

    return (
        <>
            {newTodo.isCreate && newTodo.type === "1" && <div className='w-full  grid grid-cols-6 border-b-2 '>
                <div className=' flex p-3 col-span-2'>
                    <input type="text" placeholder='Nhập name task'
                        onChange={e => setNewTodo(prev => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })}
                    />
                </div>
                <div className=' flex justify-center items-center  '>
                    <input type="text" placeholder='Nhập id status'
                        onChange={e => setNewTodo(prev => {
                            return {
                                ...prev,
                                idTask: e.target.value
                            }
                        })}
                    />
                </div>
                <div className='flex items-center justify-center '>
                    <input type="date" placeholder='Nhập Date dedline'
                        onChange={e => setNewTodo(prev => {
                            return {
                                ...prev,
                                dueDate: e.target.value
                            }
                        })}
                    />
                </div>
                <div className=' flex justify-center items-center  '>
                    <select name="status" id="status"
                        onChange={e => {
                            setNewTodo((prev) => {
                                return {
                                    ...prev,
                                    status: e.target.value
                                }
                            })
                        }}
                    >
                        <option value="In Progress" >In Progress</option>
                        <option value="Pending" >Pending</option>
                        <option value="Complete" >Complete</option>
                    </select>
                </div>

                <div className='text-center p-3 '>
                    <button className='w-20 h-7  bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full'
                        onClick={addNewTodo}
                    >
                        Add
                    </button>
                </div>
            </div>}
            {newTodo.isCreate && newTodo.type === "2" && <div className='w-full  grid grid-cols-6 border-b-2 '>
                <div className=' flex p-3 col-span-2'>
                    <input type="text" placeholder='Nhập name task'
                        onChange={e => setNewTodo(prev => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })}
                    />
                </div>
                <div className='flex items-center justify-center '>
                    <input type="date" placeholder='Nhập Date dedline'
                        onChange={e => setNewTodo(prev => {
                            return {
                                ...prev,
                                dueDate: e.target.value
                            }
                        })}
                    />
                </div>
                <div className=' flex justify-center items-center  '>
                    <select name="status" id="status"
                        onChange={e => {
                            setNewTodo((prev) => {
                                return {
                                    ...prev,
                                    status: e.target.value
                                }
                            })
                        }}
                    >
                        <option value="In Progress" >In Progress</option>
                        <option value="Pending" >Pending</option>
                        <option value="Complete">Complete</option>
                    </select>
                </div>

                <div className='text-center p-3 '>
                    <button className='w-20 h-7  bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full'
                        onClick={addNewTodo}
                    >
                        Add
                    </button>
                </div>
            </div>}
        </>

    )
}

export default AddTodo