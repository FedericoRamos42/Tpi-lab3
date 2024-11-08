import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout/Layout.jsx';
import Login from './components/Form/FormLogin';
import FormRegister from './components/Form/FormRegister.jsx';
import Patient from './views/Patient.jsx';
import Doctor from './views/Doctor.jsx';
import FormContact from './components/Form/FormContact.jsx';
import Home from './components/Home.jsx';
import Appointment from './views/Appointment.jsx';
import Admin from './views/Admin.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

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
    {
      path: "/register",element:(
        <Layout>
          <FormRegister />
        </Layout>
      )
    },

     {
      path: "/Contact",element:(
        <Layout>
          <FormContact/>
        </Layout>
      )
    },

    {
      path: "/Admin",element:(
        <Layout>
          <Admin/>
        </Layout>
      )
    },
    {
      path: "/Doctor",element:(
        <Layout>
          <Doctor/>
        </Layout>
      )
    },
    {
      path: "/Appointment",element:(
        <Layout>
          <Appointment/>
        </Layout>
      )
    }



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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </>
  )
}

export default App
