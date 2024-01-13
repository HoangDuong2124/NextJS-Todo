import React from 'react'
import { IToDo } from './page'
import { UpdateTodo } from './page'
import EditTodo from './EditTodo'
interface IProps {
    todo: IToDo
    setTodo: React.Dispatch<React.SetStateAction<IToDo[]>>
    setUpdateTodos: React.Dispatch<React.SetStateAction<UpdateTodo>>
}

const ToDoItem = ({ todo, setTodo, setUpdateTodos }: IProps) => {
    const updateStatusTodo = () => {
        return setTodo((prev) => {
            const find = prev.map((items) => {

                if (items.id === todo.id) {
                    if (todo.isCheck === true) return { ...items, isCheck: false }
                    else {
                        return { ...items, isCheck: true }
                    }
                }
                return items
            }
            )
            // console.log(find)
            // const find2 = prev.find((it) => it.id === item.id)
            // console.log("find2: ", find2)
            const jsonTodos = JSON.stringify(find)
            localStorage.setItem('localTodo', jsonTodos)
            return find
        })
    }

    const updateTodo = () => {
         setTodo((prev) =>{
            const a = prev.map((item)=>
               item.id === todo.id ? {...item,isUpdate:true}:item
            )
            return a
        })
    }
    return (
        <>
           {!todo.isUpdate===true && <div className='w-full  grid grid-cols-5 border-b-2 tracking-normal '>
                <div className=' flex p-3 col-span-2'>
                    <button className={`${todo.isCheck === true ? ' h-7 w-7 mr-6 flex justify-center items-center  rounded-full border-2 border-slate-400  bg-slate-400' : 'group h-7 w-7 mr-6 flex justify-center items-center  rounded-full border-2 border-slate-400  bg-white hover:bg-slate-400'}`}
                        onClick={updateStatusTodo}
                    >
                        <svg xmlns="http:www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                            <path className={`${todo.isCheck === true ? 'fill-white' : 'fill-slate-400 group-hover:fill-white'}`} d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                            />
                        </svg>
                    </button>
                    <span>{todo.name}</span>
                </div>
                <div className='flex items-center justify-center '>{todo.dueDate}</div>
                <div className='text-center flex justify-center items-center mt-2 mx-auto    p-3 bg-yellow-400 rounded-full w-[8rem] h-8'>
                    <p className='  '>
                        {todo.status}
                    </p></div>
                <div className='text-center p-3 '>
                    <button className='w-20 h-7  bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded-full'
                        onClick={updateTodo}
                    >
                        Update
                    </button>
                </div>
            </div>
           }
            <EditTodo
                todo={todo}
                setTodo={setTodo}
            />
        </>
    )
}

export default ToDoItem