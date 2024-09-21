"use strict";(self.webpackChunkz_documentation=self.webpackChunkz_documentation||[]).push([[952],{4951:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>a,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var s=n(4848),i=n(8453);const o={sidebar_position:8},r="SetItems",d={id:"zUI/Methods/setItems",title:"SetItems",description:"La m\xe9thode SetItems est utilis\xe9e pour d\xe9finir les \xe9l\xe9ments d'un menu.",source:"@site/docs/zUI/Methods/setItems.md",sourceDirName:"zUI/Methods",slug:"/zUI/Methods/setItems",permalink:"/docs/zUI/Methods/setItems",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/zUI/Methods/setItems.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"tutorialSidebar",previous:{title:"OnOpen",permalink:"/docs/zUI/Methods/onOpen"},next:{title:"SetVisible",permalink:"/docs/zUI/Methods/setVisible"}},l={},c=[{value:"Fonction <code>SetItems</code>",id:"fonction-setitems",level:2},{value:"Param\xe8tres",id:"param\xe8tres",level:3},{value:"Exemple d&#39;utilisation",id:"exemple-dutilisation",level:3},{value:"R\xe9sum\xe9",id:"r\xe9sum\xe9",level:3}];function u(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"setitems",children:"SetItems"})}),"\n",(0,s.jsxs)(t.p,{children:["La m\xe9thode ",(0,s.jsx)(t.strong,{children:"SetItems"})," est utilis\xe9e pour d\xe9finir les \xe9l\xe9ments d'un menu."]}),"\n",(0,s.jsxs)(t.h2,{id:"fonction-setitems",children:["Fonction ",(0,s.jsx)(t.code,{children:"SetItems"})]}),"\n",(0,s.jsx)(t.p,{children:"La syntaxe pour utiliser la m\xe9thode de d\xe9finition d'\xe9l\xe9ments est la suivante :"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-lua",children:"zUI:SetItems(Items)\n"})}),"\n",(0,s.jsx)(t.p,{children:"Cette m\xe9thode permet de configurer les \xe9l\xe9ments d'un menu en passant une fonction qui g\xe8re l'ajout de ces \xe9l\xe9ments."}),"\n",(0,s.jsx)(t.h3,{id:"param\xe8tres",children:"Param\xe8tres"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Items"})," ",(0,s.jsx)(t.em,{children:"[function]"})," : Une fonction qui re\xe7oit comme param\xe8tre un objet ",(0,s.jsx)(t.strong,{children:"zUI"})," et permet d'ajouter les \xe9l\xe9ments au menu."]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"exemple-dutilisation",children:"Exemple d'utilisation"}),"\n",(0,s.jsxs)(t.p,{children:["Voici un exemple d'utilisation de la m\xe9thode ",(0,s.jsx)(t.strong,{children:"SetItems"})," :"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-lua",children:'    zUI:SetItems(function(Items)\r\n        Items:AddButton("Option 1", "Description de l\'option 1", {}, function(onSelected)\r\n            if onSelected then\r\n                print("Option 1 s\xe9lectionn\xe9e.")\r\n            end\r\n        end)\r\n\r\n        Items:AddButton("Option 2", "Description de l\'option 2", {}, function(onSelected)\r\n            if onSelected then\r\n                print("Option 2 s\xe9lectionn\xe9e.")\r\n            end\r\n        end)\r\n    end)\n'})}),"\n",(0,s.jsx)(t.p,{children:"Dans cet exemple, deux boutons sont ajout\xe9s au menu, avec une action sp\xe9cifique pour chaque option."}),"\n",(0,s.jsx)(t.h3,{id:"r\xe9sum\xe9",children:"R\xe9sum\xe9"}),"\n",(0,s.jsxs)(t.p,{children:["Pour utiliser la m\xe9thode ",(0,s.jsx)(t.strong,{children:"SetItems"})," dans ",(0,s.jsx)(t.strong,{children:"zUI"})," :"]}),"\n",(0,s.jsxs)(t.p,{children:["Utilisez ",(0,s.jsx)(t.code,{children:"zUI:SetItems(Items)"})," pour d\xe9finir les \xe9l\xe9ments d'un menu. La fonction pass\xe9e en param\xe8tre ajoute les diff\xe9rents \xe9l\xe9ments au menu."]})]})}function a(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>d});var s=n(6540);const i={},o=s.createContext(i);function r(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);