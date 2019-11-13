"use strict";

const container = $('.container');
const result__container = $('.result__container');
const result__programmer = document.querySelector('.result__programmer');
const result__manager = document.querySelector('.result__manager');
const result__designer = document.querySelector('.result__designer');
const button__count = $('.button__count');
const button__reset = $('.button__reset');
const question__1 = $('[name="question__1"]');
const question__2 = $('[name="question__2"]');
const question__3 = $('[name="question__3"]');
const question__random = $('.question__random');

let storage = localStorage;
const programmer = 2;
const manager = 2;
const designer = 2;


// Функция рандомно выводит целые числа (для произвольного показа 2 или 3 вопросов):
function getRandomQuestion(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/** Создание окна ошибки:*/
function createPopup  () {
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.zIndex = 1;
    popup.style.padding = '50px';
    popup.style.background = '#fff';
    popup.style.border = '5px solid #ff6d51';
    popup.style.borderRadius = '20px';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.cursor = 'pointer';
    popup.className = 'popup hide';
    return popup;
};


/** Функция добавления элементов диалогового окна на страницу*/
function renderDialog () {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(createPopup());
    document.body.appendChild(fragment);    
};
renderDialog();


/** Функция показа диалогового окна*/
function showDialog (message) {
    popup.textContent = message;    
    popup.classList.toggle('hide');    
};

/** Функция скрытия диалогового окна*/
function hideDialog () {
    popup.classList.add('hide');
};


let popup = document.querySelector('.popup');

// Обработчик события на клик по модальному окну:
popup.addEventListener("mouseup", function () {    
	hideDialog();
});


// Функция принимает на вход данные из localStorage и отображает данные в виде ненумерованного списка:
function render (data) {
let programmer = data.programmer;
let manager = data.manager;
let designer = data.designer;
let description = `
	<div class='description'>
		<p><strong>Начальные значения:</strong></p>
		<ul>		
			<li>Программист: <span class="original__programmer">${programmer}</span></li>
			<li>Менеджер: <span class="original__manager">${manager}</span></li>
			<li>Дизайнер: <span class="original__designer">${designer}</span></li>
		</ul>
`
let $description = $(description);
container.append($(description));
}


localStorage.parameters = JSON.stringify({
	programmer: programmer,
	manager: manager,
	designer: designer
	});

let parameters = JSON.parse(storage.parameters);


// Функция при загрузке страницы скрывает рандомно один из вопросов (второй или третий), добавляя класс "hide", устанавливает параметры localStorage, отображает их на странице:
$(document).ready(function() {	
	question__random[getRandomQuestion(0, 1)].classList.add('hide');	
	render(parameters);
})


// Функция записывает текущие значения localStorage в список "Текущие значения":
function updateResult(programmer, manager, designer) {
	result__programmer.textContent = programmer;
	result__manager.textContent = manager;
	result__designer.textContent = designer;
}

// Функция устанавливает параметры localStorage в начальное состояние:
function resetParameters() {
	parameters.programmer = 2;
	parameters.manager = 2;
	parameters.designer = 2;
}


// Изменяем текущие значения localStorage, взависимости от выбранных параметров (ответов на вопросы):
button__count.click(function(){	
	console.log(parameters); // Выводим в консоль результат предыдущей итерации	
	resetParameters();
	if (question__1[0].checked) {	    	
	    parameters.programmer = parameters.programmer + 1;
	    parameters.manager = parameters.manager - 1;
	    parameters.designer = parameters.designer - 1;
	} else if(question__1[1].checked){
		parameters.programmer = parameters.programmer - 1;
	    parameters.manager = parameters.manager - 1;
	    parameters.designer = parameters.designer + 1;		
	} else if(question__1[2].checked){
	   	parameters.programmer = parameters.programmer - 1;
	    parameters.manager = parameters.manager + 1;
	    parameters.designer = parameters.designer - 1;
	};
	if(question__2.length != 0){ // Проверяем, если длина элемента не равна 0, то заходим в условия. Если равна, то
		// есть эл-т отсутствует, то в условия не заходим.
		if (question__2[0].checked) {	    	
	    parameters.programmer = parameters.programmer - 1;
	    parameters.manager = parameters.manager - 1;
	    parameters.designer = parameters.designer + 1;
		} else if(question__2[1].checked){
		parameters.programmer = parameters.programmer - 1;
	    parameters.manager = parameters.manager + 1;
	    parameters.designer = parameters.designer - 1;		
		} else if(question__2[2].checked){
	   	parameters.programmer = parameters.programmer + 1;
	    parameters.manager = parameters.manager - 1;
	    parameters.designer = parameters.designer - 1;
		}
	};
	if(question__3.length != 0){ // Проверяем, если длина элемента не равна 0, то заходим в условия. Если равна, то
		// есть эл-т отсутствует, то в условия не заходим.
		if (question__3[0].checked) {	    	
	    parameters.programmer = parameters.programmer - 1;
	    parameters.manager = parameters.manager + 1;
	    parameters.designer = parameters.designer - 1;
		} else if(question__3[1].checked){
		parameters.programmer = parameters.programmer + 1;
	    parameters.manager = parameters.manager - 1;
	    parameters.designer = parameters.designer - 1;		
		} else if(question__3[2].checked){
	   	parameters.programmer = parameters.programmer - 1;
	    parameters.manager = parameters.manager - 1;
	    parameters.designer = parameters.designer + 1;
		}
	}
	updateResult(parameters.programmer, parameters.manager, parameters.designer);

	if (parameters.programmer === 4) {
	let message = 'Вы настоящий Программист!';
	showDialog(message);
	} else if (parameters.manager === 4) {
	let message = 'Из Вас получится отличный Менеджер!';
	showDialog(message);
	}else if (parameters.designer === 4) {
	let message = 'В душе Вы Дизайнер!';
	showDialog(message);
	} else {
	let message = 'Вы можете стать кем угодно!';
	showDialog(message);
	};
	button__count[0].classList.add('hide');
})


// Обнуляем рузультат:
button__reset.click(function(){
	resetParameters();
	updateResult(2, 2, 2);
	hideDialog();
	button__count[0].classList.remove('hide');
})
