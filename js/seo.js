/************************** SEO Sorter ********************/

/////////////////// VARIABLES ///////////////////////
let formsSeo = document.forms['addWordsSeo'],
    textSeo = formsSeo.elements['todoSeo'],
    resPrint = document.querySelector('.seo .resSeo');
///exceptionsBox
let seoQueriesHeader = document.querySelector('.seo-queries .card-header'),
    exceptionsBox = document.querySelector('.seo-queries .exceptions-box'),
    addExceptionsFormHidden = document.querySelector('.seo-queries .addExceptionsForm-hidden'),
    addExceptionsForm = document.forms['addExceptions'],
    addExceptionsInput = addExceptionsForm.elements['addExceptionsInput'],
    exceptionsItemsWrapper = document.querySelector('.seo-queries .exceptions-box .exceptions-items-wrapper');
/// copyResult
let copyResult = document.querySelector('.seo-queries .btn-copy-buffer'),
    copyRes = document.getElementById('resSeoId');
//// exceptions words
let array = [],
    exceptionsArray = JSON.parse(localStorage.getItem('exceptions')) || [],
    exceptionsArrayArchive = [{id: 'G4I8zeyCoIxCTlG', text: 'когда'}, {id: 'tVfRwUnNpZDF6Jh', text: 'фото'}, {id: 'K5wp3Xev9xWpQiw', text: 'как'}, {id: 'x1Z66BmdfNLujEn', text: 'что'}, {id: '8IjMYs6MBghUNXS', text: 'для'}, {id: 'mnwIRa27R9mxCob', text: 'на'}, {id: 'i7JL8UKTxAmGkR7', text: 'у'}, {id: '7LB68M5v2ZDWEKl', text: 'какой'}, {id: 'NWC6VebuEfmF1Qa', text: 'какая'}, {id: 'Tyx88dZLPWQvrKd', text: 'какие'}, {id: 'd0q5O7uJCGE2aFY', text: 'какое'}, {id: 'YJAxqr4lhjo6Z92', text: 'на'}, {id: 'LSXv1SBS584EuC5', text: 'с'}, {id: 'w9BlwIq40wcCpEQ', text: 'чего'}, {id: 's3WNrOmSlNNOAKs', text: 'это'}, {id: 'F0CrOE4LLtFc6zk', text: 'в'}, {id: 'X1zSBNgbmiZ62FI', text: 'и'}, {id: 'w59u8BehBbJQZj2', text: 'не'}, {id: 'O8jtGPbda9TQShR', text: 'ли'}, {id: 'bKC6OqRMBK33EeH', text: 'зачем'}, {id: 'IIWUvEu9xYzhCOl', text: 'почему'}, {id: 'mYuUxGz9xRbX3yE', text: 'видео'}, {id: 'Glb4CmbfQTCQsnd', text: 'купить'}, {id: 'PohTcoRvdboXA7m', text: 'где'}, {id: 'sYSyOX2SJdoFPAq', text: 'сколько'}, {id: 'ssSyOX7SJdoFjPAq', text: 'такое'}, {id: 's5SyOxX79SJdlFjPgq', text: 'чем'}, {id: 's54lOxX7sSJ4mFjPwq', text: 'его'}, {id: 'lAhP3uWi9XeCa4C', text: 'такое'}, {id: 'lAhP3uWi9XeCa4C', text: 'что'}, {id: 'KiQhn2Z6txNlUgh', text: 'если'}, {id: 'dGhF4rVwH2sxmRB', text: 'как'}, {id: 'r4tpq582Kh3IENS', text: 'чем'}, {id: 'XS4Cj9YBki0Y54q', text: 'какими'}, {id: 'viVpu3IJdQaXvp7', text: 'можно'} ];

////////////////////// EVENTLISTENER //////////////////

//////////////// EventListener general Seo//////////////
formsSeo.addEventListener('submit', function (e) {
    e.preventDefault();
    resPrint.textContent = '';

    if (!textSeo.value) {
        textSeo.classList.add('is-invalid');
    } else {
        textSeo.classList.remove('is-invalid');
        resPrint.textContent = removeRepeatedWords(textSeo.value);
        formsSeo.reset();
    }
});

