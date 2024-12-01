const signalList = document.getElementById('signal-cards');
let signals = JSON.parse(localStorage.getItem('forexSignals')) || [];

if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

function showNotification(signal) {
    if (Notification.permission === 'granted') {
        new Notification(`New Signal: ${signal.pair}`, {
            body: `SL: ${signal.sl} | TP: ${signal.tp}`,
            icon: 'icon.png'
        });
    }
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
        showNotification(signal);  // Trigger notification for new signals
    });
}

displaySignals();  // Load active signals for client

