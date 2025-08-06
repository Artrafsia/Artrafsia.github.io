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
addHotspot("Cinema_SJorge/Entrada.jpg", "Cinema_SJorge/AV1.jpg", "Avenida da Liberdade", -15, 180);

addHotspot("Cinema_SJorge/Piso1.jpg", "Cinema_SJorge/Escadas.jpg", "Ir para Escadas", -5, -13);
addHotspot("Cinema_SJorge/Piso1.jpg", "Cinema_SJorge/Zona_Radio.jpg", "Ir para Zona Radio Comercial", -8, 6);
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
addHotspot("Cinema_SJorge/Sala1-2.jpg", "Cinema_SJorge/Piso2.jpg", "Piso 2", 0, -150);
addHotspot("Cinema_SJorge/Sala1-2.jpg", "Cinema_SJorge/Piso2.jpg", "Piso 2", 0, -210);

addHotspot("Cinema_SJorge/Zona_Radio.jpg", "Cinema_SJorge/Piso1.jpg", "Piso 1", 0, -160);

addHotspot("Cinema_SJorge/Sala3_FFMS.jpg", "Cinema_SJorge/Piso1.jpg", "Piso 1", -5, 180);
addHotspot("Cinema_SJorge/Sala3_Cinema.jpg", "Cinema_SJorge/Piso1.jpg", "Piso 1", -5, 180);
addHotspot("Cinema_SJorge/Sala3_Cinema.jpg", "Cinema_SJorge/Sala4.jpg", "Sala 4", -8, 32);
addHotspot("Cinema_SJorge/Sala3_FFMS.jpg", "Cinema_SJorge/Sala4.jpg", "Sala 4", -8, 41);

addHotspot("Cinema_SJorge/Sala4.jpg", "Cinema_SJorge/Sala3_FFMS.jpg", "Sala 3", -5, -40);

addHotspot("Cinema_SJorge/Sala2.jpg", "Cinema_SJorge/Piso1.jpg", "Piso 1", 0, 200);

addHotspot("Cinema_SJorge/AV1.jpg", "Cinema_SJorge/AV2.jpg", "Zona Comida", -5, -10);
addHotspot("Cinema_SJorge/AV1.jpg", "Cinema_SJorge/AV3.jpg", "Zona Palco", -15, 100);
addHotspot("Cinema_SJorge/AV1.jpg", "Cinema_SJorge/Entrada.jpg", "Entrada Cinema São Jorge", -5, 42);

addHotspot("Cinema_SJorge/AV3.jpg", "Cinema_SJorge/AV2.jpg", "Zona Comida", 0, -10);
addHotspot("Cinema_SJorge/AV3.jpg", "Cinema_SJorge/AV1.jpg", "Zona Central", -15, -100);
addHotspot("Cinema_SJorge/AV3.jpg", "Cinema_SJorge/Entrada.jpg", "Entrada Cinema São Jorge", -5, 42);

addHotspot("Cinema_SJorge/AV2.jpg", "Cinema_SJorge/AV1.jpg", "Zona Central", -5, -225);




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
        
        // Top view logic
const topviewBtn = document.getElementById('topview-button');
const topviewOverlay = document.getElementById('topview-overlay');
const topviewImage = document.getElementById('topview-image');

topviewBtn.addEventListener('click', () => {
    topviewOverlay.classList.add('active');
});

// Clica fora para sair
topviewOverlay.addEventListener('click', (e) => {
    if (e.target === topviewOverlay) {
        topviewOverlay.classList.remove('active');
    }
});

// Movimento leve ao mexer o rato (efeito parallax)
topviewOverlay.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    topviewImage.style.transform = `scale(1.02) translate(${x * 10}px, ${y * 10}px)`;
});

// Clica nos hotspots
document.querySelectorAll('.topview-hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = hotspot.dataset.target;
        window.location.href = `viewer.html?img=${encodeURIComponent(target)}&project=${encodeURIComponent(project)}`;
    });
});

    });
