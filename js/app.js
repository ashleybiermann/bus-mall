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
new Product('bag','img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water can', 'img/water-can.jpg');
new Product('wine glass', 'img/wine-glass.jpg');
//============================================================
// =============functions to get three unique products, and different from last time ====
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

// === event handler ==== when image gets clicked on, its voteCount goes up ============
var votingSection = document.getElementById('products');
votingSection.addEventListener('click', handleClickOnProduct);

function handleClickOnProduct(event) {
  if(localStorage.getItem('totalVoteCount') > 0){
    totalVotes = localStorage.getItem('totalVoteCount'); // retrieves data from local storage to prevent page reload from restarting the total vote count
  }
  if(totalVotes < maxVotes) {
    totalVotes++;


    localStorage.setItem('totalVoteCount', totalVotes); // stores totalVotes locally

    for(var i = 0; i < allProductsArr.length; i++){
      if(event.target.id === allProductsArr[i].name){
        allProductsArr[i].voteCount++;
        // add to local storage
        var allProductsMadeStringy = JSON.stringify(allProductsArr); //makes a version of allProducts[] into string for local storage
        localStorage.setItem('allProductsMadeStringy', allProductsMadeStringy);
      }
    }
    putNewProductsOnPage();
  }
  if(totalVotes === maxVotes){
    var votingSection = document.getElementById('products');

    votingSection.innerHTML = '';

    votingSection.removeEventListener('click', handleClickOnProduct);
    // ==== puts ALL products on page, SHOWS CHART
    // putAllProductsOnPage();
    showChart();
  }
}
//============ Chart Chart Chart ===========================================
function showChart(){
  // extracts product names from all products array, stores it in productNames[]
  var productNames = new Array;
  for(var i = 0; i < allProductsArr.length; i++){
    productNames.push(allProductsArr[i].name);
  }

  // extracts product vote counts from all products array, stores it in productVoteCounts[]
  var productVoteCounts = new Array();
  for(var i = 0; i < allProductsArr.length; i++){
    productVoteCounts.push(allProductsArr[i].voteCount);
  }

  var productTimesSeen = new Array();
  for(var i = 0; i < allProductsArr.length; i++){
    productTimesSeen.push(allProductsArr[i].timesShown);
  }

  var ctx = document.getElementById('productDataChart').getContext('2d');
  var productDataChart = new Chart(ctx, {
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes',
        backgroundColor: '#CC33C7',
        borderColor: '#FF879F',
        data: productVoteCounts,
      },
      {
        label: 'Times Available',
        backgroundColor: '#F6FFC1',
        borderColor: 'rgb(255, 99, 132)',
        data: productTimesSeen,
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

