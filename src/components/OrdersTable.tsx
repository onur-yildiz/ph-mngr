import { Modal } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchOrders, updateOrder } from "../store/ordersSlice";
import { ColumnsType } from "antd/lib/table";
import "./OrdersTable.css";
import CustomTable from "./CustomTable";
import ActionButtonBar from "./ActionButtonBar";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const OrdersTable = () => {
  const orders = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showCompleteConfirm = (order: Order) => {
    confirm({
      title: `Complete Order "${order.id}"`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure to complete this order?`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      async onOk() {
        const newOrder = { ...order, done: true } as Order;
        await dispatch(updateOrder({ orderId: order.id, newOrder }));
      },
    });
  };

  const columns: ColumnsType<Order> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      sortDirections: ["ascend", "descend"],
    },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Date of Order",
      dataIndex: "",
      key: "orderDate",
      sorter: (a, b) => Date.parse(a.orderDate) - Date.parse(b.orderDate),
      sortDirections: ["descend"],
      render: (order: Order) => (
        <span>{moment(order.orderDate).format("L")}</span>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "",
      key: "deadline",
      sorter: (a, b) => Date.parse(a.deadline) - Date.parse(b.deadline),
      sortDirections: ["ascend", "descend"],
      render: (order: Order) => (
        <span>{moment(order.deadline).format("L")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: "center",
      fixed: "right",
      render: (order: Order) => (
        <ActionButtonBar
          buttons={[
            {
              tooltipTitle: "Complete",
              icon: <CheckOutlined />,
              onClick: () => showCompleteConfirm(order),
            },
            {
              tooltipTitle: "Edit",
              icon: <EditOutlined />,
              onClick: () => {
                navigate(`edit/${order.id}`);
              },
            },
            {
              tooltipTitle: "Cancel",
              icon: <CloseOutlined />,
              danger: true,
              onClick: () => {},
            },
          ]}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <CustomTable
      size="small"
      columns={columns}
      data={orders}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => <span>{record.desc}</span>,
        rowExpandable: (record) => record.desc?.trim().length > 0,
      }}
    />
  );
};

export default OrdersTable;
