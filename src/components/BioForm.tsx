import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addBio, updateBio } from "../store/biographiesSlice";
import FormImageUpload from "./FormImageUpload";

const BioForm = () => {
  const [form] = useForm();
  const { bioId } = useParams();
  const navigate = useNavigate();
  const bio = useAppSelector((state) =>
    state.biographies.bios.find((b) => b.id === bioId)
  );
  const dispatch = useAppDispatch();

  type FormValues = {
    avatar: Blob | null;
    name: string;
    desc: string;
    phone: string;
    email: string;
    instagramLink: string;
  };
  const handleSubmit = async ({
    avatar,
    desc,
    email,
    instagramLink,
    name,
    phone,
  }: FormValues) => {
    console.log("Received values of form: ", {
      avatar,
      desc,
      email,
      instagramLink,
      name,
      phone,
    });

    try {
      const newBio = {
        name,
        desc,
        phone,
        email,
        instagramLink,
      } as Biography;

      await dispatch(
        bioId ? updateBio({ bioId, newBio, avatar }) : addBio(newBio)
      );
      navigate(-1);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (bio) {
      // fixes not showing product image
      form.resetFields();
      // fixes not setting product values in form
      form.setFieldsValue({
        name: bio.name,
        desc: bio.desc,
        phone: bio.phone,
        email: bio.email,
        instagramLink: bio.instagramLink,
      });
    }
  }, [form, bio]);

  return (
    <div className="form">
      <Title level={1} className="form-title">
        {bioId ? "Edit Biography" : "New Biography"}
      </Title>
      <Form
        form={form}
        name="bioForm"
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <FormImageUpload
          label="Photo"
          name="avatar"
          form={form}
          defaultImage={{ url: bio?.avatarUrl }}
        />
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Instagram" name="instagramLink">
          <Input />
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

export default BioForm;
