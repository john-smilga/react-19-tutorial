import axios from 'axios';
import { useActionState } from 'react';
import { API_URL } from '../../utils';

const formAction = async (
  prevState: string,
  formData: FormData
): Promise<string> => {
  try {
    const data = Object.fromEntries(formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (data.name === 'bobo') {
      throw new Error('Name is invalid');
    }
    const response = await axios.post(`${API_URL}/users`, data);
    console.log(response.data);
    return 'success';
  } catch (error) {
    return 'error';
  }
};

const Component = () => {
  const [status, actionFunction, isPending] = useActionState<string, FormData>(
    formAction,
    'idle'
  );

  return (
    <form action={actionFunction} className={formStyles.container}>
      <input
        type='text'
        name='name'
        required
        className={formStyles.input}
        placeholder='name'
      />
      <input
        type='email'
        name='email'
        required
        className={formStyles.input}
        placeholder='email'
      />
      <button type='submit' className={formStyles.button} disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {status === 'error' && <p className='text-red-500 mt-2'>Error !!!</p>}
      {status === 'success' && (
        <p className='text-green-500 mt-2'>Success !!!</p>
      )}
    </form>
  );
};
export default Component;

const formStyles = {
  container: 'max-w-md mx-auto mt-24 p-8 space-y-4 bg-white rounded shadow',
  input:
    'w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
  button:
    'w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200',
};
