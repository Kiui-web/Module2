

function renderAttendants(attendants) {
  const listEvent = document.getElementById('list');
  listEvent.innerHTML = '';
  attendants.forEach(attendant => {
    
  });
}

function getAttendants(attendantsList) {
  axios.get('mongodb://localhost/kiui-app')
  .then(attendantsList => renderAttendants(response.data))
  .catch(e => console.log(e))
}