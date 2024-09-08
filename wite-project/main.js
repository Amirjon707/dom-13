import axios from "axios";
let arr = [];
const container = document.querySelector(".con");

let FavouriteArr = JSON.parse(localStorage.getItem("favourite") || '[]');
let cartArr = JSON.parse(localStorage.getItem("cart") || '[]');

// let cartArr = [];
// let FavouriteArr = [];

const favoriteCountElem = document.querySelector("#favorite-count");
const cartCountElem = document.querySelector("#cart-count");

const favoriteBtn = document.querySelector(".favorite-btn");
const cartBtn = document.querySelector(".cart-btn");

if (favoriteBtn) {
    favoriteBtn.addEventListener("click", () => {
        location.pathname = "favourite.html";
    });
}
if (cartBtn) {
    cartBtn.addEventListener("click", () => {
        location.pathname = "cart.html";
    });
}

cartCountElem.innerHTML = cartArr.length;
favoriteCountElem.innerHTML = FavouriteArr.length;

const info = async () => {
    try {
        let res = await axios.get("https://dummyjson.com/products");
        CreateElement(res.data.products, container);
    } catch (error) {
        console.error(error);
    }
};

info();

export function CreateElement(array, con) {
    array.forEach((item) => {
        let box = document.createElement("div");
        box.classList.add("box");
        box.id = item.id;

        let imgBox = document.createElement("div");
        imgBox.classList.add("imgBox");

        let img = document.createElement("img");
        img.setAttribute("src", item.images[0]); // Assuming images is an array
        imgBox.appendChild(img);

        let txt = document.createElement("div");
        txt.classList.add("txt");

        let h2 = document.createElement("h2");
        h2.classList.add("title");
        h2.innerText = item.title;

        let description = document.createElement("p");
        description.classList.add("description");
        description.innerText = item.description;

        let rating = document.createElement("div");
        rating.classList.add("rating");

        let price = document.createElement("span");
        price.classList.add("rating-elem");
        price.innerHTML = `<i class="fas fa-dollar-sign"></i> ${item.price}`;

        let rate = document.createElement("span");
        rate.classList.add("rating-elem");
        rate.innerHTML = `<i class="far fa-star"></i> ${item.rating}`;

        let count = document.createElement("span");
        count.classList.add("rating-elem");
        count.innerHTML = `<i class="fas fa-box-archive"></i> ${item.stock}`;

        rating.append(price, rate, count);

        let tags = document.createElement("div");
        tags.classList.add("tags");
        tags.innerHTML = `<span>Tags:</span> ${item.tags
            .slice(0, 2)
            .join(", ")}`;

        let brand = document.createElement("p");
        brand.classList.add("brand");
        brand.innerText = `Brand: ${item.brand}`;

        let category = document.createElement("p");
        category.classList.add("category-tag");
        category.innerHTML = `<span>Category:</span> ${item.category}`;

        let addToFavoriteBtn = document.createElement("button");
        addToFavoriteBtn.classList.add("add-to-favorite");
        addToFavoriteBtn.innerHTML = `<i class="fas fa-heart"></i> Добавить в избранное`;
        addToFavoriteBtn.onclick = () => {
            let parent = addToCartBtn.closest(".box");
            if (FavouriteArr.length == 0) {
                FavouriteArr.push(item);
                favoriteCountElem.innerHTML = FavouriteArr.length;
                localStorage.setItem("favourite", JSON.stringify(FavouriteArr));
            } else {
                for (let i = 0; i < FavouriteArr.length; i++) {
                    if (FavouriteArr[i].id == parseInt(parent.id)) {
                        FavouriteArr.splice([i], 1);
                        favoriteCountElem.innerHTML = FavouriteArr.length;
                        localStorage.setItem("favourite", JSON.stringify(FavouriteArr));

                        break;
                    } else if (FavouriteArr.length - 1 == i) {
                        FavouriteArr.push(item);
                        favoriteCountElem.innerHTML = FavouriteArr.length;
                        localStorage.setItem("favourite", JSON.stringify(FavouriteArr));

                        break;
                    } else {
                        continue;
                    }
                }
            }
        };

        let addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-to-cart");
        addToCartBtn.innerHTML = `<i class="fas fa-cart-plus"></i> Добавить в корзину`;
        addToCartBtn.onclick = () => {
            let parent = addToCartBtn.closest(".box");
            if (cartArr.length == 0) {
                cartArr.push(item);
                cartCountElem.innerHTML = cartArr.length;
                localStorage.setItem("cart", JSON.stringify(cartArr));
            } else {
                for (let i = 0; i < cartArr.length; i++) {
                    if (cartArr[i].id == parseInt(parent.id)) {
                        cartArr.splice([i], 1);
                        cartCountElem.innerHTML = cartArr.length;
                        localStorage.setItem("cart", JSON.stringify(cartArr));

                        break;
                    } else if (cartArr.length - 1 == i) {
                        cartArr.push(item);
                        cartCountElem.innerHTML = cartArr.length;
                        localStorage.setItem("cart", JSON.stringify(cartArr));

                        break;
                    } else {
                        continue;
                    }
                }
            }
        };

        txt.append(
            h2,
            description,
            brand,
            category,
            tags,
            rating,
            addToFavoriteBtn,
            addToCartBtn
        );
        box.append(imgBox, txt);
        con.appendChild(box);
    });
}

CreateElement(arr, container);
