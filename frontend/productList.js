fetch("http://localhost:3000/api/teddies/")
  .then(response => response.json())
  .then (items =>{
    console.log(items);
    let main = document.getElementById("main");
    if(items.length > 0 ){
      document.getElementById("error").style.display = 'none';
    }
    items.forEach(item =>{
      let itemHtml = `<div class="card w-75 h-75 my-4 pt-5 mx-auto">
                          <div>
                            <img src="${item.imageUrl}" class="card-img-top  mx-auto d-block" alt="image du produit">
                          </div>
                          <div class="card-body">
                            <h2>${item.name}</h2>
                            <p>${item.price/100} euros</p>
                            <a href="product.html?id=${item._id}" class="btn btn-outline-danger">Voir les détails du produit</a>
                          </div>
                        </div>` // alt + 96 pour ``
    });
  })
