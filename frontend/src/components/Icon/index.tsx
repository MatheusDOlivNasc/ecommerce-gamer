import React, { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

const Icon: React.FC<Props> = ({
  children, className
}) => {
  return (
    <span className={"material-symbols-outlined " + (className || "")} translate="no" draggable={false}>
      { children }
    </span>
  );
}

export default Icon;