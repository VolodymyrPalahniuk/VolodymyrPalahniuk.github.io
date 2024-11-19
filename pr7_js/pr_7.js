const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const showAll = document.getElementById('showAll');
const showActive = document.getElementById('showActive');
const showCompleted = document.getElementById('showCompleted');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

const renderTasks = (filter = 'all') => {
  taskList.innerHTML = '';
  tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${task.text} <small>(${task.timestamp})</small></span>
        <div>
          ${!task.completed ? `<input type="checkbox" class="complete-checkbox" data-index="${index}">` : ''}
          <button class="delete-btn" data-index="${index}">✖</button>
        </div>
      `;
      li.addEventListener('dblclick', () => editTask(index));
      taskList.appendChild(li);
    });
};

const addTask = (text) => {
  const timestamp = new Date().toLocaleString();
  tasks.push({ text, completed: false, timestamp });
  saveTasks();
  renderTasks();
};

const toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
};

const deleteTask = (index) => {
  if (confirm('Ви точно бажаєте видалити завдання?')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
};

const editTask = (index) => {
  const li = taskList.children[index];
  const input = document.createElement('input');
  input.type = 'text';
  input.value = tasks[index].text;
  li.innerHTML = '';
  li.appendChild(input);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      tasks[index].text = input.value;
      saveTasks();
      renderTasks();
    }
  });
};

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = '';
  }
});

taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('complete-checkbox')) {
    toggleTask(e.target.dataset.index);
  }
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteTask(e.target.dataset.index);
  }
});

showAll.addEventListener('click', () => renderTasks('all'));
showActive.addEventListener('click', () => renderTasks('active'));
showCompleted.addEventListener('click', () => renderTasks('completed'));

renderTasks();
