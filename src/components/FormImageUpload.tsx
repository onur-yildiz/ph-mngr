import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, message, Modal, Upload } from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { FC, Reducer, useEffect, useReducer } from "react";
import { Buffer } from "buffer";
import getBase64 from "../util/getBase64";

const PLACEHOLDER_IMAGE =
  "https://placeholder.pics/svg/300/DEDEDE/555555/no%20image";
const FALLBACK_IMAGE = process.env.REACT_APP_FALLBACK_IMAGE as string;

interface ImageUploadProps {
  defaultImage?: Partial<UploadFile>;
  form: FormInstance;
  label?: string;
  name?: string;
}

const FormImageUpload: FC<ImageUploadProps> = (props) => {
  type State = {
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
    file.url = FALLBACK_IMAGE;
    file.thumbUrl = FALLBACK_IMAGE;
    dispatch({
      previewTitle: "no_image",
      previewImage: "",
    });

    const buffer = Buffer.from(FALLBACK_IMAGE.split(",")[1], "base64");
    const blob = new Blob([buffer], { type: "image/png" });
    const newFieldsValue = Object.defineProperty({}, props.name!, {
      value: blob,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    console.log(newFieldsValue, "AAAA");
    props.form.setFieldsValue(newFieldsValue);

    return false;
  };

  const handleCancel = () => {
    dispatch({ previewVisible: false });
  };

  useEffect(() => {
    dispatch({ previewTitle: props.defaultImage?.name });
  }, [dispatch, props.defaultImage?.name]);

  return (
    <>
      <Form.Item
        className="form-image-upload"
        label={props.label}
        name={props.name}
        getValueFromEvent={getValueFromEvent}
        extra={
          state.previewTitle
            ? state.previewTitle
            : "Upload an image for your product"
        }
      >
        <Upload
          name="formImageUpload"
          listType="picture-card"
          customRequest={({ file, onSuccess }) => {
            console.log(file, "customRequest");
            onSuccess!("ok");
          }}
          defaultFileList={[
            {
              url: props.defaultImage?.url || PLACEHOLDER_IMAGE,
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
            className="picture-card-upload-button"
            icon={state.loading ? <LoadingOutlined /> : <UploadOutlined />}
          ></Button>
        </Upload>
      </Form.Item>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          className="upload-image-preview"
          src={state.previewImage}
          alt={state.previewTitle}
        />
      </Modal>
    </>
  );
};

export default FormImageUpload;
