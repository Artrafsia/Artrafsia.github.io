fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-list');
    data.forEach((project) => {
      // Cria o card
      const card = document.createElement('div');
      card.className = 'project-card';

      // Imagem de fundo (usa a primeira sala)
      const imgDiv = document.createElement('div');
      imgDiv.className = 'project-image';
      imgDiv.style.backgroundImage = `url('img/Cinema_SJorge/Mock.png')`;

      const overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      const icon = document.createElement('img');
      icon.src = 'img/360icon.webp';
      icon.alt = '360º';
      icon.className = 'icon-360';
      overlay.appendChild(icon);
      imgDiv.appendChild(overlay);

      // Info do projeto
      const info = document.createElement('div');
      info.className = 'project-info';
      const title = document.createElement('div');
      title.className = 'project-title';
      title.textContent = project.project;
      info.appendChild(title);

      // Torna o card clicável para abrir a primeira sala
      card.addEventListener('click', () => {
        const room = project.rooms[0];
        window.location.href = `viewer.html?img=${encodeURIComponent(room.file)}&title=${encodeURIComponent(room.name)}&project=${encodeURIComponent(project.project)}`;
      });

      card.appendChild(imgDiv);
      card.appendChild(info);
      container.appendChild(card);
    });
  });

  const container = document.getElementById('topview-container');
let zoom = 1;
let offsetX = 0;
let offsetY = 0;

function updateTransform() {
  container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;
}

// Zoom com roda do rato
container.addEventListener('wheel', (e) => {
  e.preventDefault();
  zoom += e.deltaY * -0.0015;
  zoom = Math.min(Math.max(zoom, 0.5), 3);
  updateTransform();
});

