import { TaskProvider } from './features/todo/provider/taskProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Route'
import "./App.css"
export default function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
}