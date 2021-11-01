import React, {useEffect, useState, useRef} from "react";
import {APP_STORE} from "lib/stores";
import {backend} from "lib/utils";
import getUrls from "./urls";
import {footer} from "./footer";

const compositeResources = {
  footer,
};

function fullFillRequests(requests) {
  const promises = [];
  const resolved = {};

  requests.forEach((req, i) => {
    promises.push(getUrls(req));
    promises[i] &&= backend.get({
      url: promises[i]
    });
  });

  return Promise.all(promises)
    .then(payloads => {
      payloads.forEach((load, i) => {
        resolved[requests[i]] = load.ok ? load.payload : null;
      });
      return resolved;
    }).catch(err => {
      console.log(err);
      return resolved;
    });
}


// unnecessary since iam the only one making use
// of this library
function removeDuplicates(array) {
  const unique = [], isDuplicate = true;
  for (let i = 0; i < array.length; ++i) {
    if (array[i] === isDuplicate) continue;
    unique.push(array[i]);
    for (let y = i + 1; y < array.length; ++y) {
      if (array[i] === array[y]) array[y] = isDuplicate;
    }
  }
  return unique;
}
function getUnsubmitted(submittedRequests, newRequests) {
  return !submittedRequests.length
    ? newRequests
    : newRequests.filter(req => submittedRequests.every(
      submitted => submitted !== req
    ) && req);
}

function getRequested(requests, remoteResources) {
  const requested = {};
  let composite;
  requests.forEach(req => {
    composite = compositeResources[req];
    requested[req] = composite ? composite.get(remoteResources) :
      remoteResources[req] || null;
  });
  return requested;
}

function deconstructComposites(requests) {
  const unpacked = [];
  let current;
  for (let i = 0; i < requests.length; ++i) {
    current = compositeResources[requests[i]];
    current ? unpacked.push(...current.getRemotes()) :
      unpacked.push(requests[i]);
  }
  return unpacked;
}

const submittedRequests = [];
export const useResources = (...requests) => {
  const { app, setApp } = APP_STORE.useAppContext();
  useEffect(async () => {
    const deconstructed = deconstructComposites(requests);
    const unSubmitted = getUnsubmitted(submittedRequests, deconstructed);
    if (!unSubmitted.length) return;
    submittedRequests.push(...unSubmitted);
    const fullfilled = await fullFillRequests(unSubmitted);
    setApp("setResources", fullfilled);
  }, []);
  return getRequested(requests, app.resources || {});
};
