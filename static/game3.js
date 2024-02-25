document.addEventListener('DOMContentLoaded', () => {
    const selectMajorButton = document.getElementById('selectMajorButton');
    const drawButton = document.getElementById('drawButton');
    const resetButton = document.getElementById('resetButton');
    const endButton = document.getElementById('endButton');
    const selectElement = document.getElementById('majorSelect');
    const totalRoundsInput = document.getElementById('totalRounds');
    const drawsPerRoundInput = document.getElementById('drawsPerRound');
    const numbersList = document.getElementById('numbersList');
    const results = document.getElementById('results');

    let totalRounds, drawsPerRound, currentRound, drawsMade, numbersInCurrentRound, selectedMajor;

    function initializeGame() {
        totalRounds = parseInt(totalRoundsInput.value, 10);
        drawsPerRound = parseInt(drawsPerRoundInput.value, 10);
        currentRound = 0;
        numbersList.innerHTML = '';
        results.innerHTML = '';
        drawButton.disabled = true; // Initially disable draw button
        selectElement.disabled = false; // Enable major selection
    }

    function selectMajor() {
        selectedMajor = selectElement.options[selectElement.selectedIndex].text;
        selectElement.disabled = true; // Lock the major selection
        drawButton.disabled = false; // Enable draw button to start the game
        if (currentRound === 0 || drawsMade === drawsPerRound) startRound();
    }

    function startRound() {
        if (currentRound >= totalRounds) return endGame();
        currentRound++;
        drawsMade = 0;
        numbersInCurrentRound = [];
        numbersList.innerHTML = `<strong>Round ${currentRound} - ${selectedMajor}</strong><br>`;
    }

    function drawNumber() {
        if (drawsMade >= drawsPerRound) return;
        const salaryBase = parseInt(selectElement.value, 10);
        const randomNumber = Math.floor(salaryBase * (0.5 + Math.random()));
        numbersInCurrentRound.push(randomNumber);
        numbersList.innerHTML += `${randomNumber}<br>`;
        numbersList.scrollTop = numbersList.scrollHeight; // Auto-scroll to the latest number
        drawsMade++;
        if (drawsMade === drawsPerRound) {
            const averageSalary = numbersInCurrentRound.reduce((acc, val) => acc + val, 0) / numbersInCurrentRound.length;
            results.innerHTML += `Round ${currentRound} - ${selectedMajor}: Average Salary: ${averageSalary.toFixed(2)}<br>`;
            if (currentRound < totalRounds) selectElement.disabled = false; // Re-enable major selection for next round
        }
    }

    function resetGame() {
        initializeGame(); // Resets and restarts the game
        selectElement.disabled = false; // Ensure major selection is enabled upon reset
        drawButton.disabled = true; // Keep draw button disabled until a major is selected again
    }

    function endGame() {
        drawButton.disabled = true; // Disable drawing button to stop the game
        selectElement.disabled = false; // Re-enable major selection for a new game
        alert("Game Over. Please reset to start a new game.");
    }

    selectMajorButton.addEventListener('click', selectMajor);
    drawButton.addEventListener('click', drawNumber);
    resetButton.addEventListener('click', resetGame);
    endButton.addEventListener('click', endGame);

    initializeGame(); // Automatically start the game on page load
});
