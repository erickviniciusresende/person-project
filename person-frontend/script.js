let currentPage = 0;

async function findPersonByName() {

    const name = document.getElementById("textName").value;

    if(name.trim() === "") {

        findAllPeople();
        alert("Campo nome está vazio")

        return;
    }

    const response =
        await fetch(
            `http://localhost:8080/select/name/${name}`
        );

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

        if(!response.ok) {

        const error =
            await response.json();

        alert(error.message);

        return;
    }

    alert("Pessoa alterada com sucesso")

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

        if(!response.ok) {

        const error =
            await response.json();

        alert(error.message);

        return;
    }

    const data =
        await response.json();

    alert("Pessoa criada com sucesso")

    document.getElementById("textId").value = "";

    document.getElementById("textName").value = "";

    document.getElementById("textCity").value = "";

    findAllPeople()
    
}

async function deletePerson() {

    const id = document.getElementById("textId").value

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

    alert("Pessoa deletada com sucesso")

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
        document.getElementById("btnNext").style.display = "none";
    } else {
        document.getElementById("btnNext").style.display = "block";
    }

    if(data.first == true) {
        document.getElementById("btnPrevious").style.display = "none";
    } else {
        document.getElementById("btnPrevious").style.display = "block";
    }

    const peopleDiv =
        document.getElementById("people");

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

        alert("Nome não pode ficar vazio");
        return false;
    }

    if(name.length < 3) {

        alert("Nome deve ter pelo menos 3 letras");
        return false;
    }

    if(name.length > 20) {

        alert("Nome deve ter no máximo 20 letras");
        return false;
    }

    if(city.trim() === "") {

        alert("Cidade não pode ficar vazia");
        return false;
    }

    if(city.length < 3) {

        alert("Cidade deve ter pelo menos 3 letras");
        return false;
    }

    if(city.length > 20) {

        alert("Cidade deve ter no máximo 20 letras");
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

findAllPeople()