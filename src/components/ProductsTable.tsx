import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Table, Image, Tooltip, Button, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadProducts } from "../store/productsSlice";
import "./ProductsTable.css";

const { confirm } = Modal;

const ProductsTable = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      // const res = await fetch("/api/products");
      // const data = await res.json();
      const data: Product[] = [
        {
          imageSrc: "https://via.placeholder.com/150",
          uid: "1",
          title: "Product 1",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quisquam voluptatem debitis eligendi distinctio minima laborum ullam quasi corrupti quia, consequatur, rem aperiam dicta vel molestiae ipsam obcaecati veniam libero.",
        },
        {
          imageSrc: "https://via.placeholder.com/150",
          uid: "2",
          title: "Product 2",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quisquam voluptatem debitis eligendi distinctio minima laborum ullam quasi corrupti quia, consequatur, rem aperiam dicta vel molestiae ipsam obcaecati veniam libero.",
        },
        {
          imageSrc: "https://via.placeholder.com/150",
          uid: "3",
          title: "Product 3",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quisquam voluptatem debitis eligendi distinctio minima laborum ullam quasi corrupti quia, consequatur, rem aperiam dicta vel molestiae ipsam obcaecati veniam libero.",
        },
      ];

      dispatch(loadProducts(data));
    };
    console.log("ayayay");
    fetchProducts();
  }, [dispatch]);

  const columns: ColumnsType<Product> = [
    { title: "ID", dataIndex: "uid", key: "uid" },
    { title: "Name", dataIndex: "title", key: "title" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (product: Product) => (
        <div className="table-action-container">
          <Tooltip title="Edit">
            <Button
              className="table-action-button"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className="table-action-button"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={showDeleteConfirm}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        className="products-table"
        size="small"
        columns={columns}
        scroll={{
          y: window.innerHeight * 0.85,
          x: 450,
        }}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record: Product) =>
            expandable(record.desc, record.imageSrc),
          rowExpandable: (record: Product) =>
            record.desc.trim().length > 0 || record.imageSrc.trim().length > 0,
        }}
        dataSource={products}
        rowKey="uid"
        pagination={{
          pageSize: 20,
          hideOnSinglePage: true,
          responsive: true,
          showSizeChanger: false,
          position: ["bottomCenter"],
        }}
      />
    </>
  );
};

const expandable = (desc: string, imageSrc: string) => {
  return (
    <div className="products-expandable">
      <div>{desc}</div>
      <Image width={300} src={imageSrc} />
    </div>
  );
};

export default ProductsTable;
