import React from 'react'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import './Header.css'

const { Header } = Layout

export default () => {
  return (
    <Header className="header">
      <div className="logo">Truck Management</div>
      <Menu mode="horizontal" defaultSelectedKeys={'home'}>
        <Menu.Item key="home">
          <a href="/">Home</a>
        </Menu.Item>
      </Menu>
    </Header>
  )
}
