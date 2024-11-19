document.addEventListener('DOMContentLoaded', function() {
    // Initialize mermaid
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
    });

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'diagram-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-content"></div>
        <div class="zoom-controls">
            <button class="zoom-in">+</button>
            <button class="zoom-reset">Reset</button>
            <button class="zoom-out">-</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Add click handlers to diagrams
    document.querySelectorAll('.mermaid.zoomable').forEach(diagram => {
        diagram.addEventListener('click', function() {
            const clone = this.cloneNode(true);
            modal.querySelector('.modal-content').innerHTML = '';
            modal.querySelector('.modal-content').appendChild(clone);
            modal.style.display = 'block';
            currentScale = 1;
            updateZoom();
        });
    });

    let currentScale = 1;
    const scaleStep = 0.2;

    // Zoom controls
    modal.querySelector('.zoom-in').addEventListener('click', () => {
        currentScale += scaleStep;
        updateZoom();
    });

    modal.querySelector('.zoom-out').addEventListener('click', () => {
        currentScale = Math.max(0.1, currentScale - scaleStep);
        updateZoom();
    });

    modal.querySelector('.zoom-reset').addEventListener('click', () => {
        currentScale = 1;
        updateZoom();
    });

    function updateZoom() {
        const content = modal.querySelector('.modal-content');
        content.style.transform = `scale(${currentScale}) translateY(-50%)`;
    }

    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            } else if (e.key === '+' || e.key === '=') {
                currentScale += scaleStep;
                updateZoom();
            } else if (e.key === '-') {
                currentScale = Math.max(0.1, currentScale - scaleStep);
                updateZoom();
            } else if (e.key === '0') {
                currentScale = 1;
                updateZoom();
            }
        }
    });
});
