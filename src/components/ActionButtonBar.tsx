import { Button, Tooltip } from "antd";
import { FC } from "react";

interface ActionButton {
  tooltipTitle: string;
  icon: React.ReactNode;
  onClick: React.MouseEventHandler | undefined;
  danger?: true;
}

interface ActionButtonBarProps {
  buttons: ActionButton[];
}

const ActionButtonBar: FC<ActionButtonBarProps> = (props) => {
  const generateButtons = () =>
    props.buttons.map((button, index) => (
      <Tooltip key={index} title={button.tooltipTitle}>
        <Button
          className="table-action-button"
          type="text"
          icon={button.icon}
          onClick={button.onClick}
          danger={button.danger || false}
        />
      </Tooltip>
    ));

  return <div className="table-action-container">{generateButtons()}</div>;
};

export default ActionButtonBar;
