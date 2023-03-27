const productsBox = document.querySelector(".products-box");
const search = document.getElementById("search");
const productName = document.querySelectorAll(".details h6");
const headerItems = document.querySelectorAll(".item");
const productItem = document.querySelectorAll(".box");
const select = document.getElementById("select");
const listItem = Array.from(productItem);

let arrItem = [];

// search items

search.addEventListener("keyup", (e) => {
  const text = e.target.value;

  productName.forEach((product) => {
    const item = product.firstChild.textContent;
    if (item.indexOf(text) !== -1) {
      product.parentElement.parentElement.style.display = "block";
    } else {
      product.parentElement.parentElement.style.display = "none";
    }
  });
});

// filter items

for (let i of productItem) {
  let name = i.querySelector("span");
  i.setAttribute("data-category", name.textContent);
}

for (let i = 0; i < headerItems.length; i++) {
  headerItems[i].addEventListener("click", (e) => {
    e.preventDefault();
    const items = headerItems[i];
    headerItems.forEach((item) => item.classList.remove("active-class"));
    headerItems[i].classList.add("active-class");

    const content = items.getAttribute("data-filter");

    for (let z = 0; z < productItem.length; z++) {
      productItem[z].style.transform = "scale(0)";
      productItem[z].style.display = "none";

      if (
        productItem[z].getAttribute("data-category") === content ||
        content === "all"
      ) {
        productItem[z].style.transform = "scale(1)";
        productItem[z].style.display = "block";
      }
    }
  });
}

// sort items

for (let i of listItem) {
  const priceItem = i.querySelector("p");
  const number = priceItem.textContent.trim();
  i.setAttribute("data-price", number);
  arrItem.push(i);
}

function sortItem(items, list, asc) {
  let bol, sorList;

  bol = asc ? 1 : -1;
  sorList = list.sort((a, b) => {
    let ax = a.getAttribute("data-price");
    let bx = b.getAttribute("data-price");

    return ax > bx ? 1 * bol : -1 * bol;
  });
  while (items.firstChild) {
    items.removeChild(items.firstChild);
  }
  items.append(...sorList);
}

select.onchange = (e) => {
  e.preventDefault();
  if (e.target.value === "default") {
    while (productsBox.firstChild) {
      productsBox.removeChild(productsBox.firstChild);
    }
    productsBox.append(...ar);
  } else if (e.target.value === "lowest") {
    sortItem(productsBox, listItem, true);
  } else {
    sortItem(productsBox, listItem, false);
  }
};
