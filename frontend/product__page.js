// On récupère se qu'il y a dans le localstorage ou on crée un array vide
let userPanier = localStorage.getItem("userPanier") ? JSON.parse(localStorage.getItem("userPanier")) : [];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id');
fetch("http://localhost:3000/api/teddies/" + productId)
  .then(response => response.json())
  .then (items =>{
    console.log(item); // Pour s'assurer que l'on récupère bien le bon produit choisi sur la page précédent

    //intégration des infos du produit
    document.getElementById("ImgProduct").setAttribute("src", item.imageUrl);
    document.getElementById("ImgProduct").setAttribute("class", "img-fluid");
    document.getElementById("nameProduct").innerHTML = item.name;
    document.getElementById("descriptionProduct").innerHTML = item.description;
    document.getElementById("priceProduct").innerHTML = item.price / 100 + " euros";

    //intégration des options
    items.color.forEach((produit) => {
      let optionProduit = document.createElement("option");
      optionProduit.textContent = produit;
      optionProduit.value = produit;
      document.getElementById("optionSelect").appendChild(optionProduit);
    });

    addPanier(item);

  })

  addPanier = (product) =>{
    //mettre au panier au click de l'utilisateur
    let inputBuy = document.getElementById("ajouterProduitPanier");
    inputBuy.addEventListener("click", () => {
    let selectedOption = document.getElementById("optionSelect").value;
    console.log(selectedOption);
    //récupération puis push du produit dans le panier et retour au localStorage
    userPanier.push({productId : product._id, option : selectedOption});
    localStorage.setItem("userPanier", JSON.stringify(userPanier));
    console.log("Administration : le produit a été ajouté au panier")
    alert("Vous avez ajouté ce produit dans votre panier")
    });
  };
