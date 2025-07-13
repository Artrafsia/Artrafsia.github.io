fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const img = urlParams.get('img');
        const title = urlParams.get('title');
        const project = urlParams.get('project');

        pannellum.viewer('panorama', {
            type: "equirectangular",
            panorama: "img/" + img,
            autoLoad: true,
            autoRotate: -2,
            showFullscreenCtrl: true
        });

        const roomSwitcher = document.getElementById('room-switcher');
        const currentProject = data.find(p => p.project === project);

        // Preenche as salas (botões sempre visíveis)
        roomSwitcher.innerHTML = '';
        if (currentProject) {
            currentProject.rooms.forEach(room => {
                const a = document.createElement('a');
                a.href = `viewer.html?img=${encodeURIComponent(room.file)}&title=${encodeURIComponent(room.name)}&project=${encodeURIComponent(project)}`;
                a.textContent = room.name;
                if (room.file === img) a.classList.add('active');
                roomSwitcher.appendChild(a);
            });
        }

        // Partilhar
        document.getElementById('share-button').onclick = function() {
            navigator.clipboard.writeText(window.location.href);
            const feedback = document.getElementById('share-feedback');
            feedback.classList.add('visible');
            setTimeout(() => feedback.classList.remove('visible'), 1500);
        };
    });