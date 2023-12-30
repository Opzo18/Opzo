const addBtn = document.getElementById("addBTN");
const todoInput = document.getElementById("todoInput");
const list = document.getElementById("list");

// Load list from local storage
window.onload = () => {
  if (!localStorage.getItem("listStorage")) return;
  const todoItems = localStorage.getItem("listStorage").split(",");
  todoItems.forEach((todo) => {
    console.log(todo);
    const li = document.createElement("li");
    const todoText = document.createElement("p");
    todoText.style.margin = "0";
    todoText.innerHTML = todo;

    li.appendChild(functions());
    li.appendChild(todoText);
    list.appendChild(li);
  });
};

// Add to list after click on addBTN and enter key
addBtn.addEventListener("click", function () {
  addToList();
});

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addToList();
  }
});

// Functions function
function functions() {
  // Creating div
  const images = document.createElement("div");
  images.className = "images";

  // Creating edit and trash ico
  const editIco = document.createElement("img");
  editIco.src = "images/edit.svg";
  editIco.alt = "Edit";
  editIco.className = "editIco";
  editIco.addEventListener("click", editList);

  const trashIco = document.createElement("img");
  trashIco.src = "images/trash.svg";
  trashIco.alt = "Remove";
  trashIco.className = "trashIco";
  trashIco.addEventListener("click", removeFromList);

  //Adding icons to div with class images
  images.appendChild(editIco);
  images.appendChild(trashIco);

  return images;
}

// Add to list function
function addToList() {
  const li = document.createElement("li");

  // Check if there is text to add
  if (todoInput.value.length >= 1) {
    // Adding to li
    li.appendChild(functions());
    li.appendChild(document.createTextNode(todoInput.value));
    list.appendChild(li);
    todoInput.value = "";

    // Save todo to local storage
    updateLocalStorage();
  } else {
    alert("You have to write something!");
  }
}

// Remove from list function
function removeFromList(event) {
  if (event.target.classList.contains("trashIco")) {
    const li = event.target.parentElement.parentElement;
    li.remove();
    updateLocalStorage();
  }
}

// Edit list function
function editList(event) {
  if (event.target.classList.contains("editIco")) {
    const li = event.target.parentElement.parentElement;

    // Create editInput
    const editInput = document.createElement("textarea");

    editInput.className = "editInput";
    editInput.name = "text";
    editInput.style.margin = "0";

    // Set input value for text from li
    editInput.value = li.textContent.trim();

    // Clear existing content
    li.textContent = "";

    // Add save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("saveIco");
    li.appendChild(saveButton);

    // Add input to li
    li.appendChild(editInput);

    // Add save button listener
    saveButton.addEventListener("click", function () {
      const todoText = document.createElement("p");
      todoText.innerText = editInput.value;
      todoText.style.margin = "0";
      li.removeChild(editInput);
      li.removeChild(saveButton);
      li.appendChild(functions());
      li.appendChild(todoText);
      updateLocalStorage();
    });
  }
}

// Update localStorage function
function updateLocalStorage() {
  const list = document.getElementById("list");
  const liElements = list.querySelectorAll("li");
  const textArray = [];

  liElements.forEach((li) => {
    const text = li.innerText;
    textArray.push(text);
  });

  localStorage.setItem("listStorage", textArray);
}
