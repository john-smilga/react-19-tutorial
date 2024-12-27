import {
  useEffect,
  useState,
  useActionState,
  useOptimistic,
  useTransition,
} from 'react';
import { useFormStatus } from 'react-dom';
import axios from 'axios';
import { API_URL } from '../../utils';

type FormState = {
  error: string | null;
  success: boolean;
};

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none disabled:bg-blue-300'
    >
      {pending ? 'Adding...' : 'Add'}
    </button>
  );
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [formState, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      const text = formData.get('todo') as string;
      if (!text?.trim()) {
        return { error: 'Todo text is required !!!', success: false };
      }
      try {
        // Actual API call
        await axios.post(`${API_URL}/todos`, { text, completed: false });
        await fetchTodos(); // Refresh the list
        return { error: null, success: true };
      } catch (error) {
        return { error: 'Failed to add todo', success: false };
      }
    },
    { error: null, success: false }
  );

  const fetchTodos = async () => {
    const response = await axios.get(`${API_URL}/todos`);
    setTodos(response.data);
  };

  const toggleTodo = (todo: Todo) => todo;

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>Todo List</h1>

      <ul className='space-y-3 mb-6'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='flex items-center gap-3 p-2 bg-gray-50 rounded'
          >
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => toggleTodo(todo)}
              className='h-5 w-5 rounded border-gray-300'
            />
            <span
              className={`flex-1 ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {todo.id} {todo.text}
            </span>
          </li>
        ))}
      </ul>

      <form className='flex gap-2'>
        <input
          type='text'
          name='todo'
          placeholder='Add new todo...'
          className='flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
        />
        <SubmitButton />
        {formState.success && <p className='mt-2 text-green-500'>Success!!!</p>}
        {formState.error && (
          <p className='mt-2 text-red-500'>{formState.error}</p>
        )}
      </form>
    </div>
  );
};

export default TodoList;
