$(document).ready(function () {
    $('#registerForm').on('submit', function (e) {
        e.preventDefault(); 

        const username = $('#fullname').val().trim(); 
        const email = $('#email').val().trim();
        const password1 = $('#password1').val().trim(); // Correctly referencing the password field
        
        if (!username || !email || !password1) {  // Corrected field name here
            alert('All fields are required. Please fill in all details.');
            return;
        }

        $.ajax({
            url: 'php/register.php',
            type: 'POST',
            data: {
                username: username, 
                email: email,
                password1: password1
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    alert('Registration successful! Please log in.');
                    window.location.href = 'login.html'; 
                } else {
                    alert('Error: ' + response.error);
                }
            },
            error: function () {
                alert('An error occurred. Please try again.');
            }
        });
    });
});
