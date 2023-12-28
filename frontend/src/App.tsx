import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

const Router = createBrowserRouter([
  {path: "", element: <Home /> }
])

function App() {
  return (
    <RouterProvider router={Router} />
  );
};

export default App;

