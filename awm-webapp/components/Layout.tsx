/** @jsx jsx */
import {jsx, Image, Flex, Box, Text} from 'theme-ui'
import {Layout, Menu, Avatar, Dropdown, Badge, Button} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  UpOutlined,
  BellOutlined,
  CalendarOutlined,
  ProjectOutlined,
  CopyOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import React, {useState} from 'react'
import {WithTranslation, withTranslation, Link} from 'i18n'
import {useAuth} from '@providers/Auth'
import {setCookie} from 'nookies'
import UKFLag from '../assets/svg/uk.svg'
import VNFLag from '../assets/svg/vietnam.svg'

const {Header, Sider, Content} = Layout

const LayoutComponent: React.FunctionComponent<WithTranslation> = ({
  t,
  children,
  i18n,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>(i18n.language)
  const {auth, logout} = useAuth()

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const handleDropdownVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible)
  }

  const changeLocale = () => {
    const newLanguage = language === 'vi' ? 'en' : 'vi'
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    setCookie(null, 'next-i18next', newLanguage, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      secure: true,
    })
  }

  const DropdownMenuItem = (
    <Menu>
      <Menu.Item key='info'>
        <a href='#'>
          <Flex>
            <Avatar
              sx={{
                mr: 2,
                mt: 1,
              }}
              src='https://www.gravatar.com/avatar/86b862d65a8e66b9db99136cd16ff394?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault1.png&amp;secure=true'
            />
            <Box>
              <Text
                sx={{
                  fontSize: 2,
                }}>
                {auth?.name}
              </Text>
              <Text
                sx={{
                  fontSize: 0,
                }}>
                {auth?.email}
              </Text>
            </Box>
          </Flex>
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='my_profile'>
        <Link
          href={{
            pathname: '/users/[id]/profile',
            query: {
              slug: auth?.id,
            },
          }}
          as={`/users/${auth?.id}/profile`}>
          <a>{t('my_profile')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item key='settings'>
        <Link
          href={{
            pathname: '/users/[id]/settings',
            query: {
              slug: auth?.id,
            },
          }}
          as={`/users/${auth?.id}/settings`}>
          <a>{t('settings')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item key='sign_out'>
        <Button
          type='link'
          onClick={() => logout()}
          sx={{
            p: 0,
            color: 'rgba(0, 0, 0, 0.65)',
            height: 'auto',
            ':hover': {
              color: 'rgba(0, 0, 0, 0.65)',
            },
          }}>
          {t('sign_out')}
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Layout
      hasSider
      sx={{
        minHeight: '100vh',
      }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Box
          sx={{
            margin: '16px',
          }}>
          <Link href='/'>
            <a>
              <Image src='/logo.png' />
            </a>
          </Link>
        </Box>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['working_calendar']}>
          <Menu.Item key='working_calendar' icon={<CalendarOutlined />}>
            <Link href='/' as='/'>
              <a>{t('working_calendar')}</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='stats' icon={<ProjectOutlined />}>
            {t('stats')}
          </Menu.Item>
          <Menu.Item key='3' icon={<CopyOutlined />}>
            <Link href='/request' as='/request'>
              <a>{t('req')}</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          sx={{
            bg: 'white',
            px: 4,
            boxShadow: 'sm',
          }}>
          <Flex
            sx={{
              justifyContent: 'space-between',
            }}>
            {collapsed ? (
              <MenuUnfoldOutlined
                sx={{
                  variant: 'buttons.menuTrigger',
                }}
                onClick={toggle}
              />
            ) : (
              <MenuFoldOutlined
                sx={{
                  variant: 'buttons.menuTrigger',
                }}
                onClick={toggle}
              />
            )}
            <Flex
              sx={{
                alignItems: 'center',
              }}>
              <Box>
                <Badge count={5}>
                  <BellOutlined
                    sx={{
                      fontSize: 5,
                      verticalAlign: 'middle',
                    }}
                  />
                </Badge>
              </Box>
              <Box
                sx={{
                  ml: 5,
                }}>
                <SettingOutlined
                  sx={{
                    fontSize: 5,
                    verticalAlign: 'middle',
                  }}
                />
              </Box>
              <Box
                sx={{
                  ml: 5,
                }}>
                {language === 'vi' ? (
                  <Button
                    type='link'
                    onClick={changeLocale}
                    sx={{
                      p: 0,
                    }}>
                    <VNFLag
                      sx={{
                        variant: 'icons.countryFlag',
                      }}
                    />
                  </Button>
                ) : (
                  <Button
                    type='link'
                    onClick={changeLocale}
                    sx={{
                      p: 0,
                    }}>
                    <UKFLag
                      sx={{
                        variant: 'icons.countryFlag',
                      }}
                    />
                  </Button>
                )}
              </Box>
              <Dropdown
                arrow
                overlay={DropdownMenuItem}
                trigger={['click']}
                onVisibleChange={handleDropdownVisibleChange}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Box
                  sx={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    ml: 5,
                  }}>
                  <Avatar
                    src='https://www.gravatar.com/avatar/86b862d65a8e66b9db99136cd16ff394?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault1.png&amp;secure=true'
                    size='large'
                  />
                  {dropdownVisible ? (
                    <UpOutlined
                      sx={{
                        fontSize: '12px',
                        marginLeft: '8px',
                        fontWeight: 'bold',
                        verticalAlign: 'middle',
                      }}
                    />
                  ) : (
                    <DownOutlined
                      sx={{
                        fontSize: '12px',
                        marginLeft: '8px',
                        fontWeight: 'bold',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                </Box>
              </Dropdown>
            </Flex>
          </Flex>
        </Header>
        <Content
          sx={{
            mt: 5,
            mx: 4,
            p: 5,
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default withTranslation('layout')(LayoutComponent)
