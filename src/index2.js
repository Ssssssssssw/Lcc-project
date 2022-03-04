import fun from "./index"
import image from "./asset/doge.jpg"
import hello from "./asset/hello.txt"
let b = fun(25, 32);
console.log(b);

const box = document.createElement("div")
box.style.cssText = "width: 100px;height: 100px; backgrounfColor: blue;"
box.textContent = hello
document.body.appendChild(box)
// const img = document.createElement("img")
// img.src = image;
// document.body.appendChild(img)