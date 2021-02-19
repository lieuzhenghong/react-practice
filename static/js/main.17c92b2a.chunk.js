(this["webpackJsonpreact-practice"]=this["webpackJsonpreact-practice"]||[]).push([[0],{10:function(e,n,t){},12:function(e,n,t){"use strict";t.r(n);var i=t(1),r=t.n(i),c=t(3),d=t.n(c),o=(t(9),t(4)),s=(t.p,t(10),t(0));function a(e){var n=e.ingredients.map((function(e){return Object(s.jsx)(u,{ingredient:e},e.id)}));return Object(s.jsx)("div",{className:"IngredientList",children:n})}function u(e){return Object(s.jsxs)("div",{className:"Ingredient",children:[Object(s.jsxs)("b",{children:[" ",e.ingredient.id," ",e.ingredient.name," "]}),e.ingredient.description,Object(s.jsx)(l,{ingredientId:e.ingredient.id})]})}function l(e){var n=i.useContext(b);return Object(s.jsx)("div",{className:"AmountSelector",children:Object(s.jsx)(j,{onChange:function(t){n({type:"changeAmount",id:e.ingredientId,amount:t})},ingredientId:e.ingredientId})})}function j(e){var n=i.useContext(g),t=n.ingredients_ordered.findIndex((function(n){return n.id===e.ingredientId}));return Object(s.jsx)("input",{onChange:function(n){return e.onChange(n.target.value)},type:"range",min:"0",max:"500",step:"10",value:n.ingredients_ordered[t].amount})}function h(){var e=i.useContext(g),n=e.ingredients_ordered.map((function(e){var n=f.findIndex((function(n){return n.id===e.id}));return Object(s.jsxs)("div",{children:[f[n].name,": ",e.amount,"g"]},e.id)})),t=e.ingredients_ordered.reduce((function(e,n){var t=f.findIndex((function(e){return e.id===n.id})),i=e;return Object.keys(i).forEach((function(e,r){i[e]+=f[t].macros[e]*n.amount})),i}),{calories:0,protein:0,fat:0}),r=Object.keys(t).map((function(e){return Object(s.jsxs)("div",{children:[e," : ",t[e].toFixed(2)]},e)})),c=function(e){return e.ingredients_ordered.reduce((function(e,n){var t=f.findIndex((function(e){return e.id===n.id}));return e+f[t].price*n.amount}),0)}(e);return Object(s.jsxs)("div",{className:"BowlStats",children:[Object(s.jsx)("p",{children:Object(s.jsx)("b",{children:"Your Bowl:"})}),n,Object(s.jsx)("p",{children:Object(s.jsx)("b",{children:" Macros: "})}),r,Object(s.jsx)("b",{children:" Total: "})," $",c.toFixed(2)]})}var f=[{id:1,name:"Chestnut Brown Rice",type:"carb",description:"Brown rice toasted to a nutty perfection",macros:{calories:1.11,protein:.026,fat:.009},price:.02},{id:2,name:"Free Range Fusilli",type:"carb",description:"Whole-wheat fusilli that was allowed to roam free during its lifetime",macros:{calories:1.58,protein:.06,fat:.009},price:.015},{id:11,name:"Sous-vide Chicken Breast",type:"protein",description:"Chicken breast gently coaxed to doneness so it stays tender and moist",macros:{calories:1.65,protein:.31,fat:.05},price:.035}],x={ingredients_ordered:[{id:1,amount:0},{id:2,amount:0},{id:11,amount:0}]},b=i.createContext(null),g=i.createContext(x);function m(e,n){switch(n.type){case"changeAmount":var t=e.ingredients_ordered,i=t.findIndex((function(e){return e.id===n.id}));return t[i].amount=n.amount,{ingredients_ordered:t};default:throw new Error}}var p=function(){var e=i.useReducer(m,x),n=Object(o.a)(e,2),t=n[0],r=n[1];return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)("h2",{children:"Bowls to the Gram"}),Object(s.jsx)("p",{children:Object(s.jsx)("i",{children:'Cool kids call it "Bees to the Gees"'})}),Object(s.jsx)("p",{children:" Build your own bowl and get exactly the macros you need"}),Object(s.jsxs)(b.Provider,{value:r,children:[Object(s.jsx)(a,{ingredients:f}),Object(s.jsx)(g.Provider,{value:t,children:Object(s.jsx)(h,{})})]})]})},O=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,13)).then((function(n){var t=n.getCLS,i=n.getFID,r=n.getFCP,c=n.getLCP,d=n.getTTFB;t(e),i(e),r(e),c(e),d(e)}))};d.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(p,{})}),document.getElementById("root")),O()},9:function(e,n,t){}},[[12,1,2]]]);
//# sourceMappingURL=main.17c92b2a.chunk.js.map