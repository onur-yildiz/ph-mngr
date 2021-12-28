import { Button, Table, Tooltip } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { format, parseISO } from "date-fns";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadOrders, toggleDone } from "../store/ordersSlice";
import { ColumnsType } from "antd/lib/table";

const DB_URI = process.env.REACT_APP_DB_URI as string;

const OrderList: FC<{ isArchive?: boolean }> = (props) => {
  const orders = useAppSelector((state) => state.order.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(DB_URI);
      const data = await res.json();
      dispatch(loadOrders(data));
    };

    fetchOrders();

    // return () => {
    //   ...
    // };
  }, [dispatch]);
  const completeOrder = (order: Order) => {
    dispatch(toggleDone(order));
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="done">
            <Button
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => {
                completeOrder(order);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record: Order) => <span>{record.description}</span>,
        rowExpandable: (record: Order) =>
          record.description.length > 0 && record.description.trim() !== "",
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
