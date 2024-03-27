import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <h1>Oppps, page not found!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </>
  );
};

export default ErrorPage;
