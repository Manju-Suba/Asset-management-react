"use strict";(self.webpackChunkmantis_free_react_admin_template=self.webpackChunkmantis_free_react_admin_template||[]).push([[778],{39549:(e,o,n)=>{n.d(o,{Ay:()=>g,Dk:()=>s,FY:()=>f,cH:()=>p});var t=n(45343),a=n(62862),r=n(98691),i=n(91874),c=n(43717),l=n(74902);function d(e){return{position:e,inset:0}}const s=e=>{const{componentCls:o,antCls:n}=e;return[{["".concat(o,"-root")]:{["".concat(o).concat(n,"-zoom-enter, ").concat(o).concat(n,"-zoom-appear")]:{transform:"none",opacity:0,animationDuration:e.motionDurationSlow,userSelect:"none"},["".concat(o).concat(n,"-zoom-leave ").concat(o,"-content")]:{pointerEvents:"none"},["".concat(o,"-mask")]:Object.assign(Object.assign({},d("fixed")),{zIndex:e.zIndexPopupBase,height:"100%",backgroundColor:e.colorBgMask,pointerEvents:"none",["".concat(o,"-hidden")]:{display:"none"}}),["".concat(o,"-wrap")]:Object.assign(Object.assign({},d("fixed")),{zIndex:e.zIndexPopupBase,overflow:"auto",outline:0,WebkitOverflowScrolling:"touch"})}},{["".concat(o,"-root")]:(0,a.p9)(e)}]},u=e=>{const{componentCls:o}=e;return[{["".concat(o,"-root")]:{["".concat(o,"-wrap-rtl")]:{direction:"rtl"},["".concat(o,"-centered")]:{textAlign:"center","&::before":{display:"inline-block",width:0,height:"100%",verticalAlign:"middle",content:'""'},[o]:{top:0,display:"inline-block",paddingBottom:0,textAlign:"start",verticalAlign:"middle"}},["@media (max-width: ".concat(e.screenSMMax,"px)")]:{[o]:{maxWidth:"calc(100vw - 16px)",margin:"".concat((0,l.zA)(e.marginXS)," auto")},["".concat(o,"-centered")]:{[o]:{flex:1}}}}},{[o]:Object.assign(Object.assign({},(0,t.dF)(e)),{pointerEvents:"none",position:"relative",top:100,width:"auto",maxWidth:"calc(100vw - ".concat((0,l.zA)(e.calc(e.margin).mul(2).equal()),")"),margin:"0 auto",paddingBottom:e.paddingLG,["".concat(o,"-title")]:{margin:0,color:e.titleColor,fontWeight:e.fontWeightStrong,fontSize:e.titleFontSize,lineHeight:e.titleLineHeight,wordWrap:"break-word"},["".concat(o,"-content")]:{position:"relative",backgroundColor:e.contentBg,backgroundClip:"padding-box",border:0,borderRadius:e.borderRadiusLG,boxShadow:e.boxShadow,pointerEvents:"auto",padding:e.contentPadding},["".concat(o,"-close")]:Object.assign({position:"absolute",top:e.calc(e.modalHeaderHeight).sub(e.modalCloseBtnSize).div(2).equal(),insetInlineEnd:e.calc(e.modalHeaderHeight).sub(e.modalCloseBtnSize).div(2).equal(),zIndex:e.calc(e.zIndexPopupBase).add(10).equal(),padding:0,color:e.modalCloseIconColor,fontWeight:e.fontWeightStrong,lineHeight:1,textDecoration:"none",background:"transparent",borderRadius:e.borderRadiusSM,width:e.modalCloseBtnSize,height:e.modalCloseBtnSize,border:0,outline:0,cursor:"pointer",transition:"color ".concat(e.motionDurationMid,", background-color ").concat(e.motionDurationMid),"&-x":{display:"flex",fontSize:e.fontSizeLG,fontStyle:"normal",lineHeight:"".concat((0,l.zA)(e.modalCloseBtnSize)),justifyContent:"center",textTransform:"none",textRendering:"auto"},"&:hover":{color:e.modalIconHoverColor,backgroundColor:e.closeBtnHoverBg,textDecoration:"none"},"&:active":{backgroundColor:e.closeBtnActiveBg}},(0,t.K8)(e)),["".concat(o,"-header")]:{color:e.colorText,background:e.headerBg,borderRadius:"".concat((0,l.zA)(e.borderRadiusLG)," ").concat((0,l.zA)(e.borderRadiusLG)," 0 0"),marginBottom:e.headerMarginBottom,padding:e.headerPadding,borderBottom:e.headerBorderBottom},["".concat(o,"-body")]:{fontSize:e.fontSize,lineHeight:e.lineHeight,wordWrap:"break-word",padding:e.bodyPadding},["".concat(o,"-footer")]:{textAlign:"end",background:e.footerBg,marginTop:e.footerMarginTop,padding:e.footerPadding,borderTop:e.footerBorderTop,borderRadius:e.footerBorderRadius,["> ".concat(e.antCls,"-btn + ").concat(e.antCls,"-btn")]:{marginInlineStart:e.marginXS}},["".concat(o,"-open")]:{overflow:"hidden"}})},{["".concat(o,"-pure-panel")]:{top:"auto",padding:0,display:"flex",flexDirection:"column",["".concat(o,"-content,\n          ").concat(o,"-body,\n          ").concat(o,"-confirm-body-wrapper")]:{display:"flex",flexDirection:"column",flex:"auto"},["".concat(o,"-confirm-body")]:{marginBottom:"auto"}}}]},m=e=>{const{componentCls:o}=e;return{["".concat(o,"-root")]:{["".concat(o,"-wrap-rtl")]:{direction:"rtl",["".concat(o,"-confirm-body")]:{direction:"rtl"}}}}},f=e=>{const o=e.padding,n=e.fontSizeHeading5,t=e.lineHeightHeading5;return(0,i.h1)(e,{modalHeaderHeight:e.calc(e.calc(t).mul(n).equal()).add(e.calc(o).mul(2).equal()).equal(),modalFooterBorderColorSplit:e.colorSplit,modalFooterBorderStyle:e.lineType,modalFooterBorderWidth:e.lineWidth,modalIconHoverColor:e.colorIconHover,modalCloseIconColor:e.colorIcon,modalCloseBtnSize:e.fontHeight,modalConfirmIconSize:e.fontHeight,modalTitleHeight:e.calc(e.titleFontSize).mul(e.titleLineHeight).equal()})},p=e=>({footerBg:"transparent",headerBg:e.colorBgElevated,titleLineHeight:e.lineHeightHeading5,titleFontSize:e.fontSizeHeading5,contentBg:e.colorBgElevated,titleColor:e.colorTextHeading,closeBtnHoverBg:e.wireframe?"transparent":e.colorFillContent,closeBtnActiveBg:e.wireframe?"transparent":e.colorFillContentHover,contentPadding:e.wireframe?0:"".concat((0,l.zA)(e.paddingMD)," ").concat((0,l.zA)(e.paddingContentHorizontalLG)),headerPadding:e.wireframe?"".concat((0,l.zA)(e.padding)," ").concat((0,l.zA)(e.paddingLG)):0,headerBorderBottom:e.wireframe?"".concat((0,l.zA)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit):"none",headerMarginBottom:e.wireframe?0:e.marginXS,bodyPadding:e.wireframe?e.paddingLG:0,footerPadding:e.wireframe?"".concat((0,l.zA)(e.paddingXS)," ").concat((0,l.zA)(e.padding)):0,footerBorderTop:e.wireframe?"".concat((0,l.zA)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit):"none",footerBorderRadius:e.wireframe?"0 0 ".concat((0,l.zA)(e.borderRadiusLG)," ").concat((0,l.zA)(e.borderRadiusLG)):0,footerMarginTop:e.wireframe?0:e.marginSM,confirmBodyPadding:e.wireframe?"".concat((0,l.zA)(2*e.padding)," ").concat((0,l.zA)(2*e.padding)," ").concat((0,l.zA)(e.paddingLG)):0,confirmIconMarginInlineEnd:e.wireframe?e.margin:e.marginSM,confirmBtnsMarginTop:e.wireframe?e.marginLG:e.marginSM}),g=(0,c.OF)("Modal",(e=>{const o=f(e);return[u(o),m(o),s(o),(0,r.aB)(o,"zoom")]}),p,{unitless:{titleLineHeight:!0}})},62862:(e,o,n)=>{n.d(o,{p9:()=>c});var t=n(74902),a=n(5610);const r=new t.Mo("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),i=new t.Mo("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),c=function(e){let o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{antCls:n}=e,t="".concat(n,"-fade"),c=o?"&":"";return[(0,a.b)(t,r,i,e.motionDurationMid,o),{["\n        ".concat(c).concat(t,"-enter,\n        ").concat(c).concat(t,"-appear\n      ")]:{opacity:0,animationTimingFunction:"linear"},["".concat(c).concat(t,"-leave")]:{animationTimingFunction:"linear"}}]}},7254:(e,o,n)=>{n.d(o,{Z:()=>A,A:()=>k});var t=n(58168),a=n(5544),r=n(24818),i=n(9950),c=i.createContext({}),l=n(89379),d=n(48738),s=n.n(d),u=n(71642),m=n(80001),f=n(91478),p=n(82795);function g(e,o,n){var t=o;return!t&&n&&(t="".concat(e,"-").concat(n)),t}function v(e,o){var n=e["page".concat(o?"Y":"X","Offset")],t="scroll".concat(o?"Top":"Left");if("number"!==typeof n){var a=e.document;"number"!==typeof(n=a.documentElement[t])&&(n=a.body[t])}return n}var b=n(87418),h=n(41929);const y=i.memo((function(e){return e.children}),(function(e,o){return!o.shouldUpdate}));var C={width:0,height:0,overflow:"hidden",outline:"none"};const A=i.forwardRef((function(e,o){var n=e.prefixCls,a=e.className,r=e.style,d=e.title,u=e.ariaId,m=e.footer,f=e.closable,p=e.closeIcon,g=e.onClose,v=e.children,b=e.bodyStyle,A=e.bodyProps,w=e.modalRender,x=e.onMouseDown,z=e.onMouseUp,B=e.holderRef,S=e.visible,k=e.forceRender,E=e.width,H=e.height,N=e.classNames,R=e.styles,I=i.useContext(c).panel,M=(0,h.xK)(B,I),T=(0,i.useRef)(),P=(0,i.useRef)();i.useImperativeHandle(o,(function(){return{focus:function(){var e;null===(e=T.current)||void 0===e||e.focus()},changeActive:function(e){var o=document.activeElement;e&&o===P.current?T.current.focus():e||o!==T.current||P.current.focus()}}}));var L,D,O,F={};void 0!==E&&(F.width=E),void 0!==H&&(F.height=H),m&&(L=i.createElement("div",{className:s()("".concat(n,"-footer"),null===N||void 0===N?void 0:N.footer),style:(0,l.A)({},null===R||void 0===R?void 0:R.footer)},m)),d&&(D=i.createElement("div",{className:s()("".concat(n,"-header"),null===N||void 0===N?void 0:N.header),style:(0,l.A)({},null===R||void 0===R?void 0:R.header)},i.createElement("div",{className:"".concat(n,"-title"),id:u},d))),f&&(O=i.createElement("button",{type:"button",onClick:g,"aria-label":"Close",className:"".concat(n,"-close")},p||i.createElement("span",{className:"".concat(n,"-close-x")})));var W=i.createElement("div",{className:s()("".concat(n,"-content"),null===N||void 0===N?void 0:N.content),style:null===R||void 0===R?void 0:R.content},O,D,i.createElement("div",(0,t.A)({className:s()("".concat(n,"-body"),null===N||void 0===N?void 0:N.body),style:(0,l.A)((0,l.A)({},b),null===R||void 0===R?void 0:R.body)},A),v),L);return i.createElement("div",{key:"dialog-element",role:"dialog","aria-labelledby":d?u:null,"aria-modal":"true",ref:M,style:(0,l.A)((0,l.A)({},r),F),className:s()(n,a),onMouseDown:x,onMouseUp:z},i.createElement("div",{tabIndex:0,ref:T,style:C,"aria-hidden":"true"}),i.createElement(y,{shouldUpdate:S||k},w?w(W):W),i.createElement("div",{tabIndex:0,ref:P,style:C,"aria-hidden":"true"}))}));var w=i.forwardRef((function(e,o){var n=e.prefixCls,r=e.title,c=e.style,d=e.className,u=e.visible,m=e.forceRender,f=e.destroyOnClose,p=e.motionName,g=e.ariaId,h=e.onVisibleChanged,y=e.mousePosition,C=(0,i.useRef)(),w=i.useState(),x=(0,a.A)(w,2),z=x[0],B=x[1],S={};function k(){var e=function(e){var o=e.getBoundingClientRect(),n={left:o.left,top:o.top},t=e.ownerDocument,a=t.defaultView||t.parentWindow;return n.left+=v(a),n.top+=v(a,!0),n}(C.current);B(y?"".concat(y.x-e.left,"px ").concat(y.y-e.top,"px"):"")}return z&&(S.transformOrigin=z),i.createElement(b.Ay,{visible:u,onVisibleChanged:h,onAppearPrepare:k,onEnterPrepare:k,forceRender:m,motionName:p,removeOnLeave:f,ref:C},(function(a,u){var m=a.className,f=a.style;return i.createElement(A,(0,t.A)({},e,{ref:o,title:r,ariaId:g,prefixCls:n,holderRef:u,style:(0,l.A)((0,l.A)((0,l.A)({},f),c),S),className:s()(d,m)}))}))}));w.displayName="Content";const x=w;function z(e){var o=e.prefixCls,n=e.style,a=e.visible,r=e.maskProps,c=e.motionName,d=e.className;return i.createElement(b.Ay,{key:"mask",visible:a,motionName:c,leavedClassName:"".concat(o,"-mask-hidden")},(function(e,a){var c=e.className,u=e.style;return i.createElement("div",(0,t.A)({ref:a,style:(0,l.A)((0,l.A)({},u),n),className:s()("".concat(o,"-mask"),c,d)},r))}))}n(99424);function B(e){var o=e.prefixCls,n=void 0===o?"rc-dialog":o,r=e.zIndex,c=e.visible,d=void 0!==c&&c,v=e.keyboard,b=void 0===v||v,h=e.focusTriggerAfterClose,y=void 0===h||h,C=e.wrapStyle,A=e.wrapClassName,w=e.wrapProps,B=e.onClose,S=e.afterOpenChange,k=e.afterClose,E=e.transitionName,H=e.animation,N=e.closable,R=void 0===N||N,I=e.mask,M=void 0===I||I,T=e.maskTransitionName,P=e.maskAnimation,L=e.maskClosable,D=void 0===L||L,O=e.maskStyle,F=e.maskProps,W=e.rootClassName,G=e.classNames,j=e.styles;var q=(0,i.useRef)(),_=(0,i.useRef)(),U=(0,i.useRef)(),X=i.useState(d),K=(0,a.A)(X,2),V=K[0],Y=K[1],Z=(0,m.A)();function J(e){null===B||void 0===B||B(e)}var Q=(0,i.useRef)(!1),$=(0,i.useRef)(),ee=null;return D&&(ee=function(e){Q.current?Q.current=!1:_.current===e.target&&J(e)}),(0,i.useEffect)((function(){d&&(Y(!0),(0,u.A)(_.current,document.activeElement)||(q.current=document.activeElement))}),[d]),(0,i.useEffect)((function(){return function(){clearTimeout($.current)}}),[]),i.createElement("div",(0,t.A)({className:s()("".concat(n,"-root"),W)},(0,p.A)(e,{data:!0})),i.createElement(z,{prefixCls:n,visible:M&&d,motionName:g(n,T,P),style:(0,l.A)((0,l.A)({zIndex:r},O),null===j||void 0===j?void 0:j.mask),maskProps:F,className:null===G||void 0===G?void 0:G.mask}),i.createElement("div",(0,t.A)({tabIndex:-1,onKeyDown:function(e){if(b&&e.keyCode===f.A.ESC)return e.stopPropagation(),void J(e);d&&e.keyCode===f.A.TAB&&U.current.changeActive(!e.shiftKey)},className:s()("".concat(n,"-wrap"),A,null===G||void 0===G?void 0:G.wrapper),ref:_,onClick:ee,style:(0,l.A)((0,l.A)((0,l.A)({zIndex:r},C),null===j||void 0===j?void 0:j.wrapper),{},{display:V?null:"none"})},w),i.createElement(x,(0,t.A)({},e,{onMouseDown:function(){clearTimeout($.current),Q.current=!0},onMouseUp:function(){$.current=setTimeout((function(){Q.current=!1}))},ref:U,closable:R,ariaId:Z,prefixCls:n,visible:d&&V,onClose:J,onVisibleChanged:function(e){if(e)!function(){var e;(0,u.A)(_.current,document.activeElement)||null===(e=U.current)||void 0===e||e.focus()}();else{if(Y(!1),M&&q.current&&y){try{q.current.focus({preventScroll:!0})}catch(o){}q.current=null}V&&(null===k||void 0===k||k())}null===S||void 0===S||S(e)},motionName:g(n,E,H)}))))}var S=function(e){var o=e.visible,n=e.getContainer,l=e.forceRender,d=e.destroyOnClose,s=void 0!==d&&d,u=e.afterClose,m=e.panelRef,f=i.useState(o),p=(0,a.A)(f,2),g=p[0],v=p[1],b=i.useMemo((function(){return{panel:m}}),[m]);return i.useEffect((function(){o&&v(!0)}),[o]),l||!s||g?i.createElement(c.Provider,{value:b},i.createElement(r.A,{open:o||l||g,autoDestroy:!1,getContainer:n,autoLock:o||g},i.createElement(B,(0,t.A)({},e,{destroyOnClose:s,afterClose:function(){null===u||void 0===u||u(),v(!1)}})))):null};S.displayName="Dialog";const k=S}}]);