localStorage.clear();
let userOrder = sessionStorage.getItem("order") ? JSON.parse(sessionStorage.getItem("order")) : [];
let userTotal = sessionStorage.getItem("total") ? JSON.parse(sessionStorage.getItem("total")) : [];
console.log(userOrder);
console.log("Admin : Total = " +userTotal+ "€");

document.getElementById("orderNmb").innerHTML = userOrder.orderId;
document.getElementById("orderTotal").innerHTML = userTotal;

let productOrder = userOrder.products;
if (productOrder.length > 0){
document.getElementById("error").style.display = "none";
productOrder.forEach(element =>{
    let elementHtml = displayElement(element);
    document.getElementById("cardOrder").innerHTML += elementHtml;
  });

// afficher chaque produit de la commande validé dans des balises cards
function displayElement (element) {
  let elementHtml = `<div class="card" id="card__Confirm">
                        <div>
                          <img src="${element.imageUrl}" class="card-img-top" alt="image du produit">
                        </div>
                        <div class="card-body">
                          <h2>${element.name}</h2>
                          <p>${element.price/100} euros</p>
                        </div>
                    </div>`
                    return elementHtml}
}

let contactOrder = userOrder.contact;
document.getElementById("lastNameOrder").innerHTML = contactOrder.lastName;
document.getElementById("firstNameOrder").innerHTML = contactOrder.firstName;
document.getElementById("adressOrder").innerHTML = contactOrder.address;
document.getElementById("cityOrder").innerHTML = contactOrder.city;
document.getElementById("emailOrder").innerHTML = contactOrder.email;

//preparer sur excel le plan de test unitaire
