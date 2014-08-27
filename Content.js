var allQuestions = [{question:'Who is the current president of the United States?', choices: ['Mitt Romney', 'Barack Obama', 'George Bush', 'John Kerry'], correctAnswer: 'Barack Obama'}, {question:'Who is the quarterback of the Michigan Wolverines?', choices: ['Devin Gardner', 'Denard Robinson', 'Shane Morris', 'Jeremy Gallon'], correctAnswer:'Devin Gardner'}, {question:'Who was the commencement speaker for the 2013 University of Michigan graduation ceremony?', choices:['Oprah Winfrey', 'Larry Page', 'Barack Obama', 'Dick Costolo'], correctAnswer:'Dick Costolo'}, {question:'What street do college students for late night food at the University of Michigan?', choices:['Main Street', 'State Street', 'East University Avenue', 'Plymouth Road'], correctAnswer:'East University Avenue'}, {question:'What pizza company is located nearby the University of Michigan?', choices:['Papa Johns', 'Pizza House', 'Dominoes', 'Back Room Pizza'], correctAnswer:'Dominoes'}, {question:'What\'s the most expensive restaurant located in Ann Arbor?', choices:['Eastern Flame', 'Chop House', 'Frito Batidos', 'Wendy\'s'], correctAnswer:'Chop House'}];
var totalNumQ = allQuestions.length;
var nav = -1;
var questionList = [];
var corAnswerList = []
var choiceList = [];

var userAnswerList = [];

var createQuestion = function(n, q) {
  $('.questionCont').html(q[n]);
};

var checkAnswers = function(a, b) {
  var correct = 0;
  for (x in a) {
    if (a[x] == b[x]) {
      correct++;
    }
  }
  return correct;
};

var createAnswers = function(n, a) {
  $('.answerCont').html(''); //removes anything in .answerCont and replaces it with ''
  for (s in a[n]) { //Creates 
    var name = 'choice' + s;
    var aChoice = $('<div>');
    aChoice.attr('class', 'choiceCont');
    aChoice.appendTo('.answerCont');
    aChoice.html(a[n][s]);
    var radioButton = $('<input>');
    radioButton.attr({type:'radio', value:a[n][s], name:'choice'});
    radioButton.attr('class', name);
    radioButton.html(a[n][s])
    radioButton.prependTo(aChoice);
  };
};

/*should I create all of the question and answers and then add them to the page or should I add them in as I make them?*/

$(function() {
  $('.results').hide();
  $('.progress').hide();
  $('.totalQ').html(totalNumQ);
  //parse the question array, allQuestions and grab the questions and the choices
  for (x in allQuestions) {
    /*for each object in allQuestions, append question list, choices list, and correct answer list with the corresponding strings from the question bank, allQuestions*/
    questionList[x] = allQuestions[x].question;
    choiceList[x] = allQuestions[x].choices;
    corAnswerList[x] = allQuestions[x].correctAnswer;
  };

  
  //the click needs to be simplified and moved out to other events
  //maybe make the click only a submit button
  //have other things listen for submit and switch the questions
  
  $('.navigation').on('click', function() {
    if (nav == -1) {
      $('.welcome').hide();
      $('.progress').show();
      nav = 0;
      createQuestion(nav, questionList);
      createAnswers(nav, choiceList);
    }
    else if (nav+1>=totalNumQ) {
      var userPick = $('input:checked').val();
      userAnswerList[nav] = userPick
      $('.progress').hide()
      $('.content').hide();
      $('navigation').hide();
      $('#correctResults').html(checkAnswers(corAnswerList, userAnswerList));
      $('.results').show();
    }
    else if (nav !=0 && $('input:checked').val() == undefined) {
      alert('you haven\'t picked an answer yet');
    }
    else {
      var userPick = $('input:checked').val();
      userAnswerList[nav] = userPick;
      nav++;
      $('#currentQ').html(nav+1);
      createQuestion(nav, questionList);
      createAnswers(nav, choiceList);
    }
  })
});