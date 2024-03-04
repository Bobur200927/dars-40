
// ? ================================== So'rovni ichki strukturasi ====================================

// ================ method, body, headers =====================

// let n = JSON.stringify([1,2,3,4])
// console.log(n);
// let f = JSON.parse(n)
// console.log(f);

let tb = document.querySelector('tbody')
let frm = document.querySelector('#addform')

function sendQuery() {
    fetch('https://cyberss.uz/api/dars')
    .then(res => res.json(res)).then(data => render(data))
}

sendQuery()

function render(users) {
    tb.innerHTML = ''
    users.forEach(user => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.tel}</td>
            <td><button data-id="${user.id}" class = "btn btn-danger delbtn">O'chirish</button></td>
        `
        tb.append(tr)
    });
    onDelete()
}

frm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let user = {
        firstname: frm.firstname.value,
        lastname: frm.lastname.value,
        age: frm.age.value,
        tel: frm.tel.value
    }
    fetch('https://cyberss.uz/api/dars', {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify(user)
    }).then((res)=>{
        if(res.status === 200){
            sendQuery()
        }
    })
})

function onDelete() {
    let btns = document.querySelectorAll('.delbtn')
    console.log(btns);
    btns.forEach(el=>{
        el.addEventListener('click', (e)=>{
            console.log(e.target.dataset.id);
            fetch('https://cyberss.uz/api/dars' + e.target.dataset.id,{
                method: 'DELETE'
            }).then(res=>{
                if(res.status === 200){
                    sendQuery()
                }
            })
        })
    })
}