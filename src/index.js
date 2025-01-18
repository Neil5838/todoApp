const inputBox = document.getElementById('input-box');
const listDiv = document.getElementById('task-list');
const addBtn = document.getElementById('addBtn');

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

})