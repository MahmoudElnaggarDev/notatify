const pageList=document.getElementById("noteList");const sortable=new Sortable(pageList,{animation:300,delay:350,onChoose:function(){navigator.vibrate(100);},onEnd:function(evt){const updatedPageTitles=Array.from(pageList.getElementsByTagName("a")).map(link=>link.textContent);savePageOrder(updatedPageTitles);},});function savePageOrder(pageOrder){localStorage.setItem("pageOrder",JSON.stringify(pageOrder));}
function loadPageOrder(){const savedPageOrder=JSON.parse(localStorage.getItem("pageOrder"))||[];savedPageOrder.forEach(title=>{const listItem=Array.from(pageList.getElementsByTagName("a")).find(link=>link.textContent===title);if(listItem){pageList.appendChild(listItem.parentNode);}});}
window.onload=function(){var savedNotes=JSON.parse(localStorage.getItem('notes'));if(savedNotes){savedNotes.forEach(function(note){displayNoteWithLinkAndDeleteButton(note);});}
loadPageOrder();};function addNote(){var noteTitle=document.getElementById('noteTitleInput').value;if(noteTitle.trim()!==''){var note={title:noteTitle};displayNoteWithLinkAndDeleteButtonAndSave(note);document.getElementById('noteTitleInput').value='';const updatedPageTitles=Array.from(pageList.getElementsByTagName("a")).map(link=>link.textContent);savePageOrder(updatedPageTitles);}else{alert('Please enter a note title!');}}
function displayNoteWithLinkAndDeleteButtonAndSave(note){displayNoteWithLinkAndDeleteButton(note);saveNoteToLocalStorage(note);}
function displayNoteWithLinkAndDeleteButton(note){var noteList=document.getElementById('noteList');var newNote=document.createElement('li');var noteLink=document.createElement('a');noteLink.textContent=note.title;noteLink.href='notes/note-details.html';noteLink.onclick=function(){localStorage.setItem('currentNote',JSON.stringify(note));};var deleteButton=document.createElement('button');deleteButton.innerHTML='<i class="fas fa-trash"></i>';deleteButton.onclick=function(){deleteNoteAndRefresh(note);};newNote.appendChild(noteLink);newNote.appendChild(deleteButton);noteList.appendChild(newNote);}
function saveNoteToLocalStorage(note){var savedNotes=JSON.parse(localStorage.getItem('notes'))||[];var existingNoteIndex=savedNotes.findIndex(function(savedNote){return savedNote.title===note.title;});if(existingNoteIndex!==-1){savedNotes[existingNoteIndex].content=note.content;}else{savedNotes.push(note);}
localStorage.setItem('notes',JSON.stringify(savedNotes));}
function deleteNoteAndRefresh(note){Swal.fire({icon:"error",text:`هل ترغب في حذف\n"${note.title}"؟`,showDenyButton:true,confirmButtonText:"إلغاء",denyButtonText:"حذف",confirmButtonColor:"#000000",denyButtonColor:"#FFFFFF"}).then((result)=>{if(result.isDenied){var savedNotes=JSON.parse(localStorage.getItem('notes'))||[];var updatedNotes=savedNotes.filter(function(savedNote){return savedNote.title!==note.title;});localStorage.setItem('notes',JSON.stringify(updatedNotes));localStorage.removeItem(note.title);localStorage.removeItem(`${note.title}-text`);const updatedPageTitles=Array.from(pageList.getElementsByTagName("a")).map(link=>link.textContent);savePageOrder(updatedPageTitles);refreshNoteList();}});}
function refreshNoteList(){var noteList=document.getElementById('noteList');while(noteList.firstChild){noteList.removeChild(noteList.firstChild);}
var savedNotes=JSON.parse(localStorage.getItem('notes'))||[];savedNotes.forEach(function(note){displayNoteWithLinkAndDeleteButton(note);});}