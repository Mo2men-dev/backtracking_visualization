import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { GlobalStateProvider } from './context/state.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/n-queens",
        element: <App />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStateProvider>
        <RouterProvider router={router} />
    </GlobalStateProvider>
  </React.StrictMode>,
)
