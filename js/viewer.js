fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const urlParams = new URLSearchParams(window.location.search);
    const img = urlParams.get("img");
    const title = urlParams.get("title");
    const projectId = urlParams.get("projectId");

    const switcherToggle = document.getElementById("room-switcher-toggle");
    const roomSwitcher = document.getElementById("room-switcher");

    if (switcherToggle) {
      switcherToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        roomSwitcher.classList.toggle("open");
      });
      document.addEventListener("click", function () {
        roomSwitcher.classList.remove("open");
      });
      roomSwitcher.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    const currentProject = data.projects.find((p) => p.id === projectId);

    if (!currentProject) return;

    // Update topview image
    const topviewImage = document.getElementById("topview-image");
    if (topviewImage) {
      topviewImage.src = currentProject.topViewImage;
    }

    // Gera uma hash única para cada sala
    const generateSceneId = (file) => file.replace(/\W/g, "_");

    // Criação dinâmica das cenas
    const scenes = {};
    currentProject.rooms.forEach((room) => {
      const sceneId = generateSceneId(room.file);
      scenes[sceneId] = {
        title: room.name,
        panorama: "img/" + room.file,
        autoLoad: true,
        hotSpots: [],
      };
    });

    // Adiciona hotspots específicos do projeto
    currentProject.hotspots.forEach((hotspot) => {
      const fromId = generateSceneId(hotspot.from);
      const toId = generateSceneId(hotspot.to);
      if (scenes[fromId]) {
        scenes[fromId].hotSpots.push({
          pitch: hotspot.pitch,
          yaw: hotspot.yaw,
          type: "scene",
          text: hotspot.text,
          sceneId: toId,
        });
      }
    });

    // Descobre a cena atual
    const currentSceneId = generateSceneId(img);

    // Inicia o viewer com cenas
    const viewer = pannellum.viewer("panorama", {
      default: {
        firstScene: currentSceneId,
        sceneFadeDuration: 1000,
      },
      scenes: scenes,
    });

    // Mostrar coordenadas ao clicar (útil para criar hotspots)
    viewer.on("mousedown", function () {
      console.log(
        "Pitch:",
        viewer.getPitch().toFixed(2),
        "Yaw:",
        viewer.getYaw().toFixed(2)
      );
    });

    // Preenche o menu das salas (room switcher)
    roomSwitcher.innerHTML = "";
    currentProject.rooms.forEach((room) => {
      const a = document.createElement("a");
      a.href = `viewer.html?img=${encodeURIComponent(room.file)}&title=${encodeURIComponent(room.name)}&projectId=${encodeURIComponent(projectId)}`;
      a.textContent = room.name;
      if (room.file === img) a.classList.add("active");
      roomSwitcher.appendChild(a);
    });

    // Botão de partilhar
    document.getElementById("share-button").onclick = function () {
      navigator.clipboard.writeText(window.location.href);
      const feedback = document.getElementById("share-feedback");
      feedback.classList.add("visible");
      setTimeout(() => feedback.classList.remove("visible"), 1500);
    };

    // Atualiza o menu das salas quando muda de cena
    viewer.on("scenechange", function (newSceneId) {
      // Descobre o ficheiro da sala atual
      const currentRoom = Object.values(scenes).find(
        (scene) => generateSceneId(scene.panorama.replace("img/", "")) === newSceneId
      );
      if (!currentRoom) return;
      // Atualiza os botões
      Array.from(roomSwitcher.children).forEach((a) => {
        if (a.textContent === currentRoom.title) {
          a.classList.add("active");
        } else {
          a.classList.remove("active");
        }
      });
    });

    // Top view logic
    const topviewBtn = document.getElementById("topview-button");
    const topviewOverlay = document.getElementById("topview-overlay");
    const topviewHotspotsContainer = document.getElementById("topview-hotspots-container");

    // Clear existing hotspots
    topviewHotspotsContainer.innerHTML = '';

    // Add topview hotspots dynamically
    if (currentProject.topViewHotspots) {
      currentProject.topViewHotspots.forEach(hotspot => {
        const div = document.createElement('div');
        div.className = 'topview-hotspot';
        div.style.left = hotspot.left;
        div.style.top = hotspot.top;
        div.dataset.target = hotspot.target;
        div.title = hotspot.title;
        topviewHotspotsContainer.appendChild(div);
      });
    }

    topviewBtn.addEventListener("click", () => {
      topviewOverlay.classList.toggle("active");
    });

    // Clica fora para sair
    topviewOverlay.addEventListener("click", (e) => {
      if (e.target === topviewOverlay) {
        topviewOverlay.classList.remove("active");
      }
    });

    // Movimento leve ao mexer o rato (efeito parallax)
    topviewOverlay.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      topviewImage.style.transform = `scale(1.02) translate(${x * 10}px, ${y * 10}px)`;
    });

    // Clica nos hotspots
    document.querySelectorAll(".topview-hotspot").forEach((hotspot) => {
      hotspot.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = hotspot.dataset.target;
        window.location.href = `viewer.html?img=${encodeURIComponent(target)}&projectId=${encodeURIComponent(projectId)}`;
      });
    });
  });


