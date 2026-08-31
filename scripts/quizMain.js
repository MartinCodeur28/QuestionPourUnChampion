function LeaderBoard(onUse5050) {
  var used5050 = false;
  var usedTel = false;
  var usedPub = false;

  var joker5050 = document.getElementById("joker_5050");
  var jokerTel = document.getElementById("joker_tel");
  var jokerPub =  document.getElementById("joker_pub");
  joker5050.addEventListener("click", function(event) {
    use5050();
  });
  jokerTel.addEventListener("click", function(event) {
    useTel();
  });
  jokerPub.addEventListener("click", function(event) {
    usePub();
  });

  this.setRank = function(rank) {
    var r = document.getElementById("r_" + rank);
    if(rank > 1) {
      var rold = document.getElementById("r_" + (rank -1));
      rold.classList.remove("marked");
    }
    r.classList.add("marked");
  }
  use5050 = function() {
    if(!used5050) {
      if(onUse5050()) {
        used5050 = true;
        joker5050.src = "images/joker_5050_x.svg";
      }
    }
  }
  useTel = function() {
    if(!usedTel) {
      usedTel = true;
      jokerTel.src = "images/joker_tel_x.svg";
    }
  }
  usePub = function() {
    if(!usedPub) {
      usedPub = true;
      jokerPub.src = "images/joker_pub_x.svg";
    }
  }
}

function Medallion() {
  var logo = document.getElementById("logo");
  var logoimg = document.getElementById("logoimg");
  var degrees = 0;
  var rotations = 0;
  var maxrotations = 0;
  var timeout = 0;
  var listener;
  var realListener;
  this.lose = function(l) {
    listener = lose2;
    realListener = l;
    rotations = 0;
    maxrotations = 90;
    timeout = 10;
    rot();
  }
  lose2 = function() {
    logoimg.src = "images/logo_lost.png";
    listener = realListener;
    rotations = 0;
    maxrotations = 270;
    timeout = 10;
    rot();
  }
  this.win = function(l) {
    listener = win2;
    realListener = l;
    rotations = 0;
    maxrotations = 90;
    timeout = 10;
    rot();
  }
  win2 = function() {
    logoimg.src = "images/logo_won.png";
    listener = realListener;
    rotations = 0;
    maxrotations = 270;
    timeout = 10;
    rot();
  }
  this.rotate = function(l) {
    listener = l;
    rotations = 0;
    maxrotations = 360;
    timeout = 5;
    rot();
  }
  rot = function() {
    if(rotations < maxrotations) {
      rotations ++;
      rotateOneDegree();
      window.setTimeout(rot, timeout);
    }
    else {
      listener();
    }
  }
  rotateOneDegree = function() {
    degrees += 1;
    if(degrees > 360) {
      degrees = degrees - 360;
    }
    logo.style.transform="rotateY(" + degrees + "deg)";
    logo.style.webkitTransform="rotateY(" + degrees + "deg)";
    logo.style.OTransform="rotateY(" + degrees + "deg)";
    logo.style.MozTransform="rotateY(" + degrees + "deg)";
  }
}

