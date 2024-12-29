
document.addEventListener('DOMContentLoaded', () => {
    const NameUser = document.getElementById('Nama-user');
    const JabatanUser = document.getElementById('jabatan-user');
    const TugasInput = document.getElementById('input-tugas');
    const timeInput = document.getElementById('time-input');
    const difficultyInput = document.getElementById('difficulty-input');
    const noteInput = document.getElementById('note-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('list-done'); 

    function namaHari(dayindex) {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return days[dayindex];
    }

    addButton.addEventListener('click', () => {
        const now = new Date();
        const daynames = namaHari(now.getDay());
        const todoText = TugasInput.value;
        const user = NameUser.value;
        const jabatan = JabatanUser.value;
        const todoTime = new Date(timeInput.value);
        const difficulty = difficultyInput.value;
        const notes = noteInput.value;

        if (todoText !== '' && !isNaN(todoTime)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Hari">${daynames}</td>
                <td data-label="Tanggal">${todoTime.toLocaleDateString()}</td>
                <td data-label="Nama User">${user}</td>
                <td data-label="Jabatan">${jabatan}</td>
                <td data-label="Tugas">${todoText}</td>
                <td data-label="Prioritas">${difficulty}</td>
                <td data-label="Catatan">${notes}</td>
                <td data-label="Status"><input type="checkbox"></td> <!-- Tidak perlu kelas -->
                <td data-label="Hapus"><button class="delete-button">Hapus</button></td>
            `;

            const checkbox = row.querySelector('input[type="checkbox"]');
            const deleteButton = row.querySelector('.delete-button');

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    row.classList.add('completed');
                    doneList.appendChild(row);
                } else {
                    row.classList.remove('completed');
                    todoList.appendChild(row);
                }
            });

            
            deleteButton.addEventListener('click', () => {
                row.remove();
                clearInterval(checkTime); 
            });

            const checkTime = setInterval(() => {
                const now = new Date();
                if (now.getTime() >= todoTime.getTime() && !checkbox.checked) {
                    row.style.backgroundColor = 'red';
                } else {
                    row.style.backgroundColor = '';
                }
            }, 1000);

            todoList.appendChild(row);

            
            TugasInput.value = '';
            NameUser.value = '';
            JabatanUser.value = '';
            timeInput.value = '';
            difficultyInput.value = 'Low';
            noteInput.value = '';
        }
    });
});
