const roundsBtn = document.querySelectorAll('.game-mode');
const optionsContainer = document.querySelector('.options-container');
const quizImage = document.querySelector('#quiz-image');
const scoreContainer = document.querySelector('#score');
const quizContainer = document.querySelector(".quiz-container");


let totalRounds = 0;
let currentRound = 0;
let correctAnswers = 0;
let myStudentsArray = [];

roundsBtn.forEach((button) => {
  button.addEventListener('click', () => {
    const rounds = button.dataset.rounds;
    startGame(rounds);
  });
});

function startGame(rounds) {
  myStudentsArray = [...students];
  totalRounds = rounds === 'all' ? 
  myStudentsArray.length : Number(rounds);
  console.log(totalRounds);

  currentRound = 0;
  correctAnswers = 0;
  
  quizContainer.classList.remove("hide");
  quizImage.classList.remove("hide");
  updateScore();

  optionsContainer.addEventListener('click', handleOptionClick);

  nextRound();
}

function endGame() {
  
  optionsContainer.removeEventListener('click', handleOptionClick);

  document.getElementById('scoreMessage').textContent = `Game Over! Correct Answers: ${correctAnswers}, Total Rounds: ${totalRounds}`;

    let modal = document.getElementById("scoreModal");
    modal.style.display = "block";

    let span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function handleOptionClick(event) {
  const selectedOption = Number(event.target.dataset.option);
  const correctOption = Number(quizImage.dataset.option);

  if (selectedOption === correctOption) {
    correctAnswers++;
     
  }
  currentRound++;
  updateScore();

  if (currentRound < totalRounds) {
    nextRound();
  } else {
    endGame();
  }
}

function updateScore() {
  scoreContainer.textContent = `Score: ${correctAnswers}/${currentRound}`;
}

function nextRound() {

  const correctOption = Number(quizImage.dataset.option);
  myStudentsArray = myStudentsArray.filter(student => student.id !== correctOption);

  console.log(myStudentsArray);

  if (myStudentsArray.length < 4) {
    endGame();
    return;
  }

  const roundStudents = getRandomStudents(4);
  const correctStudent = roundStudents[Math.floor(Math.random() * 4)];

  quizImage.src = correctStudent.image;
  quizImage.alt = `Classmates Image: ${correctStudent.name}`;
  quizImage.dataset.option = correctStudent.id;

  roundStudents.forEach((student, index) => {
    const optionButton = optionsContainer.children[index];
    optionButton.textContent = student.name;
    optionButton.dataset.option = student.id;
  });
}


function getRandomStudents(num) {
  const selectedStudents = [];
  while (selectedStudents.length < num) {
    const randomIndex = Math.floor(Math.random() * myStudentsArray.length);
    const student = myStudentsArray[randomIndex];
    if (!selectedStudents.includes(student)) {
      selectedStudents.push(student);
    }
  }
  return selectedStudents;
}







