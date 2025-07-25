// This function is called by Turnstile when a token is ready
function onSubmitForm(token) {
    console.log('Turnstile token:', token); // For debugging
    document.getElementById('contactForm').dataset.turnstileToken = token;
    // The token is now stored; the form can be submitted when ready

    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.disabled = false; // Enable the button
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
        submitButton.style.color = '#ffffff'; // Change text color to white
        submitButton.style.backgroundColor = '#da291c'; // Change background color to match
    } else {
        console.error("Submit button with ID 'submitButton' not found!");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof turnstile !== 'undefined' && turnstile.reset) {
        console.log("Turnstile API found on DOMContentLoaded. Attempting reset.");
        try {
            turnstile.reset(); // This resets all widgets on the page
        } catch (error) {
            console.error("Error resetting Turnstile:", error);
        };
    } else {
        console.log("Turnstile API not yet available on DOMContentLoaded. Will not reset at this stage.");
    }
    // Get a reference to your form
    const contactForm = document.getElementById('contactForm');

    // Add an event listener for form submission
    contactForm.addEventListener('submit', async function (event) {
        // Prevent the default form submission (which would navigate the page)
        event.preventDefault();

        // Get the Turnstile token that was stored by onSubmitForm
        const turnstileToken = this.dataset.turnstileToken;

        if (!turnstileToken) {
            alert('Please complete the CAPTCHA challenge.');
            return;
        }

        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add the Turnstile token to the data object
        data.cf_turnstile_response = turnstileToken;

        // Send the data to your Go backend
        try {
            const response = await fetch('https://turnstile.epfl-rocket-team.ch/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Send all form data + token as JSON
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Turnstile verification successful AND your backend indicates success
                alert('Message sent successfully!');
                contactForm.reset(); // Clear the form
                // You might also want to reset the Turnstile widget if it's not invisible
                // turnstile.reset(); // If you have multiple widgets or specific needs
            } else {
                // Turnstile verification failed OR your backend logic failed
                const errorMessage = result.errorCodes ? result.errorCodes.join(', ') : 'Unknown error';
                alert('Failed to send message: ' + errorMessage);
                // Optionally reset turnstile on failure
                // turnstile.reset();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while sending your message. Please try again later.');
        }
    });
});