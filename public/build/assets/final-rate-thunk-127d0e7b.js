import{s as n}from"./applicant-final-service-912b1e89.js";import{w as i}from"./app-482355be.js";import{a as r}from"./applicant-record-service-e8bf8c30.js";function p(t){return async function(a,e){const s=await r(t);console.log("result",s.status),a(i.actions.setApplicant(s.status))}}function u(t){return async function(a,e){await n(t)}}export{p as g,u as s};