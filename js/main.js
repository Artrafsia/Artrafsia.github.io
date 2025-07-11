fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('project-list');

        data.forEach(project => {
            const projectBlock = document.createElement('div');
            projectBlock.className = 'project';

            const header = document.createElement('div');
            header.className = 'project-header';
            header.textContent = project.project;

            const roomList = document.createElement('ul');
            roomList.className = 'room-list';

            project.rooms.forEach(room => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `viewer.html?img=${encodeURIComponent(room.file)}&title=${encodeURIComponent(room.name)}`;
                a.textContent = room.name;
                li.appendChild(a);
                roomList.appendChild(li);
            });

            // Mostrar/ocultar ao clicar
            header.addEventListener('click', () => {
                roomList.classList.toggle('open');
            });

            projectBlock.appendChild(header);
            projectBlock.appendChild(roomList);
            list.appendChild(projectBlock);
        });
    });
