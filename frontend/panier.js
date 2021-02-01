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

//fetch des données nécessaires
userPanier.forEach((produit,index)=>{
  fetch("http://localhost:3000/api/teddies/" + produit.productId) // le productId n'est récup que ligne 6
    .then(response => response.json())
    .then (teddie =>{
      teddie.option = produit.option;
      produit.price = teddie.price; 
      tableCreator(teddie, index);
    })
    .catch(error =>{//Si le panier est vide 
      console.log('erreur');
      document.getElementById("main").innerHTML ='<p>Votre panier est vide pour le moment.</p>';
      document.getElementById("main").style.textAlign = "center";
      document.getElementById("main").style.fontSize = "2rem";
    });
  });      
  sumTable(userPanier);
  clearPanier();

  // Validation de la commande
  let inputValidation = document.getElementById("validationBtn");
  if (inputValidation){ // check si le bouton de validation est bien présent et donc ne renvoi pas null
    inputValidation.addEventListener("click", () =>{
      let isOkay = checkInput();
      if (isOkay){
        let contact = {
          firstName : formNom,
          lastName : formPrenom,
          address : formAdresse,
          city : formVille,
          email : formMail
        };       
        //push des coordonnés dans le localStorage
        fetch('http://localhost:3000/api/teddies/order/', {
        method: "POST",
        body: JSON.stringify({products, contact}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json =>{
          sessionStorage.setItem('order',JSON.stringify(json));
          window.location.replace("validation__commande.html");
        });
      } 
    });
  }

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

//vérifie les inputs du formulaire
function checkInput  (){
  
  //Controle Regex
  let checkString = /[a-zA-Z]/;
  let checkNumber = /[0-9]/;

  //Source pour vérification email => emailregex.com
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

  formNom = document.getElementById("inputLastName").value;
  formPrenom = document.getElementById("inputFirstName").value;
  formMail = document.getElementById("inputMail").value;
  formAdresse = document.getElementById("inputAdress").value;
  formAdresseComp = document.getElementById("inputAdressComp").value;
  formVille = document.getElementById("inputCity").value;

  //message fin de controle
  let checkMessage = "";

    //tests des différents input du formulaire
      //Test du nom => aucun chiffre ou charactère spécial permis
      if(checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true){
        checkMessage = "Nom de famille invalide, vérifier votre nom de famille";
      }else if(formNom == ""){
        checkMessage = "Renseigner votre nom de famille afin de valider la commande";
      }
      else{
        console.log("Administration : Nom ok");
      };

      //Test du prenom => aucun chiffre ou charactère spécial permis
      if(checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true){
        checkMessage = checkMessage + "\n" + "Prénom invalide, vérifier votre prénom";
      }else if(formPrenom == ""){
        checkMessage = checkMessage + "\n" + "Renseigner votre prénom afin de valider la commande";
      }
      else{
        console.log("Admin : Prénom ok");
      };

      //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
      if(checkSpecialCharacter.test(formAdresse) == true){
        checkMessage = checkMessage + "\n" + "adresse invalide, vérifier votre adresse";
      }else if(formAdresse ==""){
        checkMessage = checkMessage + "\n" + "Renseigner votre adresse afin de valider la commande";
      }else{
        console.log("Admin : Adresse ok");
      };

      //Test du complément d'adresse => le complement peut être vide mais n'a pas de characteres spéciaux
      if (formAdresseComp ==""){
      }else{
        console.log("Admin : Complément d'adresse ok");
      };
      
      //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
      if(checkSpecialCharacter.test(formVille) == true || checkNumber.test(formVille) == true){
        checkMessage = checkMessage + "\n" + "Ville invalide, vérifier votre ville"
      }else if(formVille == ""){
        checkMessage += "\n" + "Renseigner votre ville afin de valider la commande"       
      }else{
        console.log("Admin : Ville ok")
      };

      //Test du mail selon le regex de la source L256
      
      if(formMail ==""){
        checkMessage = checkMessage + "\n" + "Renseigner votre adresse mail afin de valider la commande";
      }else if(checkMail.test(formMail) == false){
        checkMessage = checkMessage + "\n" + "Adresse mail invalide, vérifier votre adresse mail";
      }else{
        console.log("Admin: Adresse mail ok");
      };

      //Si un des champs n'est pas bon => message d'alert avec la raison
      if(checkMessage != ""){
        alert("Attention :" + "\n" + checkMessage);
        return null
      }

      //Si tout est ok construction de l'objet contact => a revoir
      else{
        return true;
      };
  };