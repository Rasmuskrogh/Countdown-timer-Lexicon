import React from "react";

interface IButton {
  action: () => void;
  label: string;
  disabled: boolean;
}

const Button = ({ action, label, disabled }: IButton) => {
  return (
    <button onClick={action} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
