import {
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Card, message, Popover } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import "./BioContainer.css";
import { useAppSelector } from "../hooks";

export const BioContainer = () => {
  const bios = useAppSelector((state) => state.biographies.bios);

  return (
    <div className="bio-container flex-center">
      <div className="bio-container-col">
        {/* {window.innerHeight >= 700 && (
          <h1 className="bio-container-title">About Us</h1>
        )} */}
        <div className="bio-card-container">
          {bios.map((bio) => (
            <Card
              actions={[
                bio?.phone && (
                  <Popover
                    content="Call"
                    mouseEnterDelay={0.5}
                    placement="bottom"
                  >
                    <PhoneOutlined
                      key="call"
                      onClick={() => {
                        // copy to clipboard
                        navigator.clipboard.writeText(bio?.phone);
                        message.info({
                          content: "Phone number copied to clipboard",
                          className: "message",
                        });
                      }}
                    />
                  </Popover>
                ),
                <Popover
                  content="Send mail"
                  mouseEnterDelay={0.5}
                  placement="bottom"
                >
                  <MailOutlined
                    key="Mail"
                    onClick={() => {
                      window.open(`mailto:${bio?.email}`);
                    }}
                  />
                </Popover>,
                bio?.instagramLink && (
                  <Popover
                    content="Instagram"
                    mouseEnterDelay={0.5}
                    arrowPointAtCenter={false}
                    placement="bottom"
                  >
                    <InstagramOutlined
                      key="Mail"
                      onClick={() => {
                        window.open(bio?.instagramLink, "_blank");
                      }}
                    />
                  </Popover>
                ),
              ]}
            >
              <div className="card-header">
                <Avatar src={bio?.avatarUrl} />
                <Title level={4}>{bio?.name}</Title>
              </div>
              <div className="card-description">
                <Paragraph
                  ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                >
                  {bio?.desc}
                </Paragraph>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
