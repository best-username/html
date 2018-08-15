var Mask = 'id_';
var list = $('#list div.item');

function showContacts() {
    var StLen = localStorage.length;
    if(StLen > 0) {
        for( var i=0; i < StLen; i++) {
            var key = localStorage.key(i);
            console.log(key);
            var obj = JSON.parse(localStorage.getItem(key));
            console.log(obj.name);
            
            
            for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}
            //console.log(items['phone']);
            if(key.indexOf(Mask) == 0){
                var str = '\<i class="fas fa-id-card"></i>\<div class="desc">\<p class="name">' + obj.name + '</p>\<p class="number">' + obj.phone + '</p></div>';

var div = document.createElement('div');
div.innerHTML = str;
div.className = 'item';
div.setAttribute("data-item", i);
var list = document.getElementById("list");
list.appendChild(div);
                
            }
        }
    }
}

showContacts();

var list = $('#list div.item');
document.getElementsByClassName("btn bg-success")[0].onclick = function () {
        var name = document.getElementById("nameAdd").value;
        var surname = document.getElementById("surnameAdd").value;
        var phone = document.getElementById("phoneAdd").value;
        var list = $('#list div.item');
	var data = {
			name: name,
			surname: surname,
			phone: phone
		};
	if (data.name === '' || data.surname === '' || data.phone === '') alert('Please, enter data!!!11');
            console.log(list);
            var nId = 0;
            list.each(function (index, el){
                var jelId = $(el).attr('data-item').slice(3);
                if(jelId > nId)
                    nId = jelId;
            })
            nId++;
            localStorage.setItem(Mask+nId, JSON.stringify(data));
            var str = '\<i class="fas fa-id-card"></i>\<div class="desc">\<p class="name">' + data.name + '</p>\<p class="number">' + data.phone + '</p></div>';

var div = document.createElement('div');
div.innerHTML = str;
div.className = 'item';
div.setAttribute("data-item", Mask+nId);
var list = document.getElementById("list");
list.appendChild(div);
            
	}

document.getElementsByClassName("add")[0].onclick = function () {
document.getElementsByClassName("list")[0].style.display = "none";
document.getElementsByClassName("wrapper")[0].style.display = "none";
document.getElementsByClassName("blockToAdd")[0].style.display = "block";
document.getElementsByClassName("AddNewContact")[0].style.display = "flex";   
};
    
