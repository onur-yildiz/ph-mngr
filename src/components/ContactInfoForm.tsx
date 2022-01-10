import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchContactInfo, updateContactInfo } from "../store/contactInfoSlice";

const ContactInfoForm = () => {
  const [form] = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const contactInfo = useAppSelector((state) => state.contactInfo.contactInfo);

  const handleSubmit = async (values: Partial<ContactInfo>) => {
    dispatch(updateContactInfo(values as ContactInfo));
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  useEffect(() => {
    if (contactInfo) {
      // fixes not showing product image
      form.resetFields();
      // fixes not setting product values in form
      form.setFieldsValue({
        address: contactInfo.address,
        phone: contactInfo.phone,
        email: contactInfo.email,
        weekdayHours: contactInfo.weekdayHours,
        saturdayHours: contactInfo.saturdayHours,
        sundayHours: contactInfo.sundayHours,
      });
    }
  }, [form, contactInfo]);

  return (
    <div className="form">
      <Title level={1} className="form-title">
        Contact Info
      </Title>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        className="form"
        form={form}
        name="contactInfoForm"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter an address!" }]}
        >
          <Input.TextArea disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter a phone number!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email!" }]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>{" "}
        <Form.Item label="Weekday Hours" name="weekdayHours">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Saturday Hours" name="saturdayHours">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item label="Sunday Hours" name="sundayHours">
          <Input disabled={!isEditing} />
        </Form.Item>
        {isEditing ? (
          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              type="default"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        ) : (
          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button
              type="primary"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default ContactInfoForm;

// address: string;
//   phone: string;
//   email: string;
//   weekdayHours: string;
//   saturdayHours: string;
//   sundayHours: string;