////////////////// EventListener Exceptions /////////////////////
seoQueriesHeader.addEventListener('click', function (e) {
   if (e.target.classList.contains('exceptions-btn'))  {
       exceptionsBox.classList.toggle('show');
   }
});

exceptionsBox.addEventListener('click', function (e) {
    if (e.target.classList.contains('exceptions-add-btn'))  {
        addExceptionsFormHidden.classList.toggle('show');
    }
    if (e.target.classList.contains('exceptions-delete'))  {
        removeExceptionsListItem(e.target);
    }
    if (e.target.classList.contains('exceptions-add-archive'))  {
        let ask = confirm('К СПИСКУ БУДУТ ДОБАВЛЕНЫ СЛОВА ПО УМОЛЧАНИЮ. ПРОДОЛЖИТЬ?');
        if (ask) {
            exceptionsArray =  exceptionsArray.concat(exceptionsArrayArchive);
            localStorage.setItem('exceptions', JSON.stringify(exceptionsArray));
            generateExceptionList(exceptionsArray);
        }
    }
    if (e.target.classList.contains('exceptions-deleted')) {
        let ask = confirm('СПИСОК СЛОВ БУДЕТ УДАЛЕН!   ПРОДОЛЖИТЬ?');
        if (ask) {
            exceptionsArray =  [];
            localStorage.setItem('exceptions', JSON.stringify(exceptionsArray));
            generateExceptionList(exceptionsArray);
        }
    }
    if (e.target.classList.contains('exceptions-sort')) {
        if (e.target.classList.contains('fa-sort-alpha-up')) {
            sortReversExceptionsList(exceptionsArray);
            generateExceptionList(exceptionsArray);
            e.target.classList.remove('fa-sort-alpha-up');
        } else {
            sortExceptionsList(exceptionsArray);
            generateExceptionList(exceptionsArray);
            e.target.classList.add('fa-sort-alpha-up');
        }
    }
});

addExceptionsForm.addEventListener('submit', function (e) {
    e.preventDefault();

   if ( ! addExceptionsInput.value ) {
       addExceptionsInput.classList.add('is-invalid');
   } else {
       addExceptionsInput.classList.remove('is-invalid');
       addExceptionsListItem(addExceptionsInput.value);
       addExceptionsForm.reset();
   }
});

addExceptionsInput.addEventListener('keyup', function (e) {
    addExceptionsInput.classList.remove('is-invalid');
});

formsSeo.addEventListener('click', function (e) {
    exceptionsBox.classList.remove('show');
});

textSeo.addEventListener('keyup', function (e) {
    textSeo.classList.remove('is-invalid');
    exceptionsBox.classList.remove('show');
});

/////////////////////// EventListener copy ///////////////////////////
document.addEventListener('DOMContentLoaded', e => {
    copyResult.addEventListener('click', e => {
        if(copyRes.textContent){
            try{
                copy(copyRes.textContent);
                copyResult.style.boxShadow = '3px 0px 65px 9px rgba(28,214,56,0.65)';
                setTimeout(function () {
                    copyResult.style.boxShadow = 'none'
                },500);
            }catch(e){
                alert('Ошибка копирования');
            }
        }
    });
});

///////////////////////////// FUNCTIONS ////////////////////////

/////////////////////// copy FUNCTIONS /////////////////////////
function copy(str){
    let tmp   = document.createElement('TEXTAREA'), // Создаём новый текстовой input
      focus = document.activeElement; // Получаем ссылку на элемент в фокусе (чтобы не терять фокус)

    tmp.value = str; // Временному input вставляем текст для копирования

    document.body.appendChild(tmp); // Вставляем input в DOM
    tmp.select(); // Выделяем весь текст в input
    document.execCommand('copy'); // Магия! Копирует в буфер выделенный текст (см. команду выше)
    document.body.removeChild(tmp); // Удаляем временный input
    focus.focus(); // Возвращаем фокус туда, где был
}


///////////////////////// Exceptions FUNCTIONS ///////////////////////////////////////
function clearList() {
    exceptionsItemsWrapper.innerHTML = '';
}

