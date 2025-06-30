import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from 'react'
import { isAddress } from "ethers";
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { getChains } from '../../chains/slices/chains-slice'
import { selectChains } from '../../chains/slices/chains-slice'
import Input from '../../../forms/components/Input';
import Select from '../../../forms/components/Select';
import SubmitButton from '../../../forms/components/SubmitButton';
import { getBalance } from '../slices/balance-slice';
import "../styles/balance-checker-form.scss"

interface FormValues {
  textInput: string;
  selectOption: string;
}

const initialValues: FormValues = {
  textInput: "",
  selectOption: "",
};

const validationSchema = Yup.object({
  textInput: Yup.string()
    .required("*This field is required")
    .test(
      "is-eth-address",
      "*Must be a valid Ethereum address",
      (value) => (value ? isAddress(value) : false)
    ),
  selectOption: Yup.string().required("*This field is required"),
})

export default function FormElements() {
  const dispatch = useAppDispatch()
  const chains = useAppSelector(selectChains)

  const dropdownOptions = [
    { key: "Select a chain", value: "" },
    ...chains.map(chain => ({ key: chain.name, value: chain.chainId })),
  ];

  useEffect(() => {
    dispatch(getChains())
  }, [])

  const onSubmit = (values: FormValues) => {
    dispatch(getBalance({
      chainId: values.selectOption,
      contractAddress: values.textInput,
    }))
  };


  return (
    <div className="balance-checker-form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Form className="form-elements">
          <Select name="selectOption" label="Select a chain" options={dropdownOptions} />
          <Input name="textInput" placeholder="Input some text" label="Contract Address" />
          <SubmitButton>Check Balance</SubmitButton>
        </Form>
      </Formik>
    </div>
  );
}
