'use strict';

//TODO: attach these to the object, so they are no longer global
var allProductsArr = new Array();
var totalVotes = 0;
var maxVotes = 6;

function Product(name, imgSrc) {
  this.name = name; // this will also be the id for the event listener
  this.imgSrc = imgSrc;
  this.voteCount = 0;
  this.timesShown = -1;
  allProductsArr.push(this);
}

//attach to section, will be creating articles
Product.prototype.render = function(){
  var targetId = document.getElementById('products');
  var newArticle = document.createElement('article');
  var newImg = document.createElement('img');
  newImg.src = this.imgSrc;
  newImg.id = this.name; // for event listener, when I need to target it
  this.timesShown ++; // counts up each times product is rendered TODO: Does this need to go to another place?
  var newP = document.createElement('p'); // TODO: do I even NEED to show the user how many times they voted for something?
  newP.textContent = 'votes: ' + this.voteCount;

  var newP2 = document.createElement('p');
  newP2.textContent = 'Was an option ' + this.timesShown + ' times before'; //TODO: does the user need to see this right away?

  newArticle.appendChild(newImg);
  newArticle.appendChild(newP);
  newArticle.appendChild(newP2);
  targetId.appendChild(newArticle);
};

// ================ creating new Products and rendering them to page ===============
var bag = new Product('bag','img/bag.jpg');
var banana = new Product('banana', 'img/banana.jpg');
var bathroom = new Product('bathroom', 'img/bathroom.jpg');
var boots = new Product('boots', 'img/boots.jpg');
var breakfast = new Product('breakfast', 'img/breakfast.jpg');
var bubblegum = new Product('bubblegum', 'img/bubblegum.jpg');
var chair = new Product('chair', 'img/chair.jpg');

//========================================

//LAB 12 - three unique products shown at a time ====
// need an array * SET!!* length of 3 with all unique values

function getRandNum(){
  var randNum = Math.floor(Math.random() * allProductsArr.length);
  return randNum; // gives one random number in the length of the array
}

function getThreeUnique(numsToAvoid){ // uses randNum from getRandNum()
  var numsSeen = new Set(); // gives 3 random, unique numbers - if the same number comes up multiple times, it doesn't occupy a new space
  while (numsSeen.size < 3) {
    var randNum = getRandNum(); // is a different randNum than in the getRandNum function, scope
    if(!numsToAvoid.has(randNum)){ // if randNum is not in numsToAvoid,
      numsSeen.add(randNum); // .add is to Set, as .push is to Array
    }
  }
  return numsSeen;
}
var uniqueThree = getThreeUnique(new Set()); // new Set because you have to start somewhere, this is just an empty set

//=========function and call to show three unique images ===========

function showUniqueThree(){
  for (let num of uniqueThree){ // iterates over the set, MDN referenced
    allProductsArr[num].render();
  }
}
showUniqueThree();

// ========= function to show three new random images on page ======
function putNewProductsOnPage() {
  var target = document.getElementById('products');
  target.innerHTML = '';

  uniqueThree = getThreeUnique(uniqueThree); // updates uniqueThree to get a new Set of nums, using the getThreeUnique function, passing in the now 'old' or numsToAvoid as a parameter to get new ones
  showUniqueThree();
}
// ===== function to put All Products On Page ==============
var putAllProductsOnPage = function(){
  var target = document.getElementById('products');
  target.innerHTML = '';
  for(var i = 0; i < allProductsArr.length; i++) {
    allProductsArr[i].render();
  }
};

// === event handler ==== when image gets clicked on, its voteCount goes up, and three new images appear, then shows all products with votes and times shown=======
var votingSection = document.getElementById('products');
votingSection.addEventListener('click', handleClickOnProduct);

function handleClickOnProduct(event) {
  if(totalVotes < maxVotes) {
    totalVotes++;

    for(var i = 0; i < allProductsArr.length; i++){
      if(event.target.id === allProductsArr[i].name){
        allProductsArr[i].voteCount++;
      }
    }
    putNewProductsOnPage();
  }
  if(totalVotes === maxVotes){
    var votingSection = document.getElementById('products');
    votingSection.removeEventListener('click', handleClickOnProduct);
    // ==== puts ALL products on page, SHOWS CHART
    putAllProductsOnPage();
    showChart();
  }
}
//============ Chart Chart Chart =============================================
function showChart(){
  // extracts product names from all products array, stores it in productNames[]
  var productNames = new Array;
  for(var i = 0; i < allProductsArr.length; i++){
    productNames.push(allProductsArr[i].name);
  }

  // extracts product vote counts from all products array, stores it in productVoteCounts[]
  var productVoteCounts = new Array;
  for(var i = 0; i< allProductsArr.length; i++){
    productVoteCounts.push(allProductsArr[i].voteCount);
  }

  var ctx = document.getElementById('productDataChart').getContext('2d');
  var productDataChart = new Chart(ctx, {
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: productVoteCounts,
      }]
    },

    // Configuration options go here TODO: make it increment in ints only, no floats
    options:{
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

