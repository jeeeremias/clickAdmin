/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, Fragment } from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Dropdown, Layout, Menu, Alert } from 'antd'
import {
  HomeOutlined,
  DownOutlined,
  LogoutOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EuroCircleOutlined,
} from '@ant-design/icons'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import logo from '../assets/Logo-site.png'
import { useAuth } from '../contexts/auth/AuthContext'
import { useAltIntl, Message } from '../intlConfig'
import FeedbackButton from '../components/common/Feedback/Button'

const { Header, Content, Footer, Sider } = Layout

const AdminPage: FC<RouteComponentProps> = ({ children }) => {
  const intl = useAltIntl()
  const [{ user, userDb }] = useAuth()

  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/')
      })
  }, [])

  const showDevAlert = window?.location.hostname === 'localhost'

  return (
    <Fragment>
      {showDevAlert && (
        <Alert
          type="warning"
          message={intl.formatMessage({ id: 'admin.onDevMode' })}
          className="tc"
        />
      )}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ backgroundColor: '#72E298' }}
        >
          <div className="flex justify-center">
            <div>
              <img
                src={logo}
                alt="Alt Zap"
                className="pa2"
                style={{ maxHeight: '75%' }}
              />
            </div>
          </div>
          <Menu
            className=""
            mode="inline"
            style={{ borderRadius: 15 }}
            defaultSelectedKeys={['1']}
          >
            <Menu.Item
              key="1"
              onClick={() => navigate('/app/tenants')}
              icon={<HomeOutlined />}
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Message id="admin.tenants" />
            </Menu.Item>

            <Menu.Item
              key="2"
              onClick={() => navigate('/app/')}
              icon={<PieChartOutlined />}
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Message id="admin.relatorio" />
              <Message id="admin.breve" />
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => navigate('/app/')}
              icon={<EuroCircleOutlined />}
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Message id="admin.faturamento" />
              <Message id="admin.breve" />
            </Menu.Item>
            {/* <Menu.Item
              key="2"
              onClick={() => window.open('https://docs.alt.app.br', '_blank')}
              icon={<FileTextOutlined />}
            >
              <Message id="admin.docs" />
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background flex justify-end"
            style={{ padding: 0, backgroundColor: '#172356' }}
          >
            {user && (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <button
                        className="bg-transparent bn pointer"
                        tabIndex={0}
                        onKeyPress={() => logout()}
                        onClick={() => logout()}
                      >
                        <Message id="adming.logout" /> <LogoutOutlined />
                      </button>
                    </Menu.Item>
                  </Menu>
                }
                className="mr3"
              >
                <a
                  href="#"
                  className="ant-dropdown-link f5 f4-l white"
                  onClick={(e) => e.preventDefault()}
                  onKeyPress={(e) => e.preventDefault()}
                >
                  <span className="mr2">
                    {userDb?.name ?? user.displayName}
                  </span>
                  <DownOutlined />
                </a>
              </Dropdown>
            )}
          </Header>
          <Content>{children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Click Entregas ©2021 -{' '}
            <a
              target="_black"
              rel="noopener noreferer"
              href="https://clickentregas.pt"
            >
              <Message id="adming.githubLink" />
            </a>
          </Footer>
        </Layout>
      </Layout>
      <FeedbackButton />
    </Fragment>
  )
}

export default AdminPage
