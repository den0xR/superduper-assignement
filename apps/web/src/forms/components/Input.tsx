import { Field, ErrorMessage } from "formik";
import type { FieldProps } from "formik";
import TextError from './TextError';
import "../styles/input.scss";

interface InputProps {
    label: string;
    name: string;
    placeholder?: string;
}

export default function Input(props: InputProps & FieldProps) {
  const { label, name, ...rest } = props;

  return (
    <div className="form-control input">
      <label className="input__label" htmlFor={name}>{label}</label>
      <Field type="text" id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
