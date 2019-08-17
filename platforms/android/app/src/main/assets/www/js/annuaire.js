window.onload = function(){
    // Buttons
    let quickAddBtn = document.getElementById("QuickAdd");
    let AddBtn = document.getElementById("Add");
    let cancelBtn = document.getElementById("Cancel");
    let quickAddFormDiv = document.querySelector('.quickaddForm');

    //Champs du Form
    let nom = document.getElementById("nom");
    let prenom = document.getElementById("prenom");
    let adress1 = document.getElementById("adress1");
    let adress2 = document.getElementById("adress2");
    let cp = document.getElementById("cp");
    let ville = document.getElementById("ville");
    let telfixe = document.getElementById("telfixe");
    let telport = document.getElementById("telport");

    //Affichage Annuaire
    let addBookDiv = document.querySelector(".addbook");

    

    // Event Listeners
    quickAddBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "none";
    });

    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);

    

    //Creation du Storage Array
    let addressBook = [];



	//localStorage['addbook'] = '[{"prenom":"Olivier","nom":"Crssnt","adress1":"5 rue de Paris","adress2":"Appartement Ubuntu","cp":"75000","ville":"LinuxLand","telfixe":"0559123456","telport":"0628123456"}]';

	function jsonStructure(prenom,nom,adress1,adress2,cp,ville,telfixe,telport){
		this.prenom = prenom;
		this.nom = nom;
        this.adress1 = adress1;
        this.adress2 = adress2;
        this.cp = cp;
        this.ville = ville;
        this.telfixe = telfixe;
		this.telport = telport;
	}

	function addToBook(){
		let isNull = prenom.value!='' && nom.value!='' && adress1.value!='' && adress2.value!='' && cp.value!='' && ville.value!='' && telfixe.value!='' && telport.value!='';
		if(isNull){
			// format the input into a valid JSON structure
			let obj = new jsonStructure(prenom.value,nom.value,adress1.value,adress2.value,cp.value,ville.value,telfixe.value,telport.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			let remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm(){
		let formFields = document.querySelectorAll('.formFields');
		for(let i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			for(let n in addressBook){
				let str = '<div class="entry">';
					str += '<div class="prenom"><p>' + addressBook[n].prenom + '</p></div>';
					str += '<div class="nom"><p>' + addressBook[n].nom + '</p></div>';
					str += '<div class="adress1"><p>' + addressBook[n].adress1 + '</p></div>';
					str += '<div class="adress2"><p>' + addressBook[n].adress2 + '</p></div>';
					str += '<div class="cp"><p>' + addressBook[n].cp + '</p></div>';
                    str += '<div class="ville"><p>' + addressBook[n].ville + '</p></div>';
                    str += '<div class="telfixe"><p>' + addressBook[n].telfixe + '</p></div>';
                    str += '<div class="telport"><p>' + addressBook[n].telport + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '<p>_________________________________________________________</p>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();
}

