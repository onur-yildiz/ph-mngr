import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Reducer, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firebaseStorage } from "../firebase";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateProduct } from "../store/productsSlice";
import { v4 as uuidv4 } from "uuid";
import "./ProductForm.css";

const DB_URI = process.env.REACT_APP_DB_URI as string;
const PLACEHOLDER_IMAGE =
  "https://placeholder.pics/svg/300/DEDEDE/555555/no%20image";

const ProductEdit = () => {
  const [form] = Form.useForm();
  const { productId } = useParams();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.products.products);
  const storeDispatch = useAppDispatch();

  type State = {
    product: Product | undefined;
    loading: boolean;
    previewTitle: string;
    previewImage: any;
    previewVisible: boolean;
  };
  const [state, dispatch] = useReducer<
    Reducer<State, Partial<State> | ((arg0: State) => Partial<State>)>
  >(
    (state, newState) => {
      const newWithPrevState =
        typeof newState === "function" ? newState(state) : newState;
      return { ...state, ...newWithPrevState };
    },
    {
      product: undefined,
      loading: false,
      previewTitle: "",
      previewImage: "",
      previewVisible: false,
    }
  );

  const getValueFromEvent = (e: any) => {
    console.log("Upload event:", e);
    return e && ((e.file as UploadFile).originFileObj as Blob);
  };

  const getBase64 = (file: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      dispatch({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      dispatch({ loading: false, previewTitle: info.file.name });
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj!))?.toString();
    }

    dispatch({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url?.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleRemove = (file: any) => {
    file.url = PLACEHOLDER_IMAGE;
    file.thumbUrl = PLACEHOLDER_IMAGE;
    dispatch({
      previewTitle: "no_image",
      previewImage: "",
    });
    form.setFieldsValue({
      imageUrl: PLACEHOLDER_IMAGE,
    });
    return false;
  };

  const handleCancel = () => {
    dispatch({ previewVisible: false });
  };

  const handleSubmit = async (values: {
    title: string;
    desc: string;
    image: Blob | null; // if in edit and image uploaded, type is UploadFile. if in edit and image not uploaded (same image), type is string
  }) => {
    console.log("Received values of form: ", values);

    const imageId = uuidv4();
    const imageRef = ref(firebaseStorage, `product-images/${imageId}`);
    try {
      // delete old image from db if editing, an image uploaded, and an old image exists
      if (productId && values.image != null && state.product!.imageUrl) {
        await fetch(state.product!.imageUrl, {
          method: "DELETE",
        });
      }

      let imageUrl;
      if (values.image != null) {
        // upload the new image and get url to set product.imageUrl
        await uploadBytes(imageRef, values.image);
        imageUrl = await getDownloadURL(imageRef);
      } else {
        // if an image not uploaded, use the old image if it exists
        imageUrl = state.product?.imageUrl || "";
      }

      const newProduct = {
        title: values.title,
        desc: values.desc,
        imageUrl,
      } as Product;
      productId && (newProduct.id = productId); // if editing, set id

      const method = productId ? "PUT" : "POST";
      const url = productId
        ? `${DB_URI}/products/${productId}`
        : `${DB_URI}/products`;
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      console.log("res: ", res);
      if (res.ok) {
        storeDispatch(updateProduct(newProduct));
        navigate(-1);
      } else throw new Error("Failed to update product");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      dispatch({
        product,
        previewTitle: product?.title,
      });
      // fixes not showing product image
      form.resetFields();
      // fixes not setting product values in form
      form.setFieldsValue({
        title: product.title,
        desc: product.desc,
        image: product.imageUrl,
      });
    }
  }, [products, productId, form]);

  return (
    <div>
      <Form form={form} name="validate_other" onFinish={handleSubmit}>
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
        <Form.Item
          label="Image"
          name="image"
          getValueFromEvent={getValueFromEvent}
          extra={
            state.previewTitle
              ? state.previewTitle
              : "Upload an image for your product"
          }
        >
          <Upload
            name="productImage"
            listType="picture-card"
            customRequest={({ file, onSuccess }) => {
              console.log(file, "customRequest");
              onSuccess!("ok");
            }}
            defaultFileList={[
              {
                uid: state.product?.id,
                name: state.product?.title,
                url: state.product?.imageUrl,
              } as UploadFile,
            ]}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onPreview={handlePreview}
            onRemove={handleRemove}
            maxCount={1}
            showUploadList={true}
          >
            <Button
              className="upload-button-image"
              icon={state.loading ? <LoadingOutlined /> : <UploadOutlined />}
            />
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          className="image-preview"
          src={state.previewImage}
          alt={state.previewTitle}
        />
      </Modal>
    </div>
  );
};

export default ProductEdit;
