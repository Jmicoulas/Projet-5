// On récupère se qu'il y a dans le localstorage ou on crée un array vide
let userPanier = localStorage.getItem("userPanier") ? JSON.parse(localStorage.getItem("userPanier")) : [];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id');
fetch("http://localhost:3000/api/teddies/" + productId)
  .then(response => response.json())
  .then (item =>{
    productInfo(item);
    productOption(item);
    addPanier(item);
  })
  .catch(error => {
    document.getElementById('main').innerHTML = "<h2>Une erreur est survenue</h2>";
  })

addPanier = (product) =>{
  //mettre au panier au click de l'utilisateur
  let inputBuy = document.getElementById("ajouterProduitPanier");
  inputBuy.addEventListener("click", () => {
  let selectedOption = document.getElementById("optionSelect").value;
  // si le user n'a pas choisi d'option -> Alerte pour qu'il en choisisse une
  if(selectedOption==""){
  alert("Veuillez selectionner votre option de personnalisation pour ajouter le produit au panier");
  }else{
    //récupération puis push du produit dans le panier et retour au localStorage
    userPanier.push({productPrice : product.price, productId : product._id, option : selectedOption});
    localStorage.setItem("userPanier", JSON.stringify(userPanier));
    alert("Vous avez ajouté ce produit dans votre panier");
  }
  });
};

productInfo = (item) => { //intégration des infos du produit 
  document.getElementById("imgProduct").setAttribute("src", item.imageUrl);
  document.getElementById("imgProduct").setAttribute("class", "img-fluid");
  document.getElementById("nameProduct").innerHTML = item.name;
  document.getElementById("descriptionProduct").innerHTML = item.description;
  document.getElementById("priceProduct").innerHTML = item.price / 100 + " euros";
};

function productOption (item){   //intégration des options du produit
  item.colors.forEach((produit) => {
    let optionProduit = document.createElement("option");
    optionProduit.textContent = produit;
    optionProduit.value = produit;
    document.getElementById("optionSelect").appendChild(optionProduit);
  });
};