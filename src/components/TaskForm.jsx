import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, editTask } from "../features/tasks/taskSlice"
import { v4 as uuid } from "uuid"
import { useNavigate, useParams } from "react-router-dom"

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const tasks = useSelector(state => state.tasks)

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(params.id) {
      dispatch(editTask(task))
    } else {
      dispatch(addTask({
        ...task,
        id: uuid()
      }))
    }
    navigate("/")
  }

  useEffect(() => {
    if(params.id) {
      setTask(tasks.find(task => task.id === params.id))
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-20">
      <input 
        name="title"
        type="text" 
        placeholder="title" 
        onChange={handleChange}
        value={task.title}
        className="bg-[#343a40] p-2 w-[300px] rounded-sm"
      />
      <textarea 
        name="description" 
        placeholder="description" 
        onChange={handleChange}
        value={task.description}
        className="bg-[#343a40] p-2 w-[300px] rounded-sm"
      >

      </textarea>
      <button
        className="bg-[#e5383b] rounded"
      >
        Save
      </button>
    </form>
  )
}

export default TaskForm