import axios from 'axios';
import { API_URL } from '../../utils';

const Component = () => {
  // const formAction = async (formData: FormData): Promise<void> => {
  //   const name = formData.get('name') as string;
  //   const email = formData.get('email') as string;
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   const response = await axios.post(`${API_URL}/users`, { name, email });
  //   console.log(response.data);
  // };
  const formAction = async (formData: FormData): Promise<void> => {
    const data = Object.fromEntries(formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.post(`${API_URL}/users`, data);
    console.log(response.data);
  };
  return (
    <form action={formAction} className={formStyles.container}>
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
      <button type='submit' className={formStyles.button}>
        Submit
      </button>
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
