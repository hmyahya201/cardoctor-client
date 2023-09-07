import { createBrowserRouter } from "react-router-dom";
import Main from "../Layoutes/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import About from "../pages/Home/About/About";
import SignUp from "../pages/SignUp/SignUp";
import CheckOut from "../pages/CheckOut/CheckOut";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>   
        },
        {
          path:'login',
          element: <Login/>
        },
        {
          path:'signup',
          element: <SignUp/>
        },
        {
          path: 'checkout/:id',
          element: <CheckOut/>,
          loader: ({params})=>fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path:'about',
          element: <About/>
        }
      ]
    },
  ]);

  export default router