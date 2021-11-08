import {useEffect, useContext, useRef} from "react";
import Link from "next/link";
import {useBackend} from "lib/hooks";
import {FORM_STORE, APP_STORE} from "lib/stores";
import {Field, BeingEdited, NotBeingEdited} from "components/Fields";
import styled from "styled-components";
import style from "./styles/toggleableAccount.module.scss";
import * as Styles from "./Layout";
import {Header} from "./Header";

const
FIELD_SCHEMA = {
  email: "",
  password: "",
  confirmPassword: "",
  loginMethods: "",
},
FIELD_MAP = {
  email: i => (<Field key={i} config={{type: "text", name: "email"}} variant={1}/>),
  password: i => (<Field key={i} config={{type: "password", name: "password"}} variant={1}/>),
  confirmPassword: i => (<Field key={i} config={{type: "password", name: "confirmPassword"}} variant={1}/>),
  // loginMethods: (i, methods) => (<LoginMethods key={i} methods={methods}/>),
  loginMethods: i => (<Field key={i} config={{type: "text", name: "loginMethods", attributes: {disabled: true}}} variant={1}/>),
},
FORM_SCHEMA = {
  fieldErrors: {},
  fields: FIELD_SCHEMA,
  edit: false,
  toggled: false,
},
{ useForm, formContext } = FORM_STORE;

const Methods = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: var(--color-font);
font-weight: bold;
text-transform: capitalize;
.methods {

}
`;
const LoginMethods = () => {
  const {fields} = FORM_STORE.useFormContext();
  let methods = fields.loginMethods;
  // try {
  //   methods = JSON.parse(fields.loginMethods);
  // } catch (err) {
  //   methods = [];
  // }
  return (
    <Methods>
      <p>login methods &nbsp;:</p>
      <p className="methods">{methods.length && methods.length === 1 ? methods[0] : methods.join(", ")}</p>
    </Methods>
  );
};
const
AccountWrapper = styled.div`
flex: 0;
margin: auto;
width: 100%;
max-width: 600px;
padding: 0 10px;
@media (min-width: 1000px) {
font-size: var(--font-root-2large);
flex: 1;
}
`,
ActionsWrapper = styled.div`
margin-bottom: 50px;
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
align-items: flex-end;
`,
DeleteAccountLink = styled.p`
color: var(--color-blue-dodge-light);
font-size: var(--font-size-regular);
font-weight: bold;
letter-spacing: 0.5px;
cursor: pointer;

&:hover {
color: var(--color-font);
}
`,
Form = styled.form`
padding: 0 2px;
fieldset { border: none; outline: none};
height: 350px;
`;
const account = {
  email: "pavlos@gmail.com",
  password: "some funcking password",
  loginMethods: "custom, facebook",
};

const turn = JSON.stringify(account);
function ToggleableAccount() {
  const {form, setForm} = useForm({...FORM_SCHEMA, fields: {...FIELD_SCHEMA, ...account, confirmPassword: account.password}});
  const {setReq, status, res} = useBackend();

  useEffect(() => {
    switch (form.toggled) {
    case "delete":
      if (form.NEW) return null;
    case "done":
    default: return null;
    }
  }, [form.toggled]);

  return (
    <Styles.Layout>
      <Header/>
      <AccountWrapper>
        <formContext.Provider value={{...form, setForm}}>
          <Actions edit={form.edit}/>
          <User account={account} edit={form.edit}/>
        </formContext.Provider>
      </AccountWrapper>
    </Styles.Layout>
  );
}

function DeleteAccount() {
  function handleAccountDeletion() {
  }
  return (
    <DeleteAccountLink onClick={handleAccountDeletion}>
      terminate account
    </DeleteAccountLink>
  );
}
function Actions({edit}) {
  return (
    <ActionsWrapper>
      <DeleteAccount/>
      {edit ? (<BeingEdited style={style}/>) : (<NotBeingEdited style={style}/>)}
    </ActionsWrapper>
  );
}
function User({account, edit}) {
  const {fields, setForm} = FORM_STORE.useFormContext();
  const order = useRef();
  if (edit && !order.current) {
    const keys = Object.keys(account);
    keys.splice(keys.findIndex(e => e === "password") + 1, 0, "confirmPassword");
    order.current = keys;
  }

  return (
    <Form onSubmit={() => {}}>
      <fieldset>
        <legend className="visually-hide-element">Account Form</legend>
        {order.current && edit ? order.current.map((f, i) => FIELD_MAP[f](i)) :
         Object.keys(account).map((f, i) => FIELD_MAP[f](i))}
      </fieldset>
    </Form>
  );
}

export {ToggleableAccount as Account};
