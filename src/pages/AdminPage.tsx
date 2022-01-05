import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  FolderOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

const { Content, Sider } = Layout;

const AdminPage = () => {
  const [isCollapsed, setIsisCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsisCollapsed(!isCollapsed);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={isCollapsed}
          onCollapse={toggleCollapse}
          collapsedWidth={"5em"}
          width={"15em"}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            zIndex: 11,
          }}
        >
          {/* <div className="logo" /> */}
          <Menu theme="dark" defaultSelectedKeys={[]} mode="inline">
            <Menu.Item key="1" icon={<FileTextOutlined />}>
              <span>Orders</span>
              <Link to={"orders"} />
            </Menu.Item>
            <Menu.Item key="2" icon={<FolderOutlined />}>
              <span>Archive</span>
              <Link to={"archive"} />
            </Menu.Item>
            <SubMenu
              key={"sub1"}
              icon={<SettingOutlined />}
              title="Site Settings"
            >
              <Menu.Item key="3" icon={<SettingOutlined />}>
                <span>Products</span>
                <Link to={"products"} />
              </Menu.Item>
              <Menu.Item key="4" icon={<SettingOutlined />}>
                <span>Biographies</span>
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingOutlined />}>
                <span>Contact Info</span>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: isCollapsed ? "5em" : "15em" }}
        >
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background">
              <Outlet />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default AdminPage;
