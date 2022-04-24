import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import NotFound from './components/NotFound'
import Layout from './components/Layout'
import Dashboard from './features/Dashboard'
import truckApi from './api/truckApi'
import { useDispatch, useSelector } from 'react-redux'

const TruckManagement = React.lazy(() => import('./features/TruckManagement'))

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading... </div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                exact
                path="/"
                element={<Navigate to="dashboard" />}
              ></Route>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="truck/*" element={<TruckManagement />}></Route>
            </Route>
            <Route path="notfound" element={<NotFound />}></Route>
            <Route
              path="*"
              element={<Navigate to="notfound" replace />}
            ></Route>
          </Routes>
        </Router>
      </React.Suspense>
    </div>
  )
}

export default App
