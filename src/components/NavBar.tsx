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

export const NavBar: FC<{
  selected: number;
  affixed?: boolean;
}> = (props) => {
  const [selected, setSelected] = useState([""]);
  const [showTitle, setShowTitle] = useState(false);

  const handleClick = (e: any) => {
    let element: Element | null = null;
    switch (e.key) {
      case "0":
        element = document.querySelector("#hm-section-0")!;
        break;
      case "1":
        element = document.querySelector("#hm-section-1")!;
        break;
      case "2":
        element = document.querySelector("#hm-section-2")!;
        break;
      case "3":
        element = document.querySelector("#hm-section-3")!;
        break;
      case "4":
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
        setShowTitle(false);
      } else {
        setShowTitle(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSelected([props.selected.toString()]);
  }, [props.selected]);

  return (
    <>
      <div className="header-section unselectable">
        <Menu
          className={props.affixed ? "hs-menu affixed" : "hs-menu affix-static"}
          onClick={handleClick}
          selectedKeys={selected}
          mode="horizontal"
        >
          <Menu.Item className="hs-menu-item" key="0">
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
          <Menu.Item className="hs-menu-item" key="1">
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
          <Menu.Item className="hs-menu-item" key="2">
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
          <Menu.Item className="hs-menu-item" key="3">
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
          <Menu.Item className="hs-menu-item" key="4">
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
