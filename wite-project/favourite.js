import { CreateElement } from "./main";

let FavouriteArr = JSON.parse(localStorage.getItem("favourite") || "[]");

const con2 = document.querySelector(".con2");

CreateElement(FavouriteArr, con2);
