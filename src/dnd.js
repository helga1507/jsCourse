/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');
    newDiv.style.position = 'absolute';
    newDiv.style.width = getRandomInt(100, 200)+'px';
    newDiv.style.height = getRandomInt(100, 200)+'px';
    newDiv.style.top = getRandomInt(0, document.documentElement.clientHeight)+'px';
    newDiv.style.left = getRandomInt(0, document.documentElement.clientWidth)+'px';
    newDiv.style.backgroundColor = 'rgb('+getRandomInt(0, 256)+','+getRandomInt(0, 256)+','+getRandomInt(0, 256)+')';

    return newDiv;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.addEventListener('dragstart', () => false);

    target.addEventListener('mousedown', (e) => {
        const setCoord = (e) => {
            target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
            target.style.top = e.pageY - target.offsetHeight + 'px';
        };

        setCoord(e);

        document.onmousemove = e => setCoord(e);

        target.addEventListener('mouseup', () => document.onmousemove = null );

    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
