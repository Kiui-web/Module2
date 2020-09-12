
function addAssistant(e, user) {
	const idEvent = e.target.id
	const nameBad = document.getElementById('name-assistant').value
	const ol = document.getElementById('assistant-event')
	const name = firstLetterUpperCase(nameBad)
	const numberAssistant = document.getElementById('number-assistant')
	
	if (name !== "") {
		axios.post(`http://localhost:3000/assistant/add`,{idEvent, name})
			.then(res => {
				document.getElementById('name-assistant').value = ''
				const arrAssistants = res.data.assistants;
				createLiLastPosition(arrAssistants, idEvent, ol, user)
				numberAssistant.innerText = arrAssistants.length
				if (arrAssistants.length === 1) {
					const p = document.getElementById('no-assistants')
					p.innerText = ''
				}
			})
			.catch(console.error)
	}
}




function firstLetterUpperCase(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function deleteAssistant(e, number, idEvent) {
	const ol = document.getElementById('assistant-event')
	const numberAssistant = document.getElementById('number-assistant')

	axios.post(`http://localhost:3000/assistant/delete`, {idEvent, number})
			.then(res => {
				const arrAssistants = res.data.assistants
				deleteChildNodes (ol)
				createLi(arrAssistants, idEvent, ol)
				numberAssistant.innerText = arrAssistants.length
				if (arrAssistants.length === 0 && !document.getElementById( "no-assistants")) {
					const p = document.createElement('p')
					p.setAttribute('id', 'no-assistants')
					const divContainer = document.getElementById('container-assistants')
					p.innerText = "No tiene asistentes en este evento."
					divContainer.appendChild(p)
				}
			})
			.catch(console.error)

}




function deleteChildNodes(element) {
	if ( element.hasChildNodes() ) {
		while ( element.childNodes.length >= 1 ) {
			element.removeChild( element.firstChild );
		}
	}
}

function createLi (arrAssistants, idEvent, ol) {
	
	for (let j = 0; j < arrAssistants.length; j++) {

		const li = document.createElement('li')
		li.setAttribute('id', j)
		li.classList.add('delete-assistant')
		const div = document.createElement('div')
		div.classList.add('name-assistant-delete')
		li.appendChild(div)
		div.innerText = arrAssistants[j]
		ol.appendChild(li)
		const button = document.createElement('button')
		button.classList.add('btn-delete')
		button.setAttribute('id', idEvent)
		button.setAttribute('onclick', `deleteAssistant(event, ${j}, "${idEvent}")`)
		const i = document.createElement('i')
		i.classList.add('fa')
		i.classList.add('fa-trash-o')
		button.appendChild(i)
		li.appendChild(button)
	}
}

function createLiLastPosition (arrAssistants, idEvent, ol, user) {
	const pos = arrAssistants.length
	const li = document.createElement('li')
	li.setAttribute('id', pos)
	li.classList.add('delete-assistant')
	const div = document.createElement('div')
	div.classList.add('name-assistant-delete')
	li.appendChild(div)
	div.innerText = arrAssistants.slice(-1)[0]
	ol.appendChild(li)
	const button = document.createElement('button')
	if (user) {
		button.classList.add('btn-delete')
		button.setAttribute('id', idEvent)
		button.setAttribute('onclick', `deleteAssistant(event, ${pos - 1}, "${idEvent}")`)
		const i = document.createElement('i')
		i.classList.add('fa')
		i.classList.add('fa-trash-o')
		button.appendChild(i)
		li.appendChild(button)
	}
}


function saveNameUser (e) {
	const idUser = e.target.id
	const nameUserBad = document.getElementById('name-user').value
	const divNameUser = document.getElementById('nameUser');
	const errorName  = document.getElementById('errorName')
	const nameUser = firstLetterUpperCase(nameUserBad)

	if (nameUser !== "") {
		axios.post(`http://localhost:3000/user/addName`, {idUser, nameUser})
		.then(res => {
			errorName.innerText = ''
			console.log(res.data.name);
			if (res.data.name !== "") {
				$('#nameUser').modal('hide')
				divNameUser.classList.add('none')
			}
		})
		.catch(console.error)
	} else {
		errorName.innerText = 'Debe introducir tu nombre para poder continuar.'

	}
}
