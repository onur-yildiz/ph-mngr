import { Table, Button, ButtonProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ExpandableConfig } from "antd/lib/table/interface";
import { PropsWithChildren, useEffect, useState } from "react";

interface CustomTableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  expandable?: ExpandableConfig<T>;
  actions?: ButtonProps[];
  size?: "small" | "middle" | "large";
}

const CustomTable = <T extends object>(
  props: PropsWithChildren<CustomTableProps<T>>
) => {
  const [scrollHeight, setScrollHeight] = useState(window.innerHeight * 0.8);

  const generateActions = () =>
    props.actions!.map((button, index) => (
      <Button
        key={index}
        type={button.type}
        icon={button.icon}
        onClick={button.onClick}
      >
        {button.children}
      </Button>
    ));

  useEffect(() => {
    const handleResize = () => {
      setScrollHeight(window.innerHeight * 0.8);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="table">
      {props.actions && (
        <div className="table-button-bar">{generateActions()}</div>
      )}
      <Table
        size={props.size || "middle"}
        columns={props.columns}
        scroll={{
          y: scrollHeight,
          x: "max-content",
        }}
        expandable={props.expandable}
        dataSource={props.data}
        rowKey="id"
        pagination={{
          pageSize: 20,
          hideOnSinglePage: true,
          responsive: true,
          showSizeChanger: false,
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default CustomTable;
