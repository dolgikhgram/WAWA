import{R as k,r as a,j as s}from"./index-CJ7KgJTQ.js";const p="_container_kiykl_1",C="_scrollableContainer_kiykl_7",S="_firstItem_kiykl_11",R="_list_kiykl_14",$="_item_kiykl_24",b="_gameCard_kiykl_29",B="_img_kiykl_39",I="_dimmed_kiykl_47",j="_scrollButton_kiykl_52",T="_scrollButtonRight_kiykl_77",D="_firstVisible_kiykl_82",t={container:p,scrollableContainer:C,firstItem:S,list:R,item:$,gameCard:b,img:B,dimmed:I,scrollButton:j,scrollButtonRight:T,firstVisible:D},n=[{id:0,imgSrc:"./Destiny2.2.png",altText:"Destiny 2"},{id:1,imgSrc:"./MW2.png",altText:"Modern Warfare 2"},{id:2,imgSrc:"./CallOfDutyWarzone.png",altText:"Call of Duty Warzone"},{id:3,imgSrc:"./CallOfDutyBlackOps6.png",altText:"Call of Duty Black Ops"},{id:4,imgSrc:"./CallOfDutyMW3.png",altText:"Call of Duty MW3"},{id:5,imgSrc:"./spaceMarine.png",altText:"Space Marine"},{id:6,imgSrc:"./pugolo.png",altText:"Pugolo"}],W=k.memo(({currentCardHandler:f})=>{const e=a.useRef(null),[m,h]=a.useState(n.length),[c,_]=a.useState(n.length+1),[x,g]=a.useState(!1),y=[...n,...n,...n];a.useEffect(()=>{if(e.current){const l=e.current.querySelectorAll(`.${t.item}`);if(l.length>0){const i=l[0].getBoundingClientRect().width,o=10;e.current.style.transform=`translateX(-${m*(i+o)}px)`}}},[]);const d=()=>{if(x||!e.current)return;g(!0);const l=e.current.querySelectorAll(`.${t.item}`);if(l.length>0){const i=l[0].getBoundingClientRect().width,o=20;let r=m+1,u=c+1;r>=n.length*2&&(r=n.length,u=n.length+1,e.current.style.transition="none",e.current.style.transform=`translateX(-${r*(i+o)}px)`,e.current.offsetHeight,e.current.style.transition="transform 0.3s ease"),h(r),_(u),f(r%n.length),e.current.style.transform=`translateX(-${r*(i+o)}px)`}setTimeout(()=>{g(!1)},300)};return a.useEffect(()=>{d()},[]),s.jsxs("div",{className:t.container,children:[s.jsx("div",{className:t.scrollableContainer,children:s.jsx("ul",{className:t.list,ref:e,children:y.map((l,i)=>s.jsx("li",{className:`${t.item} ${i===c?t.firstVisible:""} ${i===c-1?t.firstItem:""}`,children:s.jsx("div",{className:t.gameCard,children:s.jsx("img",{className:`${t.img} ${i!==c?t.dimmed:""}`,src:l.imgSrc,alt:l.altText})})},`${l.id}-${i}`))})}),s.jsx("button",{className:`${t.scrollButton} ${t.scrollButtonRight}`,onClick:d,"aria-label":"Scroll right",children:s.jsx("img",{src:"./btnCardsR.png",alt:"vector"})})]})});export{W as default};
