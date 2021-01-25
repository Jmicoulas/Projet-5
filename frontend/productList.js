// fetch de l'API du produit souhaité, les ourson en peluche dans le cas présents
fetch("http://localhost:3000/api/teddies/")
  .then(response => response.json())
  .then (items =>{
    console.log(items);
    let main = document.getElementById("main");
    if(items.length > 0 ){
      document.getElementById("error").style.display = 'none';
    }
    items.forEach(item =>{
      let itemHtml = displayElement(item);
    main.innerHTML += itemHtml; // penser à l'afficher dans le main
    });

  })
  // afficher chaque produit dans des balises cards
  function displayElement (item) {
    let itemHtml = `<div class="card w-50 h-75 my-4 pt-5 mx-auto">
                          <div>
                            <img src="${item.imageUrl}" class="card-img-top mx-auto d-block" alt="image du produit">
                          </div>
                          <div class="card-body">
                            <h2>${item.name}</h2>
                            <p>${item.price/100} euros</p>
                            <a href="product__page.html?id=${item._id}" class="btn btn-outline-danger">Voir les détails du produit</a>
                          </div>
                      </div>`
                      return itemHtml;
  }

