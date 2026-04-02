// Data storage
let currentUser = null;

// Initialize data in localStorage
function initializeData() {
    if (!localStorage.getItem('timetable')) {
        localStorage.setItem('timetable', JSON.stringify([]));
    }
    if (!localStorage.getItem('studyGroups')) {
        localStorage.setItem('studyGroups', JSON.stringify([]));
    }
    if (!localStorage.getItem('lostItems')) {
        localStorage.setItem('lostItems', JSON.stringify([]));
    }
    if (!localStorage.getItem('events')) {
        localStorage.setItem('events', JSON.stringify([]));
    }
    if (!localStorage.getItem('announcements')) {
        localStorage.setItem('announcements', JSON.stringify([]));
    }
    if (!localStorage.getItem('todos')) {
        localStorage.setItem('todos', JSON.stringify([]));
    }
}

// Sign In function
function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username.trim() && password.trim()) {
        currentUser = username;
        document.getElementById('currentUser').innerHTML = 'Welcome, ' + username;
        showPage('homePage');
        loadAllData();
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Please enter both username and password');
    }
}

// Logout function
function logout() {
    currentUser = null;
    showPage('signinPage');
}

// Page navigation
function showPage(pageId) {
    var pages = ['signinPage', 'homePage', 'timetablePage', 'studyPage', 'lostPage', 'eventPage', 'announcementPage', 'todoPage'];
    for (var i = 0; i < pages.length; i++) {
        var element = document.getElementById(pages[i]);
        if (element) {
            element.style.display = 'none';
        }
    }
    document.getElementById(pageId).style.display = 'block';
    
    if (pageId !== 'signinPage' && pageId !== 'homePage') {
        loadAllData();
    }
}

// Load all data
function loadAllData() {
    displayTimetable();
    displayStudyGroups();
    displayLostItems();
    displayEvents();
    displayAnnouncements();
    displayTodos();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Timetable functions
function addTimetable() {
    var course = document.getElementById('course').value;
    var day = document.getElementById('day').value;
    var time = document.getElementById('time').value;
    
    if (course && day && time) {
        var timetable = JSON.parse(localStorage.getItem('timetable'));
        timetable.push({ course: course, day: day, time: time });
        localStorage.setItem('timetable', JSON.stringify(timetable));
        displayTimetable();
        document.getElementById('course').value = '';
        document.getElementById('day').value = '';
        document.getElementById('time').value = '';
    } else {
        alert('Please fill all fields');
    }
}

function displayTimetable() {
    var timetable = JSON.parse(localStorage.getItem('timetable'));
    var container = document.getElementById('timetableList');
    
    if (timetable.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">No courses added yet</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < timetable.length; i++) {
        html += '<div class="timetable-item">' +
            '<strong>Course: ' + escapeHtml(timetable[i].course) + '</strong>' +
            '<p>Day: ' + escapeHtml(timetable[i].day) + '</p>' +
            '<p>Time: ' + escapeHtml(timetable[i].time) + '</p>' +
            '<button class="delete-btn" onclick="deleteTimetable(' + i + ')">Delete</button>' +
            '</div>';
    }
    container.innerHTML = html;
}

function deleteTimetable(index) {
    var timetable = JSON.parse(localStorage.getItem('timetable'));
    timetable.splice(index, 1);
    localStorage.setItem('timetable', JSON.stringify(timetable));
    displayTimetable();
}

// Study Groups functions
function addStudy() {
    var groupName = document.getElementById('groupName').value;
    var subject = document.getElementById('subject').value;
    
    if (groupName && subject) {
        var studyGroups = JSON.parse(localStorage.getItem('studyGroups'));
        studyGroups.push({ groupName: groupName, subject: subject });
        localStorage.setItem('studyGroups', JSON.stringify(studyGroups));
        displayStudyGroups();
        document.getElementById('groupName').value = '';
        document.getElementById('subject').value = '';
    } else {
        alert('Please fill all fields');
    }
}

function displayStudyGroups() {
    var studyGroups = JSON.parse(localStorage.getItem('studyGroups'));
    var container = document.getElementById('studyList');
    
    if (studyGroups.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">No study groups created yet</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < studyGroups.length; i++) {
        html += '<div class="study-item">' +
            '<strong>Group: ' + escapeHtml(studyGroups[i].groupName) + '</strong>' +
            '<p>Subject: ' + escapeHtml(studyGroups[i].subject) + '</p>' +
            '<button class="delete-btn" onclick="deleteStudyGroup(' + i + ')">Delete</button>' +
            '</div>';
    }
    container.innerHTML = html;
}

function deleteStudyGroup(index) {
    var studyGroups = JSON.parse(localStorage.getItem('studyGroups'));
    studyGroups.splice(index, 1);
    localStorage.setItem('studyGroups', JSON.stringify(studyGroups));
    displayStudyGroups();
}

// Lost and Found functions
function addLost() {
    var item = document.getElementById('item').value;
    var description = document.getElementById('description').value;
    var contact = document.getElementById('contact').value;
    
    if (item && description && contact) {
        var lostItems = JSON.parse(localStorage.getItem('lostItems'));
        var date = new Date().toLocaleDateString();
        lostItems.push({ item: item, description: description, contact: contact, date: date });
        localStorage.setItem('lostItems', JSON.stringify(lostItems));
        displayLostItems();
        document.getElementById('item').value = '';
        document.getElementById('description').value = '';
        document.getElementById('contact').value = '';
    } else {
        alert('Please fill all fields');
    }
}

function displayLostItems() {
    var lostItems = JSON.parse(localStorage.getItem('lostItems'));
    var container = document.getElementById('lostList');
    
    if (lostItems.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">No lost items reported</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < lostItems.length; i++) {
        html += '<div class="lost-item">' +
            '<strong>Item: ' + escapeHtml(lostItems[i].item) + '</strong>' +
            '<p>Description: ' + escapeHtml(lostItems[i].description) + '</p>' +
            '<p>Contact: ' + escapeHtml(lostItems[i].contact) + '</p>' +
            '<p>Reported: ' + lostItems[i].date + '</p>' +
            '<button class="delete-btn" onclick="deleteLostItem(' + i + ')">Delete</button>' +
            '</div>';
    }
    container.innerHTML = html;
}

function deleteLostItem(index) {
    var lostItems = JSON.parse(localStorage.getItem('lostItems'));
    lostItems.splice(index, 1);
    localStorage.setItem('lostItems', JSON.stringify(lostItems));
    displayLostItems();
}

// Events functions
function addEvent() {
    var eventName = document.getElementById('eventName').value;
    var eventDate = document.getElementById('eventDate').value;
    var eventLocation = document.getElementById('eventLocation').value;
    
    if (eventName && eventDate && eventLocation) {
        var events = JSON.parse(localStorage.getItem('events'));
        events.push({ eventName: eventName, eventDate: eventDate, eventLocation: eventLocation });
        localStorage.setItem('events', JSON.stringify(events));
        displayEvents();
        document.getElementById('eventName').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventLocation').value = '';
    } else {
        alert('Please fill all fields');
    }
}

function displayEvents() {
    var events = JSON.parse(localStorage.getItem('events'));
    var container = document.getElementById('eventList');
    
    if (events.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">No events scheduled</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < events.length; i++) {
        html += '<div class="event-item">' +
            '<strong>Event: ' + escapeHtml(events[i].eventName) + '</strong>' +
            '<p>Date: ' + escapeHtml(events[i].eventDate) + '</p>' +
            '<p>Location: ' + escapeHtml(events[i].eventLocation) + '</p>' +
            '<button class="delete-btn" onclick="deleteEvent(' + i + ')">Delete</button>' +
            '</div>';
    }
    container.innerHTML = html;
}

function deleteEvent(index) {
    var events = JSON.parse(localStorage.getItem('events'));
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents();
}

// Announcements functions
function addAnnouncement() {
    var title = document.getElementById('announcementTitle').value;
    var content = document.getElementById('announcementContent').value;
    
    if (title && content) {
        var announcements = JSON.parse(localStorage.getItem('announcements'));
        var date = new Date().toLocaleDateString();
        announcements.unshift({ title: title, content: content, date: date });
        localStorage.setItem('announcements', JSON.stringify(announcements));
        displayAnnouncements();
        document.getElementById('announcementTitle').value = '';
        document.getElementById('announcementContent').value = '';
    } else {
        alert('Please enter both title and content');
    }
}

function displayAnnouncements() {
    var announcements = JSON.parse(localStorage.getItem('announcements'));
    var container = document.getElementById('announcementList');
    
    if (announcements.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">No announcements yet</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < announcements.length; i++) {
        html += '<div class="announcement-item">' +
            '<strong>' + escapeHtml(announcements[i].title) + '</strong>' +
            '<p>' + escapeHtml(announcements[i].content) + '</p>' +
            '<p style="font-size: 12px; color: #888;">Posted: ' + announcements[i].date + '</p>' +
            '<button class="delete-btn" onclick="deleteAnnouncement(' + i + ')">Delete</button>' +
            '</div>';
    }
    container.innerHTML = html;
}

function deleteAnnouncement(index) {
    var announcements = JSON.parse(localStorage.getItem('announcements'));
    announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(announcements));
    displayAnnouncements();
}

