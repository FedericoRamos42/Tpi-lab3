import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout/Layout.jsx';
import Login from './components/Form/FormLogin';
import EditProfile from './components/EditProfile';
import Patient from './views/Patient.jsx';
import Doctor from './views/Doctor.jsx';

import Home from './components/Home.jsx';
import Appointment from './views/Appointment.jsx';
import Admin from './views/Admin.jsx';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = () => {
    setIsLogged(true);
  }

  const router = createBrowserRouter([
    {
      path: "/", element: (
        <Layout>
          <Home />
        </Layout>
      )
    },
    {
      path: "/login", element: (
        <Layout>
          <Login />
        </Layout>
      )
    },
    {
      path: "/Patient", element: (
        <Layout>
          <Patient />
        </Layout>
      )
    },
    {
      path: "/login", element: (
        <Layout>
          <Login />
        </Layout>
      )
    },
/*     {
      path: "/comments", element: (
        <Protected>
          <Layout>
            <Comments />
          </Layout>
        </Protected>
      )
    }, */
    /* {
      path: "/book/:id", element: (
        <Layout>
          <BookDetails />
        </Layout>
      )
    },
    {
      path: "*", element: (
        <Layout>
          <NotFound />
        </Layout>
      )
    } */
  ]);

  /*   const router = createBrowserRouter([
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login onLogin={loginHandler} /> },
      { path: "/profile", element: <EditProfile /> },
      { path: "/patient", element: <Patient /> },
      { path: "/doctor", element: <Doctor /> },
      {path: "/admin" ,element: <Admin/> },
      {path: "/appointment" ,element: <Appointment/>}
  
  
  
      /*{ path: "/comments", element: (
        <Protected isSignedIn={isLogged}>
          </Protected></>
        </Protected>
      )},
      //{ path: "*", element: <NotFound/>}
    ]); */

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
