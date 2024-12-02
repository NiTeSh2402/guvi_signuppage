$(document).ready(function () {
    const sessionId = localStorage.getItem('session_id'); 

    if (!sessionId) {
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "login.html";
        return;
    }

    
    function fetchProfile() {
        $.ajax({
            url: 'php/profile.php',
            type: 'POST',
            data: {
                session_id: sessionId,
                action: 'get',
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    
                    $('#age').val(response.data.age || '');
                    $('#dob').val(response.data.dob || '');
                    $('#contact').val(response.data.contact || '');
                } else {
                    $('#profileMessage').removeClass('d-none alert-success').addClass('alert-danger').text(response.message || 'Failed to fetch profile data.');
                }
            },
            error: function () {
                $('#profileMessage').removeClass('d-none alert-success').addClass('alert-danger').text('An error occurred while fetching profile data.');
            }
        });
    }

    
    $('#profileForm').on('submit', function (e) {
        e.preventDefault();

        const age = $('#age').val();
        const dob = $('#dob').val();
        const contact = $('#contact').val();

        $.ajax({
            url: 'php/profile.php',
            type: 'POST',
            data: {
                session_id: sessionId,
                action: 'update',
                age: age,
                dob: dob,
                contact: contact,
            },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    $('#profileMessage').removeClass('d-none alert-danger').addClass('alert-success').text('Profile updated successfully.');
                } else {
                    $('#profileMessage').removeClass('d-none alert-success').addClass('alert-danger').text(response.message || 'Failed to update profile.');
                }
            },
            error: function () {
                $('#profileMessage').removeClass('d-none alert-success').addClass('alert-danger').text('An error occurred while updating profile data.');
            }
        });
    });

  
    fetchProfile();
});
