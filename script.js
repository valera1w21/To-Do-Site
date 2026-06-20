
const API_URL = 'https://jsonplaceholder.typicode.com/todos'; 

async function loadTasks() {
    try {
        let response = await fetch(API_URL + '?_limit=5'); 
        let tasks = await response.json();
        
        let list = document.getElementById('taskList');
        list.innerHTML = ''; 
        
        tasks.forEach(function(task) {
            renderTask(task.title); 
        });
    } catch (error) {
        alert('Something shitty happened on the server.');
    }
}

// Вызываем загрузку задач сразу, как только скрипт загрузился
loadTasks();

// Функция для СОХРАНЕНИЯ задачи
document.getElementById('addButton').addEventListener('click', async function() {
    let input = document.getElementById('taskInput');
    let text = input.value;
    
    // Если пусто — шлем нахуй
    if (text === '') {
        alert('Write something, you moron');
        return;
    }

    try {
        let response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: text, completed: false })
        });
        
        if (response.ok) {
            renderTask(text);
            input.value = ''; 
        } else {
            alert('Something shitty happened on the server.');
        }
    } catch (error) {
        alert('nothing save. Check the internet.');
    }
});

function renderTask(text) {
    let li = document.createElement('li');
    li.innerHTML = text + ' <button class="delete" onclick="this.parentElement.remove()">delete</button>';
    document.getElementById('taskList').appendChild(li);
}