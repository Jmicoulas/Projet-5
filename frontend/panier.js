//récupération du userPanier dans le localStorage
let userPanier = localStorage.getItem("userPanier") ? JSON.parse(localStorage.getItem("userPanier")) : [];

//déclaration du array product pour le fetch POST
let products = [];
userPanier.forEach (produit => {
  products.push(produit.productId);
});

//déclaration des variables pour contact
let formNom;
let formPrenom;
let formMail;
let formAdresse;
let formAdresseComp;
let formVille;

let contact = {
  firstName: formNom,
  lastName: formPrenom,
  address: formAdresse,
  city: formVille,
  email: formMail
};

//Controle Regex
let checkString = /[a-zA-Z]/;
let checkNumber = /[0-9]/;

//Source pour vérification email => emailregex.com
let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

//message fin de controle
let checkMessage = "";

//fetch des données nécessaires
if(userPanier.length > 0){
userPanier.forEach((produit,index)=>{
  fetch("http://localhost:3000/api/teddies/" + produit.productId) // le productId n'est récup que ligne 6
    
    .then(response => response.json())
    .then (teddie =>{
      teddie.option = produit.option;
      produit.price = teddie.price; 
      tableCreator(teddie, index);})
    });  
  sumTable(userPanier);
  clearPanier();
  }else{
    errorBasket();
  };
let inputValidation = document.getElementById("validationBtn");
if (inputValidation) { // check si le bouton de validation est bien présent et donc ne renvoie pas null
  inputValidation.addEventListener("click", () => {
    checkInput();
    if (checkMessage != "") {
      alert("Attention :" + "\n" + checkMessage);
      return null
    }
    else {
      validationBasket(contact);
    };
  });
};

// creation du tableau pour chaque element du userPanier
function tableCreator (element, index) {
  
  document.getElementById("basket_tablebody").innerHTML += "<tr id='basketProduct"+index+"'></tr>";
  document.getElementById("basketProduct"+index).innerHTML += "<td>"+ element.name +"</td>";
  document.getElementById("basketProduct"+index).innerHTML += "<td>"+ element.option +"</td>";
  document.getElementById("basketProduct"+index).innerHTML += "<td>"+ element.price/100+"€</td>";// += pour rajouter
};

// creation de la colonne Total
function sumTable (panier) {
  let total = 0;
  panier.forEach(element => {
    total = element.productPrice + total;
  });
  total = total /100;
  sessionStorage.setItem('total',total);
  document.getElementById("basket_footer").innerHTML += '<td colspan="3"> Total de la commande : '+total+'€</td>';
  // le retour null de la fonction était du à la position au départ du script dans le HTML
};

// creation d'un bouton pour vider le userPanier et refresh
function clearPanier (){
  //mettre au panier au click de l'utilisateur
  let inputClear = document.getElementById("facture");
  inputClear.innerHTML += '<div class="btn btn-primary mx-5 my-3" id="clear_basket">Vider votre panier</div>';
  document.getElementById("clear_basket").addEventListener("click", () => {
  localStorage.clear();
  document.location.reload(true);
  });
};

//Test du nom => aucun chiffre ou charactère spécial permis
function checkLastName (){
  formNom = document.getElementById("inputLastName").value;

    if(checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true){
       checkMessage += "\n" + "Nom de famille invalide, vérifier votre nom de famille";
    }else if(formNom == ""){
      checkMessage += "\n" + "Renseigner votre nom de famille afin de valider la commande";
    }
};

//Test du prenom => aucun chiffre ou charactère spécial permis
function checkFirstName (){
  formPrenom = document.getElementById("inputFirstName").value;
  if (checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true) {
    checkMessage += "\n" + "Prénom invalide, vérifier votre prénom";
  } else if (formPrenom == "") {
    checkMessage += "\n" + "Renseigner votre prénom afin de valider la commande";
  }
};

//Test du mail selon le regex de la source L256
function checkEmail (){
  formMail = document.getElementById("inputMail").value;
  if (formMail == "") {
    checkMessage += "\n" + "Renseigner votre adresse mail afin de valider la commande";
  } else if (checkMail.test(formMail) == false) {
    checkMessage += "\n" + "Adresse mail invalide, vérifier votre adresse mail";
  }
};

//Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
function checkAdress(){  
  formAdresse = document.getElementById("inputAdress").value;
  if (checkSpecialCharacter.test(formAdresse) == true) {
    checkMessage += "\n" + "adresse invalide, vérifier votre adresse";
  } else if (formAdresse == "") {
    checkMessage += "\n" + "Renseigner votre adresse afin de valider la commande";
  }
};

//Test du complément d'adresse => le complement peut être vide mais n'a pas de characteres spéciaux
function checkCompAdress(){
  formAdresseComp = document.getElementById("inputAdressComp").value;
  if (checkSpecialCharacter.test(formAdresseComp) == true){
    checkMessage += "\n" + "Complément d'adresse invalide, vérifier votre complément d'adresse" 
  }
};

//Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
function checkCity (){
  formVille = document.getElementById("inputCity").value;
  if (checkSpecialCharacter.test(formVille) == true || checkNumber.test(formVille) == true) {
    checkMessage += "\n" + "Ville invalide, vérifier votre ville"
  } else if (formVille == "") {
    checkMessage += "\n" + "Renseigner votre ville afin de valider la commande"
  }
};

//vérifie si tout les formulaires passent leurs tests
function checkInput(){
  checkLastName();
  checkFirstName();
  checkEmail();
  checkAdress();
  checkCompAdress();
  checkCity();
};

// Validation et fetch de la commande
function validationBasket(contact) {
  fetch('http://localhost:3000/api/teddies/order/', {
    method: "POST",
    body: JSON.stringify({ products, contact }),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then(response => response.json())
    .then(json => {
      sessionStorage.setItem('order', JSON.stringify(json));
      window.location.replace("validation__commande.html");
    });
};

// Si le panier est vide
function errorBasket (){
  document.getElementById("main").innerHTML ='<p>Votre panier est vide pour le moment.</p>';
  document.getElementById("main").style.textAlign = "center";
  document.getElementById("main").style.fontSize = "2rem";
};