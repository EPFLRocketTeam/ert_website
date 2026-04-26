function onNewsletterTurnstileReady(token) {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.dataset.turnstileToken = token;

        const newsletterSubmitButton = document.getElementById('newsletterSubmitButton');
        if (newsletterSubmitButton) {
            newsletterSubmitButton.disabled = false;
            newsletterSubmitButton.style.opacity = '1';
            newsletterSubmitButton.style.cursor = 'pointer';
            newsletterSubmitButton.style.color = '#ffffff';
            newsletterSubmitButton.style.backgroundColor = '#da291c';
        }
    }
}

function resetNewsletterTurnstileAndButton() {
    if (typeof turnstile !== 'undefined' && turnstile.reset) {
        try { turnstile.reset(); } catch (e) {}
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        delete newsletterForm.dataset.turnstileToken;
    }

    const newsletterSubmitButton = document.getElementById('newsletterSubmitButton');
    if (newsletterSubmitButton) {
        newsletterSubmitButton.disabled = true;
        newsletterSubmitButton.classList.add('newsletter-button-disabled');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof turnstile !== 'undefined' && turnstile.reset) {
        try { turnstile.reset(); } catch (e) {}
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const turnstileToken = this.dataset.turnstileToken;
        if (!turnstileToken) {
            alert('Please complete the CAPTCHA challenge.');
            return;
        }

        const newsletterSubmitButton = document.getElementById('newsletterSubmitButton');
        if (newsletterSubmitButton) {
            newsletterSubmitButton.disabled = true;
            newsletterSubmitButton.classList.add('newsletter-button-disabled');
        }

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });
        data.cf_turnstile_response = turnstileToken;

        try {
            const response = await fetch('https://turnstile.epfl-rocket-team.ch/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert('Successfully subscribed to the newsletter!');
                newsletterForm.reset();
                resetNewsletterTurnstileAndButton();
            } else {
                const errorMessage = result.errorCodes ? result.errorCodes.join(', ') : 'Unknown error';
                alert('Newsletter subscription failed: ' + errorMessage);
                resetNewsletterTurnstileAndButton();
            }
        } catch (error) {
            alert('An error occurred during subscription. Please try again later.');
            resetNewsletterTurnstileAndButton();
        }
    });
});
