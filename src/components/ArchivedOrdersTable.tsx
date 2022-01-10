import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchArchive } from "../store/ordersSlice";
import { ColumnsType } from "antd/lib/table";
import CustomTable from "./CustomTable";
import "./OrdersTable.css";
import moment from "moment";

const ArchivedOrdersTable = () => {
  const archivedOrders = useAppSelector((state) => state.orders.archivedOrders);
  const dispatch = useAppDispatch();

  const columns: ColumnsType<Order> = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Date of Order",
      dataIndex: "",
      key: "orderDate",
      render: (order: Order) => (
        <span>{moment(order.orderDate).format("L")}</span>
      ),
    },
    {
      title: "Date of Completion",
      dataIndex: "",
      key: "completionDate",
      fixed: "right",
      render: (order: Order) => (
        <span>
          {order.completionDate
            ? moment(order.completionDate).format("L")
            : "???"}
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchArchive());
  }, [dispatch]);

  return (
    <CustomTable
      size="small"
      columns={columns}
      data={archivedOrders}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => <span>{record.desc}</span>,
        rowExpandable: (record) => record.desc?.trim().length > 0,
      }}
    />
  );
};

export default ArchivedOrdersTable;
