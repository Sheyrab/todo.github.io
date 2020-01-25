let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let ul = document.querySelector('.list-group');
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let message = document.querySelector('.message-alert');
let messageEmpty = document.querySelector('.message-empty');
let btnClear = document.querySelector('.btn-clear-all');

function generateId() {
    let id = '';
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    for ( let i = 0; i < 15; i++) {
        let index = Math.floor(Math.random() * words.length);
        id += words[index];
    }
    return id;
}

function clearList() {
    ul.innerHTML = '';
}

function listTemplate(singleTask) {
    // Create listItem
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';
    li.setAttribute('data-id', singleTask.id);
    //create span
    let span = document.createElement('span');
    span.textContent = singleTask.text;
    // create icon Edit
    let iEdit = document.createElement('i');
    iEdit.className = 'fas fa-edit ml-auto edit-item';
    // create icon Delete
    let iDelete = document.createElement('i');
    iDelete.className = 'fas fa-trash-alt ml-3 delete-item';

    li.appendChild(span);
    li.appendChild(iEdit);
    li.appendChild(iDelete);

    return li;
}

function generateList(tasksArray) {
    clearList();

    for ( let i = 0; i < tasksArray.length; i++) {
        ul.appendChild(listTemplate(tasksArray[i]));
    }

    massageEmptyAlert();
}

function addList(textList) {
    let newTask = {
        id: generateId(),
        text: textList
    };
    tasks.unshift(newTask);
    ul.insertAdjacentElement('afterbegin', listTemplate(newTask));
    localStorage.setItem('tasks', JSON.stringify(tasks));

    messageAlert({
        cssClass: 'alert-success',
        timeout: 3000,
        text: 'Задача успешно добавлена'
    });

    massageEmptyAlert();
}

function deleteListItem(target) {
    let parent = target.closest('li');
    let id = parent.dataset.id;

    for ( let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }
    parent.remove();
    localStorage.setItem('tasks', JSON.stringify(tasks));

    messageAlert({
        cssClass: 'alert-danger',
        timeout: 3000,
        text: 'Удаление завершено успешно'
    });

    massageEmptyAlert();
}

function editListItem(id, newText) {
    for ( let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].text = newText;
            break;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    messageAlert({
        cssClass: 'alert-warning',
        timeout: 3000,
        text: 'Редактирование успешно завершено'
    });
}

function messageAlert(settings) {
   message.classList.add(settings.cssClass);
   message.classList.add('show');
   message.textContent = settings.text;

   setTimeout(function () {
       message.classList.remove('show');
       message.classList.remove(settings.cssClass);
   }, settings.timeout);
}

function massageEmptyAlert() {
    if (!tasks.length) {
        messageEmpty.classList.add('show');
    } else {
        messageEmpty.classList.remove('show');
    }
}

// Listeners
ul.addEventListener('click', function (e) {
   if (e.target.classList.contains('delete-item')) {
       deleteListItem(e.target);
   }
   if (e.target.classList.contains('edit-item')) {
       e.target.classList.toggle('fa-save');
       let id = e.target.closest('li').dataset.id;
       let span = e.target.closest('li').querySelector('span');

       if (e.target.classList.contains('fa-save')) {
           span.setAttribute('contenteditable', true);
           span.focus();
       } else {
           span.setAttribute('contenteditable', false);
           span.blur();
           editListItem(id, span.textContent);
       }
   }
});

form.addEventListener('submit', function (e) {
   e.preventDefault();

    if (!inputText.value) {
        inputText.classList.add('is-invalid');
    } else {
        inputText.classList.remove('is-invalid');
        addList(inputText.value);
        form.reset();
    }
});

inputText.addEventListener('keyup', function (e) {
    if (inputText.value) {
        inputText.classList.remove('is-invalid');
    }
});

btnClear.addEventListener('click', function (e) {
   clearList();
   tasks = [];
   localStorage.setItem('tasks', JSON.stringify(tasks));
   massageEmptyAlert();
});

generateList(tasks);

//////////// Function Popap /////////////////////
function handlePopupClick() {
    window.open(this.href, '…','…');
    return false;
}

window.onload = function() {
    let lnks = document.getElementsByTagName('A');
    for(let i = 0; i < lnks.length; i++)
        if(/\bpopup\b/.test(lnks[i].className))
            lnks[i].onclick = handlePopupClick;
};






