document.addEventListener('DOMContentLoaded', () => {
    const selectMajorButton = document.getElementById('selectMajorButton');
    const raffleButton = document.getElementById('raffleButton');
    const nextRoundButton = document.getElementById('nextRoundButton');
    const endButton = document.getElementById('endButton');
    const resetButton = document.getElementById('resetButton');
    const selectElement = document.getElementById('majorSelect');
    const numbersList = document.getElementById('numbersList');
    const previousRounds = document.getElementById('previousRounds');
    let selectedMajor;
    let numbers = [];
    let round = 1;

    selectMajorButton.addEventListener('click', () => {
        selectedMajor = selectElement.options[selectElement.selectedIndex].text;
        selectElement.disabled = true; // Lock the major selection
        raffleButton.disabled = false; // Enable the "Lottery!" button
        displaySelectedMajor();
    });

    raffleButton.addEventListener('click', () => {
        const salaryBase = parseInt(selectElement.value);
        const randomNumber = generateRandomNumber(salaryBase);
        numbers.push(randomNumber);
        displayGeneratedNumber(randomNumber);
        checkRoundCompletion();
    });

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    endButton.addEventListener('click', () => {
        endGame();
    });

    nextRoundButton.addEventListener('click', () => {
        startNextRound();
    });

    function displaySelectedMajor() {
        numbersList.innerHTML = `Selected Major: ${selectedMajor}<br>`;
    }

    function generateRandomNumber(base) {
        return Math.floor(base * (0.5 + Math.random()));
    }

    function displayGeneratedNumber(number) {
        numbersList.innerHTML += `Generated number: ${number}<br>`;
    }

    function checkRoundCompletion() {
        if (numbers.length === 10) {
            calculateAndDisplayAverage();
            round++;
            if (round <= 3) {
                nextRoundButton.style.display = 'inline';
            } else {
                endButton.style.display = 'inline';
            }
            raffleButton.disabled = true;
        }
    }

    function calculateAndDisplayAverage() {
        const average = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
        previousRounds.innerHTML += `Round ${round} - ${selectedMajor}: Average: ${average.toFixed(2)}<br>`;
        numbers = [];
    }

    function resetGame() {
        selectElement.disabled = false;
        raffleButton.disabled = true;
        nextRoundButton.style.display = 'none';
        endButton.style.display = 'none';
        numbersList.innerHTML = '';
        previousRounds.innerHTML = '';
        numbers = [];
        round = 1;
    }

    function endGame() {
        // Logic to handle the end of the game early
        alert("Game Ended. Reset to start a new game.");
        raffleButton.disabled = true;
    }

    function startNextRound() {
        nextRoundButton.style.display = 'none';
        if (round <= 3) {
            selectElement.disabled = false; // Allow changing major for the new round
            raffleButton.disabled = true;
            numbersList.innerHTML = `Round ${round}:<br>`;
        }
    }
});
