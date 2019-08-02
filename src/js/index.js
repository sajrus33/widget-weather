// class DOMelement {
//     constructor(options) {
//         this.type = options.type;
//         this.txt = options.txt;
//         this.clas = options.clas;
//         this.parent = options.parent;
//         this.src = options.src;
//     }

//     const self = document.createElement(this.type);
//     /         addClass(this[name], clas);
//     //         this[name].innerText = text;
//     //         parent.append(this[name]);
// }


// const createDOMElement = (
//     options,
//     text = "5",
// ) => {
//     const elementDOM = document.createElement(options.type);
//     elementDOM.classList.add(options.clas);
//     elementDOM.innerText = options.txt;
//     options.parent.append(elementDOM);
// };



// const own = createDOMElement({
//     type: "div",
//     txt: "polluted",
//     parent: document.body,
//     clas: "widget__today"
// })
// console.log(own);
