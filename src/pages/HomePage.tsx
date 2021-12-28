import { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const scrollSectionHeight = window.innerHeight * 1.5;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sections, setSections] = useState<Array<Element | null>>([]);
  const viewHeight = window.innerHeight;

  const scaleAnimatorX = (element: Element | null) => {
    if (!element) {
      return "";
    }

    const elementY = element.getBoundingClientRect().top;

    if (elementY > viewHeight) return "scaleX(0.4)";
    if (elementY <= viewHeight && elementY >= 0) {
      return `scaleX(${1 - elementY / viewHeight})`;
    }
    if (
      elementY <= viewHeight - scrollSectionHeight &&
      elementY >= -scrollSectionHeight
    ) {
      return `scaleX(${Math.min(
        1,
        (scrollSectionHeight + elementY) / viewHeight
      )})`;
    }
    return "";
  };

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
              fontSize: "10em",
              fontWeight: "bold",
              // opacity: 1.5 - scrollPosition / viewHeight,
              // color: `rgba(${scrollPosition}, ${scrollPosition}, ${scrollPosition}, ${1})`,
              transform: `translateY(${scrollPosition / 2}px) scale(${
                (viewHeight - scrollPosition / 2) / viewHeight
              })`,
            }}
          >
            slm cnm
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
              className="full-view flex-center"
              style={{
                transform: scaleAnimatorX(sections[0]),
                backgroundColor: "#EED5B7",
              }}
            >
              <div
                className="center-box"
                style={{
                  transform: `scaleX(${
                    sections[0] &&
                    sections[0].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[0].getBoundingClientRect().top <=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0.9
                  })`,
                  opacity:
                    sections[0] &&
                    sections[0].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[0].getBoundingClientRect().top >=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0,
                }}
              >
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate ratione magni consectetur quod pariatur impedit
                  facilis dignissimos in fugiat? Sed omnis vel cum dolorem
                  ducimus saepe magni, culpa ipsam quia?
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "10em", backgroundColor: "#0396A6" }}></div>
        <div
          id="hm-section-2"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#F25835" }}>
            <div
              className="full-view flex-center"
              style={{
                transform: scaleAnimatorX(sections[1]),
                backgroundColor: "#0396A6",
              }}
            >
              <div
                className="center-box"
                style={{
                  transform: `scaleX(${
                    sections[1] &&
                    sections[1].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[1].getBoundingClientRect().top >=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0.9
                  })`,
                  opacity:
                    sections[1] &&
                    sections[1].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[1].getBoundingClientRect().top >=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0,
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
        <div style={{ height: "10em", backgroundColor: "#F25835" }}></div>
        <div
          id="hm-section-3"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#29735E" }}>
            <div
              className="full-view flex-center"
              style={{
                transform: scaleAnimatorX(sections[2]),
                backgroundColor: "#F25835",
              }}
            >
              <div
                className="center-box"
                style={{
                  transform: `scaleX(${
                    sections[2] &&
                    sections[2].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[2].getBoundingClientRect().top >=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0.9
                  })`,
                  opacity:
                    sections[2] &&
                    sections[2].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[2].getBoundingClientRect().top >=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0,
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
        <div style={{ height: "10em", backgroundColor: "#29735E" }}></div>
        <div
          id="hm-section-4"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#F2836B" }}>
            <div
              className="full-view flex-center"
              style={{
                transform: scaleAnimatorX(sections[3]),
                backgroundColor: "#29735E",
              }}
            >
              <div
                className="center-box"
                style={{
                  transform: `scaleX(${
                    sections[3] &&
                    sections[3].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[3].getBoundingClientRect().top >=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0.9
                  })`,
                  opacity:
                    sections[3] &&
                    sections[3].getBoundingClientRect().top <=
                      scrollSectionHeight * 0.1 &&
                    sections[3].getBoundingClientRect().top >=
                      -scrollSectionHeight * 0.6
                      ? 1
                      : 0,
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
