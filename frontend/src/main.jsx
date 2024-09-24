import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import App from './App';


// const router = createBrowserRouter(
//   [
//     {
//       children: [
//         {
//           path: "/",
//           element: <App />
//         },
//         {
//           path: "/solar-watch",
//           element: <MainPage />
//         },
//         {
//           path: "/registration",
//           element: <Registration />
//         },
//         {
//           path: "/login",
//           element: <Login />
//         },
//         {
//           path: "/admin/login",
//           element: <AdminLogin />
//         },
//         {
//           path: "/admin/solar-watch",
//           element: <AdminSolar />
//         }
//       ]
//     }
//   ]
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);