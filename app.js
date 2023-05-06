const form = document.getElementById("form");
const formInput = document.getElementById("form-input");
const listProducts = document.getElementById("list-products");
const clearButton = document.getElementById("clear-button");
const filter = document.getElementById("filter");
const formButton = document.querySelector("button");
let isEditMode = false;

const displayItemsFrmLocalStorg = () => {
  let getProductsFromLocalStr = getProductsFromLocalStorage();
  getProductsFromLocalStr.forEach((product) => {
    addProductToDom(product);
    checkUI();
  });
};
const addProductSubmit = (e) => {
  e.preventDefault();
  const newProduct = formInput.value;

  if (newProduct === "") {
    alert("please fill the field with a product");
    return;
  }

  if (isEditMode) {
    const productToEdit = listProducts.querySelector(".edit-mode");
    removeProductFromLocalStrg(productToEdit.textContent);
    productToEdit.classList.remove("edit-mode");
    productToEdit.remove();
    isEditMode = false;
  } else {
    if (checkProductExists(newProduct)) {
      alert("This product already exists");
      return;
    }
  }
  addProductToDom(newProduct);

  addProductToLocalStorage(newProduct);

  checkUI();
  formInput.value = "";
};

const addProductToDom = (product) => {
  const li = document.createElement("li");
  const new_item = document.createTextNode(product);
  li.appendChild(new_item);

  li.className = "products";

  const deleteButton = createDeleteButton();
  const editButton = createEditButton();
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  listProducts.appendChild(li);
};

const createDeleteButton = () => {
  const deleteButton = document.createElement("button");
  const icon = createIcon("fa-solid fa-trash");
  deleteButton.appendChild(icon);
  return deleteButton;
};

const createEditButton = () => {
  const editButton = document.createElement("button");
  const icon = createIcon("fa-solid fa-pencil");
  editButton.appendChild(icon);
  return editButton;
};

const createIcon = (className) => {
  const i = document.createElement("i");
  i.className = className;
  return i;
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

const onClickProduct = (e) => {
  if (e.target.classList.contains("fa-pencil")) {
    editProduct(e.target.parentElement.parentElement);
  } else if (e.target.classList.contains("fa-trash")) {
    removeProduct(e.target.parentElement.parentElement);
  }
};

const checkProductExists = (product) => {
  const itemsFrmlocalStorage = getProductsFromLocalStorage();
  return itemsFrmlocalStorage.includes(product);
};

const editProduct = (product) => {
  isEditMode = true;
  const productsLi = listProducts.querySelectorAll("li");
  productsLi.forEach((prod) => {
    prod.classList.remove("edit-mode");
  });
  product.classList.add("edit-mode");
  formButton.textContent = "Update here";
  formButton.style.backgroundColor = "green";
  formButton.style.color = "white";
  formInput.value = product.textContent;
};

const removeProduct = (product) => {
  if (confirm("Are you sure to delete this product?")) {
    product.remove();
    removeProductFromLocalStrg(product.textContent);
    checkUI();
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
  checkUI();
};

const filterItem = (e) => {
  const productsLi = listProducts.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  productsLi.forEach((product) => {
    const productName = product.firstChild.textContent.toLowerCase();

    if (productName.indexOf(text) != -1) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

const checkUI = () => {
  formInput.value = "";
  const productsLi = listProducts.querySelectorAll("li");
  if (productsLi.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }
  formButton.innerHTML = "Add item";
  formButton.style.backgroundColor = "white";
  formButton.style.color = "black";
  isEditMode = false;
};

form.addEventListener("submit", addProductSubmit);
listProducts.addEventListener("click", onClickProduct);
clearButton.addEventListener("click", clearProducts);
filter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItemsFrmLocalStorg);

checkUI();
