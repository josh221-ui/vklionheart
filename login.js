const loginForm = document.getElementById('login-form');

// Sample login credentials (Admin and Client)
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'client', password: 'client123', role: 'client' }
];

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = user.role === 'admin' ? 'admin.html' : 'client.html';
    } else {
        alert('Invalid credentials');
    }
});
