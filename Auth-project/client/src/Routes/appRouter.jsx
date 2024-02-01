import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Error from "../pages/Error";

export const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:"/about",
          element:<About/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/profile",
          element:<Profile/>
        }
      ],
      errorElement:<Error/>
    }
  ])