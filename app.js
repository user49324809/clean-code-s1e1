//Document is the DOM can be accessed in the console with document.window.
var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks
//Создание задачи
var createNewTaskElement=function(taskString){
    var listItem=document.createElement("li");
    //поля ввода
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    //кнопка удаления данных
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");
    label.innerText=taskString;
    label.className='task';
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";
    editButton.innerText="Edit"; 
    editButton.className="edit";
    deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}
//добавление задачи
var addTask = function() {
    if (!taskInput.value) return; 
    var listItem = createNewTaskElement(taskInput.value); 
    incompleteTaskHolder.appendChild(listItem); 
    bindTaskEvents(listItem, taskCompleted); 
    taskInput.value = ""; 
}
//редактирование задачи
var editTask = function() {
    //добавление событий
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("editMode");
    //условие событий
    if (containsClass) {
        label.innerText = editInput.value; 
        editBtn.innerText = "Edit"; 
    } else {
        editInput.value = label.innerText; 
        editBtn.innerText = "Save"; 
    }
    listItem.classList.toggle("editMode");
};
// Удаление задачи
var deleteTask = function() {
    var listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);
}
var taskCompleted = function() {
    moveTask(this.parentNode, completedTasksHolder, taskIncomplete);
}
var taskIncomplete = function() {
    moveTask(this.parentNode, incompleteTaskHolder, taskCompleted);
}
// перемещене задачи
var moveTask = function(listItem, targetHolder, checkBoxEventHandler) {
    targetHolder.appendChild(listItem);
    bindTaskEvents(listItem, checkBoxEventHandler);
}
var ajaxRequest = function() { 
}
addButton.onclick = addTask;
addButton.addEventListener("click", ajaxRequest);
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}
// Обработка задач
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}