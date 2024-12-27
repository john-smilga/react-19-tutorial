import { use, Suspense, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils';

type User = {
  id: string;
  name: string;
  email: string;
};

const Component = () => {
  const users = [] as User[];
  const [count, setCount] = useState(0);

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md mb-4'
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
      <h1 className='text-3xl font-bold mb-6'>Users</h1>
      <ul className='space-y-3'>
        {users.map((user) => (
          <li
            key={user.id}
            className='p-4 rounded-lg bg-white shadow hover:shadow-md transition-shadow'
          >
            <span className='font-medium'>{user.name}</span>
            <span className='text-gray-600 ml-2'>- {user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
