// This function is called by Turnstile for the newsletter when a token is ready
function onNewsletterTurnstileReady(token) {
    console.log('Newsletter Turnstile token:', token); // For debugging

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.dataset.turnstileToken = token;

        // Enable the newsletter submit button
        const newsletterSubmitButton = document.getElementById('newsletterSubmitButton');
        if (newsletterSubmitButton) {
            newsletterSubmitButton.disabled = false; // Enable the button
            newsletterSubmitButton.style.opacity = '1';
            newsletterSubmitButton.style.cursor = 'pointer';
            newsletterSubmitButton.style.color = '#ffffff'; // Change text color to white
            newsletterSubmitButton.style.backgroundColor = '#da291c'; // Change background color to match
        } else {
            console.error("Newsletter submit button with ID 'newsletterSubmitButton' not found!");
        }
    } else {
        console.error("Newsletter form with ID 'newsletterForm' not found!");
    }
}

// Function to reset Turnstile and disable newsletter button
function resetNewsletterTurnstileAndButton() {
    // If you have a specific Turnstile widget ID for newsletter, use:
    // if (typeof turnstile !== 'undefined' && turnstile.reset) {
    //     turnstile.reset('YOUR_NEWSLETTER_TURNSTILE_WIDGET_ID');
    // }
    // Otherwise, for a general reset (if only one invisible widget, or if it auto-resets):
    if (typeof turnstile !== 'undefined' && turnstile.reset) {
        turnstile.reset(); // Resets all widgets, or just the one if it's implicitly managed
    }


    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        delete newsletterForm.dataset.turnstileToken; // Clear the stored token
    }

    const newsletterSubmitButton = document.getElementById('newsletterSubmitButton');
    if (newsletterSubmitButton) {
        newsletterSubmitButton.disabled = true; // Disable the button functionally
        newsletterSubmitButton.classList.add('newsletter-button-disabled'); // Add disabled styling
        // If your button had text, reset it here: newsletterSubmitButton.textContent = 'Subscribe';
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
    // Get a reference to your newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    // Add an event listener for newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const turnstileToken = this.dataset.turnstileToken;

            if (!turnstileToken) {
                alert('Please complete the CAPTCHA challenge.');
                return;
            }

            // Disable button immediately on submission to prevent double clicks
            const newsletterSubmitButton = document.getElementById('newsletterSubmitButton');
            if (newsletterSubmitButton) {
                newsletterSubmitButton.disabled = true;
                newsletterSubmitButton.classList.add('newsletter-button-disabled');
                // If your button had text: newsletterSubmitButton.textContent = 'Subscribing...';
            }

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Add the Turnstile token to the data object
            data.cf_turnstile_response = turnstileToken;

            // Send the data to your Go backend's subscribe endpoint
            try {
                const response = await fetch('https://turnstile.epfl-rocket-team.ch/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    alert('Successfully subscribed to the newsletter!');
                    newsletterForm.reset(); // Clear the form
                    resetNewsletterTurnstileAndButton();
                } else {
                    const errorMessage = result.errorCodes ? result.errorCodes.join(', ') : 'Unknown error';
                    alert('Newsletter subscription failed: ' + errorMessage);
                    resetNewsletterTurnstileAndButton();
                }
            } catch (error) {
                console.error('Error during newsletter subscription:', error);
                alert('An error occurred during subscription. Please try again later.');
                resetNewsletterTurnstileAndButton();
            }
        });
    } else {
        console.error("Newsletter form not found on page load.");
    }
});