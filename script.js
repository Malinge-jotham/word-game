const categories = {
    "Types of Fruits": ["apple", "grape", "berry", "peach", "mango"],
    "Types of Animals": ["tiger", "zebra", "whale", "horse", "eagle"],
  };
  
  const categoryNames = Object.keys(categories);
  const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
  const words = categories[randomCategory];
  const targetWord = words[Math.floor(Math.random() * words.length)];
  
  document.getElementById("category").textContent = randomCategory;
  
  // Rest of the game logic remains the same
  



let currentRow = 0;

const grid = document.getElementById('word-grid');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');

// Create 6 rows for guesses
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.setAttribute('data-row', i);
    tile.setAttribute('data-col', j);
    grid.appendChild(tile);
  }
}

// Handle user guess
submitBtn.addEventListener('click', () => {
  const guess = guessInput.value.toLowerCase();

  if (guess.length !== 5) {
    feedback.textContent = "Enter a 5-letter word!";
    return;
  }

  if (!words.includes(guess)) {
    feedback.textContent = "Word not in list!";
    return;
  }

  feedback.textContent = ""; // Clear feedback
  const tiles = document.querySelectorAll(`[data-row="${currentRow}"]`);

  let correctCount = 0;

  // Check guess against target word
  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    const tile = tiles[i];

    tile.textContent = letter;

    if (letter === targetWord[i]) {
      tile.classList.add('correct');
      correctCount++;
    } else if (targetWord.includes(letter)) {
      tile.classList.add('present');
    } else {
      tile.classList.add('absent');
    }
  }

  currentRow++;

  if (correctCount === 5) {
    feedback.textContent = "Congratulations! You guessed the word!";
    guessInput.disabled = true;
    submitBtn.disabled = true;
    return;
  }

  if (currentRow === 6) {
    feedback.textContent = `Game Over! The word was: ${targetWord}`;
    guessInput.disabled = true;
    submitBtn.disabled = true;
    return;
  }

  guessInput.value = ""; // Clear input for next guess
});
