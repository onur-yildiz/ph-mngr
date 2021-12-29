import { Button, Descriptions, Empty, Space } from "antd";
import Search from "antd/lib/input/Search";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const scrollSectionHeight = window.innerHeight * 2;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sections, setSections] = useState<Array<Element | null>>([]);
  const viewHeight = window.innerHeight;

  const [mockSearchData, setMockSearchData] = useState("");

  const topPosAnimator = (element: Element | null) => {
    if (!element) {
      return "";
    }

    const elementY = element.getBoundingClientRect().top;

    if (elementY <= viewHeight && elementY >= 0) {
      const x = (elementY / viewHeight) * 50;
      return -x + "%";
    }
    if (
      elementY <= viewHeight - scrollSectionHeight &&
      elementY >= -scrollSectionHeight
    ) {
      const x =
        (1 -
          (elementY + scrollSectionHeight) /
            (scrollSectionHeight - viewHeight)) *
        50;

      return x + "%";
    }
    return "0";
  };

  // const heightAnimator = (element: Element | null) => {
  //   if (!element) {
  //     return "";
  //   }

  //   const elementY = element.getBoundingClientRect().top;

  //   if (elementY <= viewHeight && elementY >= 0) {
  //     return (1 - elementY / viewHeight) * 100 + "vh";
  //   }
  //   if (
  //     elementY <= viewHeight - scrollSectionHeight &&
  //     elementY >= -scrollSectionHeight
  //   ) {
  //     return scrollSectionHeight + elementY;
  //   }
  //   return "";
  // };

  useEffect(() => {
    setSections([
      document.querySelector("#hm-section-1"),
      document.querySelector("#hm-section-2"),
      document.querySelector("#hm-section-3"),
      document.querySelector("#hm-section-4"),
    ]);

    const container = document.querySelector("#hm-container")!;

    const handleScroll = () => {
      setScrollPosition(container?.scrollTop);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const Kart = () => (
  //   <div className="flex-center" style={{ height: "100vh" }}>
  //     <Card
  //       hoverable
  //       cover={
  //         <img
  //           alt="example"
  //           src="https://i0.wp.com/codemyui.com/wp-content/uploads/2016/10/parallex-effect-sections-1.gif"
  //         />
  //       }
  //     >
  //       <Meta title="Europe Street beat" description="www.instagram.com" />
  //     </Card>
  //   </div>
  // );

  return (
    <>
      <div
        id="hm-container"
        className="hide-scrollbar"
        // style={{ backgroundColor: "#0a2342" }}
      >
        <div
          className="full-view flex-center"
          style={{ backgroundColor: "#0396A6" }}
        >
          <div
            style={{
              // opacity: 1.5 - scrollPosition / viewHeight,
              // color: `rgba(${scrollPosition}, ${scrollPosition}, ${scrollPosition}, ${1})`,
              transform: `translateY(${scrollPosition / 2}px) scale(${
                (viewHeight - scrollPosition / 2) / viewHeight
              })`,
            }}
          >
            <Title className="unselectable">FotoMoto</Title>
          </div>
        </div>
        <div
          id="hm-section-1"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#0396A6" }}>
            <div
              className="full-view flex-center section-wrapper"
              style={{
                // height: heightAnimator(sections[0]),
                backgroundColor: "#EED5B7",
              }}
            >
              <div
                className="section-box flex-column hide-scrollbar"
                style={{
                  overflowY: "scroll",
                  transform: `translateY(${topPosAnimator(sections[0])})`,
                  padding: "1em",
                }}
              >
                <Space direction="vertical" size={viewHeight / 10}>
                  {!Number(mockSearchData) && (
                    <Search
                      placeholder="Search your order"
                      allowClear
                      enterButton="Search"
                      size="large"
                      onSearch={(value) => setMockSearchData(value)}
                    />
                  )}
                  {Number(mockSearchData) ? (
                    <Descriptions
                      title="User Info"
                      extra={
                        <Button
                          type="primary"
                          onClick={() => setMockSearchData("")}
                        >
                          Back
                        </Button>
                      }
                      labelStyle={{
                        fontWeight: "bold",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                      }}
                      column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
                      bordered
                    >
                      <Descriptions.Item label="ID">
                        {mockSearchData}
                      </Descriptions.Item>
                      <Descriptions.Item label="Name">
                        Zhou Maomao
                      </Descriptions.Item>
                      <Descriptions.Item label="Date of Order">
                        2021-08-17T00:50:31Z
                      </Descriptions.Item>
                      <Descriptions.Item label="Estimated Delivery">
                        2021-08-19T00:50:31Z
                      </Descriptions.Item>
                      <Descriptions.Item label="Status">
                        Active
                      </Descriptions.Item>
                      <Descriptions.Item label="Contact Info">
                        Telephone: 530-854-8767
                        <br />
                        Email: test@test.com
                      </Descriptions.Item>
                    </Descriptions>
                  ) : (
                    mockSearchData.trim() !== "" && (
                      <Empty
                        description={
                          <Text className="unselectable" type="secondary">
                            Not found
                          </Text>
                        }
                      />
                    )
                  )}
                </Space>
              </div>
            </div>
          </div>
        </div>
        <div
          id="hm-section-2"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#F25835" }}>
            <div
              className="full-view flex-center section-wrapper"
              style={{
                // height: heightAnimator(sections[1]),
                backgroundColor: "#0396A6",
              }}
            >
              <div className="section-box flex-center">
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo dignissimos, quam exercitationem saepe quo porro
                  molestias incidunt eum atque earum mollitia necessitatibus,
                  facilis eligendi expedita voluptatem doloribus aliquid quae
                  quia?
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          id="hm-section-3"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#0396A6" }}>
            <div
              className="full-view flex-center section-wrapper"
              style={{
                // height: heightAnimator(sections[2]),
                backgroundColor: "#F25835",
              }}
            >
              <div
                className="section-box flex-center"
                style={{
                  transform: `translateY(${topPosAnimator(sections[2])})`,
                }}
              >
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  natus impedit temporibus, rem voluptate ipsa hic voluptatem
                  velit maxime, a aut fuga minima enim porro eaque molestiae
                  sint sequi molestias.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          id="hm-section-4"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#F2836B" }}>
            <div
              className="full-view flex-center section-wrapper"
              style={{
                // height: heightAnimator(sections[3]),
                backgroundColor: "#0396A6",
              }}
            >
              <div
                className="section-box flex-center"
                style={{
                  transform: `translateY(${topPosAnimator(sections[3])})`,
                }}
              >
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  natus impedit temporibus, rem voluptate ipsa hic voluptatem
                  velit maxime, a aut fuga minima enim porro eaque molestiae
                  sint sequi molestias.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
