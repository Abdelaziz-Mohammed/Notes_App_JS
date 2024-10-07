const notesContent = document.getElementById('notes');
const createNoteBtn = document.getElementById('create-btn');

// store notes from local storage if exits
if (localStorage.notesAppData) {
    notesContent.innerHTML = localStorage.notesAppData;
    // delete the last note if it is an empty note
    if (notesContent.children.length > 0 && notesContent.children[notesContent.children.length - 1].firstChild.innerHTML.trim().length === 0) {
        notesContent.children[notesContent.children.length - 1].remove();
    }
}

createNoteBtn.addEventListener('click', () => {
    // prevent creating new note when the current note is empty
    if (notesContent.children.length === 0
    || (notesContent.children.length > 0 && 
        notesContent.children[notesContent.children.length - 1].firstChild.innerHTML.trim().length > 0)) {
        createNewNoteAndAppendToNotes();
        saveToLocalStorage();
    }
})

function createNewNoteAndAppendToNotes() {
        // create new note element
        let newNote = document.createElement('div');
        newNote.className = 'note';
        // the paragraph input text
        let pEle = document.createElement('p');
        pEle.contentEditable = 'true';
        pEle.className = 'input-box';
        // the delete button image
        let imgDeleteEle = document.createElement('img');
        imgDeleteEle.src = 'images/delete.png';
        imgDeleteEle.className = 'delete-btn';
        // append input-text and delete-btn to newNote
        newNote.appendChild(pEle);
        newNote.appendChild(imgDeleteEle);
        // append the new note to notes content
        notesContent.appendChild(newNote);
        // focus on the input-box
        pEle.focus();
}

// tracking input changes
notesContent.addEventListener('input', _ => saveToLocalStorage())

// tracking delete event
notesContent.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveToLocalStorage();
    }
})

// add new line on enter
notesContent.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        document.execCommand('insertLineBreak');
        e.preventDefault();
    }
})

function saveToLocalStorage() {
    localStorage.notesAppData = notesContent.innerHTML;
}

saveToLocalStorage();

// localStorage.clear(); // testing


