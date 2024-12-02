$(document).ready(function () {
   
    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); 
        const email = $('#email').val();
        const password = $('#password').val();

        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }
        $.ajax({
            url: 'php/login.php', 
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    alert('Login successful!');
                    localStorage.setItem('userSession', JSON.stringify(response.sessionData));
                    window.location.href = 'profile.html';
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function () {
                alert('An error occurred. Please try again.');
            }
        });
    });
});
