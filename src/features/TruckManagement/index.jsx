import React from 'react'
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  Link,
  Navigate,
} from 'react-router-dom'

import { Breadcrumb } from 'antd'

import Main from './pages/Main'
import Create from './pages/Create'

import common from '../../utils/common'

function TruckManagement(props) {
  const route = useLocation()
  const pathName = route.pathname.split('/')
  pathName.shift()

  function renderBreadcrumb() {
    if (pathName.length === 1) {
      return (
        <>
          <Breadcrumb.Item>
            <Link to={'/' + pathName[0]}>{common.jsUcfirst(pathName[0])}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </>
      )
    } else {
      return (
        <>
          <Breadcrumb.Item>
            <Link to={'/' + pathName[0]}>{common.jsUcfirst(pathName[0])}</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>{common.jsUcfirst(pathName[1])}</Breadcrumb.Item>
        </>
      )
    }
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>

        {renderBreadcrumb()}
      </Breadcrumb>

      <Outlet />
      <Routes>
        <Route path="" element={<Main />}></Route>
        <Route path="add" element={<Create />}></Route>
        <Route path="update/:id" element={<Create />}></Route>
        <Route path="*" element={<Navigate to={'/notfound'} replace />}></Route>
      </Routes>
    </>
  )
}

export default TruckManagement
