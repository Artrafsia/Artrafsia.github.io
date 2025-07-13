fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-list');
    data.forEach((project) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'project';

      const header = document.createElement('div');
      header.className = 'project-header';
      header.textContent = project.project;
      header.addEventListener('click', () => {
        wrapper.classList.toggle('open');
      });

      const roomList = document.createElement('div');
      roomList.className = 'room-list';
      project.rooms.forEach(room => {
        const link = document.createElement('a');
        link.href = `viewer.html?img=${encodeURIComponent(room.file)}&title=${encodeURIComponent(room.name)}&project=${encodeURIComponent(project.project)}`;
        link.textContent = room.name;
        roomList.appendChild(link);
      });

      wrapper.appendChild(header);
      wrapper.appendChild(roomList);
      container.appendChild(wrapper);
    });
  });
