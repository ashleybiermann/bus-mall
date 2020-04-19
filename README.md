# bus-mall

## Synopsis

This app is a customer survey that shows the user multiple product images, the user votes, and the data is collected to create a results chart upon completion. The results are intended to be used to inform a company's decision making process.

## Code Example

var votingSection = document.getElementById('products');
votingSection.addEventListener('click', handleClickOnProduct);

function handleClickOnProduct(event) {
  if(localStorage.getItem('totalVoteCount') > 0){
    totalVotes = localStorage.getItem('totalVoteCount'); // retrieves data from local storage to prevent page reload from zero-ing out the total vote count
  }
  if(totalVotes < maxVotes) {
    totalVotes++;
    localStorage.setItem('totalVoteCount', totalVotes);

## Motivation

Gather consumer information to inform business decisions.

## Installation
None

## API Reference
None

## Tests
In progress

## Contributors
In progress

## License
MIT