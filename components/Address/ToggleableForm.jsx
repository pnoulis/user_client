//third party
import {useEffect, useContext} from "react";
// own - utilities
import {useBackend} from "lib/hooks";
import {countries} from "lib/utils";
// import {addressesContext} from "./Addresses";
import {FORM_STORE} from "lib/stores";
// own components
import {Card} from "./Card";
import {Form} from "./Form";
// style
import style from "./styles/toggleableForm.module.scss";
const
FIELD_SCHEMA = {
  fullname: "",
  email: "",
  mobile: "",
  street: "",
  city: "",
  region: "",
  country: "",
  postcode: "",
  comment: "",
},
FORM_SCHEMA = {
  fieldErrors: {},
  fields: FIELD_SCHEMA,
  edit: true,
  NEW: true,
  toggled: false,
};

// usid
const usid = "60b79a7ec60fa31cb4da75f3";


const addresses = [
  {
    fullname: "sam",
    email: "pavlos.noulis@gmail.com",
    mobile: "873404300",
    street: "sam le 12",
    city: "bristol",
    region: "gloucesteshire",
    country: "United Kingdom",
    postcode: "bs605 2",
    comment: "hoetuheous",
    active: false,
  }
]

function finalFieldPrep(fields) {
  // the flexible fields add an extra br.  which need to be removed,
  // in the address form, that field is the comment
  const removebr = fields.comment.indexOf("<br>");
  if (removebr > 0) fields.comment = fields.comment.substr(0, removebr);
  fields.comment = fields.comment.trim();

  // the mobile field needs to be added a countrie dial up code
  const dialCode = countries.filter(cr => cr.name === fields.country).pop().dial_code,
        rDial = "\\" + dialCode; // some weird shit going on here,
  // Do not interpret the plus symbol as a special symbol when the
  // string will be changed to regExp.

  if (!fields.mobile.match(rDial)) {
    fields.mobile = dialCode + fields.mobile;
  }
  // add the user id to the payload
  fields.usid = usid;
}
export function ToggleableForm({address = addresses[0]}) {
  const
  // {setAddresses} = useContext(addressesContext),
  {form, setForm} = FORM_STORE.useForm({...FORM_SCHEMA, NEW: !address, toggled: !address && "edit" }),
  {setReq, status, res} = useBackend();

  return (
    <FORM_STORE.formContext.Provider value={{...form, setForm}}>
      <div className={style.toggleableForm}>
        {form.edit ? <Form/> : <Card address={address}/>}
      </div>
    </FORM_STORE.formContext.Provider>
    // <formContext.Provider value={{...lstore, ldispatch, Loading, Success}}>
    //   <div className={style.toggleableForm}>
    //     {edit ? <Form/> : <Card address={address}/>}
    //     {!edit ? <div>
    //                {ifLoading(Loading, {}) || ifSuccess(Success, {}, 1500)}
    //              </div> : null}
    //   </div>
    // </formContext.Provider>
  );
}
