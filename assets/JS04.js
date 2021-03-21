'use strict';

const output = document.getElementById('output');
let count = 0;
let correctAnswerCount = 0;
let result = 0;
let selectAnswer = '';
let quiz = 0;
let quizInstance = 0;

//最初のページを作成
function displayTopPage() {
  const h = document.createElement('h1');
  h.textContent = 'ようこそ'
  output.appendChild(h);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const p = document.createElement('p');
  p.textContent = '以下のボタンをクリック';
  output.appendChild(p);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  const clickbtn = document.createElement('input');
  clickbtn.type = 'button';
  clickbtn.value = '開始';
  output.appendChild(clickbtn);

  clickbtn.addEventListener('click', function() {
    output.textContent = '';
    clickbtn.hidden = true;
    newQuiz();
  } )

  function newQuiz(){
    if(count < 10) {
      quizInstance = new Quiz();
      quizInstance.getQuiz();
    }
  }
}
displayTopPage();



// const fetchQuiz = async() => {
//   const h = document.createElement('h1');
//   h.textContent = '取得中'
//   output.appendChild(h);

//   const hr1 = document.createElement('hr');
//   output.appendChild(hr1);

//   const p = document.createElement('p');
//   p.textContent = '少々お待ちください。';
//   output.appendChild(p);

//   const hr2 = document.createElement('hr');
//   output.appendChild(hr2);

//   displayQuiz();
// }

function displayFetchPage() {
  const h = document.createElement('h1');
  h.textContent = '取得中'
  output.appendChild(h);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const p = document.createElement('p');
  p.textContent = '少々お待ちください。';
  output.appendChild(p);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);
}

class Quiz {
  constructor() {
    displayFetchPage();
    const url = 'https://opentdb.com/api.php?amount=10';
    async function fetchQuiz() {
      await fetch(url).then((response) => {
        return response.json()
      }).then((result) => {
        // Example(result);
        quiz = result.results;
        console.log(quiz);
      }).catch((e) => {
        console.log(e);
      })
    }
    fetchQuiz();

    this.theQuiz = quiz[count];
    console.log(quiz);
    this.category = theQuiz.category;
    this.difficulty = theQuiz.difficulty;
    this.question = theQuiz.question;
    this.type = theQuiz.type;
    this.correctAnswer = theQuiz.correct_answer;
    this.incorrectAnsers = theQuiz.incorrect_answers;
  }
  getQuiz() {
    output.textContent = '';
    count++;
    if (count <= 10) {
      displayQuizPage();
      }else{
      displayResult();
    }
    //正解を選択した場合にカウントする
    if (selectAnswer = correctAnswer) {
      correctAnswerCount ++;
    }
  }
}



//クイズと選択肢を出力
function displayQuizPage() {
  //問題、ジャンル、難易度を出力
  let h = document.createElement('h1');
  h.textContent = '問題' + count;
  output.appendChild(h);

  let janreContent = document.createElement('p');
  janreContent.textContent = '[ジャンル]' + quizInstance.category;
  output.appendChild(janreContent);

  let difficultyContent = document.createElement('p');
  difficultyContent.textContent = '[難易度]' + quizInstance.difficulty;
  output.appendChild(difficultyContent);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const questionContent = document.createElement('p');
  questionContent.textContent = quizInstance.question;
  output.appendChild(questionContent);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  const btnDiv = document.createElement('div');
  output.appendChild(btnDiv);

  //選択肢を出力
  if( quizInstance.type === 'boolean') {
    //YesNoクエスチョンのとき
    const trueBtn = document.createElement('input');
    trueBtn.type = 'button';
    trueBtn.value = 'True';
    trueBtn.classList.add('btn');
    btnDiv.appendChild(trueBtn);

    const FalseBtn = document.createElement('input');
    FalseBtn.type = 'button';
    FalseBtn.value = 'False';
    FalseBtn.classList.add('btn');
    btnDiv.appendChild(FalseBtn);

    //ボタン押下された際の処理を記載
    trueBtn.addEventListener('click', function() {
      output.textContent = '';
      selectAnswer = 'True';
      return;
    })
    FalseBtn.addEventListener('click', function() {
      output.textContent = '';
      selectAnswer = 'False';
    })
  } else {
    //４択のとき
    let correctQuestionNumber = Math.random() * 3;
    for (let i = 0; i < 3; i++){
      if (correctQuestionNumber < i) {
        const answerBtn =document.createElement('input');
        answerBtn.type = 'button';
        answerBtn.classList.add('btn');
        answerBtn.value = quizInstance.correctAnswer;
        btnDiv.appendChild(answerBtn)

        //ボタン押下された際の処理を記載
        answerBtn.addEventListener('click', function() {
        output.textContent = '';
        correctAnswerCount ++;
        return;
        })
      }
      const answerBtn =document.createElement('input');
      answerBtn.type = 'button';
      answerBtn.value = quizInstance.incorrectAnswers[i];
      answerBtn.classList.add('btn');
      btnDiv.appendChild(answerBtn);

      //ボタン押下された際の処理を記載
      answerBtn.addEventListener('click', function() {
        output.textContent = '';
        return;
      })
    }
  }
  // count++;
}

//クイズ結果を出力
function displayResult() {
  const h = document.createElement('h1');
  h.textContent = 'あなたの正答数は' + correctAnswerCount + 'です！！';
  output.appendChild(h);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const p = document.createElement('p');
  p.textContent = '再度チャレンジしたい場合は以下をクリック！！';
  output.appendChild(p);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  const clickbtn = document.createElement('input');
  clickbtn.type = 'button';
  clickbtn.value = 'ホームに戻る';
  output.appendChild(clickbtn);

  clickbtn.addEventListener('click', function() {
    //トップページに移動、初期化
    output.textContent = '';
    count = 0;
    correctAnswerCount = 0;
    displayTopPage();
  } )

}