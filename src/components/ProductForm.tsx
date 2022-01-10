import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addProduct, updateProduct } from "../store/productsSlice";
import FormImageUpload from "./FormImageUpload";
import Title from "antd/lib/typography/Title";

const ProductEdit = () => {
  const [form] = Form.useForm();
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );
  const dispatch = useAppDispatch();

  type FormValues = {
    title: string;
    desc: string;
    image: Blob | null;
  };
  const handleSubmit = async ({ title, desc, image }: FormValues) => {
    console.log("Received values of form: ", { title, desc, image });

    try {
      const newProduct = { title, desc } as Product;

      await dispatch(
        productId
          ? updateProduct({ productId, newProduct, image })
          : addProduct(newProduct)
      );
      navigate(-1);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (product) {
      // fixes not showing product image
      form.resetFields();
      // fixes not setting product values in form
      form.setFieldsValue({
        title: product.title,
        desc: product.desc,
      });
    }
  }, [form, product]);

  return (
    <div className="form">
      <Title level={1} className="form-title">
        {productId ? "Edit Product" : "New Product"}
      </Title>
      <Form
        form={form}
        name="productForm"
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title!" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <FormImageUpload
          label="Image"
          name="image"
          form={form}
          defaultImage={{ url: product?.imageUrl }}
        />
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

export default ProductEdit;
