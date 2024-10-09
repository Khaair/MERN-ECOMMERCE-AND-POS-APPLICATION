import { ErrorMessage, Field, useFormikContext } from "formik";
import { useState } from "react";

interface InputProps {
  onChangeFieldHandler?(value: string): void | undefined;
  required?: boolean;
  label: string;
  htmlFor?: string;
  name: string;
  placeholder: string;
  id: string;
  type?: string;
  icon?: string;
  clickIcon?: boolean;
  readOnly?: boolean;
  opacity?: boolean;
}
const InputField = ({
  required,
  onChangeFieldHandler,
  label,
  htmlFor,
  name,
  placeholder,
  id,
  type,
  icon,
  clickIcon,
  readOnly,
  opacity,
}: InputProps) => {
  const [getType, setType] = useState<string | undefined>(type);
  const { setFieldValue } = useFormikContext();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event?.target?.value;
    onChangeFieldHandler?.(newValue);
    setFieldValue(name, newValue);
  };

  // change icon handler
  const changeIconHandler = () => {
    setType(getType === "password" ? "text" : "password");
  };
  return (
    <div className="mb-[12px]">
      <label
        htmlFor={htmlFor}
        className="block text-gray-700 font-bold mb-2"
      >
        {label} {required ? <span className="text-[red]">*</span> : ""}
      </label>
      <div className="relative">
        <Field
          
          id={id}
          placeholder={placeholder}
          fluid
          name={name}
          onChange={changeHandler}
          type={getType}
          readOnly={readOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
       
      </div>
      <ErrorMessage name={name}>
        {(msg) => <p className="text-[red]">{msg}</p>}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
