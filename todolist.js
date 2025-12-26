
const hightask = document.querySelector(".hightask")
const mediumtask = document.querySelector(".mediumtask")
const lowtask = document.querySelector(".lowtask")
const btnadd = document.querySelector(".add")
const input = document.querySelector(".input-task")

btnadd.addEventListener("click", () => {
    let priority = document.getElementById("priority").value;
    let taskText = input.value.trim();

    if (!taskText || !priority) {
        alert("Please enter a task and select priority!");
        return;
    }

    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.setAttribute("data-priority", priority);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.style.transform = "scale(1.2)";


    const label = document.createElement("label");
    label.innerText = taskText;

    
    newTask.appendChild(checkbox);
    newTask.appendChild(label);

    
    const container = document.querySelector(`.${priority}-priority`);
    container.appendChild(newTask);

    
    input.value = "";

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            newTask.remove();  
        }
    });
});
