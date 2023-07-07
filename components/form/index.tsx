import {
  Formik,
  FormikConfig,
  FormikValues,
  useFormikContext,
  Field,
  FieldArray,
} from "formik";
import Input, { InputProps } from "../common/Input";
import Button, { ButtonProps } from "../common/Button";
import React from "react";
import Select, { SelectProps } from "../common/Select";

const Form = (props: FormikConfig<FormikValues>) => (
  <Formik {...props}>{() => <>{props.children}</>}</Formik>
);

const FormSelect = ({
  name,
  value,
  onChange,
  onBlur,
  ref,
  ...props
}: SelectProps) => {
  const { values } = useFormikContext<any>();
  return <Select value={name ? values?.[name] : value} {...props} />;
};

export const FormButton = ({ children, ref, type, ...props }: ButtonProps) => {
  const { isSubmitting, errors, handleSubmit, handleReset } =
    useFormikContext<any>();
  const onClick = React.useCallback(() => {
    if (type === "reset") {
      handleReset();
    } else {
      handleSubmit();
    }
  }, [type, handleSubmit, handleReset, isSubmitting, errors]);
  return (
    <Button
      ref={ref as any}
      type={type}
      loading={isSubmitting}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export const FormInput = ({
  name,
  value,
  onChange,
  onBlur,
  ref,
  ...props
}: InputProps) => {
  const { errors, handleBlur, handleChange, touched, values } =
    useFormikContext<any>();

  return (
    <Input
      ref={ref as any}
      name={name}
      value={name ? values?.[name] : value}
      onChange={handleChange || onChange}
      onBlur={handleBlur}
      error={name ? Boolean(touched?.[name]) && Boolean(errors?.[name]) : false}
      {...props}
    />
  );
};

Form.Input = FormInput;
Form.Button = FormButton;
Form.Field = Field;
Form.FieldArray = FieldArray;

export default Form;
