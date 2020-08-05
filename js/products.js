/*Génération de l'URL de l'API*/

const produitSell = "furniture"  //Au choix entre : "cameras" - "furniture" - "teddies"
const url = "http://localhost:3000/api/" + produitSell + "/";

let main=document.getElementById('main');

/*Céation de la liste des produits*/
fetch(url).then(function(response){
    response.json().then(function(data){
      data.forEach(element=>{
        main.innerHTML+='<div class="row"><div class="col sm-12"><div class="card my-2 p-2"><img class="card-img-top img-fluid" src="'+element.imageUrl+'" alt="Card image cap"<div class="card-body"><h5 class="card-title">'+element.name+'</h5><p class="card-text">'+element.price+'€</p><a href="article.html" class="btn btn-primary stretched-link">Voir les détails du produit</a></div></div></div></div>';

      })
    })
  })
