import * as React from "react";
import styled from "../../styles/ActionButton.module.css";

export interface IActionsButtonProps {
  title: string;
  className?: string;
  actions?: () => void;
  style?: CSSModuleClasses;
  visible?: boolean;
  disabled?: React.HTMLAttributes<HTMLButtonElement>;
}

export default function ActionsButton({
  title,
  className,
  actions,
  style,
}: IActionsButtonProps) {
  return (
    <React.Fragment>
      <button
        className={`${className} ${styled.button} ${styled.boxShadow}`}
        onClick={actions}
        style={style}
      >
        {title}
      </button>
    </React.Fragment>
  );
}
