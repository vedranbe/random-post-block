(()=>{"use strict";var e,t={756:(e,t,a)=>{const l=window.wp.blocks,n=window.React,o=window.wp.i18n,r=window.wp.blockEditor,i=window.wp.apiFetch;var c=a.n(i);const s=window.wp.components,u=window.wp.element,d=JSON.parse('{"UU":"create-block/random-post-block"}');(0,l.registerBlockType)(d.UU,{save:({attributes:e})=>{const{showImage:t,showExcerpt:a,aspectRatio:l,scale:i,excerptLength:c}=e,{title:s,excerpt:u,link:d,image:p}=e.postContent||{};if(!s)return(0,n.createElement)("p",null,(0,o.__)("No data available.","andiro"));const m=c?u.slice(0,c).concat("..."):u;return(0,n.createElement)("div",{...(0,r.useBlockProps)()},t&&p&&(0,n.createElement)("figure",{class:"wp-block-image"},(0,n.createElement)("img",{src:p,style:{aspectRatio:l,objectFit:i},alt:s})),(0,n.createElement)("h3",null,s),a&&(0,n.createElement)("p",null,m))},edit:({attributes:e,setAttributes:t})=>{const[a,l]=(0,u.useState)(null),[i,d]=(0,u.useState)(!1),[p,m]=(0,u.useState)(null),[h,_]=(0,u.useState)(!0),[g,b]=(0,u.useState)(!0);return(0,u.useEffect)((()=>{(async()=>{d(!0),m(null);try{const t=await c()({path:"/wp/v2/posts",method:"GET"});if(t.length>0){const a=t[0],n=a.title.rendered,r=a.excerpt.rendered,i=a.link;if(a.featured_media){const t=a.featured_media,o=e.mediaSize||"full",s=await c()({path:`/wp/v2/media/${t}`,method:"GET"}),u=e.excerptLength||100,d=r.replace(/<\/?[^>]+(>|$)/g,"").substring(0,u).concat("...");if(s&&s.media_details&&s.media_details.sizes&&s.media_details.sizes[o]){const e=s.media_details.sizes[o].source_url;l({title:n,excerpt:d,link:i,image:e})}}else m((0,o.__)("No featured media found for the post.","andiro"))}else m((0,o.__)("No published posts found.","andiro"))}catch(e){console.error("Error fetching random post:",e),m((0,o.__)("An error occurred while fetching the random post.","andiro"))}finally{d(!1)}})()}),[e]),(0,n.createElement)("div",{...(0,r.useBlockProps)()},(0,n.createElement)(r.InspectorControls,null,(0,n.createElement)(s.PanelBody,{title:(0,o.__)("Settings","andiro")},(0,n.createElement)(s.PanelRow,null,(0,n.createElement)(s.ToggleControl,{labelPosition:"left",checked:e.showImage,label:"Show Image",onChange:e=>{_(e),t({showImage:e}),console.log(h)}})),h&&e.showImage&&(0,n.createElement)(s.SelectControl,{label:(0,o.__)("Media Size","andiro"),value:e.mediaSize||"full",options:[{label:(0,o.__)("Full","andiro"),value:"full"},{label:(0,o.__)("Large","andiro"),value:"large"},{label:(0,o.__)("Medium","andiro"),value:"medium"},{label:(0,o.__)("Thumbnail","andiro"),value:"thumbnail"}],onChange:e=>{t({mediaSize:e})}}),h&&e.showImage&&(0,n.createElement)(s.SelectControl,{label:(0,o.__)("Aspect Ratio","andiro"),value:e.aspectRatio,options:[{label:(0,o.__)("Original","andiro"),value:""},{label:(0,o.__)("Square - 1:1","andiro"),value:"1"},{label:(0,o.__)("Standard - 4:3","andiro"),value:"4/3"},{label:(0,o.__)("Portrait - 3:4","andiro"),value:"3/4"},{label:(0,o.__)("Classic - 3:2","andiro"),value:"3/2"},{label:(0,o.__)("Wide - 16:9","andiro"),value:"16/9"},{label:(0,o.__)("Tall - 9:16","andiro"),value:"9/16"}],onChange:e=>{t({aspectRatio:e})}}),h&&e.showImage&&(0,n.createElement)(s.SelectControl,{width:"100%",label:(0,o.__)("Scale","andiro"),value:e.scale,options:[{label:(0,o.__)("Cover","andiro"),value:"cover"},{label:(0,o.__)("Contain","andiro"),value:"contain"}],onChange:e=>{t({scale:e})}}),h&&e.showImage&&(0,n.createElement)(s.SelectControl,{width:"100%",label:(0,o.__)("Image Position","andiro"),value:e.position,options:[{label:(0,o.__)("Center","andiro"),value:"center"},{label:(0,o.__)("Top","andiro"),value:"top"},{label:(0,o.__)("Bottom","andiro"),value:"bottom"},{label:(0,o.__)("Left","andiro"),value:"left"},{label:(0,o.__)("Right","andiro"),value:"right"}],onChange:e=>{t({position:e})}}),(0,n.createElement)(s.PanelRow,null,(0,n.createElement)(s.ToggleControl,{labelPosition:"left",checked:e.showExcerpt,label:"Show Excerpt",onChange:e=>{b(e),t({showExcerpt:e})}})),g&&e.showExcerpt&&(0,n.createElement)(s.RangeControl,{help:"Number of characters in the excerpt.",initialPosition:150,value:e.excerptLength||"150",label:"Excerpt Length",max:250,min:50,onChange:e=>{t({excerptLength:e})}}))),(()=>{if(i)return(0,n.createElement)(n.Fragment,null,(0,n.createElement)("a",{href:"#",rel:"noopener noreferrer"}),(0,n.createElement)("figure",{class:"wp-block-image loading"},"Loading..."),(0,n.createElement)("h3",null,"Title"),(0,n.createElement)("p",null,"Excerpt"));if(p)return(0,n.createElement)("p",null,p);if(!a)return null;const{title:t,excerpt:l,link:o,image:r}=a;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)("a",{href:o,rel:"noopener noreferrer"}),e.showImage&&r&&(0,n.createElement)("figure",{class:"wp-block-image"},(0,n.createElement)("img",{src:r,style:{aspectRatio:e.aspectRatio,objectFit:e.scale},alt:t})),(0,n.createElement)("h3",null," ",t),e.showExcerpt&&(0,n.createElement)("p",null,l))})())}})}},a={};function l(e){var n=a[e];if(void 0!==n)return n.exports;var o=a[e]={exports:{}};return t[e](o,o.exports,l),o.exports}l.m=t,e=[],l.O=(t,a,n,o)=>{if(!a){var r=1/0;for(u=0;u<e.length;u++){for(var[a,n,o]=e[u],i=!0,c=0;c<a.length;c++)(!1&o||r>=o)&&Object.keys(l.O).every((e=>l.O[e](a[c])))?a.splice(c--,1):(i=!1,o<r&&(r=o));if(i){e.splice(u--,1);var s=n();void 0!==s&&(t=s)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[a,n,o]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};l.O.j=t=>0===e[t];var t=(t,a)=>{var n,o,[r,i,c]=a,s=0;if(r.some((t=>0!==e[t]))){for(n in i)l.o(i,n)&&(l.m[n]=i[n]);if(c)var u=c(l)}for(t&&t(a);s<r.length;s++)o=r[s],l.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return l.O(u)},a=globalThis.webpackChunkrandom_post_block=globalThis.webpackChunkrandom_post_block||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=l.O(void 0,[350],(()=>l(756)));n=l.O(n)})();