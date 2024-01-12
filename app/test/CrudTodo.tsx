import React from 'react'
import { NewTask } from './page';
import { NewStatus } from './page';
import { UpdateTodo } from './page';
import { IToDo } from './page'
import { Status } from './page';
interface updateProps {
    newStatus: NewStatus
    newTask:NewTask
    updateTodo:UpdateTodo
    setTodo:React.Dispatch<React.SetStateAction<IToDo[]>>
    setNewStatus: React.Dispatch<React.SetStateAction<NewStatus>>
    setNewTask: React.Dispatch<React.SetStateAction<NewTask>>
    setUpdateTodo:React.Dispatch<React.SetStateAction<UpdateTodo>>
    setUpdateTodos:React.Dispatch<React.SetStateAction<UpdateTodo>>
    setStatus:React.Dispatch<React.SetStateAction<Status[]>>
}
const CrudTodo = ( {newTask,newStatus,updateTodo,setTodo,setStatus,setNewStatus,setNewTask,setUpdateTodo,setUpdateTodos}:updateProps) => {
    const randomId = () => {
        return Math.random().toString(36).slice(2)
    }
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
    const handleAddTask = () => {
        setTodo(prev => {
            const cloneTodos = [...prev, newTask]
            const jsonTodos = JSON.stringify(cloneTodos)
            localStorage.setItem('localTodo', jsonTodos)
            return cloneTodos
        })
        setNewTask({ ...init, id: randomId() })
    }
    const handleAddStatus = () => {
        setStatus(prev => {
            const cloneStatus = [...prev, newStatus]
            const jsonStatus = JSON.stringify(cloneStatus)
            localStorage.setItem('localStatus', jsonStatus)
            return cloneStatus
        })

        setNewStatus({...initStatus,id:randomId()})
    }

    const handleUpdateTodo = () => {
        setTodo(prev => {
            const updateTodoss = prev.map((item) =>
                item.id === updateTodo.id ? { ...item, name: updateTodo.name } : item
            )
            const jsonTodos = JSON.stringify(updateTodoss)
            localStorage.setItem('localTodo', jsonTodos)
            return updateTodoss
        })
        setUpdateTodos({ id: "", name: "", isUpdate: false })
    }
    return (
       <>
            {newStatus.isCreate && <div className="flex gap-3">
                <input onChange={e => setNewStatus((prev) => {
                    return {
                        ...prev,
                        id: e.target.value
                    }
                })} placeholder='Nhập id status' />
                <input onChange={e => setNewStatus((prev) => {
                    return {
                        ...prev,
                        name: e.target.value
                    }
                })} placeholder='Nhập name status' />
                <button onClick={handleAddStatus}>Submit</button>
            </div>}
            {newTask.isCreate && <div className="flex gap-3">
                <input onChange={e => setNewTask((prev) => {
                    return {
                        ...prev,
                        idTask: e.target.value
                    }
                })} placeholder='Nhập id status' />
                <input onChange={e => setNewTask((prev) => {
                    return {
                        ...prev,
                        name:e.target.value
                    }
                })} placeholder='Nhập name Task' />    
                
                <button onClick={handleAddTask}>Submit</button>
            </div>}
            {updateTodo.isUpdate && <div className="flex gap-3">
                <input onChange={e => setUpdateTodo((prev) => {
                    return {
                        ...prev,
                        name: e.target.value
                    }
                })} value={updateTodo.name} placeholder='Nhập name Todo' />
                <button onClick={handleUpdateTodo}>UPDATE</button>
            </div>}
        </>
    )
}

export default CrudTodo