function generateId() {
    let id = '';
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    for (let i = 0; i < 15; i++) {
        let index = Math.floor(Math.random() * words.length);
        id += words[index];
    }
    return id;
}

function addExceptionsListItem(textItem) {
    let newItem = {
        id:  generateId(),
        text: textItem
    };

    exceptionsArray.unshift(newItem);
    exceptionsItemsWrapper.insertAdjacentElement('afterbegin', listTemplateException (newItem));
    localStorage.setItem('exceptions', JSON.stringify(exceptionsArray));
}

function removeExceptionsListItem(target) {
    let parent = target.closest('div');
    let id = parent.id;
    for ( let i = 0; i < exceptionsArray.length; i++) {
        if (exceptionsArray[i].id === id) {
            exceptionsArray.splice(i, 1);
            parent.remove();
            localStorage.setItem('exceptions', JSON.stringify(exceptionsArray));
            break;
        }
    }
}

function sortExceptionsList(arrayForSort) {
    return arrayForSort.sort( function compare(a, b) {
          if (a.text < b.text)
              return -1;
          if (a.text > b.text)
              return 1;
          return 0;
      });
}

function sortReversExceptionsList(arrayForSort) {
    return arrayForSort.sort( function compare(a, b) {
        if (a.text > b.text)
            return -1;
        if (a.text < b.text)
            return 1;
        return 0;
    });
}

function listTemplateException (singleItem) {
    let exceptionDiv = document.createElement('div');
    exceptionDiv.className = 'exceptions-items';
    exceptionDiv.textContent = singleItem.text;
    exceptionDiv.setAttribute('id', singleItem.id);
    let deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-times-circle exceptions-delete';
    deleteIcon.style.color = '#7c7c7c';
    deleteIcon.setAttribute('title', 'Удалить слово');
    exceptionDiv.appendChild(deleteIcon);

    return exceptionDiv;
}

function generateExceptionList(arrayItems) {
    clearList();

    for ( let i = 0; i < arrayItems.length; i++) {
        exceptionsItemsWrapper.appendChild(listTemplateException(arrayItems[i]));
    }
}

generateExceptionList(exceptionsArray);


//////////// Function Popap /////////////////////
function handlePopupClick() {
    window.open(this.href, '…','…');
    return false;
}

window.onload = function() {
    let lnks = document.getElementsByTagName('A')
    for(let i = 0; i < lnks.length; i++)
        if(/\bpopup\b/.test(lnks[i].className))
            lnks[i].onclick = handlePopupClick;
};

//////////////////////// Functions Seo remove repeated words //////////////////////////////////////
function removeRepeatedWords(str) {
    let reg = /(\s+)/g;

    array = toLowerCase(str.split(reg));

    for (let i = 0; i < array.length; i++) {

        for (let y = i + 1; y < array.length; y++) {
            if ( array[i] === array[y] && array[i] !== '\n' ) {
                    array.splice(y, 1);
                    y = y -1;
            }
        }
    }
    exceptionsWords();
    array = removeSpaces(array.join(' ').split('\n')).join('\n');
    return array;
}

function toLowerCase(array) {
    for ( let i = 0; i < array.length; i++) {
      array[i] = array[i].toLowerCase();
    }
    return array;
}

function removeSpaces (array) {
    let regRes = /[\s{2,}]+/g;
    for ( let i = 0; i < array.length; i++) {
        array[i] = array[i].trim().replace(regRes, ' ');
        if (array[i] === '') {
            array.splice([i], 1);
            i = i - 1;
        }
    }
    return array;
}

function exceptionsWords() {
    for ( let i = 0; i < array.length; i++) {
        for ( let y = 0; y < exceptionsArray.length; y++) {
            if (array[i] === exceptionsArray[y].text) {
                array.splice(i, 1);
            }
        }
    }
    return array;
}

/*покраска тона
окрашивание тона

домашних условиях
окрашивание тона желтизны
тон домашних условиях
желтизны
тон
окрашивание
покраска
окрашивание народными средствами
дома
правильно
хочу
окрасить седые*/


