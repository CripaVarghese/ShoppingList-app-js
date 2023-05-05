const form = document.getElementById("form");
const formInput = document.getElementById("form-input");
const listProducts = document.getElementById("list-products");
const clearButton = document.getElementById("clear-button");

const addProduct = (e) => {
  e.preventDefault();
  const newItem = formInput.value;

  if (newItem === "") {
    alert("please fill the field with a product");
    return;
  }

  const li = document.createElement("li");
  const new_item = document.createTextNode(newItem);
  li.appendChild(new_item);
  li.className = "products";

  const deleteButton = createDeleteButton();
  li.appendChild(deleteButton);
  listProducts.appendChild(li);
  console.log(li);
  formInput.value = "";
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

const removeItem = (e) => {
  if (e.target.parentElement.parentElement.classList.contains("products")) {
    console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.remove();
  }
};

const clearProducts = () => {
  while (listProducts.firstChild) {
    listProducts.removeChild(listProducts.firstChild);
  }
};

form.addEventListener("submit", addProduct);
listProducts.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearProducts);
