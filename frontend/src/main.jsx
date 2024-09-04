import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import Registration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminSolar from './Pages/Admin/AdminSolar';
import StartPage from './Pages/StarterPage/StartPage';
import { AuthProvider } from './AuthProvider';

const router = createBrowserRouter(
  [
    {
      children: [
        {
          path: "/",
          element: <StartPage />
        },
        {
          path: "/solar-watch",
          element: <MainPage />
        },
        {
          path: "/registration",
          element: <Registration />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/admin/login",
          element: <AdminLogin />
        },
        {
          path: "/admin/solar-watch",
          element: <AdminSolar />
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider >
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)