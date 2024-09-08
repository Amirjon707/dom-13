import { CreateElement } from "./main";

let cartArr = JSON.parse(localStorage.getItem("cart") || "[]");

const con3 = document.querySelector(".con3");

CreateElement(cartArr, con3);
