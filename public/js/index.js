
function addAssistant(e) {
	const idEvent = e.target.id
	const nameBad = document.getElementById('name-assistant').value
	const ol = document.getElementById('assistant-event')
	const name = firstLetterUpperCase(nameBad)
	
	if (name !== "") {
		axios.post(`http://localhost:3000/assistant/add`,{idEvent, name})
			.then(res => {
				document.getElementById('name-assistant').value = ''
				const arrAssistants = res.data.assistants;
				const li = document.createElement('li')
				li.innerText = arrAssistants.slice(-1)[0]
				ol.appendChild(li)
			})
			.catch(console.error)
	}
}


function firstLetterUpperCase(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

