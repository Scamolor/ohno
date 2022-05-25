var canvx = 320;
var canvy = 450;
var answered = 0;
var questions = ["The process by which real estate agents use racist beliefs to get home-owners to sell their houses is known as...", "What is a primate city?", "Gentrification occurs in", "The gravity model...", "How many people must live in a city for that city to be considered a megacity? ", "In Christaller's Central Place Theory, what is range?", "While New Urbanism is seen as a more sustainable pattern for urban growth, which of the following is a negative consequence of New Urbanism?","In which city structure model are social groups arranged around a collection of nodes of activities?", "Which of the following models does the Burgess Concentric Zone Model most clearly resemble?", "In the concentric zone model, what is the outermost zone?", "Cities that exist on the fringes of larger cities, that act as regional hubs for recreation, business, or other commercial activity are known as...", "What name is given to a portion of land reserved for farms, parks, and forests to prevent the continuation of an urban sprawl?", "What is urban sprawl?", "Where, in a city, would retail and office activities be clustered?", "According to the rank-size rule, if the largest city in a country has a population of 1,000,000, then the fourth largest city in that country would have a population of approximately __________."];
var q14yield1 = ["320,000", "250,000", "69,420"];
var q14yield2 = ["320,000", "250,000", "69,420"];
var q14yield3 = ["320,000", "250,000", "69,420"];
var q13yield1 = ["Central Business District (CBD)", "The Falklands Islands", "Non-basic sector"];
var q13yield2 = ["Central Business District (CBD)", "The Falklands Islands", "Non-basic sector"];
var q13yield3 = ["Central Business District (CBD)", "The Falklands Islands", "Non-basic sector"];
var q12yield1 = ["My lawn", "Wikimedia Commons", "Greenbelts"];
var q12yield2 = ["My lawn", "Wikimedia Commons", "Greenbelts"];
var q12yield3 = ["My lawn", "Wikimedia Commons", "Greenbelts"];
var q11yield1 = ["border cities", "edge cities", "fringe cities"];
var q11yield2 = ["border cities", "edge cities", "fringe cities"];
var q11yield3 = ["border cities", "edge cities", "fringe cities"];
var q10yield3 = ["residential zone", "commuter zone", "transitional zone"];
var q10yield2 = ["residential zone", "commuter zone", "transitional zone"];
var q10yield1 = ["residential zone", "commuter zone", "transitional zone"];
var q9yield1 = ["The Von Thunen Land Use Model", "The FitnessGram Pacer Model", "The Human Population Pyramid of a developing country"];
var q9yield2 = ["The Von Thunen Land Use Model", "The FitnessGram Pacer Model", "The Human Population Pyramid of a developing country"];
var q9yield3 = ["The Von Thunen Land Use Model", "The FitnessGram Pacer Model", "The Human Population Pyramid of a developing country"];
var q8yield1 = ["Hoyt Sector Model", "Micropolitan Statistical Area", "Harris & Ulman's Multiple Nuclei Model"];
var q8yield2 = ["Hoyt Sector Model", "Micropolitan Statistical Area", "Harris & Ulman's Multiple Nuclei Model"];
var q8yield3 = ["Hoyt Sector Model", "Micropolitan Statistical Area", "Harris & Ulman's Multiple Nuclei Model"];
var q7yield1 = ["The influx of lower-income residents may cause some businesses to leave as they seek higher profits in upper-income areas", "The increase in mixed-use spaces may reduce the unique historic architecture of the area", "It's bland"];
var q7yield2 = ["The influx of lower-income residents may cause some businesses to leave as they seek higher profits in upper-income areas", "The increase in mixed-use spaces may reduce the unique historic architecture of the area", "It's bland"];
var q7yield3 = ["The influx of lower-income residents may cause some businesses to leave as they seek higher profits in upper-income areas", "The increase in mixed-use spaces may reduce the unique historic architecture of the area", "It's bland"];
var q6yield1 = ["The distance between two cities of roughly equal size", "The longest distance a consumer will travel to obtain a certain product", "The distance a vehicle can travel with a certain amount of fuel"];
var q6yield2 = ["The distance between two cities of roughly equal size", "The longest distance a consumer will travel to obtain a certain product", "The distance a vehicle can travel with a certain amount of fuel"];
var q6yield3 = ["The distance between two cities of roughly equal size", "The longest distance a consumer will travel to obtain a certain product", "The distance a vehicle can travel with a certain amount of fuel"];
var q5yield1 = ["10 thousand", "10 trillion", "10 million"];
var q5yield2 = ["10 thousand", "10 trillion", "10 million"];
var q5yield3 = ["10 thousand", "10 trillion", "10 million"];
var q4yield1 = ["Can be used to estimate the flow of resources and people between two cities, based on their size and distance to one another", "Involves spooky quantum mechanics that turn your hair gray", "Pulls you down"];
var q4yield2 = ["Can be used to estimate the flow of resources and people between two cities, based on their size and distance to one another", "Involves spooky quantum mechanics that turn your hair gray", "Pulls you down"];
var q4yield3 = ["Can be used to estimate the flow of resources and people between two cities, based on their size and distance to one another", "Involves spooky quantum mechanics that turn your hair gray", "Pulls you down"];
var q3yield1 = ["Former squatter settlements", "Run-down low-income neighborhoods", "Your local Walmart"];
var q3yield2 = ["Former squatter settlements", "Run-down low-income neighborhoods", "Your local Walmart"];
var q3yield3 = ["Former squatter settlements", "Run-down low-income neighborhoods", "Your local Walmart"];
var q2yield1 = ["A collection of buildings inhabited by primates", "The zoo", "A city, often the largest in a nation, which is at least 2x larger than the next largest city"];
var q2yield2 = ["A collection of buildings inhabited by primates", "The zoo", "A city, often the largest in a nation, which is at least 2x larger than the next largest city"];
var q2yield3 = ["A collection of buildings inhabited by primates", "The zoo", "A city, often the largest in a nation, which is at least 2x larger than the next largest city"];
var q1yield1 = ["Gentrification", "Redlining", "Blockbusting"];
var q1yield2 = ["Gentrification", "Redlining", "Blockbusting"];
var q1yield3 = ["Gentrification", "Redlining", "Blockbusting"];
createCanvas("id", canvx, canvy);
setActiveCanvas("id");
var questionIndex2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12","13"];
var getTestQuestion1 = -1;
var getTestQuestion2 = -1;
var getTestQuestion3 = -1;
var correctAnswersSoFar = 0;
var wrongAnswersSoFar = 0;
var correctAnswer = 0;
function setup() {
  setFillColor(rgb(randomNumber(120, 200),randomNumber(120, 200),randomNumber(120, 200)));
  textLabel("question", "placeholder");
  textLabel("label1", "1.");
  textLabel("label2", "2.");
  textLabel("label3", "3.");
  textLabel("answer4", "text");
  textLabel("answer5", "text");
  textLabel("answer6", "text");
  setPosition("label1", 0, canvy - 375, canvx, 50);
  setPosition("label2", 0, canvy - 300, canvx, 50);
  setPosition("label3", 0, canvy - 225, canvx, 50);
  setPosition("answer4", 20, canvy - 375, canvx, 50);
  setPosition("answer5", 20, canvy - 300, canvx, 50);
  setPosition("answer6", 20, canvy - 225, canvx, 50);
  button("submit", "Submit");
  setPosition("submit", 0, canvy - 50, canvx, 50);
}
var q1done = 0;
var q2done = 0;
var q3done = 0;
var q4done = 0;
var q5done = 0;
var q6done = 0;
var q7done = 0;
var q8done = 0;
var q9done = 0;
var q10done = 0;
var q11done = 0;
var q12done = 0;
var q13done = 0;
var q14done = 0;
var qsetup = -1;
var currentAnswer = "placeholder";
var finalized = 0;
function question() {
  qsetup = questionIndex2[(randomNumber(0, questionIndex2.length - 1))];
  if (qsetup == 0) {
    questionSetup(q1done, q1yield1, q1yield2, q1yield3, 2);
  }
  if (qsetup == 1) {
    questionSetup(q2done, q2yield1, q2yield2, q2yield3, 2);
  }
  if (qsetup == 2) {
    questionSetup(q3done, q3yield1, q3yield2, q3yield3, 1);
  }
  if (qsetup == 3) {
    questionSetup(q4done, q4yield1, q4yield2, q4yield3, 0);
  }
  if (qsetup == 4) {
    questionSetup(q5done, q5yield1, q5yield2, q5yield3, 2);
  }
  if (qsetup == 5) {
    questionSetup(q6done, q6yield1, q6yield2, q6yield3, 1);
  }
  if (qsetup == 6) {
    questionSetup(q7done, q7yield1, q7yield2, q7yield3, 1);
  }
  if (qsetup == 7) {
    questionSetup(q8done, q8yield1, q8yield2, q8yield3, 0);
  }
  if (qsetup == 8) {
    questionSetup(q9done, q9yield1, q9yield2, q9yield3, 0);
  }
  if (qsetup == 9) {
    questionSetup(q10done, q10yield1, q10yield2, q10yield3, 0);
  }
  if (qsetup == 10) {
    questionSetup(q11done, q11yield1, q10yield2, q11yield3, 1);
  }
  if (qsetup == 11) {
    questionSetup(q12done, q12yield1, q12yield2, q12yield3, 0);
  }
  if (qsetup == 12) {
    questionSetup(q13done, q13yield1, q13yield2, q13yield3, 0);
  }
  if (qsetup == 13) {
    questionSetup(q14done, q14yield1, q14yield2, q14yield3, 1);
  }
}
iamgoingblindandidonotcare();
function questionSetup(qdone, qyield1, qyield2, qyield3, qcorrect) {
  getTestQuestion1 = randomNumber(0, 2);
  removeItem(qyield2, getTestQuestion1);
  removeItem(qyield3, getTestQuestion1);
  getTestQuestion2 = randomNumber(0, 1);
  removeItem(qyield3, getTestQuestion2);
  getTestQuestion3 = 0;
  setText("question", questions[qsetup]);
  setText("answer4", qyield1[getTestQuestion1]);
  setText("answer5", qyield2[getTestQuestion2]);
  setText("answer6", qyield3[getTestQuestion3]);
  setText("question", questions[qsetup]);
  setText("answer4", qyield1[getTestQuestion1]);
  setText("answer5", qyield2[getTestQuestion2]);
  setText("answer6", qyield3[getTestQuestion3]);
  insertItem(qyield2, getTestQuestion1, getText("answer4"));
  insertItem(qyield3, getTestQuestion1, getText("answer4"));
  insertItem(qyield3, getTestQuestion1, getText("answer5"));
  dropdown("input", qyield1[0], qyield1[1], qyield1[2]);
  setPosition("input", 0, canvy - 100, canvx, 50);
  correctAnswer = qyield1[qcorrect];
  onEvent("input", "click", function( ) {
    currentAnswer = getProperty("input", "value");
  });
  onEvent("submit", "click", function( ) {
    if (answered <= 3) {
      if (currentAnswer == correctAnswer && qdone != 1) {
        correctAnswersSoFar = correctAnswersSoFar + 1;
        qdone = 1;
        answered = answered + 1;
        deleteElement("input");
        question();
      } else if ((currentAnswer != correctAnswer && qdone != 1)) {
        wrongAnswersSoFar = wrongAnswersSoFar + 1;
        qdone = 1;
        answered = answered + 1;
        deleteElement("input");
        question();
      }
    } else if ((finalized != 1 && answered >= 3)) {
      bluepeaclock();
      finalized = 1;
    }
  });
}
function bluepeaclock() {
  if (answered >= 3) {
    hideElement("answer4");
    hideElement("answer5");
    hideElement("answer6");
    hideElement("label1");
    hideElement("label2");
    hideElement("label3");
    hideElement("question");
    hideElement("input");
    hideElement("submit");
    textLabel("done", "Results");
    textLabel("correct", correctAnswersSoFar);
    textLabel("wrong", wrongAnswersSoFar);
    textLabel("correctLabels", "Correct");
    textLabel("wrongLabels", "Wrong");
    setNumber("correct", correctAnswersSoFar);
    setNumber("wrong", wrongAnswersSoFar);
    setText("correct", correctAnswersSoFar);
    setText("wrong", wrongAnswersSoFar);
    setPosition("correct", 40, canvy - 175, 20, 50);
    setPosition("wrong", 40, canvy - 125, 20, 50);
    setPosition("correctLabels", 75, canvy - 175, 100, 50);
    setPosition("wrongLabels", 75, canvy - 125, 100, 50);
  }
}
function iamgoingblindandidonotcare() {
  if (answered <= 3) {
    setup();
    question();
  }
}
