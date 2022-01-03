import { Reducer, useEffect, useReducer, useRef } from "react";
import "./HomePage.css";
import { ProductCarousel } from "../components/ProductCarousel";
import { SearchContainer } from "../components/SearchContainer";
import { BioContainer } from "../components/BioContainer";
import { ContactInfoContainer } from "../components/ContactInfoContainer";
import { BackTop } from "antd";

const HomePage = () => {
  const scrollSectionHeight = window.innerHeight * 2;
  const viewHeight = window.innerHeight;

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const backTopRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef<boolean>(false);

  type ScrollState = { scrollPosition: number; isScrollingUp: boolean };
  const [scrollState, scrollDispatch] = useReducer<
    Reducer<
      ScrollState,
      Partial<ScrollState> | ((arg0: ScrollState) => Partial<ScrollState>)
    >
  >(
    (state, newState) => {
      const newWithPrevState =
        typeof newState === "function" ? newState(state) : newState;
      return { ...state, ...newWithPrevState };
    },
    {
      scrollPosition: 0,
      isScrollingUp: false,
    }
  );

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
    const container = containerRef.current!;

    const handleScroll = () => {
      scrollDispatch((prevState) => {
        return {
          scrollPosition: container.scrollTop,
          isScrollingUp:
            container.scrollTop < prevState.scrollPosition ? true : false,
        };
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const displayBackTop = () => {
      const classList = backTopRef.current!.classList;
      if (scrollState.isScrollingUp) {
        !classList.contains("show") && classList.add("show");
        setTimeout(() => {
          tickingRef.current = false;
          backTopRef.current!.classList.remove("show");
        }, 3000);
      } else tickingRef.current = false;
    };

    if (!tickingRef.current) {
      tickingRef.current = true;
      displayBackTop();
    }
  }, [scrollState.isScrollingUp, scrollState.scrollPosition]);

  return (
    <>
      <div className="hm-back-top" ref={backTopRef}>
        <BackTop target={() => containerRef.current!} />
      </div>
      <div id="hm-container" ref={containerRef} className="hide-scrollbar">
        <div
          ref={(el) => (sectionsRef.current[0] = el!)}
          className="full-view flex-center photo-bg"
          style={{
            backgroundColor: "#0396A6",
          }}
        >
          <div
            style={{
              transform: `translateY(${
                scrollState.scrollPosition / 2
              }px) scale(${
                (viewHeight - scrollState.scrollPosition / 2) / viewHeight
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
          ref={(el) => (sectionsRef.current[1] = el!)}
          id="hm-section-1"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#0396A6" }}>
            <div
              className="full-view flex-center section-wrapper"
              style={{
                backgroundColor: "#77ba99",
              }}
            >
              <div
                className="section-box flex-center hide-scrollbar search-bg"
                style={{
                  overflowY: "scroll",
                  transform: `translateY(${topPosAnimator(
                    sectionsRef.current[1]
                  )})`,
                  padding: "1em",
                }}
              >
                <SearchContainer />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={(el) => (sectionsRef.current[2] = el!)}
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
          ref={(el) => (sectionsRef.current[3] = el!)}
          id="hm-section-3"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#0396A6" }}>
            <div
              className="full-view flex-center section-wrapper"
              style={{
                backgroundColor: "#F25835",
              }}
            >
              <div
                className="section-box flex-center bio-bg"
                style={{
                  transform: `translateY(${topPosAnimator(
                    sectionsRef.current[3]
                  )})`,
                }}
              >
                <BioContainer />
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{ height: "1em", backgroundColor: "whitesmoke" }} /> */}
        <div
          ref={(el) => (sectionsRef.current[4] = el!)}
          id="hm-section-4"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div className="sticky-view" style={{ backgroundColor: "#F2836B" }}>
            <div
              className="full-view flex-center section-wrapper"
              style={{
                backgroundColor: "#96ABC3",
              }}
            >
              <div
                className="section-box flex-center maps-bg"
                // style={{
                //   transform: `translateY(${topPosAnimator(sections[4])})`,
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
