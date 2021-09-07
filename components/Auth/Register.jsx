import {useEffect} from "react";
import Router from "next/router";
import {APP_STORE, FORM_STORE} from "lib/stores";
import {useBackend, renderStatus} from "lib/hooks";
import {TextField_0 as TextField} from "components/Fields";
import {Socials} from "./Socials";
import style from "./styles/register.module.scss";

const
FIELD_SCHEMA = {email: "", password: "", confirmPassword: ""},
FORM_SCHEMA = {fieldErrors: {}, fields: FIELD_SCHEMA, edit: true};


function Register() {
  const
  {user, setApp} = APP_STORE.useAppContext(),
  {form, setForm} = FORM_STORE.useForm(FORM_SCHEMA),
  {setReq, status, res} = useBackend();

  function handleLogin(e) {
    e.preventDefault();
    if (status) return null;
    if (Object.values(form.fieldErrors).some(err => !!err)) return null;
    if (Object.values(form.fields).some(field => !field)) return null;
    setReq({method: "post", url: "/register", payload: form.fields});
  };

  useEffect(() => {
    if (!res) return null;
    const payload = res.payload;
    if (payload.fieldErrors) setForm("setErrors", payload.fieldErrors);
    if (!res.ok && payload.flashMessage) return setApp("addFlash", {flashId: payload.flashMessage});

    if (res.ok) {
      setApp("login", payload);
      setTimeout(() => setApp("addFlash", {flashId: "FRegisterSuccess"}), 3000);
      setTimeout(() => setApp("addFlash", {flashId: "FLoginSuccess"}), 3000);
      setTimeout(() => Router.push("/"), 1000);
    }
  }, [res]);

  return (
    <FORM_STORE.formContext.Provider value={{...form, setForm}}>
      <form onSubmit={handleLogin} className={style.register}>
        <fieldset>
          <legend className="visually-hide-element">Login form</legend>
          <TextField type="email" name="email" required/>
          <TextField type="password" name="password" required/>
          <TextField type="password" name="confirmPassword" required/>
          <input className={style.submitButton} type="submit" value="Login"/>
          <div style={{marginTop: "20px"}}>{renderStatus(status)}</div>
        </fieldset>
      </form>
    </FORM_STORE.formContext.Provider>
  );
}

export function RegisterDashboard() {
  return (
    <div className={style.registerDashboard}>
      <Socials location="register"/>
      <Register/>
    </div>
  );
}
