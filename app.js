const form = document.getElementById("form");
const formInput = document.getElementById("form-input");
const listProducts = document.getElementById("list-products");
const clearButton = document.getElementById("clear-button");
const filter = document.getElementById("filter");

const displayItemsFrmLocalStorg = () => {
  let getProductsFromLocalStr = getProductsFromLocalStorage();
  getProductsFromLocalStr.forEach((product) => {
    addProductToDom(product);
    checkUiFilterClearButtn();
  });
};
const addProductSubmit = (e) => {
  e.preventDefault();
  const newProduct = formInput.value;

  if (newProduct === "") {
    alert("please fill the field with a product");
    return;
  }
  addProductToDom(newProduct);

  addProductToLocalStorage(newProduct);

  checkUiFilterClearButtn();
  formInput.value = "";
};

const addProductToDom = (product) => {
  const li = document.createElement("li");
  const new_item = document.createTextNode(product);
  li.appendChild(new_item);

  li.className = "products";

  const deleteButton = createDeleteButton();
  li.appendChild(deleteButton);
  listProducts.appendChild(li);
};

const addProductToLocalStorage = (product) => {
  const itemsFromLocalStorage = getProductsFromLocalStorage();

  itemsFromLocalStorage.push(product);
  localStorage.setItem("products", JSON.stringify(itemsFromLocalStorage));
};

const getProductsFromLocalStorage = () => {
  let itemsFromLocalStorage;
  if (localStorage.getItem("products") === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("products"));
  }
  return itemsFromLocalStorage;
};

const createDeleteButton = () => {
  const button = document.createElement("button");
  const icon = createDeleteIcon("fa-solid fa-trash");
  button.appendChild(icon);
  return button;
};

const createDeleteIcon = (className) => {
  const i = document.createElement("i");
  i.className = className;
  return i;
};

const onClickProduct = (e) => {
  if (e.target.parentElement.parentElement.classList.contains("products")) {
    console.log(e.target.parentElement.parentElement);
    removeProduct(e.target.parentElement.parentElement);
  }
};

const removeProduct = (product) => {
  if (confirm("Are you sure to delete the product")) {
    product.remove();
    removeProductFromLocalStrg(product.textContent);
    checkUiFilterClearButtn();
  }
};

const removeProductFromLocalStrg = (product) => {
  let productFrmLclStrg = getProductsFromLocalStorage();

  productFrmLclStrg = productFrmLclStrg.filter((p) => p !== product);
  localStorage.setItem("products", JSON.stringify(productFrmLclStrg));
};

const clearProducts = () => {
  while (listProducts.firstChild) {
    listProducts.removeChild(listProducts.firstChild);
  }
  checkUiFilterClearButtn();
};

const filterItem = (e) => {
  const productsLi = listProducts.querySelectorAll("li");
  const text = e.target.value;

  productsLi.forEach((product) => {
    const productName = product.firstChild.textContent;

    if (productName.indexOf(text) != -1) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

const checkUiFilterClearButtn = () => {
  const productsLi = listProducts.querySelectorAll("li");
  if (productsLi.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }
};

form.addEventListener("submit", addProductSubmit);
listProducts.addEventListener("click", onClickProduct);
clearButton.addEventListener("click", clearProducts);
filter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItemsFrmLocalStorg);

checkUiFilterClearButtn();
