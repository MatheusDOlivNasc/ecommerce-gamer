import React, { ReactNode } from "react";

interface Props {
  type?: "button" | "submit";
  className?: string;
  background?: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  children?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children, className, background, type, onClick, disabled
}) => {
  
  const bg = (
    background  ||
    "bg-green-400 hover:bg-green-300 disabled:hover:bg-green-400"
  )

  return (
    <button
      type={type || "button"}
      disabled={disabled}
      className={`
        px-3 py-1

        rounded

        font-medium
        transition delay-150 duration-300 ease-in-out
        disabled:opacity-40
      ` + (className || "") + " " + bg}
      onClick={onClick} >
      { children }
    </button>
  );
}

export default Button;