import{r as i,u as m,b as u,j as e,s as x,y as p,a as c}from"./app-3b84976d.js";import{P as f,c as j,$ as y}from"./dialog-7e89dda1.js";import{L as b}from"./transition-471151c0.js";import{X as N}from"./XMarkIcon-9bf58b71.js";import"./portal-a2447bc2.js";import"./use-server-handoff-complete-d4414fc9.js";function v({title:a,titleId:t,...o},l){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:l,"aria-labelledby":t},o),a?i.createElement("title",{id:t},a):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"}),i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))}const w=i.forwardRef(v),n=w;function r(...a){return a.filter(Boolean).join(" ")}function M({navigation:a}){const t=m(),{sidebarOpen:o}=u(s=>s.app),l=window.location.pathname.split("/")[2],d=window.location.pathname.split("/")[1],g=[{id:1,name:"Heroicons",href:"#",initial:"H",current:!1},{id:2,name:"Tailwind Labs",href:"#",initial:"T",current:!1},{id:3,name:"Workcation",href:"#",initial:"W",current:!1}];function h(s){t(x())}return e.jsxs(e.Fragment,{children:[e.jsxs(f,{open:o,onClose:h,className:"relative z-0 lg:hidden",children:[e.jsx(j,{transition:!0,className:"fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"}),e.jsx("div",{className:"fixed inset-0 flex",children:e.jsxs(y,{transition:!0,className:"relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full",children:[e.jsx(b,{children:e.jsx("div",{className:"absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0",children:e.jsxs("button",{type:"button",onClick:()=>t(x(!1)),className:"-m-2.5 p-2.5",children:[e.jsx("span",{className:"sr-only",children:"Close sidebar"}),e.jsx(N,{"aria-hidden":"true",className:"h-6 w-6 text-white"})]})})}),e.jsxs("div",{className:"flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4",children:[e.jsx("div",{className:"flex h-16 shrink-0 items-center",children:e.jsx("img",{alt:"Your Company",src:"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",className:"h-8 w-auto"})}),e.jsx("nav",{className:"flex flex-1 flex-col",children:e.jsxs("ul",{role:"list",className:"flex flex-1 flex-col gap-y-7",children:[e.jsx("li",{children:e.jsx("ul",{role:"list",className:"-mx-2 space-y-1",children:a.map(s=>e.jsx("li",{children:e.jsxs("a",{href:s.href,className:r(s.current?"bg-gray-50 text-indigo-600":"text-gray-700 hover:bg-gray-50 hover:text-indigo-600","group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"),children:[e.jsx(s.icon,{"aria-hidden":"true",className:r(s.current?"text-indigo-600":"text-gray-400 group-hover:text-indigo-600","h-6 w-6 shrink-0")}),s.name]})},s.name))})}),e.jsxs("li",{children:[e.jsx("div",{className:"text-xs font-semibold leading-6 text-gray-400",children:"Your teams"}),e.jsx("ul",{role:"list",className:"-mx-2 mt-2 space-y-1",children:g.map(s=>e.jsx("li",{children:e.jsxs("a",{href:s.href,className:r(s.current?"bg-gray-50 text-indigo-600":"text-gray-700 hover:bg-gray-50 hover:text-indigo-600","group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"),children:[e.jsx("span",{className:r(s.current?"border-indigo-600 text-indigo-600":"border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600","flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"),children:s.initial}),e.jsx("span",{className:"truncate",children:s.name})]})},s.name))})]}),e.jsx("li",{className:"mt-auto",children:e.jsxs("a",{href:"#",className:"group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600",children:[e.jsx(n,{"aria-hidden":"true",className:"h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"}),"Settings"]})})]})})]})]})})]}),e.jsx("div",{className:"hidden lg:fixed lg:inset-y-0 lg:z-0 lg:flex lg:w-72 lg:flex-col",children:e.jsxs("div",{className:"flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4",children:[e.jsx("div",{className:"flex h-16 shrink-0 items-center",children:e.jsx("img",{alt:"Your Company",src:"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",className:"h-8 w-auto"})}),e.jsx("nav",{className:"flex flex-1 flex-col",children:e.jsxs("ul",{role:"list",className:"flex flex-1 flex-col gap-y-7",children:[e.jsx("li",{children:e.jsx("ul",{role:"list",className:"-mx-2 space-y-1",children:a.map(s=>e.jsx("li",{children:e.jsxs("button",{onClick:()=>p.visit(s.href),className:r(s.current?"bg-gray-200 text-indigo-600 w-full":"text-gray-700 hover:bg-gray-100 w-full hover:text-indigo-600","group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"),children:[e.jsx(s.icon,{"aria-hidden":"true",className:r(s.current?"text-indigo-600":"text-gray-400 group-hover:text-indigo-600","h-6 w-6 shrink-0")}),s.name]})},s.name))})}),d=="admin"&&e.jsx("li",{className:"mt-auto",children:e.jsxs(c,{href:"/admin/settings",className:"group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600",children:[e.jsx(n,{"aria-hidden":"true",className:"h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"}),"Settings"]})}),l=="it"&&d!=="admin"&&e.jsx("li",{className:"mt-auto",children:e.jsxs(c,{href:"/employee/it/settings",className:"group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600",children:[e.jsx(n,{"aria-hidden":"true",className:"h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"}),"Settings"]})}),l=="users"&&d!=="admin"&&e.jsx("li",{className:"mt-auto",children:e.jsxs(c,{href:"/employee/users/settings",className:"group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600",children:[e.jsx(n,{"aria-hidden":"true",className:"h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"}),"Settings"]})})]})})]})})]})}export{M as default};