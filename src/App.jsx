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
import ProtectedRoute from './components/routes/ProtectedRoute.jsx';

function App() {

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
      path: "/register", element: (
        <Layout>
          <FormRegister />
        </Layout>
      )
    },

    {
      path: "/Patient", element: (
        <ProtectedRoute>
          <Layout>
            <Patient />
          </Layout>
        </ProtectedRoute>
      )
    },

    {
      path: "/Admin", element: (
        <ProtectedRoute>
          <Layout>
            <Admin />
          </Layout>
        </ProtectedRoute>
      )
    },

    {
      path: "/Doctor", element: (
        <ProtectedRoute>
          <Layout>
            <Doctor />
          </Layout>
        </ProtectedRoute>
      )
    },

    {
      path: "/Appointment", element: (
        <ProtectedRoute>
          <Layout>
            <Appointment />
          </Layout>
        </ProtectedRoute>

      )
    },

    {
      path: "/Contact", element: (
        <Layout>
          <FormContact />
        </Layout>
      )
    },
  ]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
