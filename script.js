// Выбор элементов
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let firstOperand = null;
let operator = null;

// Функция для выполнения вычислений
function calculate() {
    if (firstOperand !== null && operator !== null) {
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "*":
                result = firstOperand * secondOperand;
                break;
            case "/":
                result = firstOperand / secondOperand;
                break;
        }

        display.value = result;
        firstOperand = result;
        currentInput = "";

        // Проверка для скримера, если результат равен 666
        if (result === 666) {
            showScreamer();
        }
    }
}

// Функция для показа скримера
function showScreamer() {
    const screamerContainer = document.getElementById("screamer-container");
    const screamerVideo = document.getElementById("screamer-video");

    // Показать видео
    screamerContainer.style.display = "block";

    // Скрыть видео через 20 секунд
    setTimeout(() => {
        screamerContainer.style.display = "none";
    }, 20000);
}

// Добавляем обработчик события для кнопок
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            // Очистка дисплея
            display.value = "";
            currentInput = "";
            firstOperand = null;
            operator = null;
        } else if (value === "=") {
            // Вычисление результата
            calculate();
            operator = null;
        } else if (button.classList.contains("operator")) {
            // Установка оператора
            if (currentInput) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else {
                    calculate();
                }
            }
            operator = value;
            currentInput = "";
        } else {
            // Накопление чисел
            currentInput += value;
            display.value = currentInput;
        }
    });
});
