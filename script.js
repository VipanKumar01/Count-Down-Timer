let interval;

document.getElementById('startButton').addEventListener('click', function () {
    const dateInput = document.getElementById('dateInput').value;
    const userInputDisplay = document.getElementById('userInputDisplay');
    const countdown = document.getElementById('countdown');
    const timer = document.getElementById('timer');
    const message = document.getElementById('message');

    const userDate = parseDate(dateInput);
    if (!userDate) {
        alert('Please use format - dd/mm/yyyy.');
        return;
    }

    if (userDate < new Date()) {
        alert('The entered date is in the past. Please enter a future date.');
        return;
    }

    userInputDisplay.textContent = `User entered date: ${dateInput}`;

    function parseDate(dateStr) {
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const year = parseInt(parts[2]);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
        return new Date(year, month, day);
    }

    function updateTimer() {
        const now = new Date();
        const timeLeft = userDate - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            timer.classList.add('hidden');
            message.classList.remove('hidden');
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Clear the previous interval 
    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
    updateTimer();
    document.getElementById('dateInput').value = '';

});

