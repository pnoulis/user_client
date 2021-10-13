// third party
import {useState, useEffect} from "react";
// import Router from "next/router";
import ReactLoading from "react-loading";
// own - utilities
import {backend} from "lib/utils";

/*
  This hook requires multiple components and utilities to function
 */

function Success({userStyle}) {
  const style = {
    outer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imgContainer: {
      width: "50px",
      height: "50px",
      ...userStyle,
    },
    img: {
      display: "inline-block",
      width: "100%",
      height: "100%",
    }
  };
  return (
    <article style={style.outer}>
      <p style={style.imgContainer}>
        <img style={style.img} src="/fetch_success.png" alt="fetch-success-icon"/>
      </p>
    </article>
  );
}

function Loading({userStyle}) {
  const style = {
    outer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...userStyle.outer,
    },
    imgContainer: {
      width: "50px",
      height: "50px",
      color: "inherit",
      ...userStyle.imgContainer,
    },
  };

  return (
    <article style={style.outer}>
      <div style={style.imgContainer}>
        <ReactLoading
          type="spinningBubbles"
          color={userStyle.color || "#1e90ff"}
          height="100%"
          width="100%"
        />
      </div>
    </article>
  );
}

const
mkSuccess = (userStyle) => <Success userStyle={userStyle}/>,
mkLoading = (userStyle) => <Loading userStyle={userStyle || {}}/>,
requestStatus = (backend, loading) => {
  if (!backend.status) return null;
  if (backend.status === "loading") return mkLoading;
  return loading ? mkLoading : mkSuccess;
},
useBackend = (loadingTime) => {
  const [Status, setStatus] = useState({req: null, res: null, status: ""});

  useEffect(() => {
    if (!Status.req) return null;
    return backend[Status.req.method]({...Status.req})
      .then(res => setStatus({...Status, req: null, res}))
      .catch(err => console.log(err));
  }, [Status.req]);

  useEffect(() => {
    if (!Status.res) return null;
    // if (!Status.res.ok && Status.res.payload.redirect) return Router.push(
    //   Status.res.payload.redirect
    // );
    return setStatus({...Status, status: "finished"});
  }, [Status.res]);

  useEffect(() => {
    if (Status.status !== "finished") return null;
    return setTimeout(() => setStatus({...Status, status: ""}), loadingTime || 500);
  }, [Status.status]);

  return {
    setReq: (req) => setStatus({...Status, status: "loading", req}),
    status: (loading) => requestStatus(Status, loading),
    res: !Status.status && Status.res,
  };
},
renderStatus = (status, ...args) => {
  if (!status) return null;
  return (status.name === "mkLoading") ?
    status(args[0] || {}) :
    status(args[1] || {});
};


export {useBackend, renderStatus};
