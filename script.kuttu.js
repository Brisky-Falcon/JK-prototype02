const originalNumberElement = document.getElementById("original-number");
const historyPopup = document.getElementById("history-popup");
const historyContent = document.getElementById("history-content");
const customPopup = document.getElementById("custom-popup");
const customAmountInput = document.getElementById("custom-amount");
const historyButton = document.getElementById("view-history");
const convertButton = document.getElementById("convert-button");
const totalDonatedElement = document.getElementById("total-amount-donated");



let originalNumber = 0;
let history = [];
let totalDonated = 0;

historyButton.addEventListener("click", viewHistory);
historyButton.addEventListener("touchstart", viewHistory);

convertButton.addEventListener("click", convertToAC);

function hidePopupMessage() {
    const popupMessage = document.getElementById("popup-message");
    popupMessage.style.display = "none";
  }

  function displayGreeting() {
    // Get the current time
    const currentTime = new Date();
    const hours = currentTime.getHours();

    // Define the greeting message based on the time
    let greeting;
    if (hours < 12) {
      greeting = "Good Morning";
    } else if (hours < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    // Get the user's name (you can update this dynamically if needed)
    const userName = "Kuttu";

    // Create the popup message
    const popupMessage = document.getElementById("popup-message");
    popupMessage.innerHTML = `<h2>${greeting}, ${userName}</h2>`;

    // Display the popup message
    popupMessage.style.display = "block";

    // Call the hidePopupMessage function after 4.5 seconds to hide the message
    setTimeout(hidePopupMessage, 4500);
  }

  // Call the displayGreeting function when the page loads
  window.addEventListener("load", displayGreeting);

function convertToAC() {
    const jkcValue = parseInt(originalNumberElement.textContent);

    if (!isNaN(jkcValue)) {
        const acValue = jkcValue / 1000;
        const acResultElement = document.getElementById("ac-result");
        acResultElement.textContent = acValue;
        const acDisplay = document.getElementById("ac-display");
        acDisplay.style.display = "block";
    }
}

function updateHistory(title, amount, timestamp) {
    history.push({ title, amount, timestamp });
}

function clearHistory() {
    history = [];
    historyContent.innerHTML = "";
    const clearButton = document.querySelector(".clear-button");
    clearButton.style.display = "none";
}

function viewHistory() {
    historyContent.innerHTML = "";
    history.forEach((entry) => {
        const historyItem = document.createElement("div");
        const formattedTitle = entry.title || 'Unknown Title';
        const formattedDate = formatDateTime(entry.timestamp);
        const formattedTime = formatTime12Hr(entry.timestamp);
        const formattedAmount = entry.amount < 0 ? `-${-entry.amount}` : `+${entry.amount}`;
        historyItem.textContent = `${formattedTitle} - ${formattedDate} - ${formattedTime} - ${formattedAmount}`;
        historyContent.appendChild(historyItem);
    });

    const clearButton = document.querySelector(".clear-button");
    clearButton.style.display = history.length > 0 ? "block" : "none";

    historyPopup.style.display = "block";
}

function closeHistory() {
    historyPopup.style.display = "none";
}

function closeCustom() {
    customPopup.style.display = "none";
}

function toggleCustom() {
    customAmountInput.value = "";
    customPopup.style.display = customPopup.style.display === "block" ? "none" : "block";
}

function applyCustom() {
    const customAmount = parseInt(customAmountInput.value);
    if (!isNaN(customAmount)) {
        originalNumber += customAmount;
        const title = 'Custom';
        const timestamp = Date.now();
        updateHistory(title, customAmount, timestamp);
        originalNumberElement.style.color = "#1a53ff";
        originalNumberElement.textContent = originalNumber;
        originalNumberElement.innerHTML = `${originalNumber} `;
        setTimeout(() => {
            originalNumberElement.style.color = "white";
        }, 500);
        customAmountInput.value = "";
        closeCustom();
    }
}

function deduct1000() {
    originalNumber -= 1000;
    const title = "Scheduled a meeting";
    const timestamp = Date.now();
    updateHistory(title, -1000, timestamp);
    originalNumberElement.style.color = "red";
    originalNumberElement.textContent = originalNumber;
    setTimeout(() => {
        originalNumberElement.style.color = "white";
    }, 500);
}

function deduct5000() {
    originalNumber -= 5000;
    const title = "Created an event";
    const timestamp = Date.now();
    updateHistory(title, -5000, timestamp);
    originalNumberElement.style.color = "red";
    originalNumberElement.textContent = originalNumber;
    setTimeout(() => {
        originalNumberElement.style.color = "white";
    }, 500);
}

function formatTime12Hr(timestamp) {
    if (isNaN(timestamp)) {
        return "Unknown Time";
    }
    const date = new Date(timestamp);
    if (isNaN(date)) {
        return "Unknown Time";
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function formatDateTime(timestamp) {
    if (isNaN(timestamp)) {
        return "Unknown Date";
    }
    const date = new Date(timestamp);
    if (isNaN(date)) {
        return "Unknown Date";
    }
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

function showDonatePopup() {
    const donatePopup = document.getElementById("donate-popup");
    donatePopup.style.display = "block";
}

function closeDonatePopup() {
    const donatePopup = document.getElementById("donate-popup");
    donatePopup.style.display = "none";
}

function applyDonation() {
    const donateAmountInput = document.getElementById("donate-amount");
    const donateAmount = parseInt(donateAmountInput.value);
    if (!isNaN(donateAmount)) {
        originalNumber -= donateAmount;
        totalDonated += donateAmount;
        updateHistory("Donated", -donateAmount, Date.now());
        originalNumberElement.textContent = originalNumber;
        totalDonatedElement.textContent = totalDonated;
        closeDonatePopup();
    }
}



