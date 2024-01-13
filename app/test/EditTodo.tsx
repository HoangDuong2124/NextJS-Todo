import React, { Component, useEffect, useState } from 'react'
import { IToDo, UpdateTodo } from './page'

interface IEditTodo {
    todo: IToDo
    setTodo: React.Dispatch<React.SetStateAction<IToDo[]>>
}
const EditTodo = ({ todo, setTodo }: IEditTodo) => {
    const [update, setUpdate] = useState<UpdateTodo>({ id:todo.id, name:todo.name, status:todo.status, dueDate:todo.dueDate, isUpdate: false })
    const saveUpdate = () => {
        setTodo(prev => {
            const save = prev.map((item) =>
                item.id === todo.id ? { ...item, name: update.name, status: update.status, dueDate: update.dueDate, isUpdate: false } : item
            )
            const jsonTodos = JSON.stringify(save)
           localStorage.setItem('localTodo', jsonTodos)
            return save
        })
    }
    return (
        <>
        {todo.isUpdate ===true&& <div className='w-full  grid grid-cols-5 border-b-2 '>
            <div className=' flex p-3 col-span-2'>
                <input  value={update.name}
                 onChange={e => setUpdate((prev) => {
                    return {
                        ...prev,
                        name: e.target.value
                    }
                })}
                    placeholder='Nhập name task' />
            </div>
            <div className='flex items-center justify-center '>
                <input type='date' onChange={e => setUpdate((prev) => {
                    return {
                        ...prev,
                        dueDate: e.target.value
                    }
                })} 
                  value={update.dueDate}
                  placeholder='Nhập Date dedline' />
            </div>
            <div className=' flex justify-center items-center  '>
                <input onChange={e => setUpdate((prev) => {
                    return {
                        ...prev,
                        status: e.target.value
                    }
                })} 
                value={update.status}
                placeholder='Nhập status' />
            </div>
            <div className='text-center p-3 '>
                <button className='w-20 h-7  bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full'
                    onClick={saveUpdate}
                >
                    Save
                </button>
            </div>
        </div>}
</>
        
    )
}
export default EditTodo