let userPanier = localStorage.getItem("userPanier") ? JSON.parse(localStorage.getItem("userPanier")) : [];
let userCoord = localStorage.getItem("userCoord") ? JSON.parse(localStorage.getItem("userCoord")) : [];
let products = {"product:_id" : userPanier.productId}

if (userPanier.length > 0){
userPanier.forEach((produit,index)=>{
  console.log(produit)
  fetch("http://localhost:3000/api/teddies/" + produit.productId) // le productId n'est récup que ligne 6
    .then(response => response.json())
    .then (teddie =>{

      teddie.option = produit.option;
      produit.price = teddie.price;
      console.log(teddie);
      tableCreator(teddie, index);
     
    })
  })      
  sumTable(userPanier);
  clearPanier();
} else{
  document.getElementById("main").innerHTML ='Votre Panier est vide pour le moment.'
  document.getElementById("main").style.textAlign = "center";
  document.getElementById("main").style.fontSize = "2rem";
}
  // Validation de la commande
  let inputValidation = document.getElementById("validationBtn");
  inputValidation.addEventListener("click", () =>{
  let contact = checkInput();
  if (contact != null){
    document.getElementById("validationBtn").setAttribute("href","validation__commande.html");
  }
  });



// creation du tableau pour chaque element du userPanier
function tableCreator (element, index) {
  document.getElementById("basket_tablebody").innerHTML += "<tr id='basketProduct"+index+"'></tr>";
  document.getElementById("basketProduct"+index).innerHTML += "<td>"+ element.name +"</td>";
  if (element.option == 0) {
    document.getElementById("basketProduct"+index).innerHTML += "<td>Aucune option choisi</td>";
  }else{
  document.getElementById("basketProduct"+index).innerHTML += "<td>"+ element.option +"</td>";
  }
  document.getElementById("basketProduct"+index).innerHTML += "<td>"+ element.price/100+"€</td>";// += pour rajouter
}

// creation de la colonne Total
function sumTable (panier) {
  let total = 0;
  panier.forEach(element => {
    total = element.productPrice + total;
  });
  console.log(total /100 + "€");
  total = total /100;
  document.getElementById("basket_footer").innerHTML += '<td colspan="3"> Total de la commande : '+total+'€</td>';
  // le retour null de la fonction était du à la position au départ du script dans le HTML
}

// creation d'un bouton pour vider le userPanier et refresh
function clearPanier (){
  //mettre au panier au click de l'utilisateur
  let inputClear = document.getElementById("facture");
  inputClear.innerHTML += '<div class="btn btn-primary mx-5 my-3" id="clear_basket">Vider votre panier</div>';
  document.getElementById("clear_basket").addEventListener("click", () => {
  localStorage.clear();
  document.location.reload(true)
  });
}

//vérifie les inputs du formulaire
function checkInput  (){
  
  //Controle Regex
  let checkString = /[a-zA-Z]/;
  let checkNumber = /[0-9]/;

  //Source pour vérification email => emailregex.com
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

  let formNom = document.getElementById("inputLastName").value;
  let formPrenom = document.getElementById("inputFirstName").value;
  let formMail = document.getElementById("inputMail").value;
  let formAdresse = document.getElementById("inputAdress").value;
  let formAdresseComp = document.getElementById("inputAdressComp").value;
  let formVille = document.getElementById("inputCity").value;

  //message fin de controle
  let checkMessage = "";

    //tests des différents input du formulaire
      //Test du nom => aucun chiffre ou charactère spécial permis
      if(checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true || formNom == ""){
        checkMessage = "Vérifier/renseigner votre nom";
      }else{
        console.log("Administration : Nom ok");
      };

      //Test du nom => aucun chiffre ou charactère spécial permis
      if(checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true || formPrenom == ""){
        checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre prénom";
      }else{
        console.log("Administration : Prénom ok");
      };

      //Test du mail selon le regex de la source L256
      if(checkMail.test(formMail) == false){
        checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre email";
      }else{
        console.log("Administration : Adresse mail ok");
      };

      //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
      if(checkSpecialCharacter.test(formAdresse) == true || formAdresse == ""){
        checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre adresse";
      }else{
        console.log("Administration : Adresse ok");
      };

      //Test du complément d'adresse => le complement peut être vide mais n'a pas de characteres spéciaux
      if(checkSpecialCharacter.test(formAdresseComp) == true){
        checkMessage = checkMessage + "\n" + "Vérifier votre complément d'adresse";
      }else{
        console.log("Administration : Adresse ok");
      };
      
      //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
      if(checkSpecialCharacter.test(formVille) == true && checkNumber.test(formVille) == true || formVille == ""){
        checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre ville"
      }else{
        console.log("Administration : Ville ok")
      };

      //Si un des champs n'est pas bon => message d'alert avec la raison
      if(checkMessage != ""){
        alert("Il est nécessaire de :" + "\n" + checkMessage);
        return null
      }

      //Si tout est ok construction de l'objet contact => a revoir
      else{
        let contact = {
          firstName : formNom,
          lastName : formPrenom,
          address : formAdresse,
          city : formVille,
          email : formMail
        };        
        //push des coordonnés dans le localStorage
        userCoord.length = 0;
        userCoord.push({contact}); 
        localStorage.setItem("userCoord", JSON.stringify(userCoord));
        fetch('http://localhost:3000/api/teddies/order/', {
        method: "POST",
        body: JSON.stringify(products, contact),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json));
        return contact;
      };
  };

// utiliser la methode POST pour envoyer le array contact et le array products avec le product_:id
//utiliser les console.log pour décomposer les erreurs
// faire les fonctions puis les integrer dans la boucle forEach