function onSubmitForm(token) {
    document.getElementById('contactForm').dataset.turnstileToken = token;
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof turnstile !== 'undefined' && turnstile.reset) {
        try { turnstile.reset(); } catch (e) {}
    }

    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const formStatus = document.getElementById('formStatus');

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
    }

    function setLoading(isLoading) {
        submitButton.classList.toggle('loading', isLoading);
        submitButton.disabled = isLoading;
    }

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const turnstileToken = this.dataset.turnstileToken;
        if (!turnstileToken) {
            showStatus('Please complete the CAPTCHA challenge.', 'error');
            return;
        }

        setLoading(true);
        formStatus.className = 'form-status';

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });
        data.cf_turnstile_response = turnstileToken;

        try {
            const response = await fetch('https://turnstile.epfl-rocket-team.ch/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showStatus('Message sent successfully! We will get back to you soon.', 'success');
                contactForm.reset();
                try { turnstile.reset(); } catch (e) {}
            } else {
                const errorMessage = result.errorCodes ? result.errorCodes.join(', ') : 'Unknown error';
                showStatus('Failed to send message: ' + errorMessage, 'error');
                try { turnstile.reset(); } catch (e) {}
            }
        } catch (error) {
            showStatus('An error occurred. Please try again later.', 'error');
            try { turnstile.reset(); } catch (e) {}
        } finally {
            setLoading(false);
            submitButton.disabled = true;
        }
    });
});
