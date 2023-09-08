/*! For license information please see main.bundle.js.LICENSE.txt */
(()=>{var e={184:(e,t)=>{var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&e.push(i)}}else if("object"===a){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var c in n)r.call(n,c)&&n[c]&&e.push(c)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},37:function(e,t,n){"use strict";var r,o,a=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.tunings=t.defaultChordSteps=t.gammas=t.defaultGammaSteps=t.scales=t.octaves=t.fullNotesCount=t.allNotesCount=t.fullNotes=t.allNotes=void 0;var s=c(n(230)),u=c(n(154));t.allNotes=u.generateAllNotes(),t.fullNotes=t.allNotes.filter((function(e){return 1===e.tone.length})),t.allNotesCount=t.allNotes.length,t.fullNotesCount=t.fullNotes.length,t.octaves=u.generateOctaves(),t.scales=Object.freeze(((r={})[s.scaleName.major]={name:s.scaleName.major,notePostfix:""},r[s.scaleName.garmajor]={name:s.scaleName.garmajor,notePostfix:""},r[s.scaleName.melmajor]={name:s.scaleName.melmajor,notePostfix:""},r[s.scaleName.minor]={name:s.scaleName.minor,notePostfix:"m"},r[s.scaleName.garminor]={name:s.scaleName.garminor,notePostfix:"m"},r[s.scaleName.melminor]={name:s.scaleName.melminor,notePostfix:"m"},r)),t.defaultGammaSteps=((o={})[s.scaleName.major]=[2,2,1,2,2,2,1],o[s.scaleName.garmajor]=[2,2,1,2,1,3,1],o[s.scaleName.melmajor]=[2,2,1,2,1,2,2],o[s.scaleName.minor]=[2,1,2,2,1,2,2],o[s.scaleName.garminor]=[2,1,2,2,1,3,1],o[s.scaleName.melminor]=[2,1,2,2,2,2,1],o),t.gammas=u.generateGammas(),t.defaultChordSteps=[1,3,5],t.tunings=u.generateTunings(t.allNotes,t.octaves)},154:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.generateTunings=t.generateOctaves=t.generateGammas=t.generateAllNotes=void 0;var c=n(37),s=n(935),u=i(n(593));t.generateAllNotes=function(){return[{tone:"C",alterTone:"B#",octaveOrder:1},{tone:"C#",alterTone:"Db",octaveOrder:2},{tone:"D",alterTone:"",octaveOrder:3},{tone:"D#",alterTone:"Eb",octaveOrder:4},{tone:"E",alterTone:"",octaveOrder:5},{tone:"F",alterTone:"E#",octaveOrder:6},{tone:"F#",alterTone:"Gb",octaveOrder:7},{tone:"G",alterTone:"",octaveOrder:8},{tone:"G#",alterTone:"Ab",octaveOrder:9},{tone:"A",alterTone:"",octaveOrder:10},{tone:"A#",alterTone:"Bb",octaveOrder:11},{tone:"B",alterTone:"Cb",octaveOrder:12}].map((function(e,t){return r(r({},e),{activeTone:"tone",index:t,is:function(t){return e.tone===t||e.alterTone===t},getActiveTone:function(t){return e.tone.includes(t)?"tone":e.alterTone.includes(t)?"alterTone":null},toString:function(){return this[this.activeTone]}})}))},t.generateGammas=function(){return c.allNotes.flatMap((function(e){var t=r(r({},e),{activeTone:"alterTone"}),n=[];return Object.values(c.scales).forEach((function(r){try{n.push((0,s.buildGamma)(e,r))}catch(e){}try{n.push((0,s.buildGamma)(t,r))}catch(e){}})),n}))},t.generateOctaves=function(){return[{nameRus:"большая",sinceNumber:2,color:"#bdd6ac",index:0},{nameRus:"малая",sinceNumber:3,color:"#f2cca2",index:0},{nameRus:"первая",sinceNumber:4,color:"#a6c4e4",index:0},{nameRus:"вторая",sinceNumber:5,color:"#cda8bc",index:0},{nameRus:"третья",sinceNumber:6,color:"#edcdcc",index:0}].map((function(e,t){return e.index=t,e}))},t.generateTunings=function(e,t){var n={classic:{strings:[{note:u.find(e,(function(e){return"E"===e.tone})),octave:u.find(t,(function(e){return 4===e.sinceNumber})),order:0,notes:[]},{note:u.find(e,(function(e){return"B"===e.tone})),octave:u.find(t,(function(e){return 3===e.sinceNumber})),order:0,notes:[]},{note:u.find(e,(function(e){return"G"===e.tone})),octave:u.find(t,(function(e){return 3===e.sinceNumber})),order:0,notes:[]},{note:u.find(e,(function(e){return"D"===e.tone})),octave:u.find(t,(function(e){return 3===e.sinceNumber})),order:0,notes:[]},{note:u.find(e,(function(e){return"A"===e.tone})),octave:u.find(t,(function(e){return 2===e.sinceNumber})),order:0,notes:[]},{note:u.find(e,(function(e){return"E"===e.tone})),octave:u.find(t,(function(e){return 2===e.sinceNumber})),order:0,notes:[]}],getStringByOrder:function(e){return this.strings[(e-1)%this.strings.length]}}};return Object.values(n).forEach((function(n){n.strings.forEach((function(n,o){n.order=o+1,n.notes=[];for(var a=n.octave.index,i=n.note.index;i<=e.length+n.note.index;i+=1){var c=i%e.length,s=t[a+=0===c?1:0],u=e[c],l=r(r({},u),{octave:r({},s)});n.notes.push(l)}}))})),n}},935:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.calcFret=t.buildChord=t.buildGamma=void 0;var o=n(37);t.buildGamma=function(e,t,n){void 0===n&&(n=o.defaultGammaSteps);var a=n[t.name],i=e.index,c=o.fullNotes.findIndex((function(t){return e[e.activeTone].includes(t.tone)}));return{notes:Array(a.length+1).fill(null).map((function(t,n){if(0===n)return r({},e);c=(c+1)%o.fullNotesCount;var s=o.fullNotes[c],u=a[n-1];i=(i+u)%o.allNotesCount;var l=o.allNotes[i],f=l.getActiveTone(s.tone);if(null===f)throw new Error("Note ".concat(l.tone," does not contain a tone ").concat(s.tone));return r(r({},l),{activeTone:f})})),scale:t,toString:function(){return this.notes.map((function(e){return e.toString()})).join("")}}},t.buildChord=function(e,t){return void 0===t&&(t=o.defaultChordSteps),{notes:t.map((function(t){return e.notes[t-1]})),scale:e.scale,toString:function(){return this.notes.map((function(e){return e.toString()})).join("")}}},t.calcFret=function(e,t,n){return void 0===n&&(n=0),(e.index-t.note.index+o.allNotesCount)%o.allNotesCount+o.allNotesCount*n}},607:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=o(n(184)),i=n(37),c=n(935),s=n(593),u=function(e,t){void 0===t&&(t=document);var n=t.querySelector(e);if(null!==n)return n;throw new Error('Not found element by selector "'.concat(e,'"'))},l=function(e,t){return void 0===e&&(e=0),void 0===t&&(t=i.allNotesCount),Array(t+1).fill(0).map((function(t,n){return n+e}))},f=function(e,t){var n;void 0===t&&(t={});var o=r({textContent:"",classList:[],className:""},t),a=document.createElement(e);return a.textContent=o.textContent,o.classList.length>0?(n=a.classList).add.apply(n,o.classList):o.className.length>0&&(a.className=o.className),a},d=["","","success","warning","primary","danger"],m=function(e,t){void 0===t&&(t={type:"jopa",order:0});var n=f("tr"),r="";"lala"===t.type&&(r=t.order.toString());var o=f("td",{textContent:r,classList:["p-0","text-secondary"]});return n.append(o),e.forEach((function(e,r){var o,i="number"==typeof e?0:e.octave.sinceNumber,c=f("td",{textContent:e.toString(),className:(0,a.default)("p-0",(o={"text-secondary":"jopa"===t.type||"lala"===t.type&&0===r},o["bg-".concat(d[i]," bg-opacity-25")]=i>0&&r>0,o["fw-medium"]=i>0&&r>0,o))});n.append(c)})),n},v=function(e,t){void 0===t&&(t=!1);var n=t?(0,c.buildChord)(e):e;return i.tunings.classic.strings.map((function(e){var t=e.notes.map((function(e){var t=n.notes.find((function(t){return t.is(e[e.activeTone])}));return void 0===t?{toString:function(){return""},octave:{sinceNumber:0}}:r(r({},t),{octave:e.octave})}));return r(r({},e),{note:t[0],notes:t})}))},p=function(e,t){void 0===t&&(t=!1);var n=t?(0,c.buildChord)(e):e,o=i.allNotes.concat(i.allNotes),a=0;return o.map((function(e){var t=n.notes[a];return a<n.notes.length&&t.is(e[e.activeTone])?(a+=1,r({},t)):{toString:function(){return""}}}))},g=function(e,t){e.innerHTML="",t.forEach((function(t){var n=m(t.notes,{type:"lala",order:t.order});e.append(n)}))},h=function(e,t){var n=t.map((function(e){return f("td",{textContent:e.toString(),className:"p-0"})}));e.innerHTML="",n.forEach((function(t){e.append(t)}))},b=function(e,t,n,r){e.innerHTML="",t.forEach((function(t){var r=t.notes[0],o=function(e,t,n){var r=f("option",{textContent:e});return r.value=e,e===t&&r.toggleAttribute("selected"),r}(r[r.activeTone],n);e.append(o)}))};document.addEventListener("DOMContentLoaded",(function(){var e=u("table#string"),t=u("thead",e),n=u("tbody",e),r=u("tfoot",e),o=m(l()),a=m(l(i.allNotesCount));t.append(o),r.append(a);var c=u("table#keys tr#keys__notes"),f=!1,d="C",N=i.scales.major,y=i.gammas.filter((function(e){return e.scale.name===N.name})),O=(0,s.find)(y,(function(e){return e.notes[0][e.notes[0].activeTone]===d})),j=document.forms.namedItem("configurator");if(null===j)throw new Error;var x=u("#gamma",j);b(x,y,d);var _=v(O,f);g(n,_),h(c,p(O,f));var T=function(){O=(0,s.find)(y,(function(e){return e.notes[0][e.notes[0].activeTone]===d}));var e=v(O,f);h(c,p(O,f)),b(x,y,d),g(n,e)},C=function(){y=i.gammas.filter((function(e){return e.scale.name===N.name}));var e=y.some((function(e){var t=e.notes;return t[0][t[0].activeTone]===d}));d=e?d:y[0].notes[0][y[0].notes[0].activeTone],T()};u("#isChord",j).addEventListener("change",(function(e){var t=e.target;f=t.checked,T()}));var w=u("#scale",j);w.addEventListener("change",(function(e){var t=e.target;N=i.scales[t.value],C()})),w.addEventListener("keydown",(function(e){var t=e.target;if("ArrowDown"===e.code&&t.selectedIndex===t.length-1){e.preventDefault(),t.selectedIndex=0;var n=t.item(t.selectedIndex);N=i.scales[n.value],C()}"ArrowUp"===e.code&&0===t.selectedIndex&&(e.preventDefault(),t.selectedIndex=t.length-1,n=t.item(t.selectedIndex),N=i.scales[n.value],C())}));var S=u("#gamma",j);S.addEventListener("change",(function(e){var t=e.target;d=t.value,T()})),S.addEventListener("keydown",(function(e){var t=e.target;if("ArrowDown"===e.code&&t.selectedIndex===t.length-1){e.preventDefault(),t.selectedIndex=0;var n=t.item(t.selectedIndex);d=n.value,T()}"ArrowUp"===e.code&&0===t.selectedIndex&&(e.preventDefault(),t.selectedIndex=t.length-1,n=t.item(t.selectedIndex),d=n.value,T())}))}))},230:(e,t)=>{"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.scaleName=void 0,function(e){e.major="major",e.garmajor="garmajor",e.melmajor="melmajor",e.minor="minor",e.garminor="garminor",e.melminor="melminor"}(n||(t.scaleName=n={}))},593:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.find=void 0,t.find=function(e,t){var n=e.find(t);if(void 0!==n)return n;throw new Error("Array has not contains this item")}}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}(607)})();