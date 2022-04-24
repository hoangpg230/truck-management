import React, { useEffect } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

export default () => {
  const route = useLocation()
  const pathName = route.pathname.split('/')
  pathName.shift()
  const path = pathName.join('')
  return (
    <Menu
      style={{
        width: 200,
        height: '100%',
      }}
      defaultSelectedKeys={[path]}
      // defaultOpenKeys={[path + '-management']}
      mode="inline"
    >
      <Menu.Item key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.SubMenu
        key="truck-management"
        title={
          <span>
            <span>Truck management</span>
          </span>
        }
      >
        <Menu.Item key="truck">
          <Link to="/truck">Truck List </Link>
        </Menu.Item>
        <Menu.Item key="truckadd">
          <Link to="/truck/add">Truck Add </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
