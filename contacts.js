const endPoint = `https://qnfzizaesdfdijygrkkh.supabase.co/rest/v1/contact`
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZnppemFlc2RmZGlqeWdya2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNDczNzIsImV4cCI6MjA0MzkyMzM3Mn0.llAqlwkL2QvoEaHCq9b9yf0Thp3F31xlA2f-QGx0lGk`

let modal = new bootstrap.Modal(document.getElementById("contactModal"))
getContacts()

async function getContacts() {

    let response = await fetch(endPoint, {
        method: 'GET',
        headers: {
            'apikey': token,
            'Authorization': token
        }
    })

    let data = await response.json()
    renderContacts(data)

}

function renderContacts(data) {

    let tableLayout = ` <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        <tr>`

    for (let i = 0; i < data.length; i++) {
        tableLayout += ` <tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].phone}</td>
                            <td>${data[i].address}</td>
                            <td>${data[i].gender}</td>
                            <td>${data[i].email}</td>
                            <td>${data[i].age}</td>
                            <td> <button onclick="showModal(${data[i].id})" class="btn btn-warning"> Edit </button>  </td>
                            <td> <button onclick="deleteContact(${data[i].id})" class="btn btn-danger"> Delete </button>  </td>
                        <tr> `

    }

    reportContacts.innerHTML = tableLayout

}

async function postContact() {

    event.preventDefault()

    let name = inputName.value
    let phone = inputPhone.value
    let address = inputAddress.value
    let gender = inputGender.value
    let email = inputEmail.value
    let age = inputAge.value

    let jsonData = {
        name,
        phone,
        address,
        gender,
        email,
        age
    }

    let response = await fetch(endPoint, {
        method: 'POST',
        headers: {
            'apikey': token,
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })


    if (response.status >= 200 && response.status <= 299) {
        console.log("Object Created")
        getContacts()
    } else {
        console.log("Object was not created")
        let responseBody = await response.json()
        console.log(responseBody)
    }


}


async function showModal(id) {

    let url = `${endPoint}?id=eq.${id}`

    console.log(url)

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'apikey': token,
            'Authorization': token
        }
    })


    if (response.ok) {
        let data = await response.json();
        inputID.value = data[0].id
        inputName2.value = data[0].name
        inputPhone2.value = data[0].phone
        inputAddress2.value = data[0].address
        inputGender2.value = data[0].gender
        inputEmail2.value = data[0].email
        inputAge2.value = data[0].age
    } else {
        console.log("Fetch error")
    }

    modal.show()

}

async function patchContact() {

    let id = inputID.value
    let name = inputName2.value
    let phone = inputPhone2.value
    let address = inputAddress2.value
    let gender = inputGender2.value
    let email = inputEmail2.value
    let age = inputAge2.value

    let url = `${endPoint}?id=eq.${id}`

    let jsonBody = {
        name,
        phone,
        address,
        gender,
        email,
        age
    }

    console.log(url)

    let response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'apikey': token,
            'Athorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    })

    if (response.ok) {
        console.log("Object has been updated")
        getContacts()
        modal.hide()

        /*Whipe the inputs */

        inputID.value = ""
        inputName2.value = ""
        inputPhone2.value = ""
        inputAddress2.value = ""
        inputGender2.value = ""
        inputEmail2.value = ""
        inputAge2.value = ""

    } else {
        console.log("Object hasn´t been updated")
        let responseBody = await response.json()
        console.log(responseBody)
    }



}

async function deleteContact(id){

    let url = `${endPoint}?id=eq.${id}`

    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'apikey': token,
            'Athorization': token
        }
    })

    if(response.ok){
        console.log("Object has been removed")
        getContacts()
    }else{
        let responseBody = await response.json()
        console.log("Error deleting object")
        console.log(responseBody)
    }

}