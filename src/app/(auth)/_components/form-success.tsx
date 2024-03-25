import { IoMdCheckmark } from "react-icons/io";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-3 p-3 rounded-md bg-green-500/10 text-green-500">
      <IoMdCheckmark className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
