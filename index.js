//question database
const STORE = [
    {
      question: 'What kind of metal kills white walkers?',
      answers: [
        'Copper',
        'Valeryian Steel',
        'Iron',
        'Tanzenite'
      ],
      correctAnswer:
        'Valeryian Steel'
    },
    {
      question:
        'What is the sigil of house Stark?',
      answers: [
        'Bluebird',
        'Direwolf',
        'Sea Turtle',
        'Flower Garden'
      ],
      correctAnswer:
        'Direwolf'
    },
    {
      question:
        'Who is the long lost cousing of Jon Snow?',
      answers: [
        'Marcus Garvey',
        'Danerys Targeryian',
        'Ramsay Bolton',
        'Little Finger'
      ],
      correctAnswer: 'Danerys Targeryian'
    },
    {
      question: 'How many dragons does Dany raise througout the series?',
      answers: [
        '3',
        '5',
        '1',
        '2'
      ],
      correctAnswer: '3'
    },
    {
      question:
        'What crime does Queen Cercie get accused of later in the series?',
      answers: [
        'Incest',
        'Adultary',
        'Theft',
        'Murder'
      ],
      correctAnswer:
        'Incest'
    },
    {
      question: 'What is the official name of the Game Of Thrones novel anthology?',
      answers: [
        'A blast of heat and embers',
        'A song of ice and fire',
        'A tale of woe and rebirth',
        'A Tale of dust and ashes'
      ],
      correctAnswer: `A song of ice and fire`
    },
    {
      question:
        'What is the nickname given to Tyrion Lannister?',
      answers: [
        `The imp`,
        `Half man`,
        `Little dragon`,
        `The wretch`
      ],
      correctAnswer:
        `The imp`
    },
    {
      question: `How many wifes can men of the night"s watch take?`,
      answers: [
        `3`,
        `1`,
        `0`,
        `10`
      ],
      correctAnswer:
       `0`
    },
    {
      question: `What is the only substance that can put out green wildfire?`,
      answers: [
        `Sand`,
        `Ice`,
        `Water`,
        `Blood`
      ],
      correctAnswer: `Sand`
    },
    {
      question:
        `What food poisoned King Joffery?`,
      answers: [
        `Mince pie`,
        `Cake`,
        `Wine`,
        `Cheese`
      ],
      correctAnswer: `Mince pie`
    }
  ];
  
  //variables to store the quiz score and question number information
  let score = 0;
  let questionNumber = 0;
  
  //template to generate each question
  function generateQuestion() {
    if (questionNumber < STORE.length) {
      return createThing(questionNumber);
    } else {
      $('.questionBox').hide();
      finalScore();
      $('.questionNumber').text(10);
    }
  }
  
  //increments the number value of the "score" variable by one
  //and updates the "score" number text in the quiz view
  function updateScore() {
    score++;
    $('.score').text(score);
  }
  
  //increments the number value of the "question number" variable by one
  //and updates the "question number" text in the quiz view
  function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
  }
  
  //resets the text value of the "question number" and "score" variables
  //and updates their repective text in the quiz view
  function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }
  
  //begins the quiz
  function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionBox').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }
  
  //submits a selected answer and checks it against the correct answer
  //runs answer functions accordingly
  function submitAnswer() {
    $('.gamebox').on('submit', function (event) {
      event.preventDefault();
      $('.altBox').hide();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }
  
  //creates html for question form
  function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label class="sizeMe" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
  }
  
  //resulting feedback if a selected answer is correct
  //increments user score by one
  function correctAnswer() {
    $('.response').html(
      `<h3>Your answer is correct!</h3>
      <img src="img/iron-throne.webp" alt="Game Of Thrones Poster" class="images" width="200px">
        <p class="sizeMe">Well Done!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }
  
  //resulting feedback if a selected answer is incorrect
  function wrongAnswer() {
    $('.response').html(
      `<h3>That's the wrong answer...</h3>
      <img src="img/w-walker.jpg" alt="White Walker standing in the snow" class="images" width="200px">
      <p class="sizeMe">It's actually:</p>
      <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`
    );
  }
  
  //generates the next question
  function nextQuestion() {
    $('.gamebox').on('click', '.nextButton', function (event) {
      $('.altBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }
  
  //determines final score and feedback at the end of the quiz
  function finalScore() {
    $('.final').show();
  
    const great = [
      'Congratulations!',
      'img/n-watch.jpg',
      `night"s watchmen`,
      'You"re Ready for war!'
    ];
  
    const good = [
      'You know... a little bit',
      'iwg/t-lan.jpg',
      'Tyrion Lanniester',
      'Head to the citadel'
    ];
  
    const bad = [
      'You don"t belong here',
      'img/l-fin.jpg',
      'Little finger',
      'Are you more of a Dr. Who fan?'
    ];
  
    if (score >= 8) {
      array = great;
    } else if (score < 8 && score >= 5) {
      array = good;
    } else {
      array = bad;
    }
    return $('.final').html(
      `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="images">
          <h3>Your score is ${score} / 10</h3>
          <p class="sizeMe">${array[3]}</p>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }
  
  //takes user back to the starting view to restart the quiz
  function restartQuiz() {
    $('.gamebox').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
  }
  
  //runs the functions
  function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(makeQuiz);
  