import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Form/FormLogin';
import EditProfile from './components/EditProfile';
import Patient from './views/Patient';
import Doctor from './views/Doctor';
import Admin from './views/Admin.Jsx';


function App() {

  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = () => {
    setIsLogged(true);
  }

  const router = createBrowserRouter([
    { path: "/login", element: <Login onLogin={loginHandler} /> },
    { path: "/profile", element: <EditProfile /> },
    { path: "/patient", element: <Patient /> },
    { path: "/doctor", element: <Doctor /> },
    {path: "/admin" ,element: <Admin/>}


    /*{ path: "/comments", element: (
      <Protected isSignedIn={isLogged}>
        </Protected></>
      </Protected>
    )},*/
    //{ path: "*", element: <NotFound/>}
  ]);
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
