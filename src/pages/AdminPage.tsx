import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  FileTextOutlined,
  FolderOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import "./AdminPage.css";

const { Content, Sider } = Layout;

const AdminPage = () => {
  const [isCollapsed, setIsisCollapsed] = useState(window.innerWidth <= 768);
  const toggleCollapse = () => {
    setIsisCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsisCollapsed(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={isCollapsed}
          onCollapse={toggleCollapse}
          collapsedWidth={"3em"}
          width={"15em"}
          className="admin-side-menu"
        >
          {/* <div className="logo" /> */}
          <Menu theme="dark" defaultSelectedKeys={[]} mode="inline">
            <Menu.Item key="0" icon={<PlusOutlined />}>
              <span>New Order</span>
              <Link to={"orders/new"} />
            </Menu.Item>
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
                <Link to={"bios"} />
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingOutlined />}>
                <span>Contact Info</span>
                <Link to={"contactInfo"} />
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout
          className="admin-layout"
          style={{ marginLeft: isCollapsed ? "3em" : "15em" }}
        >
          <Content>
            <div className="admin-layout-background">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminPage;
