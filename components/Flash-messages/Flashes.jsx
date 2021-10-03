// own - utilities
import {APP_STORE} from "lib/stores";
const {useAppContext} = APP_STORE;
import styled from "styled-components";
import Router from "next/router";
const style = {};

const FlashMessage = styled.div`
margin: auto;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
min-height: 50px;
font-size: var(--font-size-large);
flex: 1 1 50px;
width: 100%;
background-color: var(--color-primary);
font-weight: bold;
letter-spacing: 1px;
color: var(--color-font);
max-width: ${props => props.mWidth || "100%"};
border-radius: 10px;
&:nth-of-type(n + 1) {
margin-bottom: 6px;
};

@media (min-width: 1100px) {
font-size: vac(--font-size-2large);
flex: 1 1 80px;
}


&.checkout {
cursor: pointer;
text-transform: capitalize;
&:hover {
background-color: var(--color-semantic);
color: white;
}
}

&.outofstock {
background-color: var(--color-error);
color: white;
}
`;


export const FLASHES = {
  FRegisterDuplicate: (index, flashMessage) => <AccountDuplicate key={index} {...flashMessage}/>,
  FRegisterFailure: (index, flashMessage) => <RegisterFailure key={index} {...flashMessage}/>,
  FLoginNoAccount: (index, flashMessage) => <NoAccount key={index} {...flashMessage}/>,
  FLoginPassword: (index, flashMessage) => <WrongPassword key={index} {...flashMessage}/>,
  FRegisterSuccess: (index, flashMessage) => <RegisterSuccess key={index} {...flashMessage}/>,
  FLoginSuccess: (index, flashMessage) => <LoginSuccess key={index} {...flashMessage}/>,
  FOutOfStock: (index, flashMessage) => <OutOfStock key={index} {...flashMessage}/>,
  FCheckout: (index, flashMessage) => <Checkout key={index} {...flashMessage}/>,
  pager: (index, mount)=> <Mounter key={index} element={mount.element}/>,
};

const
Mounter = ({element}) => {
  return element;
},
useTimeout = (flashId, timeAlive) => {
  const {setApp} = useAppContext();
  setTimeout(() => setApp("removeFlash", flashId), timeAlive);
},
OutOfStock = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);
  return (
    <FlashMessage id={flashId} className="outofstock">
      Out of stock!
    </FlashMessage>
  );
},
Checkout = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);
  function checkout() {
    Router.push("/checkout");
  }
  return (
    <FlashMessage id={flashId} className="checkout" onClick={checkout}>
      <p>checkout!</p>
    </FlashMessage>
  );
},
AccountDuplicate = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article id={flashId} className={style.flashContainer}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        An account has already been registered with that email!
      </p>
    </article>
  );
},
NoAccount = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        No Account registered with that email!
      </p>
    </article>
  );
},

RegisterFailure = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        Failed to register
      </p>
    </article>
  );
},
WrongPassword = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="smalls-user-icon"
        />
      </div>
      <p className={style.message}>
        Passwords do not match!
      </p>
    </article>
  );
},
RegisterSuccess = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user_success.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        Yay!! &ensp; Successfull registration.
      </p>
    </article>
  );
},
LoginSuccess = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user_success.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        Welcome, &ensp; user &ensp;!
      </p>
    </article>
  );
};
