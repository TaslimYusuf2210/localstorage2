const name = document.querySelector(".name");
const status = document.querySelector(".status");
const button = document.querySelector(".m-button");
const input = document.querySelector("#input");
const table = document.querySelector("#mytable tbody");
const head = document.querySelector("table tr th");

document.addEventListener("DOMContentLoaded", () => {
  let todoList = JSON.parse(localStorage.getItem("todo")) || [];

  function loadList() {
    renderList();
  }

  function renderList() {
    table.innerHTML = todoList
      .map((list, index) => createList(list, index))
      .join("");
  }

  loadList();

  function createList(element) {
    return `
      <tr>
        <td>${element.name}</td>
        <td>${element.status}</td>
        <td><button class="button">delete</button></></td>
        <td class="check-here">
        <label>click here</label>
        <input checked=${element.status === 'true' ? 'checked': ''} class="check" type="checkbox"></td>
      </tr>
    `;
  }

  ////Add list
  function addlist(e) {
    const inputValue = input.value;
    e.preventDefault();
    // let todoList = JSON.parse(localStorage.getItem("todo")) || [];
    console.log(todoList);
    if (inputValue !== "") {
      todoList.push({
        name: inputValue,
        status: false,
      });
      localStorage.setItem("todo", JSON.stringify(todoList));
      console.log(todoList);
      location.reload();
    }
  }

  button.addEventListener("click", addlist);

  console.log(todoList);

  const deleteButton = document.querySelectorAll(".button");

  deleteButton.forEach((btn, index) =>
    btn.addEventListener("click", () => {
      console.log(index);
      todoList.splice(index, 1);
      localStorage.setItem("todo", JSON.stringify(todoList));
      location.reload();
    })
  );

  const checks = document.querySelectorAll(".check");
  checks.forEach((check, indexCheck) => {
    check.addEventListener("click", () => {
      const newList = todoList.map((list, index) => {
        if (indexCheck == index) {
          alert("hello");
          return { ...list, status: check.checked };
        } else {
          return { ...list };
        }
      });
      localStorage.setItem("todo", JSON.stringify(newList));
     
    });
  });
});
