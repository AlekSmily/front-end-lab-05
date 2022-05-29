// Визначаємо функцію зміни кольорів першого елемента
const firstElem =
    document.getElementById("first");

firstElem.onclick = function () {
    firstElem.style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
    firstElem.style.color = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
}

// Визначаємо функцію зміни кольорів наступного елемента
const secondElem =
    document.querySelector(".second");

secondElem.onclick = function () {
    secondElem.style.backgroundColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
    secondElem.style.color = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
}

//Отримуємо елемент-список контейнерів для зображень
const listImageContainer =
    document.getElementById('image-list');

//Визначимо крок зміни масштабу зображення
const zoomStep = 0.1;

//Функція, яка формує матрицю для властивості transform
const getZoomByStep = (zoomStep, transform) => {
    const params = transform
        .match("[\\d\\., ]+")[0]
        .split(", ");

    params[0] = parseFloat(params[0]) + zoomStep;
    params[3] = parseFloat(params[3]) + zoomStep;

    return `matrix(${params.join(", ")})`
};

//Реалізуємо функцію додавання зображення
document
    .getElementById("btn-add")
    .addEventListener("click", (e) => {

        const imgElem = document.createElement("img");
        imgElem.classList = "img-class";
        imgElem.src = "images/Parlamenti_Budapest.jpg";

        const imgContainer = document.createElement("div");
        imgContainer.classList = "image-container";

        imgContainer.appendChild(imgElem);
        listImageContainer.appendChild(imgContainer);

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });

//Реалізуємо функцію видалення зображення
document
    .getElementById("btn-delete")
    .addEventListener("click", () => {
        const lastImg = document.querySelector('.image-container:last-child');

        if (lastImg) {
            listImageContainer.removeChild(lastImg);
        }
    });

//Реалізуємо функцію збільшення зображення
document
    .getElementById("btn-zoom-in")
    .addEventListener("click", () => {
        const allImg = listImageContainer.querySelectorAll('img');
        const lastImg = allImg[allImg.length - 1];

        const transform = lastImg.style.transform || "matrix(1, 0, 0, 1, 0, 0)";

        lastImg.style.transform = getZoomByStep(zoomStep, transform);
    });

//Реалізуємо функцію зменшення зображення
document
    .getElementById("btn-zoom-out")
    .addEventListener("click", () => {
        const allImg = listImageContainer.querySelectorAll('img');
        const lastImg = allImg[allImg.length - 1];

        const transform = lastImg.style.transform || "matrix(1, 0, 0, 1, 0, 0)";

        lastImg.style.transform = getZoomByStep(-zoomStep, transform);
    });