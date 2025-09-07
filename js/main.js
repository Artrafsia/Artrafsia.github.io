fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-list');
    data.projects.forEach((project) => {
      // Cria o card
      const card = document.createElement('div');
      card.className = 'project-card';

      // Imagem de fundo
      const imgDiv = document.createElement('div');
      imgDiv.className = 'project-image';
      imgDiv.style.backgroundImage = `url('${project.mainImage}')`;

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
      title.textContent = project.name;
      info.appendChild(title);

      // Torna o card clicável para abrir a primeira sala do projeto
      card.addEventListener('click', () => {
        const room = project.rooms[0];
        window.location.href = `viewer.html?img=${encodeURIComponent(room.file)}&title=${encodeURIComponent(room.name)}&projectId=${encodeURIComponent(project.id)}`;
      });

      card.appendChild(imgDiv);
      card.appendChild(info);
      container.appendChild(card);
    });
  });


