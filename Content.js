var allQuestions = [{question:'Who is the current president of the United States?', choices: ['Mitt Romney', 'Barack Obama', 'George Bush', 'John Kerry'], correctAnswer:0}, {question:'Who is the quarterback of the Michigan Wolverines?', choices: ['Devin Gardner', 'Denard Robinson', 'Shane Morris', 'Jeremy Gallon'], correctAnswer:0}, {question:'Who was the commencement speaker for the 2013 University of Michigan graduation ceremony?', choices:['Oprah Winfrey', 'Larry Page', 'Barack Obama', 'Dick Costolo'], correctAnswer:0}, {question:'What street do college students for late night food at the University of Michigan?', choices:['Main Street', 'State Street', 'East University Avenue', 'Plymouth Road'], correctAnswer:0}, {question:'What pizza company is located nearby the University of Michigan?', choices:['Papa Johns', 'Pizza House', 'Dominoes', 'Back Room Pizza'], correctAnswer:0}, {question:'What\'s the most expensive restaurant located in Ann Arbor?', choices:['Eastern Flame', 'Chop House', 'Frito Batidos', 'Wendy\'s']}];
var totalQuestions = allQuestions.length;
var navLocation = 0;
var question = [];
var allChoices = [];

var userAnswer = [];
var rightAnswer = [,1,0,3,2,2,1] //these are the numerical 1-indexes of the correct answer

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
  if (correct >= totalQuestions) {
    correct = totalQuestions;
    return totalQuestions;
  }
  else {
    return correct;
  }
};

var createAnswers = function(a, n) {
  $('.answerCont').html(''); //removes anything in .answerCont and replaces it with ''
  for (s in a[n]) { //Creates 
    var name = 'choice' + s;
    var aChoice = $('<div>');
    aChoice.attr('class', 'choiceCont');
    aChoice.appendTo('.answerCont');
    aChoice.html(a[n][s]);
    var radioButton = $('<input>');
    radioButton.attr({type:'radio',value:s, name:'choice'});
    radioButton.attr('class', name);
    radioButton.html(a[n][s])
    radioButton.prependTo(aChoice);
  };
};

/*should I create all of the question and answers and then add them to the page or should I add them in as I make them?*/

$(function() {
  $('.results').hide();
  $('.progress').hide();
  $('.totalQ').html(totalQuestions);
  //parse the question array, allQuestions and grab the questions and the choices
  for (x in allQuestions) {
    //should I put everything into the for/in loop
    question[x] = allQuestions[x].question;
    allChoices[x] = allQuestions[x].choices;
    /*The following code creates a questionbox and radio choice button with answers in
      all of them without adding them to the document yet
      After looking it up, it would be simpler just to change whatever is in the
      containers to the current question*/
  }
  
  $('.navigation').onSubmit(function() {

  });
  
  //the click needs to be simplified and moved out to other events
  //maybe make the click only a submit button
  //have other things listen for submit and switch the questions
  $('.navigation').on('click', function() {
    if (navLocation != 0 && $('input:radio[name=choice]:checked').val() == undefined) {
      alert('you haven\'t picked an answer yet');
      return;
    }
    else if (navLocation >= totalQuestions) {
      var userPick = $('input:radio[name=choice]:checked').val();
      userAnswer[navLocation] = userPick;
      $('#correctResults').html(checkAnswers(rightAnswer, userAnswer));
      $('.results').show();
      $('.progress').hide();
      $('.questionCont').hide();
      $('.answerCont').hide();
      $('#currentQ').html(totalQuestions);
      $('.navigation').hide();
      return;
    }
    else {
      $('.welcome').hide();
      $('.progress').show();
      if (navLocation == 0) {
        createQuestion(navLocation, question)
        createAnswers(allChoices, navLocation)
        $('#currentQ').html(navLocation+1);
        navLocation++;
      }
      else {
        var userPick = $('input:radio[name=choice]:checked').val();
        userAnswer[navLocation] = userPick;
        createQuestion(navLocation, question);
        createAnswers(allChoices, navLocation);
        $('#currentQ').html(navLocation+1);
        navLocation++;
      }
    }

    
  })
})