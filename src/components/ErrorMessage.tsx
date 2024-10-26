type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className="error-message">Error: {message}</p>;
};

export default ErrorMessage;
