import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Image, Modal, ModalFuncProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteBio, fetchBios } from "../store/biographiesSlice";
import ActionButtonBar from "./ActionButtonBar";
import CustomTable from "./CustomTable";

const { confirm } = Modal;
const FALLBACK_IMAGE = process.env.REACT_APP_FALLBACK_IMAGE as string;

const BiographiesTable = () => {
  const bios = useAppSelector((state) => state.biographies.bios);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showConfirm = (props: ModalFuncProps) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      ...props,
    });
  };

  const onDeleteOk = async (bio: Biography) => {
    dispatch(deleteBio(bio));
  };

  const columns: ColumnsType<Biography> = [
    {
      title: "Avatar",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (avatar) => (
        <Image src={avatar} width={50} fallback={FALLBACK_IMAGE} />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Instagram", dataIndex: "instagramLink", key: "instagramLink" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: "center",
      fixed: "right",
      render: (bio: Biography) => {
        return (
          <ActionButtonBar
            buttons={[
              {
                tooltipTitle: "Edit",
                icon: <EditOutlined />,
                onClick: () => navigate(`edit/${bio.id}`),
              },
              {
                tooltipTitle: "Delete",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => {
                  showConfirm({
                    title: `Delete Bio`,
                    content: `Are you sure to delete bio of "${bio.name}"?`,
                    okText: "Delete",
                    cancelText: "Cancel",
                    okType: "danger",
                    onOk: onDeleteOk.bind(null, bio),
                    // onCancel: () => console.log("Cancel"),
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchBios());
  }, [dispatch]);

  return (
    <CustomTable
      size="large"
      data={bios}
      columns={columns}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => <span>{record.desc}</span>,
        rowExpandable: (record) => record.desc?.trim().length > 0,
      }}
      actions={[
        {
          type: "primary",
          icon: <PlusOutlined />,
          onClick: () => navigate("new"),
          children: "New Bio",
        },
      ]}
    />
  );
};

export default BiographiesTable;
