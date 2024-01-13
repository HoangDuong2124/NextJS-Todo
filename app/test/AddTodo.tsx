import React, { Component } from 'react'
import { IToDo } from './page'
import { NewTodo } from './page'
interface IAdd {
    newTodo: NewTodo
    setTodo: React.Dispatch<React.SetStateAction<IToDo[]>>
    setNewTodo: React.Dispatch<React.SetStateAction<NewTodo>>
}

const AddTodo = ({ newTodo, setNewTodo, setTodo }: IAdd) => {
    const randomID = ()=> Math.random().toString(36).slice(2)
    const init = {
        id: randomID(),
        idTask: "",
        name: "",
        dueDate:"",
        status: "",
        isCreate: false,
    }
    const addNewTodo = () => {
        setTodo(prev => {
            const add = [...prev, newTodo]
            const jsonTodos = JSON.stringify(add)
            localStorage.setItem('localTodo', jsonTodos)
            return add

        })
        setNewTodo({...init})
    }

    return (
        <>
            {newTodo.isCreate && <div className='w-full  grid grid-cols-6 border-b-2 '>
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
                    <input type="text" placeholder='Nhập Date dedline'
                        onChange={e => setNewTodo(prev => {
                            return {
                                ...prev,
                                dueDate: e.target.value
                            }
                        })}
                    />
                </div>
                <div className=' flex justify-center items-center  '>
                    <input type="text" placeholder='Nhập status'
                        onChange={e => setNewTodo(prev => {
                            return {
                                ...prev,
                                status: e.target.value
                            }
                        })}
                    />
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