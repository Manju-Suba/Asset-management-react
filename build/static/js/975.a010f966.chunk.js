"use strict";(self.webpackChunkmantis_free_react_admin_template=self.webpackChunkmantis_free_react_admin_template||[]).push([[975],{84064:(t,e,n)=>{n.d(e,{A:()=>C});var a=n(9950),o=n(48738),i=n.n(o),c=n(15207),r=n(65750),l=n(5741),s=n(43717),d=n(91874);const m=["wrap","nowrap","wrap-reverse"],p=["flex-start","flex-end","start","end","center","space-between","space-around","space-evenly","stretch","normal","left","right"],g=["center","start","end","flex-start","flex-end","self-start","self-end","baseline","normal","stretch"];const u=function(t,e){return i()(Object.assign(Object.assign(Object.assign({},((t,e)=>{const n={};return m.forEach((a=>{n["".concat(t,"-wrap-").concat(a)]=e.wrap===a})),n})(t,e)),((t,e)=>{const n={};return g.forEach((a=>{n["".concat(t,"-align-").concat(a)]=e.align===a})),n["".concat(t,"-align-stretch")]=!e.align&&!!e.vertical,n})(t,e)),((t,e)=>{const n={};return p.forEach((a=>{n["".concat(t,"-justify-").concat(a)]=e.justify===a})),n})(t,e)))},f=t=>{const{componentCls:e}=t;return{[e]:{display:"flex","&-vertical":{flexDirection:"column"},"&-rtl":{direction:"rtl"},"&:empty":{display:"none"}}}},h=t=>{const{componentCls:e}=t;return{[e]:{"&-gap-small":{gap:t.flexGapSM},"&-gap-middle":{gap:t.flexGap},"&-gap-large":{gap:t.flexGapLG}}}},b=t=>{const{componentCls:e}=t,n={};return m.forEach((t=>{n["".concat(e,"-wrap-").concat(t)]={flexWrap:t}})),n},v=t=>{const{componentCls:e}=t,n={};return g.forEach((t=>{n["".concat(e,"-align-").concat(t)]={alignItems:t}})),n},y=t=>{const{componentCls:e}=t,n={};return p.forEach((t=>{n["".concat(e,"-justify-").concat(t)]={justifyContent:t}})),n},S=(0,s.OF)("Flex",(t=>{const{paddingXS:e,padding:n,paddingLG:a}=t,o=(0,d.h1)(t,{flexGapSM:e,flexGap:n,flexGapLG:a});return[f(o),h(o),b(o),v(o),y(o)]}),(()=>({})),{resetStyle:!1});var O=function(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(t);o<a.length;o++)e.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(t,a[o])&&(n[a[o]]=t[a[o]])}return n};const x=a.forwardRef(((t,e)=>{const{prefixCls:n,rootClassName:o,className:s,style:d,flex:m,gap:p,children:g,vertical:f=!1,component:h="div"}=t,b=O(t,["prefixCls","rootClassName","className","style","flex","gap","children","vertical","component"]),{flex:v,direction:y,getPrefixCls:x}=a.useContext(l.QO),C=x("flex",n),[j,z,w]=S(C),A=null!==f&&void 0!==f?f:null===v||void 0===v?void 0:v.vertical,E=i()(s,o,null===v||void 0===v?void 0:v.className,C,z,w,u(C,t),{["".concat(C,"-rtl")]:"rtl"===y,["".concat(C,"-gap-").concat(p)]:(0,r.X)(p),["".concat(C,"-vertical")]:A}),N=Object.assign(Object.assign({},null===v||void 0===v?void 0:v.style),d);return m&&(N.flex=m),p&&!(0,r.X)(p)&&(N.gap=p),j(a.createElement(h,Object.assign({ref:e,className:E,style:N},(0,c.A)(b,["justify","wrap","align"])),g))}));const C=x},56076:(t,e,n)=>{n.d(e,{A:()=>j});var a=n(9950),o=n(48738),i=n.n(o),c=n(5741),r=n(74902),l=n(45343),s=n(43717),d=n(91874);const m=t=>{const{componentCls:e,calc:n}=t;return{[e]:Object.assign(Object.assign({},(0,l.dF)(t)),{margin:0,padding:0,listStyle:"none",["".concat(e,"-item")]:{position:"relative",margin:0,paddingBottom:t.itemPaddingBottom,fontSize:t.fontSize,listStyle:"none","&-tail":{position:"absolute",insetBlockStart:t.itemHeadSize,insetInlineStart:n(n(t.itemHeadSize).sub(t.tailWidth)).div(2).equal(),height:"calc(100% - ".concat((0,r.zA)(t.itemHeadSize),")"),borderInlineStart:"".concat((0,r.zA)(t.tailWidth)," ").concat(t.lineType," ").concat(t.tailColor)},"&-pending":{["".concat(e,"-item-head")]:{fontSize:t.fontSizeSM,backgroundColor:"transparent"},["".concat(e,"-item-tail")]:{display:"none"}},"&-head":{position:"absolute",width:t.itemHeadSize,height:t.itemHeadSize,backgroundColor:t.dotBg,border:"".concat((0,r.zA)(t.dotBorderWidth)," ").concat(t.lineType," transparent"),borderRadius:"50%","&-blue":{color:t.colorPrimary,borderColor:t.colorPrimary},"&-red":{color:t.colorError,borderColor:t.colorError},"&-green":{color:t.colorSuccess,borderColor:t.colorSuccess},"&-gray":{color:t.colorTextDisabled,borderColor:t.colorTextDisabled}},"&-head-custom":{position:"absolute",insetBlockStart:n(t.itemHeadSize).div(2).equal(),insetInlineStart:n(t.itemHeadSize).div(2).equal(),width:"auto",height:"auto",marginBlockStart:0,paddingBlock:t.customHeadPaddingVertical,lineHeight:1,textAlign:"center",border:0,borderRadius:0,transform:"translate(-50%, -50%)"},"&-content":{position:"relative",insetBlockStart:n(n(t.fontSize).mul(t.lineHeight).sub(t.fontSize)).mul(-1).add(t.lineWidth).equal(),marginInlineStart:n(t.margin).add(t.itemHeadSize).equal(),marginInlineEnd:0,marginBlockStart:0,marginBlockEnd:0,wordBreak:"break-word"},"&-last":{["> ".concat(e,"-item-tail")]:{display:"none"},["> ".concat(e,"-item-content")]:{minHeight:n(t.controlHeightLG).mul(1.2).equal()}}},["&".concat(e,"-alternate,\n        &").concat(e,"-right,\n        &").concat(e,"-label")]:{["".concat(e,"-item")]:{"&-tail, &-head, &-head-custom":{insetInlineStart:"50%"},"&-head":{marginInlineStart:n(t.marginXXS).mul(-1).equal(),"&-custom":{marginInlineStart:n(t.tailWidth).div(2).equal()}},"&-left":{["".concat(e,"-item-content")]:{insetInlineStart:"calc(50% - ".concat((0,r.zA)(t.marginXXS),")"),width:"calc(50% - ".concat((0,r.zA)(t.marginSM),")"),textAlign:"start"}},"&-right":{["".concat(e,"-item-content")]:{width:"calc(50% - ".concat((0,r.zA)(t.marginSM),")"),margin:0,textAlign:"end"}}}},["&".concat(e,"-right")]:{["".concat(e,"-item-right")]:{["".concat(e,"-item-tail,\n            ").concat(e,"-item-head,\n            ").concat(e,"-item-head-custom")]:{insetInlineStart:"calc(100% - ".concat((0,r.zA)(n(n(t.itemHeadSize).add(t.tailWidth)).div(2).equal()),")")},["".concat(e,"-item-content")]:{width:"calc(100% - ".concat((0,r.zA)(n(t.itemHeadSize).add(t.marginXS).equal()),")")}}},["&".concat(e,"-pending\n        ").concat(e,"-item-last\n        ").concat(e,"-item-tail")]:{display:"block",height:"calc(100% - ".concat((0,r.zA)(t.margin),")"),borderInlineStart:"".concat((0,r.zA)(t.tailWidth)," dotted ").concat(t.tailColor)},["&".concat(e,"-reverse\n        ").concat(e,"-item-last\n        ").concat(e,"-item-tail")]:{display:"none"},["&".concat(e,"-reverse ").concat(e,"-item-pending")]:{["".concat(e,"-item-tail")]:{insetBlockStart:t.margin,display:"block",height:"calc(100% - ".concat((0,r.zA)(t.margin),")"),borderInlineStart:"".concat((0,r.zA)(t.tailWidth)," dotted ").concat(t.tailColor)},["".concat(e,"-item-content")]:{minHeight:n(t.controlHeightLG).mul(1.2).equal()}},["&".concat(e,"-label")]:{["".concat(e,"-item-label")]:{position:"absolute",insetBlockStart:n(n(t.fontSize).mul(t.lineHeight).sub(t.fontSize)).mul(-1).add(t.tailWidth).equal(),width:"calc(50% - ".concat((0,r.zA)(t.marginSM),")"),textAlign:"end"},["".concat(e,"-item-right")]:{["".concat(e,"-item-label")]:{insetInlineStart:"calc(50% + ".concat((0,r.zA)(t.marginSM),")"),width:"calc(50% - ".concat((0,r.zA)(t.marginSM),")"),textAlign:"start"}}},"&-rtl":{direction:"rtl",["".concat(e,"-item-head-custom")]:{transform:"translate(50%, -50%)"}}})}},p=(0,s.OF)("Timeline",(t=>{const e=(0,d.h1)(t,{itemHeadSize:10,customHeadPaddingVertical:t.paddingXXS,paddingInlineEnd:2});return[m(e)]}),(t=>({tailColor:t.colorSplit,tailWidth:t.lineWidthBold,dotBorderWidth:t.wireframe?t.lineWidthBold:3*t.lineWidth,dotBg:t.colorBgContainer,itemPaddingBottom:1.25*t.padding})));var g=n(95656),u=function(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(t);o<a.length;o++)e.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(t,a[o])&&(n[a[o]]=t[a[o]])}return n};const f=t=>{var{prefixCls:e,className:n,color:o="blue",dot:r,pending:l=!1,position:s,label:d,children:m}=t,p=u(t,["prefixCls","className","color","dot","pending","position","label","children"]);const{getPrefixCls:g}=a.useContext(c.QO),f=g("timeline",e),h=i()("".concat(f,"-item"),{["".concat(f,"-item-pending")]:l},n),b=/blue|red|green|gray/.test(o||"")?void 0:o,v=i()("".concat(f,"-item-head"),{["".concat(f,"-item-head-custom")]:!!r,["".concat(f,"-item-head-").concat(o)]:!b});return a.createElement("li",Object.assign({},p,{className:h}),d&&a.createElement("div",{className:"".concat(f,"-item-label")},d),a.createElement("div",{className:"".concat(f,"-item-tail")}),a.createElement("div",{className:v,style:{borderColor:b,color:b}},r),a.createElement("div",{className:"".concat(f,"-item-content")},m))};var h=n(60436),b=n(34647),v=function(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(t);o<a.length;o++)e.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(t,a[o])&&(n[a[o]]=t[a[o]])}return n};const y=t=>{var{prefixCls:e,className:n,pending:o=!1,children:c,items:r,rootClassName:l,reverse:s=!1,direction:d,hashId:m,pendingDot:p,mode:g=""}=t,u=v(t,["prefixCls","className","pending","children","items","rootClassName","reverse","direction","hashId","pendingDot","mode"]);const y=(t,n)=>"alternate"===g?"".concat(e,"right"===t?"-item-right":"left"===t||n%2===0?"-item-left":"-item-right"):"left"===g?"".concat(e,"-item-left"):"right"===g||"right"===t?"".concat(e,"-item-right"):"",S=(0,h.A)(r||[]),O="boolean"===typeof o?null:o;o&&S.push({pending:!!o,dot:p||a.createElement(b.A,null),children:O}),s&&S.reverse();const x=S.length,C="".concat(e,"-item-last"),j=S.filter((t=>!!t)).map(((t,e)=>{var n;const c=e===x-2?C:"",r=e===x-1?C:"",{className:l}=t,d=v(t,["className"]);return a.createElement(f,Object.assign({},d,{className:i()([l,!s&&o?c:r,y(null!==(n=null===t||void 0===t?void 0:t.position)&&void 0!==n?n:"",e)]),key:(null===t||void 0===t?void 0:t.key)||e}))})),z=S.some((t=>!!(null===t||void 0===t?void 0:t.label))),w=i()(e,{["".concat(e,"-pending")]:!!o,["".concat(e,"-reverse")]:!!s,["".concat(e,"-").concat(g)]:!!g&&!z,["".concat(e,"-label")]:z,["".concat(e,"-rtl")]:"rtl"===d},n,l,m);return a.createElement("ul",Object.assign({},u,{className:w}),j)};var S=n(50604);const O=function(t,e){return t&&Array.isArray(t)?t:(0,S.A)(e).map((t=>{var e,n;return Object.assign({children:null!==(n=null===(e=null===t||void 0===t?void 0:t.props)||void 0===e?void 0:e.children)&&void 0!==n?n:""},t.props)}))};var x=function(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(t);o<a.length;o++)e.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(t,a[o])&&(n[a[o]]=t[a[o]])}return n};const C=t=>{const{getPrefixCls:e,direction:n,timeline:o}=a.useContext(c.QO),{prefixCls:r,children:l,items:s,className:d,style:m}=t,u=x(t,["prefixCls","children","items","className","style"]),f=e("timeline",r);const h=(0,g.A)(f),[b,v,S]=p(f,h),C=O(s,l);return b(a.createElement(y,Object.assign({},u,{className:i()(null===o||void 0===o?void 0:o.className,d,S,h),style:Object.assign(Object.assign({},null===o||void 0===o?void 0:o.style),m),prefixCls:f,direction:n,items:C,hashId:v})))};C.Item=f;const j=C}}]);