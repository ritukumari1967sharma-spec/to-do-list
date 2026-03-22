 const addTask = async () => {
    const input = document.getElementById("task_title");
    const task_title = input.value;

    await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task_title: task_title,
            description: "Custom task",
            status: "Not Done"
        })
    });

    input.value = "";  
    loadData();
};

const loadData = async () => {
    const res = await fetch("http://localhost:8000/tasks");
    const data = await res.json();

    const result = document.getElementById("result");
    result.innerHTML = "";

    data.forEach(task => {
        const div = document.createElement("div");
        div.innerText = `${task.task_title} - ${task.description || ""} - ${task.status}`;
        result.appendChild(div);
    });
};
