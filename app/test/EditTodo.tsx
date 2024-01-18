import React, { Component, useEffect, useState } from 'react'
import { IToDo, UpdateTodo } from './page'

interface IEditTodo {
    todo: IToDo
    setTodo: React.Dispatch<React.SetStateAction<IToDo[]>>
}
const EditTodo = ({ todo, setTodo }: IEditTodo) => {

    const fetchUpdate = async (data:UpdateTodo)=>{
        const res = await fetch(`/api/todo/${update.id}`,{
            method: "PUT",
            headers:{
                'Content-Type':'application/json',
                'API-Key':process.env.DATA_API_KEY!, 
            },
            body: JSON.stringify(data),
        }) 
    }

    const [update, setUpdate] = useState<UpdateTodo>({ id:todo.id, name:todo.name, status:todo.status, dueDate:todo.dueDate, isUpdate: false })
    const saveUpdate = () => {
        setTodo(prev => {
            const save = prev.map((item) =>
                item.id === todo.id ? { ...item, name: update.name, status: update.status, dueDate: update.dueDate, isUpdate: false } : item
            )   
            return save
        })
        fetchUpdate(update)
    }
    return (
        <>
        {todo.isUpdate ===true&& <div className='w-full  grid grid-cols-6 border-b-2 '>
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
               <select name="status" id="status" 
                  onChange={e=>{
                     setUpdate((prev)=>{
                        return {
                            ...prev,
                            status:e.target.value
                        }
                     })
                  }}
                 >
                  <option value="In Progress" selected={todo.status==="In Progress"}>In Progress</option>
                  <option value="Pending" selected={todo.status==="Pending"}>Pending</option>
                  <option value="Complete" selected={todo.status==="Complete"}>Complete</option>
               </select>
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