const inputBox = document.getElementById('input-box');
const listDiv = document.getElementById('task-list');
const addBtn = document.getElementById('addBtn');
const msg = document.getElementById('msg');

addBtn.addEventListener('click', function() {
    const task = inputBox.value.trim();
    if(!task) {
        alert('Please write down the task!');
        return;
    }
    inputBox.value = '';

    const li = document.createElement('li');
    li.innerHTML = `
    <label>
        <input type="checkbox" />
        <span>${task}</span>
    </label>
    <span id="del-btn">Delete</span>
    <span id="edit-btn">Edit</span>
    `;

    listDiv.appendChild(li);
    msg.style.display = 'none';

    //functionalities

    const checkbox = li.querySelector("input");
    const taskSpan = li.querySelector("label > span");
    const delBtn = li.querySelector("#del-btn");
    const editBtn = li.querySelector("#edit-btn");

    checkbox.addEventListener('click', function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounter();

    })

    editBtn.addEventListener('click', function() {
        const update = prompt('Edit task:', taskSpan.textContent);
        if(update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounter();
        }
    });

    delBtn.addEventListener('click', function() {
        li.remove();
        updateCounter()
    })


    const completedCounter = document.getElementById('completed-counter');
    const uncompletedCounter = document.getElementById('uncompleted-counter');

    function updateCounter() {
        const completedTask = document.querySelectorAll('.completed').length;
        const uncompletedTask = document.querySelectorAll('li:not(.completed)').length;
        completedCounter.innerHTML = completedTask;
        uncompletedCounter.innerHTML = uncompletedTask;
    }

    updateCounter();

});
