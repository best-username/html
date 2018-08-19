var Mask = 'id_';
var list = $('#list div.item');

showContacts();

function showContacts() {
    clearValue();
    document.getElementById('list').textContent = '';
    var StLen = localStorage.length;
    if(StLen > 0) {
        for( var i=0; i < StLen; i++) {
            var key = localStorage.key(i);
            console.log(key);
            var obj = JSON.parse(localStorage.getItem(key));
          
            if(key.indexOf(Mask) == 0){
            var str = '\<i class="fas fa-id-card"></i>\<div class="desc">\<p class="name">' + obj.name + '</p>\<p class="number">' + obj.phone + '</p></div>';
var div = document.createElement('div');
div.innerHTML = str;
div.className = 'item';
div.setAttribute("onclick", "editContact(this)");
div.setAttribute("data-item", key);
var list = document.getElementById("list");
list.appendChild(div);
                
            }
        }
    }
}

// Add event for handle entered phone number

function formatPhoneNumber (el) {
    let input = el;
    let num = input.value.replace( /\D/g, '').split( /(?=.)/ );
    let index = num.length - 1;
    if (index >= 3) {
            num.splice( 0, 0, '(' );
            num.splice( 4, 0, ') ' );
    }
    if (index >= 6) num.splice( 8, 0, '-' );
    if (index >= 8) num.splice( 11, 0, '-' );
    input.value = num.join('');
}

function editContact (el) {
//console.log(el);
document.getElementById("search").style.display = "none";
document.getElementsByClassName("list")[0].style.display = "none";
document.getElementsByClassName("wrapper")[0].style.display = "none";
document.getElementsByClassName("blockToEdit")[0].style.display = "block";
document.getElementsByClassName("editContact")[0].style.display = "block";
var key = $(el).attr('data-item');
var obj = JSON.parse(localStorage.getItem(key));
document.getElementById("editName").value = obj.name;
document.getElementById("editSurname").value = obj.surname;
document.getElementById("editPhone").value = obj.phone;
//var edit = document.getElementsByClassName("blockToEdit")[0];
var edit = document.getElementById("remove");
edit.setAttribute("data-item", key);
};

document.getElementById("EditBtn").onclick = function () {
    document.getElementById("errorEdit").innerHTML = '';
    name = document.getElementById("editName").value;
    surname = document.getElementById("editSurname").value;
    phone = document.getElementById("editPhone").value;
    //el = ;
    var key = document.getElementById("remove").getAttribute('data-item');
    //console.log(key);
    var data = {
			name: name,
			surname: surname,
			phone: phone
		};
	var validation = validData(data.name, data.surname, data.phone);
        //console.log(validation);
        
        if(validation != 0) document.getElementById("errorEdit").innerHTML = validation;
        else {
            localStorage.setItem(key, JSON.stringify(data));
showContacts();
showMainPage();
clearValue();
        }
};


function removeContact (el) {
console.log(el);
var key = $(el).attr('data-item');
console.log(key);
if (confirm('Are you sure you want to remove this contact?')) {
    localStorage.removeItem(key);
    showContacts();
    showMainPage();
}
};

function showSearch () {
    document.getElementById("inp").value = '';
    ul = document.getElementById("list");
    li = ul.getElementsByClassName("item");
    for (i = 0; i < li.length; i++) {
        li[i].style.display = ""; 
    }
$("#wrapper").toggle();
$("#search").toggle();
}

function search_name() {
    let input, filter, ul, li, i, name;
    input = document.getElementById("inp");
    filter = input.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByClassName("item");
    for (i = 0; i < li.length; i++) {
        name = li[i].getElementsByClassName("name")[0];
        if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


document.getElementById("addBtn").onclick = function () {
    document.getElementById("errorAdd").innerHTML = '';
        var name = document.getElementById("nameAdd").value;
        var surname = document.getElementById("surnameAdd").value;
        var phone = document.getElementById("phoneAdd").value;
        var list = $('#list div.item');
	var data = {
			name: name,
			surname: surname,
			phone: phone
		};
        var validation = validData(data.name, data.surname, data.phone);
        if(validation != 0) document.getElementById("errorAdd").innerHTML = validation;    
        
            else {
                var nId = 0;
            list.each(function (index, el){
                var jelId = $(el).attr('data-item').slice(3);
                if(jelId > nId)
                    nId = jelId;
            });
            nId++;
            
            localStorage.setItem(Mask+nId, JSON.stringify(data));
            var str = '\<i class="fas fa-id-card"></i>\<div class="desc">\<p class="name">' + data.name + '</p>\<p class="number">' + data.phone + '</p></div>';

var div = document.createElement('div');
div.innerHTML = str;
div.className = 'item';
div.setAttribute("onclick", "editContact(this)");
div.setAttribute("data-item", Mask+nId);
var list = document.getElementById("list");
list.appendChild(div);
showMainPage();
clearValue();
}        
};

document.getElementsByClassName("btn add")[0].onclick = function () {
document.getElementsByClassName("list")[0].style.display = "none";
document.getElementsByClassName("wrapper")[0].style.display = "none";
document.getElementById("search").style.display = "none";
document.getElementsByClassName("blockToAdd")[0].style.display = "block";
document.getElementsByClassName("AddNewContact")[0].style.display = "flex";
clearValue();
};

document.getElementById("cancelBtn").onclick = function () {
showMainPage();  
};



function showMainPage() {
document.getElementsByClassName("list")[0].style.display = "block";
document.getElementsByClassName("wrapper")[0].style.display = "block";
document.getElementsByClassName("blockToAdd")[0].style.display = "none";
document.getElementsByClassName("AddNewContact")[0].style.display = "none";
document.getElementsByClassName("blockToEdit")[0].style.display = "none";
document.getElementsByClassName("editContact")[0].style.display = "none"; 
                 showContacts();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}                                                                                                                                                               

function clearValue() {
        document.getElementById("nameAdd").value = '';
        document.getElementById("surnameAdd").value = '';
        document.getElementById("phoneAdd").value = '';
        document.getElementById("inp").value = '';
}

function validData(name, surname, phone) {
    if(name === '' || phone === '') return 'Please, enter data!';
    if(name.length > 14 || surname.length > 14) return 'Too long name or surname!';
    if(phone.length < 3 || phone.length > 19) return 'Invalid phone number!';
    return 0;
}