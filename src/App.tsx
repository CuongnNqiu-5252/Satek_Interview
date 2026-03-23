import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Header } from './components/header'
import './App.css'
import { Sidebar } from './components/sideBar'
import TaskCard from './components/taskCard'
import { TaskProvider } from './features/todo/provider/taskProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Route'
export default function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
}