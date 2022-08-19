{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            dobe: false,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list__item">
         <button class="js-done button__done">${task.done ? "✓" : ""}</button>
         <span class="list__item--content ${task.done ? "list__item--content--done" : ""}">
         ${task.content}</span>
         <button class="js-remove button__remove">🗑</button>
        </li>
         `
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };

    const resetInput = (inputElement) => {
        inputElement.value = ""
        inputElement.focus()
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-newTask")
        
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        resetInput(inputElement);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}