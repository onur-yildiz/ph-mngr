import { useEffect, useState } from "react";
import "./HomePage.css";
import { ProductCarousel } from "../components/ProductCarousel";
import { SearchContainer } from "../components/SearchContainer";
import { BioContainer } from "../components/BioContainer";
import { ContactInfoContainer } from "../components/ContactInfoContainer";

const HomePage = () => {
  const scrollSectionHeight = window.innerHeight * 2;
  const viewHeight = window.innerHeight;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [sections, setSections] = useState<Array<Element | null>>([]);

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

  return (
    <>
      <div
        id="hm-container"
        className="hide-scrollbar"
        // style={{ backgroundColor: "#0a2342" }}
      >
        <div
          className="full-view flex-center photo-bg"
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
            <p
              style={{ fontSize: "5em", color: "white", fontWeight: "bold" }}
              className="unselectable"
            >
              FotoMoto
            </p>
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
                backgroundColor: "#77ba99",
              }}
            >
              <div
                className="section-box flex-center hide-scrollbar search-bg"
                style={{
                  overflowY: "scroll",
                  transform: `translateY(${topPosAnimator(sections[0])})`,
                  padding: "1em",
                }}
              >
                <SearchContainer />
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
          <div
            className="full-view sticky-view flex-center section-wrapper carousel-bg"
            style={{
              backgroundColor: "#d33f49",
            }}
          >
            <ProductCarousel />
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
                className="section-box flex-center bio-bg"
                style={{
                  transform: `translateY(${topPosAnimator(sections[2])})`,
                }}
              >
                <BioContainer />
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{ height: "1em", backgroundColor: "whitesmoke" }} /> */}
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
                backgroundColor: "#96ABC3",
              }}
            >
              <div
                className="section-box flex-center maps-bg"
                // style={{
                //   transform: `translateY(${topPosAnimator(sections[3])})`,
                // }}
              >
                <ContactInfoContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
