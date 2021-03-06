import { Button, Descriptions, Empty, Space } from "antd";
import Search from "antd/lib/input/Search";
import Text from "antd/lib/typography/Text";
import "./SearchContainer.css";

import { useState } from "react";

export const SearchContainer = () => {
  const viewHeight = window.innerHeight;
  const [mockSearchData, setMockSearchData] = useState("");

  return (
    <div className="search-container">
      <Space direction="vertical" size={viewHeight / 10}>
        {!Number(mockSearchData) && (
          <Search
            placeholder="Search your order"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={(value) => setMockSearchData(value)}
          />
        )}
        {Number(mockSearchData) ? (
          <Descriptions
            className="search-result"
            extra={
              <Button type="primary" onClick={() => setMockSearchData("")}>
                Back
              </Button>
            }
            labelStyle={{
              fontWeight: "bold",
              backgroundColor: "whitesmoke",
            }}
            contentStyle={{
              backgroundColor: "white",
            }}
            column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
            bordered
          >
            <Descriptions.Item label="ID">{mockSearchData}</Descriptions.Item>
            <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Date of Order">
              2021-08-17T00:50:31Z
            </Descriptions.Item>
            <Descriptions.Item label="Estimated Delivery">
              2021-08-19T00:50:31Z
            </Descriptions.Item>
            <Descriptions.Item label="Status">Active</Descriptions.Item>
            <Descriptions.Item label="Contact Info">
              Telephone: 530-854-8767
              <br />
              Email: test@test.com
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <div
            className="empty-search-container"
            style={{
              opacity: mockSearchData.trim() === "" ? "0" : "1",
              backgroundColor: "white",
              padding: "1em",
            }}
          >
            <Empty
              description={
                <Text className="unselectable" type="secondary">
                  Not found
                </Text>
              }
            />
          </div>
        )}
      </Space>
    </div>
  );
};
