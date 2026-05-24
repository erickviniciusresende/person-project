async function updatePerson() {

    if(!validation()) {

        return;
    }

    const id = document.getElementById("textId").value;

    const name = document.getElementById("textName").value

    const city = document.getElementById("textCity").value

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

    const data =
        await response.json();

    console.log(data);

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

                //body: JSON.stringify(person)
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
        await fetch("http://localhost:8080/select");

    const data =
        await response.json();

    const peopleDiv =
        document.getElementById("people");

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
}

function selectPerson(id, name, city) {

    document.getElementById("textId").value = id;
    document.getElementById("textName").value = name;
    document.getElementById("textCity").value = city;

}

function validation() {
    const name =
        document.getElementById("textName").value;

    const city =
        document.getElementById("textCity").value;

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

findAllPeople()