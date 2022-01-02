import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Carousel, { CarouselRef } from "antd/lib/carousel";
import { useEffect, useRef, useState } from "react";
import "./ProductCarousel.css";

export const ProductCarousel = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [carouselSettings, setCarouselSettings] = useState({
    rowLimit: 3,
    columnLimit: 2,
    gutter: 16,
  });

  const products: Card[] = [
    {
      image: {
        src: "http://dummyimage.com/147x110.png/dddddd/000000",
        alt: "nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi",
      },
      title: "Man-Proof",
      desc: "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    },
    {
      image: {
        src: "http://dummyimage.com/161x209.png/5fa2dd/ffffff",
        alt: "sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum",
      },
      title: "Lake Tahoe",
      desc: "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
    },
    {
      image: {
        src: "http://dummyimage.com/161x209.png/5fa2dd/ffffff",
        alt: "sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum",
      },
      title: "Lake Tahoe",
      desc: "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
    },
    {
      image: {
        src: "http://dummyimage.com/224x101.png/dddddd/000000",
        alt: "donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non",
      },
      title:
        "Federico Fellini's Autobiography (Federico Fellini - un autoritratto ritrovato)",
      desc: "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
    },
    {
      image: {
        src: "http://dummyimage.com/192x213.png/5fa2dd/ffffff",
        alt: "suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in",
      },
      title: "Poison Ivy: New Seduction",
      desc: "Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    },
    {
      image: {
        src: "http://dummyimage.com/249x180.png/5fa2dd/ffffff",
        alt: "quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum",
      },
      title: "Hobbit: An Unexpected Journey, The",
      desc: "Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.",
    },
    {
      image: {
        src: "http://dummyimage.com/111x178.png/cc0000/ffffff",
        alt: "in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus",
      },
      title: "Company of Heroes",
      desc: "Nulla nisl.",
    },
    {
      image: {
        src: "http://dummyimage.com/229x168.png/dddddd/000000",
        alt: "praesent id massa id nisl venenatis lacinia aenean sit amet",
      },
      title: "Haxan: Witchcraft Through the Ages (a.k.a. The Witches)",
      desc: "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.",
    },
    {
      image: {
        src: "http://dummyimage.com/230x223.png/ff4444/ffffff",
        alt: "porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi",
      },
      title: "Giants and Toys (Kyojin to gangu)",
      desc: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    },
    {
      image: {
        src: "http://dummyimage.com/181x239.png/5fa2dd/ffffff",
        alt: "cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis",
      },
      title: "Stardom",
      desc: "Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero.",
    },
    {
      image: {
        src: "http://dummyimage.com/247x212.png/5fa2dd/ffffff",
        alt: "viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper",
      },
      title: "Bye Bye Braverman",
      desc: "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
    },
    {
      image: {
        src: "http://dummyimage.com/104x116.png/5fa2dd/ffffff",
        alt: "volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien",
      },
      title: "Or (a.k.a. My Treasure)",
      desc: "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    },
    {
      image: {
        src: "http://dummyimage.com/140x168.png/dddddd/000000",
        alt: "a ipsum integer a nibh in quis justo maecenas rhoncus",
      },
      title: "Time to Live, a Time to Die, A (Tong nien wang shi)",
      desc: "Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.",
    },
    {
      image: {
        src: "http://dummyimage.com/109x113.png/ff4444/ffffff",
        alt: "commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede",
      },
      title: "Indecent Proposal",
      desc: "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
    },
    {
      image: {
        src: "http://dummyimage.com/207x211.png/cc0000/ffffff",
        alt: "turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel",
      },
      title: "En på miljonen",
      desc: "Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.",
    },
    {
      image: {
        src: "http://dummyimage.com/166x172.png/ff4444/ffffff",
        alt: "aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor",
      },
      title: "41",
      desc: "Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    },
    {
      image: {
        src: "http://dummyimage.com/196x158.png/5fa2dd/ffffff",
        alt: "lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy",
      },
      title: "Sin City",
      desc: "Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    },
    {
      image: {
        src: "http://dummyimage.com/179x192.png/cc0000/ffffff",
        alt: "id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi",
      },
      title: "Murder by Contract",
      desc: "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
    },
    {
      image: {
        src: "http://dummyimage.com/131x178.png/dddddd/000000",
        alt: "quisque erat eros viverra eget congue eget semper rutrum nulla nunc",
      },
      title: "Circle of Iron",
      desc: "Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    },
    {
      image: {
        src: "http://dummyimage.com/140x247.png/5fa2dd/ffffff",
        alt: "mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem",
      },
      title: "Vivien Leigh: Scarlett and Beyond",
      desc: "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
    },
    {
      image: {
        src: "http://dummyimage.com/220x176.png/ff4444/ffffff",
        alt: "sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium",
      },
      title: "Hungarian Fairy Tale, A (Hol volt, hol nem volt)",
      desc: "Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    },
    {
      image: {
        src: "http://dummyimage.com/103x210.png/5fa2dd/ffffff",
        alt: "in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in",
      },
      title: "Sting, The",
      desc: "Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    },
    {
      image: {
        src: "http://dummyimage.com/119x201.png/dddddd/000000",
        alt: "orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras",
      },
      title: "Wing Chun",
      desc: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    },
    {
      image: {
        src: "http://dummyimage.com/104x215.png/dddddd/000000",
        alt: "in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus",
      },
      title: "Of Love and Shadows",
      desc: "Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
    },
    {
      image: {
        src: "http://dummyimage.com/242x201.png/cc0000/ffffff",
        alt: "amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum",
      },
      title: "Happiness Is a Warm Blanket, Charlie Brown",
      desc: "In hac habitasse platea dictumst.",
    },
    {
      image: {
        src: "http://dummyimage.com/187x125.png/cc0000/ffffff",
        alt: "mi nulla ac enim in tempor turpis nec euismod scelerisque",
      },
      title: "Diary of a Wimpy Kid",
      desc: "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.",
    },
  ];

  const createCard = (card: Card) => (
    <Card hoverable cover={<img alt={card.image.alt} src={card.image.src} />}>
      <Meta title={card.title} description={card.desc} />
    </Card>
  );

  const generateCarouselContent = (items: Card[]) => {
    const rowLimit = carouselSettings.rowLimit;
    const columnLimit = carouselSettings.columnLimit;
    const gutter = carouselSettings.gutter;

    //divide items array into rowLimit*columnLimit length arrays
    const pages = [];
    for (let i = 0; i < items.length; i += rowLimit * columnLimit) {
      pages.push(items.slice(i, i + rowLimit * columnLimit));
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
    const handleResize = () => {
      setCarouselSettings(() => {
        if (window.innerWidth < 768)
          return {
            rowLimit: 1,
            columnLimit: 1,
            gutter: 0,
          };
        else
          return {
            rowLimit: 3,
            columnLimit: 2,
            gutter: 16,
          };
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {});

  return (
    <div className="full-view product-carousel">
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
