'use strict';

// Plan overview
// Display products
// Click on a product = 1. votes get tallied, 2. new products come up
// Repeat (25 votes)
// Page after voting shows product and how many votes it got
// =====================================

// RenderToPage method attached to constructor

var allProductsArr = new Array;

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
bag.render();
banana.render();
bathroom.render();
//========================================

//function to display random product
var getRandomProduct = function(){
  var randomProduct = 
  console.log();
}