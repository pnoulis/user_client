// own - utilities
import {FORM_STORE} from "lib/stores";
// own - components
import {TextField_0, FlexibleField_1, Done, Cancel, countryField} from "components/Fields";
// import {
//   TextField_0, countryField, FlexibleField_1, Done,
//   Cancel
// } from "components/Fields";
// style
import style from "./styles/form.module.scss";

const
commentStyle = {minHeight: "70px"},
FIELD_MAP = {
  fullname: (i) => (<TextField_0 key={i} type="text" name="fullname" required={true}/> ),
  email: (i) => (<TextField_0 key={i} type="email" name="email" required={true}/>),
  mobile: (i) => (<TextField_0 key={i} type="tel" name="mobile" required={true}/>),
  street: (i) => (<TextField_0 key={i} type="text" clientName="address" name="street" required={true}/>),
  city: (i) => (<TextField_0 key={i} type="text" name="city" required={true}/>),
  region: (i) => (<TextField_0 key={i} type="text" clientName="State/Region" name="region" required={false}/>),
  country: (i) => countryField({key: i, deflt: "United Kingdom", required: true,}),
  postcode: (i) => (<TextField_0 key={i} type="text" name="postcode" required={true}/>),
  comment: (i) => (<FlexibleField_1 key={i} style={commentStyle} name="comment" disabled={false}/>)
},
submitStyle = {
  marginLeft: "auto",
  height: "55px",
  width: "130px",
  borderRadius: "6px",
  backgroundColor: "rgba(67, 255, 120, 1)",
  border: "2px solid black",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  hovered: {
    backgroundColor: "rgba(67, 255, 120, 0.7)",
  },
},
cancelStyle = {
  height: "55px",
  width: "130px",
  textTransform: "uppercase",
  borderRadius: "6px",
  border: "2px solid black",
  fontWeight: "bold",
  backgroundColor: "rgba(0, 173, 238, 0.75)",
  letterSpacing: "1.5px",
  hovered: {
    backgroundColor: "rgba(0, 173, 238, 0.5)",
  }
};

export function Form() {
  const { fields, NEW, setForm }= FORM_STORE.useFormContext();

  return (
    <form className={style.address}>
      <fieldset>
        <legend className="visually-hide-element">
          Address Form
        </legend>
        {Object.keys(fields).map((f, i) => {
          return FIELD_MAP[f](i);
        })}
        <Done style={style}><span>submit</span></Done>
        {!NEW && (<Cancel style={style}/>)}
      </fieldset>
      <div>
        {/* {ifLoading(Loading, {}) || ifSuccess(Success, {}, 1500)} */}
      </div>
    </form>
  );
}
