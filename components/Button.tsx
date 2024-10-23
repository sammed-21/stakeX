import { cn } from "@/lib/utils";
import React from "react";

// Define the props interface
interface ButtonProps {
  onClick?: () => void; // Function type for the onClick handler
  label: string; // Label for the button
  className?: string;
  type?: "button" | "submit" | "reset"; // Optional type prop for button type
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  label,
  type = "button",
}) => {
  return (
    <button
      className={cn("w-fit py-2 px-2 rounded-lg bg-blue-500", className)}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
