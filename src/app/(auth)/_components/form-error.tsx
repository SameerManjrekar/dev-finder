import { FaExclamationTriangle } from "react-icons/fa";

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center p-3 gap-x-3 rounded-md text-red-500 bg-red-500/10">
      <FaExclamationTriangle className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
