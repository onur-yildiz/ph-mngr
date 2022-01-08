import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Carousel, { CarouselRef } from "antd/lib/carousel";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadProducts } from "../store/productsSlice";
import "./ProductCarousel.css";

const DB_URI = process.env.REACT_APP_DB_URI as string;

export const ProductCarousel = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const carouselRef = useRef<CarouselRef>(null);
  const [carouselSettings, setCarouselSettings] = useState({
    rowLimit: 3,
    columnLimit: 2,
    gutter: 16,
  });

  const createCard = (product: Product) => (
    <Card hoverable cover={<img alt="" src={product.imageUrl} />}>
      <Meta title={product.title} description={product.desc} />
    </Card>
  );

  const generateCarouselContent = (products: Product[]) => {
    const rowLimit = carouselSettings.rowLimit;
    const columnLimit = carouselSettings.columnLimit;
    const gutter = carouselSettings.gutter;

    //divide items array into rowLimit*columnLimit length arrays
    const pages = [];
    for (let i = 0; i < products.length; i += rowLimit * columnLimit) {
      pages.push(products.slice(i, i + rowLimit * columnLimit));
    }
    // console.log([pages, rowLimit, columnLimit, gutter]);

    //generate carousel content
    const carouselContent = [];
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const pageContent = [];
      let span = 24 / rowLimit;
      let offset = 0;

      // if number of items in page is lower than the rowLimit, center the items
      if (rowLimit > 1 && page.length < rowLimit) {
        offset = (24 - page.length * 8) / 2;
      }

      for (let j = 0; j < page.length; j++) {
        pageContent.push(
          <Col key={i * rowLimit + j} span={span} offset={j ? 0 : offset}>
            {createCard(page[j])}
          </Col>
        );
      }

      carouselContent.push(
        <Row key={i} className="carousel-item" gutter={[gutter, gutter]}>
          {pageContent}
        </Row>
      );
    }

    return carouselContent;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${DB_URI}/products`);
      const data = await res.json();
      dispatch(loadProducts(data));
    };
    fetchProducts();

    const handleResize = () => {
      setCarouselSettings(() => {
        if (window.innerWidth <= 768)
          return {
            rowLimit: 1,
            columnLimit: 1,
            gutter: 0,
          };
        else
          return {
            rowLimit: 3,
            columnLimit: 1,
            gutter: 16,
          };
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className="product-carousel">
      <Button
        className="carousel-button left"
        type="ghost"
        shape="circle"
        icon={<LeftOutlined />}
        onClick={() => {
          carouselRef.current!.prev();
        }}
      />
      <Button
        className="carousel-button right"
        type="ghost"
        shape="circle"
        icon={<RightOutlined />}
        onClick={() => {
          carouselRef.current!.next();
        }}
      />
      <Carousel
        className="full-view"
        ref={carouselRef}
        style={{
          padding: "1em",
        }}
        autoplay
        autoplaySpeed={5000}
        pauseOnFocus
        draggable
        lazyLoad="ondemand"
      >
        {generateCarouselContent(products)}
      </Carousel>
    </div>
  );
};
