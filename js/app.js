'use strict';

// Plan overview
// Display products
// Click on a product = 1. votes get tallied, 2. new products come up
// Repeat (25 votes)
// Page after voting shows product and how many votes it got
// =====================================

// RenderToPage method attached to constructor

var allProductsArr = new Array;
var totalVotes = 0;

function Product(name, imgSrc) {
  this.name = name;
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
  newP2.textContent = 'Was an option ' + this.timesShown + 'times before'; //TODO: does the user need to see this right away?

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

//========================================

//function to render a random product
var showRandomProduct = function(){
  var randomIndex = Math.floor(Math.random() * allProductsArr.length);
  var randomProduct = allProductsArr[randomIndex];
  randomProduct.render();
};
// shows three random products from the array, shows them on page
for(var i = 0; i < 3; i++){
  showRandomProduct();
}

// ========= function to show three new random images on page ======
function putNewProductsOnPage() {
  var target = document.getElementById('products');
  target.innerHTML = '';
  for(var i = 0; i < 3; i++){
    var randomIndex = Math.floor(Math.random() * allProductsArr.length);
    allProductsArr[randomIndex].render();
  }
}

// === event handler ==== when image gets clicked on, its voteCount goes up, and three new images appear
var votingSection = document.getElementById('products');
votingSection.addEventListener('click', handleClickOnProduct);
function handleClickOnProduct(event) {
  if(totalVotes < 4) {
    totalVotes++;
    // console.log('total votes: ' + totalVotes);

    //TODO: this needs to go into a loop somehow
    if(event.target.id === 'banana'){
      banana.voteCount++;
      console.log('banana votes: ' + banana.voteCount);
      console.log('banana appearances: ' + banana.timesShown);
    }
    if(event.target.id === 'bag'){
      bag.voteCount++;
      console.log('bag votes: ' + bag.voteCount);
      console.log('bag appearances: ' + bag.timesShown);
    }
    if(event.target.id === 'bathroom'){
      bathroom.voteCount++;
      console.log('bathroom votes: ' + bathroom.voteCount);
      console.log('bathroom appearances: ' + bathroom.timesShown);
    }
    if(event.target.id === 'bathroom'){
      bathroom.voteCount++;
      console.log('bathroom votes: ' + bathroom.voteCount);
      console.log('bathroom appearances: ' + bathroom.timesShown);
    }
    putNewProductsOnPage();
  }
  if(totalVotes === 4){ // 'turns off' the event listener?
    totalVotes++;
    for(var i = 0; i < allProductsArr.length; i++) {
      allProductsArr[i].render(); //
    }
  }
}
