// third party
import {useEffect} from "react";
// own - utilities
import {countries} from "lib/utils";
import {FORM_STORE} from "lib/stores";
import {useStyle, useFocus, styleReducer} from "lib/hooks";
// style
import style from "./styles/countryField_0.module.scss";

/*
  1) ability to limit the number of countries that can be selected
  2) ability to have a default country
 */


export function countryField({key, exclude, include, deflt, optional,}) {

  let filtered = [];
  if (exclude && exclude.length) {
    filtered = countries.filter(cr => {
      for (const ecr of exclude) {
        if (ecr !== cr.name) return cr;
      }
    });
  }
  if (!filtered.length) filtered = countries;

  if (include && include.length) {
    filtered = filtered.filter(cr => {
      for (const icr of include) {
        if (icr === cr.name) return cr;
      }
    });
  }

  if (deflt) {
    filtered.push(filtered.filter(cr => cr.name === deflt).pop());
  }

  return <CountryField key={key || 0} countries={filtered} deflt={filtered.pop()}
                       optional/>;
}

function CountryField({countries, deflt, optional}) {
  const
  {fields, edit, fieldErrors, setForm} = FORM_STORE.useFormContext(),
  {focused, bindFocus} = useFocus(),
  setStyle = useStyle(style,
                      {focused, input: fields.country, error: fieldErrors.country},
                      styleReducer);

  function handleInput(e) {
    e.preventDefault();
    setForm("setInput", "country", e.target.value);
  }


  useEffect(() => {
    if (deflt) setForm("setInput", "country", deflt.name);
  }, []);

  return (
    <div className={style.countrySelectWrapper}>
      <select
        value={fields.country || deflt.name}
        className={setStyle(["invalid", "focused"], style.countrySelectField)}
        onChange={handleInput}>
        <option key={0} value="country*">country*</option>
        {countries.map((cr, i) => {
          return (
            <option
              key={i + 1}
              value={cr.name}
            >
              {cr.name}
            </option>
          );
        })}
      </select>
      <span className={style.errorMessage}>
        {fieldErrors.country}
      </span>
    </div>
  );
}
