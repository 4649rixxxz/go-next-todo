import { useState, useEffect } from 'react';
import type { TodoModel } from '@/models/todo';
import Form from "@/components/Form";
import TodoList from "@/components/TodoList";
import { fetchTodos } from '@/features/todo';
import { STATUS } from '@/consts/filter';
import { logout } from '@/features/auth';
import { useRouter } from 'next/router';
import NoSSRWrapper from '@/components/NoSSRWrapper';
import MemberAuth from '@/middlewares/MemberAuth';

const Home = () => {
  const [filterStatus, setFilterStatus] = useState<string>(STATUS.all);
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const res = await fetchTodos(filterStatus);
        const {data} = res
        setTodos(data.todos)
      } catch(e) {
        console.log(e);
      }
    }
    fetchFunction();
  }, [filterStatus]);

  const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout();
      router.replace('/login');
    } catch (e: unknown) {
      console.log(e);
    }
  }
  
  return (
    <NoSSRWrapper>
      <MemberAuth>
        <div className='min-h-screen bg-gray-100 sm:px-6'>
          <div className="sm:mx-auto sm:w-full sm:max-w-md pt-12 pb-5">
            <div className='text-right pb-5'>
              <button onClick={logoutHandler} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                ログアウト
              </button>
            </div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
              ToDo List
            </h2>
            <Form
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              setTodos={setTodos}
            />
          </div>
          <TodoList
            filterStatus={filterStatus}
            todos={todos} 
            setTodos={setTodos} 
          />
        </div>
      </MemberAuth>
    </NoSSRWrapper>
  );
}

export default Home;