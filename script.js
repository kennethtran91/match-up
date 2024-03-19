const cardFaces = ['🌭', '🌭', '😋', '😋', '💩', '💩', '🦥', '🦥', '🎈', '🎈', '🐷', '🐷', '😎', '😎', '🍦', '🍦'];
let cardsChosen = [];
let cardsChosenId = [];
let cardsMatched = [];
let matchedSfx = new Audio("matched.wav"); // buffers automatically when created
let notMatchedSfx = new Audio("notmatched.wav");
let clickedSfx = new Audio("click.wav");

function createBoard() {
    const memoryCards = document.getElementById('memory-cards');
    cardFaces.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cardFaces.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', i);
      card.innerHTML = '<div class="front"></div><div class="back">' + cardFaces[i] + '</div>';
      card.addEventListener('click', flipCard);
      memoryCards.appendChild(card);
  }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const firstCardId = cardsChosenId[0];
    const secondCardId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
        matchedSfx.play();
        cards[firstCardId].classList.add('matched');
        cards[secondCardId].classList.add('matched');
        cardsMatched.push(cardsChosen);
    } else {
        notMatchedSfx.play();
        cards[firstCardId].classList.remove('flipped');
        cards[secondCardId].classList.remove('flipped');
        cards[firstCardId].querySelector('.back').classList.add('hidden');
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsMatched.length === cardFaces.length / 2) {
      document.getElementById("finished-page").classList.remove('hidden');
      document.querySelector(".memory-game").classList.add('hidden');
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    clickedSfx.play();
    if (cardsChosenId.length < 2 && !cardsChosenId.includes(cardId)) {
        this.classList.add('flipped');
        
        cardsChosen.push(cardFaces[cardId]);
        cardsChosenId.push(cardId);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function startGame() {
  clickedSfx.play();
  document.getElementById("start-page").classList.add('hidden');
  document.querySelector(".memory-game").classList.remove('hidden');
  document.getElementById("finished-page").classList.add('hidden');
  const memoryCards = document.getElementById('memory-cards');
  memoryCards.innerHTML = ''; // Remove all child elements
  createBoard(); // Start the memory game
}

