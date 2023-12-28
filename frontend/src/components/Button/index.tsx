import React, { ReactNode } from "react";

interface Props {
  type?: "button" | "submit";
  className?: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  children?: ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children, className, type, onClick, disabled
}) => {
  
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      className={`
        animate-wiggle
        px-3 py-1

        rounded

        bg-green-500
        hover:bg-green-400
        
        transition delay-150 duration-300 ease-in-out
        disabled:opacity-40
        disabled:hover:bg-green-500
      ` + (className || "")}
      onClick={onClick} >
      { children }
    </button>
  );
}

export default Button;