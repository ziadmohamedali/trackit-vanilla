// 1. DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksContainer = document.getElementById('tasksContainer');
const filterButtons = document.querySelectorAll('.filter-btn');

// 2. State Management
let tasks = [
  { id: 1, text: "Learn JavaScript arrays", status: "waiting" },
  { id: 2, text: "Build a Bootstrap layout", status: "completed" }
];
let currentFilter = 'all';

// 3. Render Tasks to DOM
function renderTasks() {
  tasksContainer.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'completed') return task.status === 'completed';
    if (currentFilter === 'waiting') return task.status === 'waiting';
    return true;
  });

  if (filteredTasks.length === 0) {
    tasksContainer.innerHTML = `<p style="text-align:center; color:#888;">No tasks found here 📭</p>`;
    return;
  }

  filteredTasks.forEach(task => {
    const isCompleted = task.status === 'completed';
    const card = document.createElement('div');
    card.className = `card ${isCompleted ? 'completed' : ''}`;
    
    card.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="card-actions">
        <button class="action-btn status-btn" onclick="toggleStatus(${task.id})">
          ${isCompleted ? 'Wait ⏳' : 'Done ✅'}
        </button>
        <button class="action-btn edit-btn" onclick="editTask(${task.id})">Edit ✏️</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">Delete 🗑️</button>
      </div>
    `;
    tasksContainer.appendChild(card);
  });
}

// 4. Operations: Add, Update, Edit, Delete
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return alert('Please enter a task name!');

  tasks.push({ id: Date.now(), text, status: 'waiting' });
  taskInput.value = '';
  renderTasks();
});

function toggleStatus(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'waiting' : 'completed' } : t);
  renderTasks();
}

function editTask(id) {
  const taskToEdit = tasks.find(t => t.id === id);
  if (!taskToEdit) return;

  const newText = prompt('Edit your task:', taskToEdit.text);
  
  if (newText !== null && newText.trim() !== '') {
    tasks = tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t);
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

// 5. Bonus Filters Handler
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.getAttribute('data-filter');
    renderTasks();
  });
});

renderTasks();
