import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgetPassword from './pages/Auth/ForgetPassword';

const Router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {path: "/auth/login", element: <Login />},
          {path: "/auth/register", element: <Register />},
          {path: "/auth/forgetpassword", element: <ForgetPassword />},
        ]
      }
    ]
  },
  
])

function App() {
  return (
    <RouterProvider router={Router} />
  );
};

export default App;

