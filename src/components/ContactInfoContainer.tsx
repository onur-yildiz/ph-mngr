import { Descriptions } from "antd";
import Title from "antd/lib/typography/Title";
import { CSSProperties } from "react";
import "./ContactInfoContainer.css";

export const ContactInfoContainer = () => {
  const labelStyle: CSSProperties = { fontWeight: "bold" };
  const contentStyle: CSSProperties = { display: "block", textAlign: "right" };

  return (
    <div className="contact-info-container">
      <div>
        <Title className="contact-info-title" level={3}>
          FotoMoto
        </Title>
        <Descriptions
          labelStyle={labelStyle}
          contentStyle={contentStyle}
          className="contact-info-descriptions flex-column-center"
          title="Contact Info"
          layout="horizontal"
          column={1}
        >
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
          <Descriptions.Item label="Phone">(+90)555 888 4455</Descriptions.Item>
          <Descriptions.Item label="Email">test@test.com</Descriptions.Item>
        </Descriptions>
        <Descriptions
          labelStyle={labelStyle}
          contentStyle={contentStyle}
          className="contact-info-descriptions flex-column-center"
          title="Working Hours"
          layout="horizontal"
          column={1}
        >
          <Descriptions.Item label="Monday-Friday">
            08:30-17:30
          </Descriptions.Item>
          <Descriptions.Item label="Saturday">10:00-15:00</Descriptions.Item>
          <Descriptions.Item label="Sunday">Closed</Descriptions.Item>
        </Descriptions>
      </div>
      <iframe
        title="gmaps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1790.0308106198565!2d28.951980950616953!3d41.015169549160476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba20b90f18c1%3A0xb4305d428cf7a586!2sIstanbul%2039%20Notary!5e0!3m2!1sen!2str!4v1640981943406!5m2!1sen!2str"
        width="600"
        height="450"
        loading="lazy"
        style={{
          border: "2px solid white",
        }}
      />
    </div>
  );
};
