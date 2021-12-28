import { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const scrollSectionHeight = 3000;
  const [, setScrollPosition] = useState(0);
  const [section1, setSection1] = useState<Element | null>(null);
  const [section2, setSection2] = useState<Element | null>(null);

  const scaleAnimatorX = (element: Element | null) => {
    if (!element) {
      return "";
    }

    const elementY = element.getBoundingClientRect().top;
    const viewHeight = window.innerHeight;

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
    setSection1(document.querySelector("#hm-section-1"));
    setSection2(document.querySelector("#hm-section-2"));

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
      <div id="hm-container" className="hide-scrollbar">
        <div className="full-view"></div>
        <div
          id="hm-section-1"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view">
            <div
              className="full-view flex-center"
              style={{
                transform: scaleAnimatorX(section1),
                backgroundColor: "green",
              }}
            >
              <div
                className="center-box"
                style={{
                  transform: `translateX(${
                    section1 && section1.getBoundingClientRect().top <= 0
                      ? 0
                      : "-5em"
                  })`,
                  opacity:
                    section1 && section1.getBoundingClientRect().top <= 0
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
        <div style={{ height: "10em" }} />
        <div
          id="hm-section-2"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view">
            <div
              className="full-view flex-center"
              style={{
                transform: scaleAnimatorX(section2),
                backgroundColor: "steelblue",
              }}
            >
              <div
                className="center-box"
                style={{
                  transform: `translateX(${
                    section2 && section2.getBoundingClientRect().top <= 0
                      ? 0
                      : "-5em"
                  })`,
                  opacity:
                    section2 && section2.getBoundingClientRect().top <= 0
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
