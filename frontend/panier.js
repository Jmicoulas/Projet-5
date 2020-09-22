

let userPanier = localStorage.getItem("userPanier") ? JSON.parse(localStorage.getItem("userPanier")) : [];

if (userPanier.length > 0){
userPanier.forEach((produit)=>{
  console.log(produit)
  fetch("http://localhost:3000/api/teddies/" + productId) // le productId n'est récup que ligne 6
    .then(response => response.json())
    .then (product =>{
      
    arrayCreator() =>{
      let tableRow = document.createElement("<tr></tr>");
      
      //document.getElementById("basket_table").innerHTML = "<tr id='basketProduct'></tr>"
      //document.getElementById("basketProduct").innerHTML = ""
    }
    })
  };
};
// faire les fonctions puis les integrer dans la boucle forEach