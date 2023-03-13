import { useDispatch, useSelector } from "react-redux"
import { deleteTask } from "../features/tasks/taskSlice"
import { Link } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"

const TaskList = () => {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }

  return (
    <>
      <header>
        <h1 className="mt-10 text-3xl mb-6">
          Tasks: {tasks.length}
        </h1>
        <button className="border py-1 px-4 rounded mb-6 hover:opacity-90">
          <Link to="/create-task" className="flex items-center gap-1">
            Create Task
            <AiOutlinePlus size="18" color="#e5383b" />
          </Link>
        </button>
      </header>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center bg-[#343a40] mb-6 p-6 rounded-md gap-20 h-auto min-w-[200px] max-w-[360px] shadow-md"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="break-all">{task.description}</p>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              to={`/edit-task/${task.id}`}
              className="hover:opacity-90"
            >
              <BiEdit size="26" color="#dee2e6" />
            </Link>
            <button 
              onClick={() => handleDelete(task.id)} className="hover:opacity-90"
            >
              <AiOutlineDelete size="26" color="#e5383b" />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default TaskList