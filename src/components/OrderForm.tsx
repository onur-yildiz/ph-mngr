import { Form, Input, Button, DatePicker } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addOrder, updateOrder } from "../store/ordersSlice";

const OrderForm = () => {
  const [form] = useForm();
  const { orderId } = useParams();
  const navigate = useNavigate();
  console.log("orderId: ", orderId);
  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === orderId)
  );
  const dispatch = useAppDispatch();

  type FormValues = {
    customerName: string;
    desc: string;
    phoneNumber: string;
    email: string;
    dateRange: Date[];
  };
  const handleSubmit = async ({
    customerName,
    desc,
    phoneNumber,
    email,
    dateRange,
  }: FormValues) => {
    try {
      const orderDate = dateRange[0].toISOString();
      const deadline = dateRange[1].toISOString();
      const newOrder = {
        customerName,
        desc,
        phoneNumber,
        email,
        orderDate,
        deadline,
      } as Order;

      await dispatch(
        orderId
          ? updateOrder({ orderId, newOrder })
          : addOrder({ ...newOrder, done: false })
      );
      navigate(-1);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (order) {
      console.log("order: ", order);
      form.setFieldsValue({
        customerName: order.customerName,
        desc: order.desc,
        phoneNumber: order.phoneNumber,
        email: order.email,
        dateRange: [moment(order.orderDate), moment(order.deadline)],
      });
    } else if (!orderId) {
      form.setFieldsValue({
        dateRange: [moment()],
      });
    }
  }, [form, order, orderId]);

  return (
    <div className="form">
      <Title level={1} className="form-title">
        {orderId ? "Edit Order" : "New Order"}
      </Title>
      <Form
        form={form}
        name="orderForm"
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item label="Customer" name="customerName">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="desc">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Date" name="dateRange">
          <DatePicker.RangePicker
            disabledDate={(current) => {
              // Can not select days before today
              return current < moment().endOf("day");
            }}
            disabled={[!!orderId, false]}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;
