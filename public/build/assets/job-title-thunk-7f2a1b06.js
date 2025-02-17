<<<<<<<< HEAD:public/build/assets/job-title-thunk-57a4e2b9.js
import{h as s,t as i}from"./app-9ccb6e50.js";async function n(){return(await s.get("/api/job_position")).data}function r(){return async function(t,a){const o=(await n()).data;console.log("result",o),t(i.actions.setJobPositions(o))}}export{r as g};
========
import{h as s,t as i}from"./app-3b84976d.js";async function n(){return(await s.get("/api/job_position")).data}function r(){return async function(t,a){const o=(await n()).data;console.log("result",o),t(i.actions.setJobPositions(o))}}export{r as g};
>>>>>>>> d0daf5eeaaa72b604a736ea838c882062311add9:public/build/assets/job-title-thunk-7f2a1b06.js
