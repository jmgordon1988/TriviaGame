$(document).ready(function () {

var card = $("#quiz-area");
var countStartNumber = 20;

// Question set
var questions = [{
  question: "Who was the killer in the first Friday the 13th movie?",
  answers: ["Jason Voorhees", "Michael Myers", "Norman Bates", "Pamela Voorhees"],
  correctAnswer: "Pamela Voorhees",
  image: 'assets/images/pamv.gif',
}, {
  question: "Which slasher has the highest body count across all of their films?",
  answers: ["Norman Bates", "Freddy Krueger", "Jason Voorhees", "Michael Myers"],
  correctAnswer: "Jason Voorhees",
  image: 'assets/images/jasonv.gif',
}, 
{
  question: "Who are the primary antagonists of the film 'Hellraiser'?",
  answers: ["The Cenobites", "Pinhead", "Frank and Julia", "Sadomasochists from Beyond the Grave"],
  correctAnswer: "Frank and Julia",
  image: 'assets/images/frank-and-julia.jpg',
},
{
  question: "What is the weakness of 'The Blob'?",
  answers: ["Heat", "Cold", "Airborne Disease", "Gas"],
  correctAnswer: "Cold",
  image: 'assets/images/blobgif.gif',
},
{
  question: "Who is the main villain of 'Halloween 3'?",
  answers: ["The Silver Shamrock Corporation", "The Cigarette Smoking Man", "Nyarlethotep", "Michael Myers"],
  correctAnswer: "The Silver Shamrock Corporation",
  image: 'assets/images/halloween3.gif',
},
{
  question: "In what year was the first film adaptation of 'Frankenstein' released?",
  answers: ["1994", "1931", "1910", "1942"],
  correctAnswer: "1910",
  image: 'assets/images/frankenstein1910gif.gif',
},
{
  question: "The story for the film 'Candyman' was written by which famous horror writer?",
  answers: ["Stephen King", "Clive Barker", "Edgar Allen Poe", "H.P. Lovecraft"],
  correctAnswer: "Clive Barker",
  image: 'assets/images/candymangif.gif',
},
{
  question: "Stephen King has written screenplays for many films, but which is the only film he himself directed?",
  answers: ["Maximum Overdrive", "Nightstalkers", "It", "Stand by Me"],
  correctAnswer: "Maximum Overdrive",
  image: 'assets/images/maximumoverdrivegif.gif',
},
{
  question: "Which was the first horror film to be nominated for a Best Picture Oscar?",
  answers: ["The Cabinet of Dr. Caligari", "Silence of the Lambs", "The Exorcist", "Halloween"],
  correctAnswer: "The Exorcist",
  image: 'assets/images/exorcist.gif',
},
{
  question: "How many characters are left alive at the end of John Carpenter's 'The Thing'?",
  answers: ["1", "2", "3", "4"],
  correctAnswer: "2",
  image: 'assets/images/thing.gif',
},
{
  question: "What is the name of the demon in 'The Exorcist'?",
  answers: ["Reagan", "Pazuzu", "Paimon", "Beelzebub"],
  correctAnswer: "Pazuzu",
  image: 'assets/images/pazuzugif.gif',
},
{
  question: "Which 1970s film was remade in 2006 starring Nicolas Cage?",
  answers: ["The Wicker Man", "Psycho", "I Spit On Your Grave", "Rosemary's Baby"],
  correctAnswer: "The Wicker Man",
  image: 'assets/images/wickerman.gif',
},
{
  question: "How many Aliens appear in the film 'Alien'?",
  answers: ["1", "2", "3", "4"],
  correctAnswer: "1",
  image: 'assets/images/aliengif.gif',
}];

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>"+"<div>"+"</div>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src="+questions[this.currentQuestion].image+">");
    

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src="+questions[this.currentQuestion].image+">");
  

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src="+questions[this.currentQuestion].image+">");
  

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};


$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>20</span> Seconds</h2>");
  game.loadQuestion();
});
})