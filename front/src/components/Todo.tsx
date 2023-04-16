import type { TodoModel } from "@/models/todo";
import { completeTodo, deleteTodo, fetchTodos } from '@/features/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type TodoProps = {
    filterStatus: string
    todo: TodoModel;
    setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
}

const Todo: React.FC<TodoProps> = ({ filterStatus, todo, setTodos }) => {
    const deleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        await deleteTodo(todo.todo_id)
        const {data} = await fetchTodos(filterStatus)
        setTodos(data.todos)
      } catch (e: unknown) {
        console.log(e);
      }
    };
    const completeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        await completeTodo(todo.todo_id)
        const {data} = await fetchTodos(filterStatus)
        setTodos(data.todos)
      } catch (e: unknown) {
        console.log(e);
      }
    };
  
    return (
      <li className={`pl-5 pr-4 py-3 flex items-center justify-between text-sm ${todo.completed_at ? "line-through" : ""}`}>
        <div className="w-0 flex-1 flex items-center">
          {todo.label}      
        </div>
        <div className="ml-4 flex-shrink-0">
          {
          !todo.completed_at && 
          <button onClick={completeHandler} className="mr-2">
            <FontAwesomeIcon icon={faCheck} size="2x" />
          </button>
          }
          <button onClick={deleteHandler} className="text-red-500">
            <FontAwesomeIcon icon={faTrash} size="2x" />
          </button>
        </div>
      </li>
    );
  }
  
  export default Todo;