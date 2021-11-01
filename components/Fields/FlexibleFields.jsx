import {decode} from "html-entities";
import {useRef, useEffect, useState} from "react";
import {FORM_STORE} from "lib/stores";
import {useStyle, useFocus, styleReducer} from "lib/hooks";
import style from "./styles/flexibleField_0.module.scss";
import style1 from "./styles/flexibleField_1.module.scss";
const {useFormContext} = FORM_STORE;

export function FlexibleField_0({name, disabled}) {
  const
  {fields, edit, setForm} = useFormContext(),
  thisRef = useRef();

  function handleInput(e) {
    setForm("setInput", name, decode(e.target.innerHTML));
  }

  useEffect(() => {
    if (disabled) return;
    const selection = window.getSelection();
    if (fields[name]) selection.collapse(thisRef.current, 1);
  }, [fields[name]]);

  return (
    <div className={style.textField}>
      <span
        ref={thisRef}
        className={style.editable}
        contentEditable={disabled ? false : edit}
        onInput={handleInput}
        dangerouslySetInnerHTML={{__html: fields[name]}}
      >
      </span>
    </div>
  );
}


export function FlexibleField_1({name, clientName, style, disabled, required,}) {
  const {fields, edit, fieldErrors, setForm} = useFormContext(),
        {focused, bindFocus} = useFocus(),
        thisRef = useRef(),
        setStyle = useStyle(style1,
                            {focused, input: fields[name], error: fieldErrors[name]},
                            styleReducer);

  function handleInput(e) {
    e.preventDefault();
    setForm("setInput")(name, decode(e.target.innerHTML));
  }

  useEffect(() => {
    if (disabled) return;
    const selection = window.getSelection();
    if (fields[name]) selection.collapse(thisRef.current, 1);
  }, [fields[name]]);

  return (
    <div className={style1.textField} {...bindFocus}>
      <p className={setStyle(["focused", "valid", "invalid"], style1.label)}>
        {clientName || name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(' ')}
        <span className={style1.requiredStar}>{required && "*"}</span>
      </p>
      <p
        style={style || {}}
        ref={thisRef}
        className={setStyle(["focused", "valid", "invalid"], style1.input)}
        contentEditable={disabled ? false : edit}
        onInput={handleInput}
        dangerouslySetInnerHTML={{__html: fields[name]}}
      >
      </p>
      <p className={setStyle(["focused", "valid", "invalid"], style1.optional)}>
        {required ? "" : "optional"}
      </p>
      <p className={style1.errorMessage}>
        {fieldErrors[name] || null}
      </p>
    </div>
  );
}
