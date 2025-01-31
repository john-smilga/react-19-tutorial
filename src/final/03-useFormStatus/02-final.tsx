import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  const btnStyles =
    'w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200';
  return (
    <button type='submit' className={btnStyles}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

const formAction = async (
  prevState: string,
  formData: FormData
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(formData);
  return 'success';
};

const FirstForm = () => {
  const [status, actionFunction] = useActionState<string, FormData>(
    formAction,
    'idle'
  );
  return (
    <form action={actionFunction} className={formStyles.container}>
      <input type='text' name='name' className={formStyles.input} />
      <SubmitButton />
      {status === 'success' && <p>Form submitted successfully</p>}
    </form>
  );
};

const SecondForm = () => {
  const [status, actionFunction] = useActionState<string, FormData>(
    formAction,
    'idle'
  );
  return (
    <form action={actionFunction} className={formStyles.container}>
      <input type='text' name='name' className={formStyles.input} />
      <SubmitButton />
      {status === 'success' && <p>Form submitted successfully</p>}
    </form>
  );
};

const ParentComponent = () => {
  return (
    <>
      <FirstForm />
      <SecondForm />
    </>
  );
};

const formStyles = {
  container: 'max-w-md mx-auto mt-24 p-8 space-y-4 bg-white rounded shadow',
  input:
    'w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
};

export default ParentComponent;
