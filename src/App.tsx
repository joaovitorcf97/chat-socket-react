import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ChatPage from './pages/chatPage';
import HomePage from './pages/homePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