function Question() {
  this.rank;
  this.name;
  var answers = new Array();
  this.rightAnswer;
  this.setAnswers = function(ans, rightAnswer) {
    answers = shuffle(ans);
    for(i = 0; i < answers.length; i ++) {
      if(answers[i] == rightAnswer) {
        this.rightAnswer = i;
      }
    }
  }
  this.getAnswers = function() {
    return answers;
  }
  shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

function QuestionBoard(ocl) {
  var ansElement = new Array();
  ansElement[0] = document.getElementById("ans1");
  ansElement[1] = document.getElementById("ans2");
  ansElement[2] = document.getElementById("ans3");
  ansElement[3] = document.getElementById("ans4");
  var onClickListener = ocl;
  var ansDiv = new Array();
  for(var i = 0; i < 4; i ++) {
    ansDiv[i] = document.getElementById("element" + i);
  }
  console.log(ansDiv);
  ansDiv[0].addEventListener("click", function(e) {this.handleClick(0);}.bind(this));
  ansDiv[1].addEventListener("click", function(e) {this.handleClick(1);}.bind(this));
  ansDiv[2].addEventListener("click", function(e) {this.handleClick(2);}.bind(this));
  ansDiv[3].addEventListener("click", function(e) {this.handleClick(3);}.bind(this));

  var questionElement = document.getElementById("question");
  this.newestQuestion;

  this.setQuestion = function(question) {
    this.newestQuestion = question;
    questionElement.innerHTML = this.newestQuestion.name;
    for(var i = 0; i < 4; i ++) {
      ansElement[i].innerHTML = this.newestQuestion.getAnswers()[i];
    }
  }
  this.right = function(pos) {
    ansDiv[pos].classList.remove("wrong");
    ansDiv[pos].classList.add("right");
  }
  this.wrong = function(pos) {
    ansDiv[pos].classList.remove("right");
    ansDiv[pos].classList.add("wrong");
  }
  this.clear = function() {
    for(var t = 0; t < 4; t ++) {
      ansDiv[t].classList.remove("right");
      ansDiv[t].classList.remove("wrong");
    }
  }

  this.handleClick = function(pos) {
    onClickListener(pos);
  }
}

function Game() {
  var questions = new Array();
  var rank = 1;
  var maxrank = 0;
  var clickable = true;
  var self = this;
  
  var answerClick = function(i) {
    if(clickable) {
        self.check(i);
    }
  }
  
  var parseXML = function(xmlContent) {
    var xmlDoc = new DOMParser().parseFromString(xmlContent,'text/xml');
    var parsedQuestions = xmlDoc.getElementsByTagName("question");
    questions = new Array();
    for(var x = 0; x < parsedQuestions.length; x ++) {
      questions[x] = new Question();
      questions[x].rank = parsedQuestions[x].getAttribute("rank");
      questions[x].name = parsedQuestions[x].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      questions[x].setAnswers([parsedQuestions[x].getElementsByTagName("answerWrong")[0].childNodes[0].nodeValue,
      parsedQuestions[x].getElementsByTagName("answerWrong")[1].childNodes[0].nodeValue,
      parsedQuestions[x].getElementsByTagName("answerWrong")[2].childNodes[0].nodeValue,
    parsedQuestions[x].getElementsByTagName("answerRight")[0].childNodes[0].nodeValue],
      parsedQuestions[x].getElementsByTagName("answerRight")[0].childNodes[0].nodeValue);
    }
    maxrank = questions.length;
    self.updateQuestionSelector();
  }

  var randomIntFromInterval = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  
  var medallion = new Medallion();
  var questionBoard = new QuestionBoard(answerClick);
  var leaderBoard = new LeaderBoard(function() {
    if(clickable) {
      var x = questionBoard.newestQuestion.getAnswers();
      var p1 = -1;
      var p2 = -1;
      while(p1 == -1 || p2 == -1) {
        var random = randomIntFromInterval(0, 3);
        if(questionBoard.newestQuestion.rightAnswer != random) {
          if(p1 == -1) {
            p1 = random;
          }
          else {
            if(random != p1) {
              p2 = random;
            }
          }
        }
      }
      questionBoard.wrong(p1);
      questionBoard.wrong(p2);
      return true;
    }
    else {
      return false;
    }
  });

  this.check = function(i) {
    clickable = false;
    if(i == questionBoard.newestQuestion.rightAnswer) {
      questionBoard.right(i);
      rank ++;
      if(rank <= maxrank) {
        medallion.rotate(function() {
          questionBoard.clear();
          clickable = true;
          self.newQuestion();
        });
      }
      else {
        medallion.win(function() {
          questionBoard.clear();
        });
      }
    }
    else {
      questionBoard.right(questionBoard.newestQuestion.rightAnswer);
      questionBoard.wrong(i);
      medallion.lose(function() {
        self.resetGame();
      });
    }
  }

  this.startGame = function() {
    self.newQuestion();
  }
  
  this.newQuestion = function() {
    for(var r = 0; r < questions.length; r ++) {
      if(questions[r].rank == rank) {
        leaderBoard.setRank(rank);
        questionBoard.setQuestion(questions[r]);
        break;
      }
    }
  }
  
  this.jumpToQuestion = function(questionRank) {
    if(questionRank >= 1 && questionRank <= maxrank) {
      rank = questionRank;
      clickable = true;
      questionBoard.clear();
      this.newQuestion();
    }
  }
  
  this.loadQuiz = function(xmlContent) {
    parseXML(xmlContent);
    rank = 1;
    clickable = true;
    questionBoard.clear();
    this.newQuestion();
  }
  
  this.updateQuestionSelector = function() {
    var selector = document.getElementById("questionJump");
    selector.innerHTML = "";
    for(var i = 1; i <= maxrank; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.textContent = "Question " + i;
      selector.appendChild(option);
    }
  }
  
  this.resetGame = function() {
    rank = 1;
    clickable = true;
    questionBoard.clear();
    this.newQuestion();
  }
  
  // Load default quiz
  if (window.XMLHttpRequest) {
    var xmlhttp = new XMLHttpRequest();
  } else {
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onload = function() {
    parseXML(xmlhttp.responseText);
    self.startGame();
  }
  xmlhttp.open("GET", "quiz1.xml", true);
  xmlhttp.send();
}

var game = new Game();

// Setup UI event listeners
document.getElementById("questionJump").addEventListener("change", function(e) {
  game.jumpToQuestion(parseInt(this.value));
});

document.getElementById("quizFile").addEventListener("change", function(e) {
  var file = e.target.files[0];
  if(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      game.loadQuiz(event.target.result);
      document.getElementById("currentQuiz").textContent = file.name.replace(".xml", "");
    }
    reader.readAsText(file);
  }
});

document.getElementById("resetGame").addEventListener("click", function() {
  game.resetGame();
});
