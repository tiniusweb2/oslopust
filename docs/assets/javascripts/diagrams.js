document.addEventListener('DOMContentLoaded', function() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'mermaid-modal';
    document.body.appendChild(modal);

    // Add zoom controls
    const controls = document.createElement('div');
    controls.className = 'zoom-controls';
    controls.innerHTML = `
        <button id="zoom-in">+</button>
        <button id="zoom-out">-</button>
        <button id="zoom-reset">Reset</button>
    `;
    document.body.appendChild(controls);

    let currentScale = 1;

    // Make diagrams clickable
    document.querySelectorAll('.mermaid-clickable').forEach(diagram => {
        diagram.addEventListener('click', function() {
            modal.style.display = 'block';
            modal.innerHTML = this.outerHTML;
            currentScale = 1;
        });
    });

    // Close modal on click outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Zoom controls
    document.getElementById('zoom-in').addEventListener('click', () => {
        currentScale *= 1.2;
        updateZoom();
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        currentScale /= 1.2;
        updateZoom();
    });

    document.getElementById('zoom-reset').addEventListener('click', () => {
        currentScale = 1;
        updateZoom();
    });

    function updateZoom() {
        const diagram = modal.querySelector('.mermaid');
        if (diagram) {
            diagram.style.transform = `scale(${currentScale})`;
        }
    }

    // Add keyboard controls
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            } else if (e.key === '+') {
                currentScale *= 1.2;
                updateZoom();
            } else if (e.key === '-') {
                currentScale /= 1.2;
                updateZoom();
            }
        }
    });
});
