let currentPage = 0;
let messageSuccessOrError = document.getElementById("message");

async function findPersonByName() {

    const name = document.getElementById("textName").value;

    if(name.trim() === "") {

        findAllPeople();
        alert("Campo nome está vazio")

        return;
    }

    disableButtons("btnFindPerson", "Buscando");

    const response =
        await fetch(
            `http://localhost:8080/select/name/${name}`
        );

    enableButtons("btnFindPerson", "Buscar Pessoa");

    const data =
        await response.json();

    if(data.length === 0) {

        findAllPeople();
        alert("Nenhuma pessoa encontrada")

        return;
    }

    const peopleDiv = document.getElementById("people");

    peopleDiv.innerHTML = "";

    data.forEach(person => {

        peopleDiv.innerHTML += `

            <div onclick="selectPerson(
                ${person.id},
                '${person.name}',
                '${person.city}'
            )">

                <h3>${person.name}</h3>

                <p>${person.city}</p>

                <hr>

            </div>
        `;
    });

    console.log(data);
}

async function updatePerson() {

    if(!validation()) {

        return;
    }

    const id = document.getElementById("textId").value;

    const name = document.getElementById("textName").value;

    const city = document.getElementById("textCity").value;

    const person = {
        name: name,
        city: city
    }

    disableButtons("btnUpdate", "Atualizando")

    const response =
        await fetch(
            `http://localhost:8080/update/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(person)
            }
        );

    enableButtons("btnUpdate", "Alterar Pessoa");

        if(!response.ok) {

        const error =
            await response.json();

        alert(error.message);

        return;
    }

    showMessage("Pessoa alterada com sucesso", "green");

    document.getElementById("textId").value = "";

    document.getElementById("textName").value = "";

    document.getElementById("textCity").value = "";

    findAllPeople()
}

async function createPerson() {

    if(!validation()) {

        return;
    }

    const name = document.getElementById("textName").value

    const city = document.getElementById("textCity").value

    const person = {
        name: name,
        city: city
    }

    disableButtons("btnCreate", "Salvando")

    const response =
        await fetch(
            `http://localhost:8080/register`,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(person)
            }
        );

    document.getElementById("btnCreate").disabled = false;
    document.getElementById("btnCreate").innerText = "Criar pessoa";

        if(!response.ok) {

        const error =
            await response.json();

        alert(error.message);

        return;
    }

    const data =
        await response.json();

    showMessage("Pessoa criada com sucesso", "green");

    document.getElementById("textId").value = "";

    document.getElementById("textName").value = "";

    document.getElementById("textCity").value = "";

    findAllPeople()
    
}

async function deletePerson() {

    const id = document.getElementById("textId").value

    disableButtons("btnDelete", "Deletando")

    const response =
        await fetch(
            `http://localhost:8080/remove/${id}`,
            {

                method: "DELETE",

                headers: {
                    "Content-Type":
                        "application/json"
                },
            }
        );

    enableButtons("btnDelete", "Deletar Pessoa");

    showMessage("Pessoa deletada com sucesso", "green");

    document.getElementById("textId").value = "";

    document.getElementById("textName").value = "";

    document.getElementById("textCity").value = "";

    findAllPeople()
    
}

async function findAllPeople() {

    const response =
        await fetch(`http://localhost:8080/select?page=${currentPage}&size=5`);

    const data =
        await response.json();

    if(data.last == true) {
        document.getElementById("btnNext").style.visibility = "hidden";
    } else {
        document.getElementById("btnNext").style.visibility = "visible";
    }

    if(data.first == true) {
        document.getElementById("btnPrevious").style.visibility = "hidden";
    } else {
        document.getElementById("btnPrevious").style.visibility = "visible";
    }

    const peopleDiv = document.getElementById("people");

    peopleDiv.innerHTML = "";

    data.content.forEach(person => {

        peopleDiv.innerHTML += `

            <div onclick="selectPerson(
                ${person.id},
                '${person.name}',
                '${person.city}'
            )">

                <h3>${person.name}</h3>

                <p>${person.city}</p>

                <hr>

            </div>
        `;
    });
}

function selectPerson(id, name, city) {

    document.getElementById("textId").value = id;
    document.getElementById("textName").value = name;
    document.getElementById("textCity").value = city;

}

function validation() {
    const name = document.getElementById("textName").value;
    const city = document.getElementById("textCity").value;

    if(name.trim() === "") {

        showMessage("Nome não pode ficar vazio", "red");
        return false;
    }

    if(name.length < 3) {

        showMessage("Nome deve ter pelo menos 3 letras", "red");
        return false;
    }

    if(name.length > 20) {

        showMessage("Nome deve ter no máximo 20 letras", "red");
        return false;
    }

    if(city.trim() === "") {

        showMessage("Cidade não pode ficar vazia", "red");
        return false;
    }

    if(city.length < 3) {

        showMessage("Cidade deve ter pelo menos 3 letras", "red")
        return false;
    }

    if(city.length > 20) {

        showMessage("Cidade deve ter no máximo 20 letras", "red")
        return false;
    }
    
    return true;
}

function nextPage() {

    currentPage++;

    findAllPeople();
}

function previousPage() {

    if(currentPage > 0) {

        currentPage--;

        findAllPeople();
    }
}

function showMessage(text, color) {
    const message = document.getElementById("message");

    message.innerText = text;
    message.style.color = color;

    setTimeout(() => {

        message.innerText = "";

    }, 3000);
}

function disableButtons(idButton, textButton) {
    document.getElementById(idButton).disabled = true;
    document.getElementById(idButton).innerText = textButton;
}

function enableButtons(idButton, textButton) {
    document.getElementById(idButton).disabled = false;
    document.getElementById(idButton).innerText = textButton;
}

findAllPeople()