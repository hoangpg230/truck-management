import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import Footer from '../Footer'
import Header from '../Header'
import Menu from '../Menu'
import common from '../../utils/common'

const { Content, Sider } = Layout

export default () => {
  useEffect(() => {
    function handleResize() {
      common.setHeightMain()
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return function () {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <Layout>
      <Header></Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          className="site-layout-background "
          style={{
            padding: '24px 0',
            height: '100%',
          }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer />
    </Layout>
  )
}
