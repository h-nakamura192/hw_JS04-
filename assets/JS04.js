'use strict';

const output = document.getElementById('output');
let count = 0;
let correctAnswerCount = 0;
let selectAnswer = '';
let janre = [];
let difficulty = [];
let question = [];
let type = [];
let correct_answer = [];
let incorrect_answers = [];


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
    function finishQuizContent() {
      return new Promise((resolve) => {
        resolve(quizContent);
      })
    }

    function finishDisplayStayPage() {
      return new Promise((resolve) => {
        resolve(displayStayPage);
      })
    }
    //「待機中」ページを出力し、fetchでのデータ読み込みが終了したらクイズ画面を出力
    Promise.all([
      finishDisplayStayPage(),
      finishQuizContent()
    ]).then(function(){
      output.textContent = '';
      console.log('add');
      add();
    })
  } )

}
displayTopPage();

function add() {
  if (count < 10) {
    displayQuiz(janre[count], difficulty[count], question[count], type[count], correct_answer[count], incorrect_answers[count]);
    console.log(incorrect_answers[count]);
    }else{
      displayResult();
    }
}

function displayStayPage() {
  console.log('displayStayPage');
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

//クイズを取り出す
function quizContent() {
  fetch('https://opentdb.com/api.php?amount=10').then(function  (response) {
    return response.json();
  }).then(function(json) {
      return json.results;
  }).then(function(results) {
    for (let i = 0; i< results.length; i++) {
      janre[i] = results[i].category;
      difficulty[i] = results[i].difficulty;
      question[i] = results[i].question;
      type[i] = results[i].type;
      correct_answer[i] = results[i].correct_answer;
      incorrect_answers[i] = results[i].incorrect_answers;
    }
    console.log('finishquizontent');
  })
}

//クイズと選択肢を出力
function displayQuiz(janre, difficulty, question, type, correct_answer, incorrect_answers) {
  count ++;

  //問題、ジャンル、難易度を出力
  let h = document.createElement('h1');
  h.textContent = '問題' + count;
  output.appendChild(h);

  let janreContent = document.createElement('p');
  janreContent.textContent = '[ジャンル]' + janre;
  output.appendChild(janreContent);

  let difficultyContent = document.createElement('p');
  difficultyContent.textContent = '[難易度]' + difficulty;
  output.appendChild(difficultyContent);

  const hr1 = document.createElement('hr');
  output.appendChild(hr1);

  const questionContent = document.createElement('p');
  questionContent.textContent = question;
  output.appendChild(questionContent);

  const hr2 = document.createElement('hr');
  output.appendChild(hr2);

  const btnDiv = document.createElement('div');
  output.appendChild(btnDiv);

  //選択肢を出力
  if( type === 'boolean') {
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
      quizContent();
    })
    FalseBtn.addEventListener('click', function() {
      output.textContent = '';
      selectAnswer = 'False';
      quizContent();
    })
    //正解を選択した場合にカウントする
    if (selectAnswer = correct_answer) {
      correctAnswerCount ++;
    }

  } else {
    //４択のとき
    let correctQuestionNumber = Math.random() * 3;
    for (let i = 0; i < 3; i++){
      if (correctQuestionNumber < i) {
        const answerBtn =document.createElement('input');
        answerBtn.type = 'button';
        answerBtn.classList.add('btn');
        answerBtn.value = correct_answer;
        btnDiv.appendChild(answerBtn)

        //ボタン押下された際の処理を記載
        answerBtn.addEventListener('click', function() {
        output.textContent = '';
        correctAnswerCount ++;
        quizContent();
        })
      }
      const answerBtn =document.createElement('input');
      answerBtn.type = 'button';
      // let arrayIncorrect_answers = incorrect_answers;
      // console.log(incorrect_answers);
      // answerBtn.value = arrayIncorrect_answers[i];
      answerBtn.value = incorrect_answers[i];
      answerBtn.classList.add('btn');
      btnDiv.appendChild(answerBtn);

      //ボタン押下された際の処理を記載
      answerBtn.addEventListener('click', function() {
        output.textContent = '';
        quizContent();
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