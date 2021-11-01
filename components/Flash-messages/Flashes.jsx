import React from "react";
import Router from "next/router";
import styled from "styled-components";
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

const FLASHES = {
  FCheckout: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 2, ...overwriteConfig};
    return {
      config,
      get: key => <Checkout key={key} {...config}/>
    };
  },
  FOutOfStock: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 2, ...overwriteConfig};
    return {
      config,
      get: key => <OutOfStock key={key} {...config}/>
    };
  },
  pager: (overwriteConfig = {}) => {
    const config = {timeAlive: null, order: 1, ...overwriteConfig};
    return {
      config,
      get: key => (<Mounter key={key} {...config}/>),
    };
  },
  FRegisterDuplicate: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 0, ...overwriteConfig};
    return {
      config,
      get: key => <AccountDuplicate key={key} {...config}/>
    };
  },
  FRegisterFailure: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 0, ...overwriteConfig};
    return {
      get: key => <RegisterFailure key={key} {...config}/>
    };
  },
  FLoginNoAccount: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 0, ...overwriteConfig};
    return {
      config,
      get: key => <NoAccount key={key} {...config}/>
    };
  },
  FLoginPassword: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 0, ...overwriteConfig};
    return {
      config,
      get: key => <WrongPassword key={key} {...config}/>
    };
  },
  FRegisterSuccess: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 0, ...overwriteConfig};
    return {
      config,
      get: key => <RegisterSuccess key={key} {...config}/>
    };
  },
  FLoginSuccess: (overwriteConfig = {}) => {
    const config = {timeAlive: 7000, order: 1, ...overwriteConfig};
    return {
      config,
      get: key => <LoginSuccess key={key} {...config}/>
    };
  },
};

const
Mounter = ({el}) => {
  return React.isValidElement(el) ? el : null;
},
OutOfStock = () => {
  return (
    <FlashMessage className="outofstock">
      Out of stock!
    </FlashMessage>
  );
},
Checkout = () => {
  function checkout() {
    // nextjs
    if (Router) {
      return Router.push("/checkout");
    }
    return "";
  }
  if (/checkout/.test(window.location)) return null;
  return (
    <FlashMessage className="checkout" onClick={checkout}>
      <p>checkout!</p>
    </FlashMessage>
  );
},
AccountDuplicate = () => {
  return (
    <article className={style.flashContainer}>
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
NoAccount = () => {
  return (
    <article className={style.flashContainer}>
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

RegisterFailure = () => {
  return (
    <article className={style.flashContainer}>
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
WrongPassword = () => {
  return (
    <article className={style.flashContainer}>
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
RegisterSuccess = () => {
  return (
    <article className={style.flashContainer}>
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
LoginSuccess = () => {
  return (
    <article className={style.flashContainer}>
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


export default FLASHES;
