import {
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Popover } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import "./BioContainer.css";

export const BioContainer = () => {
  return (
    <div className="bio-container flex-center">
      <div className="bio-container-col">
        {window.innerHeight >= 700 && (
          <h1 className="bio-container-title">About Us</h1>
        )}
        <div>
          <Card
            actions={[
              <Popover content="Call" mouseEnterDelay={0.5} placement="bottom">
                <PhoneOutlined key="call" />
              </Popover>,
              <Popover
                content="Send mail"
                mouseEnterDelay={0.5}
                placement="bottom"
              >
                <MailOutlined key="Mail" />
              </Popover>,
              <Popover
                content="Instagram"
                mouseEnterDelay={0.5}
                arrowPointAtCenter={false}
                placement="bottom"
              >
                <InstagramOutlined key="Mail" />
              </Popover>,
            ]}
          >
            <div className="card-header">
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Title level={4}>Card Title</Title>
            </div>
            <div className="card-description">
              <Text type="secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
                nam nihil provident culpa incidunt nobis rerum cum, fuga quos
                adipisci earum eveniet repudiandae itaque molestias ut magnam
                vel, atque sit?Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Quis nam nihil provident culpa incidunt nobis
                rerum cum, fuga quos adipisci earum eveniet repudiandae itaque
                molestias ut magnam vel, atque sit?Lorem ipsumLorem ipsum dolor,
                sit amet consectetur adipisicing elit. Quis nam nihil provident
                culpa incidunt nobis rerum cum, fuga quos adipisci earum eveniet
                repudiandae itaque molestias ut magnam vel, atque sit?Lorem
                ipsum dolor, sit amet consectetur adipisicing elit. Quis nam
                nihil provident culpa atque sit?
              </Text>
            </div>
          </Card>
          <Card
            actions={[
              <Popover content="Call" mouseEnterDelay={0.5} placement="bottom">
                <PhoneOutlined key="call" />
              </Popover>,
              <Popover
                content="Send mail"
                mouseEnterDelay={0.5}
                placement="bottom"
              >
                <MailOutlined key="Mail" />
              </Popover>,
              <Popover
                content="Instagram"
                mouseEnterDelay={0.5}
                arrowPointAtCenter={false}
                placement="bottom"
              >
                <InstagramOutlined key="Mail" />
              </Popover>,
            ]}
          >
            <div className="card-header">
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Title level={4}>Card Title</Title>
            </div>
            <div className="card-description">
              <Text type="secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
                nam nihil provident culpa incidunt nobis rerum cum, fuga quos
                adipisci earum eveniet repudiandae itaque molestias ut magnam
                vel, atque sit?Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Quis nam nihil provident culpa incidunt nobis
                rerum cum, fuga quos adipisci earum eveniet repudiandae itaque
                molestias ut magnam vel, atque sit?Lorem ipsumLorem ipsum dolor,
                sit amet consectetur atque sit?
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
