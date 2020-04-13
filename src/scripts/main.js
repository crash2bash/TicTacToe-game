'use strict';

const winningCombination = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];

let playerX = [];
let playerY = [];
let count = 0;

const gameCell = document.querySelectorAll('.game__cell');
const restart = document.querySelector('.game__button');
const cross = document.querySelector('.game__cross-win');
const circle = document.querySelector('.game__circle-win');
const modal = document.querySelector('.modal');

const winner = function(counter) {
  if (counter % 2 === 0) {
    modal.classList.add('show');
    circle.classList.add('show');
  } else {
    modal.classList.add('show');
    cross.classList.add('show');
  }
};

const checkWinner = function(ind, arr, counter) {
  let index = ind;

  index += 1;

  for (let i = 0; i < winningCombination.length; i++) {
    let total = 0;
    const win = winningCombination[i];

    if (win.indexOf(index) !== -1) {
      for (let j = 0; j < win.length; j++) {
        if (arr.indexOf(win[j]) !== -1) {
          total++;

          if (total === 3) {
            winner(counter);
            total = 0;
          }
        }
      }
      total = 0;
    }
  }
};

gameCell.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('circle' && 'cross')) {
      return;
    }

    if (count % 2 === 0) {
      item.classList.add('cross');
      playerX.push(index + 1);
    } else {
      item.classList.add('circle');
      playerY.push(index + 1);
    }
    count++;

    if (playerX.length > 0 || playerY.length > 0) {
      checkWinner(index, playerX, count) || checkWinner(index, playerY, count);
    }
  });
});

function restartGame() {
  playerX = [];
  playerY = [];
  count = 0;

  gameCell.forEach(item => item.classList.contains('cross')
    ? item.classList.remove('cross')
    : item.classList.remove('circle'));
}

restart.addEventListener('click', function() {
  restartGame();
});

modal.addEventListener('click', function() {
  modal.classList.remove('show');
  cross.classList.remove('show');
  circle.classList.remove('show');

  restartGame();
});
