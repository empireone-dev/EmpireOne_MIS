import{h as n,o as a}from"./app-753af2e0.js";function e(){try{return n.get("/api/account")}catch{}}function s(){return async function(t,o){const c=await e();t(a.actions.setAccounts(c.data.result))}}export{s as g};