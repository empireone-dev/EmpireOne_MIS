import{g as r,c as n}from"./job-offer-service-8fedb9f8.js";import{h as a,D as s}from"./app-a38c20d9.js";async function c(e){return(await a.post("/api/new_joboffer",e)).data}function _(){return async function(e,o){const t=(await r()).data;console.log("result",t),e(s.actions.setJobOffers(t))}}function u(e){return async function(o,t){await n(e),console.log("result",e)}}function l(e){return async function(o,t){await c(e),console.log("result",e)}}export{u as a,l as c,_ as g};