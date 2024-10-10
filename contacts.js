const endPoint =  `https://qnfzizaesdfdijygrkkh.supabase.co/rest/v1/contact` 
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZnppemFlc2RmZGlqeWdya2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNDczNzIsImV4cCI6MjA0MzkyMzM3Mn0.llAqlwkL2QvoEaHCq9b9yf0Thp3F31xlA2f-QGx0lGk`


getContacts()

async function getContacts(){

    let response = await fetch(endPoint, {
        method : 'GET', 
        headers : {
            'apikey' : token,
            'Authorization': token
        }
    })
    
    let data = await response.json()
    renderContacts(data)
    
}

function renderContacts(data){

    let tableLayout = ` <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Age</th>
                        <tr>`
    
    for(let i =0; i < data.length; i++){
        tableLayout += ` <tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].phone}</td>
                            <td>${data[i].address}</td>
                            <td>${data[i].gender}</td>
                            <td>${data[i].email}</td>
                            <td>${data[i].age}</td>
                        <tr> `

    }
    
    reportContacts.innerHTML = tableLayout

}

async function postContact(){

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
        method : 'POST', 
        headers : {
            'apikey' : token,
            'Authorization': token, 
            'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify(jsonData)
    })
    

    if (response.status >= 200 && response.status <= 299){
        console.log("Object Created")
        getContacts()
    }else{
        console.log("Object was not created")
        console.log(response.statusText)
    }


}