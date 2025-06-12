document.addEventListener('DOMContentLoaded', function() {
            const notesContainer = document.querySelector('.notes-container');
            const addNoteButton = document.getElementById('add-note');
            
            addNoteButton.addEventListener('click', function() {
                const noteElement = document.createElement('div');
                noteElement.className = 'note';
                noteElement.innerHTML = `
                    <textarea class="note-content" placeholder="Type your note here..."></textarea>
                `;
                
                notesContainer.insertBefore(noteElement, addNoteButton);
                
                noteElement.querySelector('.note-content').focus();
            });
            
            notesContainer.addEventListener('dblclick', function(event) {
                const noteElement = event.target.closest('.note');
                if (noteElement && noteElement !== addNoteButton) {
                    noteElement.remove();
                }
            });
        });