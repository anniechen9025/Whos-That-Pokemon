document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/users/username', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }).then(response => response.json()).then(data => {
        console.log(data)
        const socket = io();
        const messages = document.getElementById('messages');
        const form = document.getElementById('form');
        const input = document.getElementById('input');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (input.value) {
                // Sends message (if message exists) to the server
                socket.emit('chat message', input.value, data);
                input.value = '';
            }
        });

        socket.on('chat message', function (msg, user_name) {
            const item = document.createElement('li');
            // item.classList.add('chatbox-message');
            item.textContent = `${user_name}:  ${msg}`;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    });
});

