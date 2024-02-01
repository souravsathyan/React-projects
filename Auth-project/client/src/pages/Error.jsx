import { useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  return (
    <>
      <div>Error</div>
      <p>{error.status}</p>
      <p>{error.statusText}</p>
    </>
  );
};

export default Error;
