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
  allProductsArr.push(this);
}

//attach to section, will be creating articles
Product.prototype.render = function(){
  var targetId = document.getElementById('products');
  var newArticle = document.createElement('article');
  var newImg = document.createElement('img');
  newImg.src = this.imgSrc;
  newImg.id = this.name; // will come back for event listener, when I need to target it
  var newP = document.createElement('p');
  newP.textContent = 'votes: ' + this.voteCount;
  newArticle.appendChild(newImg);
  newArticle.appendChild(newP);
  targetId.appendChild(newArticle);
};

// ================ creating new Products and rendering them to page ===============
var bag = new Product('bag','img/bag.jpg');
var banana = new Product('banana', 'img/banana.jpg');
var bathroom = new Product('bathroom', 'img/bathroom.jpg');
var boots = new Product('boots', 'img/boots.jpg');

//========================================

//function to display random product
var showRandomProduct = function(){
  var randomInt = Math.floor(Math.random() * allProductsArr.length);
  var randomProduct = allProductsArr[randomInt];
  randomProduct.render();
};

// shows three random products from the array, shows them on page
for(var i = 0; i < 3; i++){
  showRandomProduct();
}

// === event handler ==== when image gets clicked on, its voteCount goes up, and three new images appear
var votingSection = document.getElementById('products');
votingSection.addEventListener('click', handleClickOnProduct);
function handleClickOnProduct(event) {
  if(totalVotes < 4) {
    console.log('times voted: ' + totalVotes);
    totalVotes++;
    console.log(event.target);
  }
  if(event.target.id === 'banana'){
    banana.voteCount++;
    console.log('banana votes: ' + banana.voteCount);
  }
  putNewProductsOnPage;
}
