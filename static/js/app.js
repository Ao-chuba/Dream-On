document.addEventListener('DOMContentLoaded', function () {
    // Interpret Button Handler
    const interpretButton = document.getElementById('interpret-button');
    const dreamInput = document.getElementById('dream-input');
    const resultDiv = document.getElementById('interpretation-result');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

    interpretButton?.addEventListener('click', async function () {
        const dream = dreamInput.value.trim();
        if (!dream) {
            alert('Please enter your dream first');
            return;
        }

        interpretButton.disabled = true;
        resultDiv.innerHTML = '<div class="interpreting">Interpreting dream...🏵️🏵️</div>';

        try {
            const response = await fetch('/api/interpret-dream/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ dream: dream })
            });

            const data = await response.json();

            if (!response.ok) {
                resultDiv.innerHTML = `<div class="error">${data.error}</div>`;
                return;
            }

            let formattedHtml = `
                <div class="dream-interpretation">
                    <h1 class="dream-title" style="color: #2c3e50; font-size: 1.8em; margin-bottom: 1em; text-align: center;">${data.title}</h1>
                    <div class="interpretation-content">
            `;

            // Split the interpretation into sections
            const sections = data.interpretation.split('\n');
            sections.forEach(line => {
                line = line.trim();
                if (!line) return;

                // Handle section headers (lines with emoji)
                if (line.match(/^[^\w\s]/)) {
                    const sectionType = line.toLowerCase().includes('psychological') ? 'psychological-interpretation'
                        : line.toLowerCase().includes('emotional') ? 'emotional-themes'
                        : line.toLowerCase().includes('universal') ? 'universal-archetypes'
                        : '';

                    formattedHtml += `
                        <h2 data-section="${sectionType}">${line}</h2>
                    `;
                } else {
                    formattedHtml += `<p style="margin: 1em 0;">${line}</p>`;
                }
            });

            formattedHtml += `
                    </div>
                </div>
            `;

            resultDiv.innerHTML = formattedHtml;

        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        } finally {
            interpretButton.disabled = false;
        }
    });

    // // Donation button handler
    // const donateButton = document.getElementById('.donate-button');
    // donateButton?.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     // Redirect to the donation page
    //     window.location.href = "{% url 'donate'%}";
    // });
});
