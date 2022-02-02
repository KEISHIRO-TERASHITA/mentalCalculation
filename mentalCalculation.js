const main = document.getElementById("main");
const questionArea = document.getElementById("questionArea");
const formArea = document.getElementById("formArea");
const resultArea = document.getElementById("resultArea");
const startButton = document.getElementById("startButton");
const checkButton = document.getElementById("checkButton");
const nextButton = document.getElementById("nextButton");
const resultButton = document.getElementById("resultButton");
const inputDigit_1 = document.getElementsByName("digit_1");
const inputDigit_2 = document.getElementsByName("digit_2");
const operators = document.getElementsByName("operators");
const questionLengthInput = document.getElementById("questionLengthInput")
let questions = [];
let answers = [];
let userAnswers = [];
let ans = "";
let counter = 0;
let score = 0;
let digit_1 = 0;
let digit_2 = 0;
let operator = "";
let questionLength = "";

function random(digits) {
  let randomNumber = Math.floor(
    Math.random() * (Math.pow(10, digits) - Math.pow(10, digits - 1)) +Math.pow(10, digits - 1)
  );
  return randomNumber;
}

function createQuestion() {
  questionArea.innerHTML = "";

  const number_0 = random(digit_1);
  const number_1 = random(digit_2);

  const questionBox = document.createElement("div");

  const question = `${number_0}` + `${operator}` + `${number_1}`;

  if (operator === "+"){
    ans = number_0 + number_1;
  }
  if (operator === "-"){
    ans = number_0 - number_1;
  }
  if (operator === "×"){
    ans = number_0 * number_1;
  }

  questions.push(question);
  questionBox.innerHTML = question;
  questionArea.appendChild(questionBox);

  answers.push(ans);
}

function startButtonClick() {
  questionLength = questionLengthInput.value;

  for (let i = 0; i < inputDigit_1.length; i++){
    if(inputDigit_1.item(i).checked){
    digit_1 = inputDigit_1.item(i).value;
    }
  }
  
  for (let i = 0; i < inputDigit_2.length; i++){
    if(inputDigit_2.item(i).checked){
    digit_2 = inputDigit_2.item(i).value;
    }
  }

  for (let i = 0; i < operators.length; i++){
    if(operators.item(i).checked){
    operator = operators.item(i).value;
    }
  }

  createQuestion();
  formArea.innerHTML = "";
  const inputArea = document.createElement("div");
  inputArea.className = "inputArea";
  formArea.appendChild(inputArea);
  const form = document.createElement("input");
  form.type = "text";
  form.id = "inputAnswer";
  const label = document.createElement("label");
  label.innerHTML = "答え";
  inputArea.appendChild(label);
  inputArea.appendChild(form);
  startButton.className = "disappeared";
  checkButton.className = "buttons";
}

function nextButtonClick() {
  createQuestion();
  const inputAnswer = document.getElementById("inputAnswer");
  inputAnswer.value = "";
  nextButton.className = "disappeared";
  checkButton.className = "buttons";
}

function checkButtonClick() {
  const inputAnswer = document.getElementById("inputAnswer");
  const userAnswer = Number(inputAnswer.value);
  userAnswers.push(userAnswer);
  const ansBox = document.createElement("div");
  ansBox.innerHTML = "=" + `${ans}`;
  questionArea.appendChild(ansBox);
  checkButton.className = "disappeared";
  nextButton.className = "buttons";
}

function resultButtonClick() {
  resultButton.className = "disappeared";
  for (let i = 0; i < questionLength; i++) {
    const resultBox = document.createElement("div");
    resultBox.className = "resultBox";
    const showQuestion = document.createElement("div");
    showQuestion.innerHTML = questions[i] + "=" + answers[i];
    const showAnswer = document.createElement("div");
    if (userAnswers[i] === answers[i]) {
      showAnswer.innerHTML = "あなたの答え　　" + userAnswers[i] + "　　正解！";
      showAnswer.className = "correct";
      showQuestion.className = "correct";
      score++;
    } else {
      showAnswer.innerHTML =
        "あなたの答え　　" + userAnswers[i] + "　　不正解…";
        showAnswer.className = "wrong";
        showQuestion.className = "wrong";
    }
    resultArea.appendChild(resultBox);
    resultBox.appendChild(showQuestion);
    resultBox.appendChild(showAnswer);
  }
}

startButton.addEventListener("click", () => {
  startButtonClick();
});

nextButton.addEventListener("click", () => {
  if (counter === questionLength - 1) {
    questionArea.innerHTML = "";
    formArea.innerHTML = "";
    resultButton.className = "buttons";
    nextButton.className = "disappeared";
  } else {
    counter++;
    nextButtonClick();
  }
});

checkButton.addEventListener("click", () => {
  checkButtonClick();
});

resultButton.addEventListener("click", () => {
  resultButtonClick();
  const scoreResult = document.createElement("div");
  scoreResult.innerHTML = `${questionLength}` + "門中" + `${score}` + "問正解";
  resultArea.appendChild(scoreResult);
});
