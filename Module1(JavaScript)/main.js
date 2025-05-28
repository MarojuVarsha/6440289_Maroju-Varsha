// ==============================
// 1. Page Initialization
// ==============================
console.log("Welcome to the Community Portal");

window.addEventListener("DOMContentLoaded", () => {
  alert("Page is fully loaded");
  displayEvents();

  // Attach event listeners
  const form = document.getElementById("regForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearPreferences);
  }

  const findNearbyBtn = document.getElementById("findNearbyBtn");
  if (findNearbyBtn) {
    findNearbyBtn.addEventListener("click", findNearbyEvents);
  }

  // jQuery enhancements (if jQuery is loaded)
  if (window.$) {
    $(".event-card").fadeIn();
    setTimeout(() => $(".event-card").fadeOut(), 4000);

    $("#registerBtn").click(() => alert("jQuery click!"));
  }

  // Keyboard event listener for Enter key
  document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      console.log("Search triggered");
    }
  });
});

// ==============================
// 2. Event Data
// ==============================
const events = [
  { name: "Art Festival", date: "2025-06-10", seats: 10, category: "Art" },
  { name: "Cleanup Day", date: "2023-01-01", seats: 5, category: "Cleanup" },
  { name: "Book Exchange", date: "2025-07-20", seats: 0, category: "Book" },
  { name: "Food Drive", date: "2025-07-10", seats: 50, category: "Food" },
  { name: "Community Walk", date: "2025-07-10", seats: 50, category: "Walk" }
];

// ==============================
// 3. Display Valid Events
// ==============================
function displayEvents() {
  const list = document.getElementById("eventList");
  if (!list) return;
  list.innerHTML = "";

  events.forEach(event => {
    const isUpcoming = new Date(event.date) > new Date();
    const hasSeats = event.seats > 0;

    if (isUpcoming && hasSeats) {
      const li = document.createElement("li");
      li.className = "event-card";
      li.innerHTML = `
        ${event.name} - ${event.date} (${event.seats} seats)
        <button onclick="register('${event.name}')">Register</button>
      `;
      list.appendChild(li);
    }
  });

  updateDropdown();
}

// ==============================
// 4. Update Event Dropdown
// ==============================
function updateDropdown() {
  const dropdown = document.getElementById("eventDropdown");
  if (!dropdown) return;
  dropdown.innerHTML = "";

  events
    .filter(e => new Date(e.date) > new Date() && e.seats > 0)
    .forEach(e => {
      const option = document.createElement("option");
      option.value = e.name;
      option.textContent = e.name;
      dropdown.appendChild(option);
    });
}

// ==============================
// 5. Register for an Event
// ==============================
function register(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event || event.seats <= 0) throw new Error("Cannot register!");
    event.seats--;
    alert(`Registered for ${eventName}`);
    displayEvents();
  } catch (err) {
    alert(err.message);
  }
}

// ==============================
// 6. Event Constructor & Prototype
// ==============================
function Event(name, date, seats) {
  this.name = name;
  this.date = date;
  this.seats = seats;
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

// ==============================
// 7. Array Manipulation Examples
// ==============================
const eventArray = [
  new Event("Baking Workshop", "2025-06-30", 15),
  new Event("Rock Concert", "2025-07-10", 50)
];

const musicEvents = eventArray.filter(e => e.name.includes("Concert"));
const displayCards = eventArray.map(e => `Event: ${e.name} on ${e.date}`);
console.log(displayCards);

// ==============================
// 8. Form Handling & Validation
// ==============================
function handleFormSubmit(e) {
  e.preventDefault();
  const { username, email, event } = e.target.elements;
  const messageEl = document.getElementById("message");

  if (!username.value || !email.value) {
    if (messageEl) messageEl.textContent = "Please fill all fields.";
    return;
  }

  submitRegistration({
    name: username.value,
    email: email.value,
    event: event.value
  });
}

// ==============================
// 9. Simulated Async Registration
// ==============================
function submitRegistration(user) {
  const messageEl = document.getElementById("message");
  if (messageEl) messageEl.textContent = "Submitting...";

  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (messageEl) messageEl.textContent = "Registration successful!";
        console.log("Response:", data);
      })
      .catch(err => {
        if (messageEl) messageEl.textContent = "Error submitting form.";
        console.error("Error:", err);
      });
  }, 1500);
}

// ==============================
// 10. Geolocation - Find Nearby Events
// ==============================
function findNearbyEvents() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const messageEl = document.getElementById("message");
  if (messageEl) messageEl.textContent = `Your location: (${lat}, ${lon})`;
  alert(`Your location: Latitude ${lat}, Longitude ${lon}`);
}

function showError(error) {
  const messageEl = document.getElementById("message");
  let msg = "";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      msg = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      msg = "Location info unavailable.";
      break;
    case error.TIMEOUT:
      msg = "Location request timed out.";
      break;
    default:
      msg = "Unknown error occurred.";
  }
  if (messageEl) messageEl.textContent = msg;
}

// ==============================
// 11. Clear Preferences
// ==============================
function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  alert("Preferences cleared!");
  const eventTypeEl = document.getElementById('eventType');
  const feeDisplayEl = document.getElementById('feeDisplay');
  if (eventTypeEl) eventTypeEl.value = "";
  if (feeDisplayEl) feeDisplayEl.textContent = "";
}

// ==============================
// 12. ES6 Features Demo
// ==============================
const eventObj = { name: "Code Camp", date: "2025-08-01", seats: 25 };
const printEvent = ({ name = "Unknown", date = "TBD" }) => {
  console.log(`Event: ${name} on ${date}`);
};
printEvent(eventObj);

const newList = [...eventArray]; // Spread operator
