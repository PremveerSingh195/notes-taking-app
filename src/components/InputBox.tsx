import React from "react";

interface InputBoxprops {
  label: string;
  disable: boolean;
  placeholder: string;
  type: string;
  value: string;
  onValueChange: (value: string) => void;
}

const InputBox: React.FC<InputBoxprops> = ({
  label,
  disable,
  placeholder,
  type,
  value,
  onValueChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        disabled={disable}
        placeholder={placeholder}
        value={value}   
        onChange={(e) => onValueChange && onValueChange(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
