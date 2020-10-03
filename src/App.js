import React from "react";
import "./styles.css";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

const brPhoneMaskPropertys = {
  mask: "(99) 9999-99999",
  maskPlaceholder: null,
  minLength: 14, // Used in react-hook-form validation
  beforeMaskedStateChange: ({ nextState }) => {
    let { value } = nextState;

    const digits = value.replace(/\D/g, "");

    if (digits.length === 11) {
      value = digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    return {
      ...nextState,
      value
    };
  }
};

export default function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Success!");
  };

  const Error = ({ children }) => {
    return <span style={{ color: "#d01d1d" }}>{children}</span>;
  };

  return (
    <div className="App">
      <h1>React BR Phone Mask</h1>
      <h2>BR Phone Mask made with react-input-mask 3.0.0-alpha2</h2>

      <h3>Example</h3>
      <InputMask
        name="phone-example"
        type="text"
        mask={brPhoneMaskPropertys.mask}
        maskPlaceholder={brPhoneMaskPropertys.maskPlaceholder}
        beforeMaskedStateChange={brPhoneMaskPropertys.beforeMaskedStateChange}
      />

      <h3>Validation with react-hook-form</h3>
      <form style={{ display: "block" }} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputMask
            name="phone"
            type="text"
            mask={brPhoneMaskPropertys.mask}
            maskPlaceholder={brPhoneMaskPropertys.maskPlaceholder}
            beforeMaskedStateChange={
              brPhoneMaskPropertys.beforeMaskedStateChange
            }
            ref={register({
              required: true,
              minLength: brPhoneMaskPropertys.minLength
            })}
          />
        </div>
        <div>{errors.phone && <Error>Phone isn't valid</Error>}</div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
