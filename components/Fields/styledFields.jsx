import React, {Fragment} from "react";
import {FORM_STORE} from "lib/stores";
import {FORM_UTILS} from "lib/utils";
import {useFocus} from "lib/hooks";
import composeField from "./styledComposeField";

export {FieldFactory as Field};
const
{useFormContext} = FORM_STORE,
{useStyledPassword} = FORM_UTILS,
standardConfig = {
  type: "text",
  name: "none",
  value: "",
  handleInput: () => {},
  attributes: {
  },
};


export function FieldFactory({config, state = {}, variant}) {
  const { fields, fieldErrors, edit, setForm } = useFormContext();
  const { focused, bindFocus } = useFocus();
  const [reveal, password] = useStyledPassword(config.type);
  const { name } = config;
  const value = fields[name];
  let error = fieldErrors[name];
  const [ Field, reducer ] = composeField(variant);
  const inputProps = {...standardConfig, ...config, value};
  if (config.type === "password") {
    inputProps.type = reveal ? "text" : "password";
  }

  const handleInput = e => {
    e.stopPropagation();
    return !edit ? null : setForm("setInput", name, e.target.value);
  };

  state.invalid = edit && error;
  state.valid = edit && !state.invalid && value;
  state.focused = focused || value;
  if (config.name === "confirmPassword") {
    state.invalid = edit && (value !== fields.password);
    state.valid = edit && !state.invalid;
    error = state.invalid && "Passwords do not match!";
  }

  return (
    <Field {...bindFocus} style={reducer(state)} password={config.type === "password"}>
      <Input {...inputProps} onInput={handleInput}/>
      {password}
      <Optional display={config.required}/>
      <Error display={!config.error}>{error}</Error>
    </Field>
  );
}

function Input({type, name, clientName, value, onInput, attributes}) {
  return (
    <Fragment>
      <label htmlFor={name}>
        {clientName || name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(' ')}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onInput}
        {...attributes}
      />
    </Fragment>
  );
}

function Optional({display}) {
  if (!display) return null;
  return (
    <span className="required">optional</span>
  );
}

function Error({display, children}) {
  if (!display) return null;
  return (
    <span className="error">{children}</span>
  );
}
