document.addEventListener('DOMContentLoaded', () => {
    initializeGame('A');
    initializeGame('B');
});

function initializeGame(user) {
    const selectElement = document.getElementById(`majorSelect${user}`);
    const selectMajorButton = document.getElementById(`selectMajorButton${user}`);
    const raffleButton = document.getElementById(`raffleButton${user}`);
    const numbersList = document.getElementById(`numbersList${user}`);
    const previousRounds = document.getElementById(`previousRounds${user}`);
    let numbers = [];
    let round = 1;
    let selectedMajors = [];

    selectMajorButton.addEventListener('click', () => {
        selectElement.disabled = true; // Lock the major selection
        raffleButton.disabled = false; // Enable the "Lottery!" button
        const selectedMajorText = selectElement.options[selectElement.selectedIndex].text;
        selectedMajors[round - 1] = selectedMajorText; // Update selected major for the round
    });

    raffleButton.addEventListener('click', () => {
        if (numbers.length < 10) {
            const salaryBase = parseInt(selectElement.value);
            const randomNumber = Math.floor(salaryBase * (0.5 + Math.random()));
            numbers.push(randomNumber);

            const listItem = document.createElement('div');
            listItem.textContent = `Generated number: ${randomNumber}`;
            numbersList.appendChild(listItem);
            numbersList.scrollTop = numbersList.scrollHeight; // Auto-scroll to the latest number
        }

        if (numbers.length === 10) {
            finishRound();
        }
    });

    function finishRound() {
        const average = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
        const roundSummary = document.createElement('div');
        roundSummary.innerHTML = `<strong>Round ${round} Summary</strong><br>Major: ${selectedMajors[round - 1]}<br>Numbers: ${numbers.join(', ')}<br>Average: ${average.toFixed(2)}`;
        previousRounds.appendChild(roundSummary);
        previousRounds.scrollTop = previousRounds.scrollHeight; // Auto-scroll to the latest round summary

        // Prepare for next round
        numbers = [];
        raffleButton.disabled = true; // Disable "Lottery!" button until a new major is selected
        if (round < 3) {
            round++;
            selectElement.disabled = false; // Enable major selection for the next round
            alert('Select a major for the next round.');
        } else {
            alert('Game over. Please reset to start a new game.');
        }
    }

    const resetButton = document.getElementById(`resetButton${user}`);
    resetButton.addEventListener('click', () => reset());

    function reset() {
        numbers = [];
        round = 1;
        selectedMajors = [];
        numbersList.innerHTML = '';
        previousRounds.innerHTML = '';
        selectElement.disabled = false; // Enable major selection
        raffleButton.disabled = true; // Ensure "Lottery!" button is disabled until a major is selected
    }
}
