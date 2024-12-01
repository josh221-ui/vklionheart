const form = document.getElementById('signal-form');
const signalList = document.getElementById('signal-cards');
let signals = JSON.parse(localStorage.getItem('forexSignals')) || [];

function saveSignals() {
    localStorage.setItem('forexSignals', JSON.stringify(signals));
}

function displaySignals() {
    signalList.innerHTML = '';
    signals.forEach((signal) => {
        const card = document.createElement('div');
        const isExpired = signal.expiryTime && Date.now() > signal.expiryTime;
        if (isExpired) signal.status = 'Expired';  // Mark expired signal
        card.className = `signal-card ${signal.type} ${isExpired ? 'expired' : ''}`;

        card.innerHTML = `
            <div class="details">
                <h3>${signal.pair}</h3>
                <p>SL: ${signal.sl}, TP: ${signal.tp}</p>
                <p class="type">${signal.type.toUpperCase()}</p>
                <p>Status: ${signal.status}</p>
                <p>Created: ${new Date(signal.createdAt).toLocaleString()}</p>
                ${isExpired ? `<p class="expired-tag">Expired</p>` : ''}
            </div>
        `;
        signalList.appendChild(card);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pair = document.getElementById('pair').value;
    const sl = parseFloat(document.getElementById('sl').value).toFixed(4);
    const tp = parseFloat(document.getElementById('tp').value).toFixed(4);
    const type = document.getElementById('type').value;
    const status = document.getElementById('status').value;
    const expiry = document.getElementById('expiry').value * 60000; // Convert to milliseconds

    const newSignal = {
        id: Date.now(),
        pair,
        sl,
        tp,
        type,
        status,
        expiryTime: Date.now() + expiry,
        createdAt: new Date()
    };

    signals.push(newSignal);
    saveSignals();
    displaySignals();
    form.reset();
});

displaySignals(); // Load signals on page load

