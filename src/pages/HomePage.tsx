import { Reducer, useEffect, useReducer, useRef } from "react";
import "./HomePage.css";
import { ProductCarousel } from "../components/ProductCarousel";
import { SearchContainer } from "../components/SearchContainer";
import { BioContainer } from "../components/BioContainer";
import { ContactInfoContainer } from "../components/ContactInfoContainer";
import { BackTop } from "antd";
import { NavBar } from "../components/NavBar";
import { isMobile } from "react-device-detect";
import Title from "antd/lib/typography/Title";
import { useAppDispatch } from "../hooks";
import { fetchProducts } from "../store/productsSlice";
import { fetchContactInfo } from "../store/contactInfoSlice";
import { fetchBios } from "../store/biographiesSlice";

const HomePage = () => {
  const sectionColors = ["#023047", "#3d5a80", "#023047", "#3d5a80", "#023047"];
  const sectionHeightProportion = 1.3;
  const scrollSectionHeight = window.innerHeight * sectionHeightProportion;
  const viewHeight = window.innerHeight;
  const appDispatch = useAppDispatch();

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const backTopRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef<boolean>(false);

  type State = {
    scrollPosition: number;
    isScrollingUp: boolean;
    isNavbarAffixed: boolean;
    selectedSection: number;
  };
  const [state, dispatch] = useReducer<
    Reducer<State, Partial<State> | ((arg0: State) => Partial<State>)>
  >(
    (state, newState) => {
      const newWithPrevState =
        typeof newState === "function" ? newState(state) : newState;
      return { ...state, ...newWithPrevState };
    },
    {
      scrollPosition: 0,
      isScrollingUp: false,
      isNavbarAffixed: false,
      selectedSection: 0,
    }
  );

  const topPosAnimator = (element: Element | null) => {
    if (!element || isMobile) {
      return "0";
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
      const x = -(((elementY + scrollSectionHeight) / viewHeight) * 50 - 50);
      return x + "%";
    }
    return "0";
  };

  useEffect(() => {
    const container = containerRef.current!;

    const handleScrollNav = () => {
      dispatch((prevState) => {
        return {
          scrollPosition: container.scrollTop,
          isScrollingUp:
            container.scrollTop < prevState.scrollPosition ? true : false,
          isNavbarAffixed:
            prevState.scrollPosition > window.innerHeight / 2 && !isMobile
              ? true
              : false,
          selectedSection: sectionsRef.current!.findIndex((section, index) => {
            const sectionY = section.getBoundingClientRect().top;
            const prevSectionHeight =
              index > 0
                ? sectionsRef.current![index - 1]?.getBoundingClientRect()
                    .height
                : 0;
            const sectionHeight = section.getBoundingClientRect().height;
            return (
              sectionY <= prevSectionHeight * 0.5 &&
              sectionY > -(sectionHeight * 0.5)
            );
          }),
        };
      });
    };

    container.addEventListener("scroll", handleScrollNav, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScrollNav);
    };
  }, []);

  useEffect(() => {
    appDispatch(fetchProducts());
    appDispatch(fetchBios());
    appDispatch(fetchContactInfo());
  }, [appDispatch]);

  useEffect(() => {
    const displayBackTop = () => {
      const classList = backTopRef.current!.classList;
      if (state.isScrollingUp) {
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
  }, [state.isScrollingUp, state.scrollPosition]);

  return (
    <>
      <div className="hm-back-top" ref={backTopRef}>
        <BackTop target={() => containerRef.current!} />
      </div>
      <div
        id="hm-container"
        ref={containerRef}
        className="hide-scrollbar"
        style={{ position: "relative" }}
      >
        {
          <NavBar
            selected={state.selectedSection}
            affixed={state.isNavbarAffixed}
          />
        }
        <div
          ref={(el) => (sectionsRef.current[0] = el!)}
          id="hm-section-0"
          className="full-view"
        >
          <div
            className="sticky-view"
            style={{ backgroundColor: sectionColors[0] }}
          >
            <div className="full-view photo-bg">
              <div className="section-box">
                <Title className="title" level={1}>
                  FotoMoto
                </Title>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={(el) => (sectionsRef.current[1] = el!)}
          id="hm-section-1"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div
            className="sticky-view section-wrapper"
            style={{ backgroundColor: sectionColors[1] }}
          >
            <div
              className="full-view search-bg"
              style={{
                transform: `translateY(${topPosAnimator(
                  sectionsRef.current[1]
                )})`,
              }}
            >
              <div
                className="section-box flex-center hide-scrollbar"
                style={{
                  overflowY: "scroll",
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
            className="sticky-view section-wrapper"
            style={{
              backgroundColor: sectionColors[2],
            }}
          >
            <div className="full-view carousel-bg">
              <ProductCarousel />
            </div>
          </div>
        </div>
        <div
          ref={(el) => (sectionsRef.current[3] = el!)}
          id="hm-section-3"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div
            className="sticky-view section-wrapper"
            style={{ backgroundColor: sectionColors[3] }}
          >
            <div
              className="full-view bio-bg"
              style={{
                transform: `translateY(${topPosAnimator(
                  sectionsRef.current[3]
                )})`,
              }}
            >
              <div className="section-box flex-center">
                <BioContainer />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={(el) => (sectionsRef.current[4] = el!)}
          id="hm-section-4"
          style={{
            height: scrollSectionHeight + "px",
          }}
        >
          <div
            className="sticky-view section-wrapper"
            style={{ backgroundColor: sectionColors[4] }}
          >
            <div className="full-view maps-bg">
              <div className="section-box flex-center">
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
