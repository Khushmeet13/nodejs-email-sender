document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: from,
            to: to,
            subject: subject,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        if (data.success) {
            responseMessage.className = 'success';
            responseMessage.innerText = data.message;
        } else {
            responseMessage.className = 'error';
            responseMessage.innerText = data.message;
        }
    })
    .catch(error => {
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        responseMessage.className = 'error';
        responseMessage.innerText = 'Error: ' + error;
    });
});