// Todo functions
function addTodo() {
    var task = document.getElementById('todoTask').value;
    var priority = document.getElementById('todoPriority').value;
    
    if (task) {
        var todos = JSON.parse(localStorage.getItem('todos'));
        todos.push({ task: task, priority: priority, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
        document.getElementById('todoTask').value = '';
    } else {
        alert('Please enter a task');
    }
}

function displayTodos() {
    var todos = JSON.parse(localStorage.getItem('todos'));
    var container = document.getElementById('todoList');
    
    var totalTasks = todos.length;
    var completedTasks = 0;
    
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].completed) {
            completedTasks++;
        }
    }
    
    document.getElementById('totalTasks').innerHTML = totalTasks;
    document.getElementById('completedTasks').innerHTML = completedTasks;
    
    if (todos.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">No tasks added yet</p>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < todos.length; i++) {
        var priorityClass = '';
        if (todos[i].priority === 'high') priorityClass = 'priority-high';
        else if (todos[i].priority === 'medium') priorityClass = 'priority-medium';
        else priorityClass = 'priority-low';
        
        var checked = todos[i].completed ? 'checked' : '';
        var taskStyle = todos[i].completed ? 'text-decoration: line-through; opacity: 0.7;' : '';
        
        html += '<div class="todo-item">' +
            '<input type="checkbox" class="todo-checkbox" onclick="toggleTodo(' + i + ')" ' + checked + '>' +
            '<div class="todo-content" style="' + taskStyle + '">' +
            '<strong>' + escapeHtml(todos[i].task) + '</strong>' +
            '</div>' +
            '<span class="todo-priority ' + priorityClass + '">' + todos[i].priority.toUpperCase() + '</span>' +
            '<button class="delete-btn" onclick="deleteTodo(' + i + ')">Delete</button>' +
            '</div>';
    }
    container.innerHTML = html;
}

function toggleTodo(index) {
    var todos = JSON.parse(localStorage.getItem('todos'));
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

function deleteTodo(index) {
    var todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

// Initialize on page load
initializeData();
