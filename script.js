const form = document.getElementById('signal-form');
const signalList = document.getElementById('signal-list');
let signals = []; // Array to store signals

// Add a new signal
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pair = document.getElementById('pair').value;
    const sl = parseFloat(document.getElementById('sl').value).toFixed(4);
    const tp = parseFloat(document.getElementById('tp').value).toFixed(4);
    const type = document.getElementById('type').value;

    const newSignal = {
        id: Date.now(),
        pair,
        sl,
        tp,
        type,
        status: 'Active',
        createdAt: new Date()
    };

    signals.push(newSignal);
    displaySignals();
    form.reset();
});

// Display all signals
function displaySignals() {
    signalList.innerHTML = ''; // Clear existing signals

    signals.forEach((signal) => {
        const card = document.createElement('div');
        card.className = `signal-card ${signal.type}`; // Add "buy" or "sell" class

        card.innerHTML = `
            <div class="details">
                <h3>${signal.pair}</h3>
                <p>SL: ${signal.sl}, TP: ${signal.tp}</p>
                <p class="type">${signal.type.toUpperCase()}</p>
                <p>Status: ${signal.status}</p>
                <p>Created: ${formatTime(signal.createdAt)}</p>
            </div>
            <div class="actions">
                <button class="edit" onclick="editSignal(${signal.id})">Edit</button>
                <button class="delete" onclick="deleteSignal(${signal.id})">Delete</button>
            </div>
        `;

        signalList.appendChild(card);
    });
}

// Edit an existing signal
function editSignal(id) {
    const signal = signals.find((s) => s.id === id);
    if (signal) {
        document.getElementById('pair').value = signal.pair;
        document.getElementById('sl').value = signal.sl;
        document.getElementById('tp').value = signal.tp;
        document.getElementById('type').value = signal.type;

        deleteSignal(id); // Remove the old signal
    }
}

// Delete a signal
function deleteSignal(id) {
    signals = signals.filter((s) => s.id !== id);
    displaySignals();
}

// Format time
function formatTime(date) {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}
