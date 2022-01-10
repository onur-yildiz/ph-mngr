import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Image, Modal, ModalFuncProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteProduct, fetchProducts } from "../store/productsSlice";
import ActionButtonBar from "./ActionButtonBar";
import CustomTable from "./CustomTable";
import "./ProductsTable.css";

const { confirm } = Modal;
const FALLBACK_IMAGE = process.env.REACT_APP_FALLBACK_IMAGE as string;

const ProductsTable = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showConfirm = (props: ModalFuncProps) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      ...props,
    });
  };

  const onDeleteOk = async (product: Product) => {
    dispatch(deleteProduct(product.id));
  };

  const columns: ColumnsType<Product> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "title", key: "title" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: "center",
      fixed: "right",
      render: (product: Product) => {
        return (
          <ActionButtonBar
            buttons={[
              {
                tooltipTitle: "Edit",
                icon: <EditOutlined />,
                onClick: () => navigate(`edit/${product.id}`),
              },
              {
                tooltipTitle: "Delete",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => {
                  showConfirm({
                    title: `Delete Product "${product.id}"`,
                    content: `Are you sure to delete "${product.title}"?`,
                    okText: "Delete",
                    cancelText: "Cancel",
                    okType: "danger",
                    onOk: onDeleteOk.bind(null, product),
                    // onCancel: () => console.log("Cancel"),
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <CustomTable
      size="small"
      data={products}
      columns={columns}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => expandable(record.desc, record.imageUrl),
        rowExpandable: (record) =>
          record.desc?.trim().length > 0 || record.imageUrl?.trim().length > 0,
      }}
      actions={[
        {
          type: "primary",
          icon: <PlusOutlined />,
          onClick: () => navigate("new"),
          children: "New Product",
        },
      ]}
    />
  );
};

const expandable = (desc: string, imageUrl: string) => {
  return (
    <div className="products-expandable">
      <div className="products-expandable-image-container">
        <Image
          className="products-expandable-image"
          src={imageUrl}
          fallback={FALLBACK_IMAGE}
          loading="lazy"
          placeholder
        />
      </div>
      <span className="products-expandable-text">
        {desc.trim().length > 0 ? desc : "No description"}
      </span>
    </div>
  );
};

export default ProductsTable;
