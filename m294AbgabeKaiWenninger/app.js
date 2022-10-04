let listTask = [];
let data = [];


addEventListener('DOMContentLoaded', async function () {
    const response = await fetch("http://127.0.0.1:3000/tasks")

    if (!response.ok) {
        alert(response.message);
        return;
    }

    const json = await response.json();

    listTask = json

    updateUI(json);
});

function addElement(e) {
    e.preventDefault();

    const taskname = document.getElementById("taskname").value;

    const postObject = {
        "completed": false,
        "title": taskname
    }

    fetch("http://127.0.0.1:3000/tasks", {
        method: "POST",
        body: JSON.stringify(postObject),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {

        if (!response.ok) {
            alert(response.message);
            return;
        }

        return response.json();

    }).then(function (json) {
        console.log(json);
    })
    listTask.push(json)
    updateUI()
}

function updateUI() {
    const list = document.getElementById("list");
    list.replaceChildren();
    listTask.forEach(element => {
        const taskDone = document.createElement("input")
        taskDone.checked = element.done;
        taskDone.type = "checkbox";
        list.append(taskDone);

        const taskName = document.createElement("input")
        taskName.value = element.title;
        taskName.onclick = function () {
            document.getElementById("taskname").value = element.title
        };
        list.append(taskName);

        const btnDelete = document.createElement("button");
        btnDelete.innerText = "delete";
        btnDelete.classList.add("btn")
        btnDelete.classList.add("btn-primary")
        btnDelete.onclick = function () {

        }
        list.append(btnDelete);
    });

    function addElement(e) {
        e.preventDefault();

        const taskname = document.getElementById("taskname").value;

        const postObject = {
            "completed": false,
            "title": taskname
        }

        fetch("http://127.0.0.1:3000/tasks", {
            method: "POST",
            body: JSON.stringify(postObject),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {

            if (!response.ok) {
                alert(response.message);
                return;
            }

            return response.json();

        }).then(function (json) {
            console.log(json);
        })
        listTask.push(json)
        updateUI()

    }
}

addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("http://127.0.0.1:3000/tasks");

    const json = await response.json();

    data = json;
    renderTask();
});

function addElement(e) {
    e.preventDefault();

    const taskname = document.getElementById("taskname").value;

    const postObject = {
        completed: false,
        title: taskname,
    };

    fetch("http://127.0.0.1:3000/tasks", {
        method: "POST",
        body: JSON.stringify(postObject),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (response) {
            if (!response.ok) {
                alert(response.message);
                return;
            }

            return response.json();
        })
        .then(function (json) {
            console.log(json);
        });

    data.push(postObject);
    renderTask();

    document.getElementById("taskname").value = "";
}

function renderTask() {
    const list = document.getElementById("list");
    list.replaceChildren();

    data.forEach(function (element, id) {
        const taskDone = document.createElement("input");
        taskDone.checked = element.done;
        taskDone.type = "checkbox";
        taskDone.onchange = function () {
            console.log(data[id]);
        };
        list.append(taskDone);

        const taskName = document.createElement("div");
        taskName.innerHTML = element.title;
        list.append(taskName);

        function deleteTask(task) {
            fetch(`http://127.0.0.1:3000/task/${task.id}`, {
                method: "DELETE"
            }).then(function () {
                loadDataFromBackend()
            })
        }

        const btnDelete = document.createElement("button");
        btnDelete.innerText = "delete";
        btnDelete.classList.add("btn");
        btnDelete.classList.add("btn-primary");
        btnDelete.onclick = function () {
            data.splice(id, 1);
            renderTask(data);
            deleteTask(data[id])
        };
        list.append(btnDelete);

        const btnEdit = document.createElement("button");
        btnEdit.innerText = "Edit";
        btnEdit.classList.add("btn");
        btnEdit.classList.add("btn-primary");
        btnEdit.onclick = function () {
            document.getElementById("taskname").value = element.title
        };
        list.append(btnEdit);
    });

    function editTask(editTask) {
        fetch("http://localhost:3000/tasks", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
    }
}