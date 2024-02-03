import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex justify-between p-8 shadow-lg ">
        <div>
          <h1  className="text-2xl">Auth project</h1>
        </div>
        <div>
          <ul className="flex justify-evenly">
            <li className="me-4">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="me-4">
              <Link to={"/login"}>Login</Link>
            </li>
            <li className="me-4">
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li className="me-4">
              <Link to={"/about"}>About</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
