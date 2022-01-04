import {
  AppstoreOutlined,
  FileSearchOutlined,
  HomeOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Menu, Popover } from "antd";
import { FC, useEffect, useState } from "react";
import "./NavBar.css";

export const NavBar: FC<{ affixed?: boolean }> = (props) => {
  const [selected, setSelected] = useState(["0"]);
  const [showTitle, setShowTitle] = useState(false);

  const handleClick = (e: any) => {
    let element: Element | null = null;
    switch (e.key) {
      case "home":
        element = document.querySelector("#hm-section-0")!;
        break;
      case "search":
        element = document.querySelector("#hm-section-1")!;
        break;
      case "products":
        element = document.querySelector("#hm-section-2")!;
        break;
      case "bio":
        element = document.querySelector("#hm-section-3")!;
        break;
      case "contact":
        element = document.querySelector("#hm-section-4")!;
        break;
      default:
        break;
    }
    element?.scrollIntoView({ behavior: "smooth" });
    setSelected(e.key);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        console.log("only icons");
        setShowTitle(false);
      } else {
        setShowTitle(true);
      }
    };

    handleResize();
    // window.addEventListener("mouse", handleResize);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="header-section">
        <Menu
          className={props.affixed ? "hs-menu affixed" : "hs-menu affix-static"}
          onClick={handleClick}
          selectedKeys={selected}
          mode={showTitle ? "horizontal" : "vertical"}
        >
          <Menu.Item className="hs-menu-item" key="home">
            <Popover
              content="Home"
              trigger={"hover"}
              placement="bottom"
              mouseEnterDelay={0.5}
            >
              <HomeOutlined />
            </Popover>
            {showTitle && " Home"}
          </Menu.Item>
          <Menu.Item className="hs-menu-item" key="search">
            <Popover
              content="Search Orders"
              trigger={"hover"}
              placement="bottom"
              mouseEnterDelay={0.5}
            >
              <FileSearchOutlined />
            </Popover>
            {showTitle && " Search Orders"}
          </Menu.Item>
          <Menu.Item className="hs-menu-item" key="products">
            <Popover
              content="Products"
              trigger={"hover"}
              placement="bottom"
              mouseEnterDelay={0.5}
            >
              <AppstoreOutlined />
            </Popover>
            {showTitle && " Products"}
          </Menu.Item>
          <Menu.Item className="hs-menu-item" key="bio">
            <Popover
              content="About Us"
              trigger={"hover"}
              placement="bottom"
              mouseEnterDelay={0.5}
            >
              <IdcardOutlined />
            </Popover>
            {showTitle && " About Us"}
          </Menu.Item>
          <Menu.Item className="hs-menu-item" key="contact">
            <Popover
              content="Contact Info"
              trigger={"hover"}
              placement="bottom"
              mouseEnterDelay={0.5}
            >
              <InfoCircleOutlined />
            </Popover>
            {showTitle && " Contact Info"}
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};
