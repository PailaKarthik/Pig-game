'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0el = document.querySelector('#score--0');
const score1el = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceel = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentscore, playing, activeplayer;

// Starting conditions
const Init = function() {
    scores = [0, 0];
    currentscore = 0;
    activeplayer = 0;
    playing = true;

    score0el.textContent = 0;
    score1el.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceel.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
Init();

const switchplayer = function() {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    currentscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        // Generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display the roll
        diceel.classList.remove('hidden');
        diceel.src = `dices/dice-${dice}.png`; // Ensure path and file extension are correct
        
        // Check if rolled dice is not 1
        if (dice !== 1) {
            currentscore += dice;
            document.getElementById(`current--${activeplayer}`).textContent = currentscore;
        } else {
            switchplayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // Add current score to the active player's main score
        scores[activeplayer] += currentscore;
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];

        // Check if player's score is >= 100
        if (scores[activeplayer] >= 100) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
            diceel.classList.add('hidden');
        } else {
            // Switch to the next player
            switchplayer();
        }
    }
});

btnnew.addEventListener('click', Init);
