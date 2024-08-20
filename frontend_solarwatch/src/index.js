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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
