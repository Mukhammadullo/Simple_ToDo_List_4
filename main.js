let tbody = document.querySelector(".tbody")
let dialogAdd = document.querySelector(".dialogAdd")
let AddEmail = document.querySelector(".AddEmail")
let AddRole = document.querySelector(".AddRole")
let btnAdd = document.querySelector(".btnAdd")
let inviteBtn = document.querySelector(".inviteBtn")
let dialogEdit = document.querySelector(".dialogEdit")
let EditEmail = document.querySelector(".EditEmail")
let EditRole = document.querySelector(".EditRole")
let editBtn = document.querySelector(".editBtn")
let dialogInfo = document.querySelector(".dialogInfo")
let infoEmail = document.querySelector(".infoEmail")
let infoRole = document.querySelector(".infoRole")
let cancel = document.querySelector(".cancel")

cancel.onclick = () => {
    dialogInfo.close()
}



inviteBtn.onclick = () => {
    dialogAdd.showModal()
}

let data = [
    {
        id: 1,
        email: "user1@daa.com",
        role: "query",
        isComplete: false,
    },
    {
        id: 2,
        email: "user2@daa.com",
        role: "query",
        isComplete: false,
    },
    {
        id: 3,
        email: "user3@daa.com",
        role: "query",
        isComplete: false,
    }
]


// get
function get(data) {
    tbody.innerHTML = ""
    data.forEach((elem) => {

        let tdEmail = document.createElement("td")
        tdEmail.innerHTML = elem.email

        let tdRole = document.createElement("td")
        tdRole.innerHTML = elem.role

        let btnSta = document.createElement("button")
        btnSta.innerHTML = "inective"
        btnSta.style.backgroundColor = "green"
        btnSta.classList.add("sta")

        let tdSta = document.createElement("td")
        tdSta.append(btnSta)

        let btnInfo = document.createElement("button")
        btnInfo.innerHTML = "Info"
        btnInfo.onclick = () => {
            dialogInfo.showModal()
            infoEmail.innerHTML = elem.email
            infoRole.innerHTML = elem.role
        }

        // complete
        let check = document.createElement("input")
        check.type = "checkbox"
        check.type = "checkbox"
        check.checked = elem.isComplete
        check.onclick = () => {
            comlepteUser(elem.id)
        }
        if (elem.isComplete) {
            btnSta.innerHTML = "active"
            btnSta.style.backgroundColor = "red"
        }



        // edit
        let btnEdit = document.createElement("button")
        btnEdit.innerHTML = "Edit"
        btnEdit.onclick = () => {
            editUser(elem.id)
        }

        // del
        let btnDel = document.createElement("button")
        btnDel.innerHTML = "Delete"
        btnDel.onclick = () => {
            delUser(elem.id)
        }



        let tdCard = document.createElement("td")
        tdCard.append(btnInfo, check, btnEdit, btnDel)

        let tr = document.createElement("tr")

        tr.append(tdEmail, tdRole, tdSta, tdCard)
        tbody.append(tr)
    })
}

get(data)

// serch
let search = document.querySelector(".search")
search.oninput = () => {
    let data2 = data.filter((elem) => {
        return elem.email.toLowerCase().trim().includes(search.value.toLowerCase().trim())
    })
    get(data2)
}



// add
btnAdd.onclick = () => {
    let newUser = {
        id: new Date(),
        email: AddEmail.value,
        role: AddRole.value,
        isComplete: false,
    }
    data.push(newUser)
    dialogAdd.close()
    get(data)
    AddEmail.value = ""
    AddRole.value = " "
}


// edit
let idx
function editUser(id) {
    dialogEdit.showModal()
    let user = data.find((elem) => elem.id == id)
    EditEmail.value = user.email
    EditRole.value = user.role
    idx = user.id
}
editBtn.onclick = () => {
    data = data.map((elem) => {
        if (elem.id == idx) {
            elem.email = EditEmail.value
            elem.role = EditRole.value
        }
        return elem
    })
    dialogEdit.close()
    get(data)
}



// complete
function comlepteUser(id) {
    data = data.map((elem) => {
        if (elem.id == id) {
            elem.isComplete = !elem.isComplete
        }
        return elem
    })
    get(data)
}


// delUser
function delUser(id) {
    data = data.filter((elem) => {
        return elem.id != id
    })
    get(data)
}