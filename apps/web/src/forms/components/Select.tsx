import { Field, ErrorMessage } from "formik";
import TextError from './TextError';
import "../styles/select.scss";

interface SelectProps {
    label: string;
    name: string;
    options: { key: string; value: string }[];
    [key: string]: any;
}

export default function Select(props: SelectProps) {
  const { label, name, options, ...rest } = props;

  return (
    <div className="form-control select">
      <label className="select__label" htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {
          options.map(option => {
            return (
              <option key={option.key} value={option.value}>
                {option.key}
              </option>
            )
          })
        }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
