import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusSquareOutlined,
  HomeOutlined,
  UserOutlined,
  PlusOutlined,
  CheckOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();

  // user info from locstorage
  const user = JSON.parse(localStorage.getItem("auth")).user;
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    window.location.href = "/";
  };
  const clickToReload = () => {
    navigate("/home");
    //window.location.href = "/";
    window.location.reload();
  };
  let screenWidth = window.innerWidth;

  return (
    <Layout>
      <Sider
        className="sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth="80"
        breakpoint={"md"}
        style={{
          top: 0,
          position: "sticky",
          overflow: "auto",
          // maxWidth: !collapsed ? 80 : "100%",
          // minWidth: !collapsed ? 80 : "100%",
          // width: !collapsed ? 80 : "100%",
        }}
      >
        <div className="logo">
          {!collapsed && screenWidth < 840 ? <h1>VJ</h1> : <h1>VITE JOB</h1>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // style={{ marginRight: collapsed ? -30 : "auto" }}
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: "/home",
              icon: collapsed ? <HomeOutlined /> : null,
              label: (
                <Link
                  to="/home"
                  onClick={clickToReload}
                  style={{ marginRight: 40 }}
                >
                  Home
                </Link>
              ),
            },
            {
              key: `/user/${user._id}`,
              icon: collapsed ? <UserOutlined /> : null,
              label: <Link to={`/user/${user._id}`}>Profile</Link>,
            },
            {
              key: "/appliedjobs",
              icon: collapsed ? <PlusSquareOutlined /> : null,
              label: (
                <Link to="/appliedjobs" style={{ paddingRight: 20 }}>
                  Applied Jobs
                </Link>
              ),
            },
            {
              key: "/postjob",
              icon: collapsed ? <PlusOutlined /> : null,
              label: <Link to="/postjob">Post Job</Link>,
            },
            {
              key: "/posted",
              icon: collapsed ? <CheckOutlined /> : null,
              label: <Link to="/posted">Posted Job</Link>,
            },
            {
              key: "/logout",
              icon: collapsed ? <LogoutOutlined /> : null,
              label: <Link onClick={logout}>Logout</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: colorBgContainer,
            top: 0,
            position: "sticky",
            overflow: "auto",
            zIndex: 999,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            className="trigger"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: 16,
              width: 50,
              height: 50,
            }}
          />

          <div>
            {" "}
            <SearchFilter />
          </div>
          <div
            style={{
              display: collapsed && screenWidth > 820 ? "none" : "inline",
            }}
          ></div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
