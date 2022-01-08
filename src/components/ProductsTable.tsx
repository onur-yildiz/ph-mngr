import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Table, Image, Tooltip, Button, Modal, ModalFuncProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteProduct, loadProducts } from "../store/productsSlice";
import "./ProductsTable.css";

const { confirm } = Modal;
const DB_URI = process.env.REACT_APP_DB_URI as string;
const FALLBACK_IMAGE = process.env.REACT_APP_FALLBACK_IMAGE as string;

const ProductsTable = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [scrollHeight, setScrollHeight] = useState(window.innerHeight * 0.8);

  const showConfirm = (props: ModalFuncProps) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      ...props,
    });
  };

  const onDeleteOk = async (product: Product) => {
    const res = await fetch(`${DB_URI}/products/${product.id}`, {
      method: "DELETE",
    });
    if (res.ok) dispatch(deleteProduct(product.id));
  };

  const columns: ColumnsType<Product> = [
    { title: "ID", dataIndex: "id", key: "id" },
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
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`edit/${product.id}`)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              className="table-action-button"
              shape="circle"
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() =>
                showConfirm({
                  title: `Delete Product`,
                  content: `Are you sure you want to delete "${product.title}"?`,
                  okText: "Delete",
                  cancelText: "Cancel",
                  okType: "danger",
                  onOk: onDeleteOk.bind(null, product),
                  // onCancel: () => console.log("Cancel"),
                })
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${DB_URI}/products`);
      const data = await res.json();
      dispatch(loadProducts(data));
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setScrollHeight(window.innerHeight * 0.8);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="table">
      <div className="table-button-bar">
        <Button
          className="add-product-button"
          type="primary"
          icon={<PlusOutlined />}
        >
          New
        </Button>
      </div>
      <Table
        size="small"
        columns={columns}
        scroll={{
          y: scrollHeight,
          x: "max-content",
        }}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record: Product) =>
            expandable(record.desc, record.imageUrl),
          rowExpandable: (record: Product) =>
            record.desc?.trim().length > 0 ||
            record.imageUrl?.trim().length > 0,
        }}
        dataSource={products}
        rowKey="id"
        pagination={{
          pageSize: 20,
          hideOnSinglePage: true,
          responsive: true,
          showSizeChanger: false,
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

const expandable = (desc: string, imageUrl: string) => {
  return (
    <div className="products-expandable">
      <p className="products-expandable-text">
        {desc.trim().length > 0 ? desc : "No description"}
      </p>
      <div className="products-expandable-image-container">
        <Image
          className="products-expandable-image"
          src={imageUrl}
          fallback={FALLBACK_IMAGE}
          loading="lazy"
          placeholder
        />
      </div>
    </div>
  );
};

export default ProductsTable;
