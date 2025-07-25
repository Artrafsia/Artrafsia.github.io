fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const img = urlParams.get('img');
        const title = urlParams.get('title');
        const project = urlParams.get('project');

        const switcherToggle = document.getElementById('room-switcher-toggle');
        const roomSwitcher = document.getElementById('room-switcher');

        if (switcherToggle) {
            switcherToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                roomSwitcher.classList.toggle('open');
            });
            document.addEventListener('click', function() {
                roomSwitcher.classList.remove('open');
            });
            roomSwitcher.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        const currentProject = data.find(p => p.project === project);

        if (!currentProject) return;

        // Gera uma hash única para cada sala
        const generateSceneId = (file) => file.replace(/\W/g, '_');

        // Criação dinâmica das cenas
        const scenes = {};
       currentProject.rooms.forEach((room) => {
    const sceneId = generateSceneId(room.file);
    scenes[sceneId] = {
        title: room.name,
        panorama: "img/" + room.file,
        autoLoad: true,
        hotSpots: []
    };
});

// Adiciona apenas os hotspots específicos
const addHotspot = (fromFile, toFile, text, pitch = 0, yaw = 90) => {
    const fromId = generateSceneId(fromFile);
    const toId = generateSceneId(toFile);
    if (scenes[fromId]) {
        scenes[fromId].hotSpots.push({
            pitch,
            yaw,
            type: "scene",
            text,
            sceneId: toId
        });
    }
};

// Hotspots específicos
addHotspot("Cinema_SJorge/Entrada.jpg", "Cinema_SJorge/Piso1.jpg", "Entrar no Piso 1", -15, 10);
addHotspot("Cinema_SJorge/Piso1.jpg", "Cinema_SJorge/Escadas.jpg", "Ir para Escadas", -5, -13);
addHotspot("Cinema_SJorge/Piso1.jpg", "Cinema_SJorge/Sala2.jpg", "Sala 2", -5, 45);
addHotspot("Cinema_SJorge/Piso1.jpg", "Cinema_SJorge/Sala3_FFMS.jpg", "Sala 3", -5, 123);
addHotspot("Cinema_SJorge/Piso1.jpg", "Cinema_SJorge/Entrada.jpg", "Entrada", -10, 178);
addHotspot("Cinema_SJorge/Escadas.jpg", "Cinema_SJorge/Piso2.jpg", "Subir para Piso 2", -5, 0);
addHotspot("Cinema_SJorge/Escadas.jpg", "Cinema_SJorge/Piso1.jpg", "Descer para Piso 1", -18, 45);
addHotspot("Cinema_SJorge/Piso2.jpg", "Cinema_SJorge/Sala1.jpg", "Sala 1", -5, -130);
addHotspot("Cinema_SJorge/Piso2.jpg", "Cinema_SJorge/Sala1.jpg", "Sala 1", -5, -63);
addHotspot("Cinema_SJorge/Piso2.jpg", "Cinema_SJorge/Escadas.jpg", "Descer Escadas", -10, -170);
addHotspot("Cinema_SJorge/Sala1.jpg", "Cinema_SJorge/Piso2.jpg", "Piso 2", 0, -150);
addHotspot("Cinema_SJorge/Sala1.jpg", "Cinema_SJorge/Piso2.jpg", "Piso 2", 0, -210);
addHotspot("Cinema_SJorge/Sala1-1.jpg", "Cinema_SJorge/Piso2.jpg", "Piso 2", 0, -150);
addHotspot("Cinema_SJorge/Sala1-1.jpg", "Cinema_SJorge/Piso2.jpg", "Piso 2", 0, -210);
addHotspot("Cinema_SJorge/Sala3_FFMS.jpg", "Cinema_SJorge/Piso1.jpg", "Piso 1", -5, 180);
addHotspot("Cinema_SJorge/Sala3_Cinema.jpg", "Cinema_SJorge/Piso1.jpg", "Piso 1", -5, 180);
addHotspot("Cinema_SJorge/Sala2.jpg", "Cinema_SJorge/Piso1.jpg", "Piso 1", 0, 200);



        // Descobre a cena atual
        const currentSceneId = generateSceneId(img);

        // Inicia o viewer com cenas
        const viewer = pannellum.viewer('panorama', {
            default: {
                firstScene: currentSceneId,
                sceneFadeDuration: 1000
            },
            scenes: scenes
        });

        // Mostrar coordenadas ao clicar (útil para criar hotspots)
        viewer.on('mousedown', function () {
            console.log("Pitch:", viewer.getPitch().toFixed(2), "Yaw:", viewer.getYaw().toFixed(2));
        });

        // Preenche o menu das salas (room switcher)
        roomSwitcher.innerHTML = '';
        currentProject.rooms.forEach(room => {
            const a = document.createElement('a');
            a.href = `viewer.html?img=${encodeURIComponent(room.file)}&title=${encodeURIComponent(room.name)}&project=${encodeURIComponent(project)}`;
            a.textContent = room.name;
            if (room.file === img) a.classList.add('active');
            roomSwitcher.appendChild(a);
        });

        // Botão de partilhar
        document.getElementById('share-button').onclick = function () {
            navigator.clipboard.writeText(window.location.href);
            const feedback = document.getElementById('share-feedback');
            feedback.classList.add('visible');
            setTimeout(() => feedback.classList.remove('visible'), 1500);
        };

        // Atualiza o menu das salas quando muda de cena
        viewer.on('scenechange', function(newSceneId) {
            // Descobre o ficheiro da sala atual
            const currentRoom = Object.values(scenes).find(scene => generateSceneId(scene.panorama.replace('img/', '')) === newSceneId);
            if (!currentRoom) return;
            // Atualiza os botões
            Array.from(roomSwitcher.children).forEach(a => {
                if (a.textContent === currentRoom.title) {
                    a.classList.add('active');
                } else {
                    a.classList.remove('active');
                }
            });
        });
    });
