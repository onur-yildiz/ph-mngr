import { Button, Table, Tooltip, Modal } from "antd";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { format, parseISO } from "date-fns";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadOrders, toggleDone } from "../store/ordersSlice";
import { ColumnsType } from "antd/lib/table";
import "./OrdersTable.css";

const { confirm } = Modal;

const DB_URI = process.env.REACT_APP_DB_URI as string;

const OrderList: FC<{ isArchive?: boolean }> = (props) => {
  const orders = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(DB_URI);
      const data = await res.json();
      dispatch(loadOrders(data));
    };

    fetchOrders();
  }, [dispatch]);

  const completeOrder = (order: Order) => {
    dispatch(toggleDone(order));
  };

  const showDeleteConfirm = (order: Order) => {
    confirm({
      title: "Are you sure complete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        completeOrder(order);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns: ColumnsType<Order> = [
    { title: "ID", dataIndex: "uid", key: "uid" },
    { title: "Name", dataIndex: "customerName", key: "customerName" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Date of Order",
      dataIndex: "",
      key: "orderDate",
      render: (order: Order) => (
        <span>{format(parseISO(order.orderDate), "dd.MM.yyyy")}</span>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "",
      key: "deadline",
      render: (order: Order) => (
        <span>{format(parseISO(order.deadline), "dd.MM.yyyy")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (order: Order) => (
        <div className="table-action-container">
          <Tooltip title="done">
            <Button
              className="table-action-button"
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => {
                showDeleteConfirm(order);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table
      className="orders-table"
      size="small"
      columns={columns}
      scroll={{
        y: window.innerHeight * 0.85,
        x: 1200,
      }}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record: Order) => <span>{record.desc}</span>,
        rowExpandable: (record: Order) => record.desc?.trim().length > 0,
      }}
      dataSource={orders.filter((order) => order.done === props.isArchive)}
      rowKey="uid"
      pagination={{
        pageSize: 20,
        hideOnSinglePage: true,
        responsive: true,
        showSizeChanger: false,
        position: ["bottomCenter"],
      }}
    />
  );
};

OrderList.defaultProps = {
  isArchive: false,
};

export default OrderList;
