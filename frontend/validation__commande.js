// on vide le localStorage un fois la commande validé
localStorage.clear();
let userOrder = sessionStorage.getItem("order") ? JSON.parse(sessionStorage.getItem("order")) : [];
let userTotal = sessionStorage.getItem("total") ? JSON.parse(sessionStorage.getItem("total")) : [];

document.getElementById("orderNmb").innerHTML = userOrder.orderId;
document.getElementById("orderTotal").innerHTML = userTotal;

let productOrder = userOrder.products;
productOrder.forEach(element => {
  let elementHtml = displayElement(element);
  document.getElementById("cardOrder").innerHTML += elementHtml;
});
contactInfo(userOrder);

// afficher chaque produit de la commande validé dans des balises cards
function displayElement(element) {
  let elementHtml = `<div class=" col-2 border border-danger m-2 " id="order_full">
                      <img src="${element.imageUrl}" class="img-fluid" alt="image du produit">
                      <p>${element.name}</p>
                      <p>${element.price / 100} euros</p>
                    </div>`
  return elementHtml
};

// Résumé des infos de contact de l'utlisateur
function contactInfo(userOrder) {
  let contactOrder = userOrder.contact;
  document.getElementById("lastNameOrder").innerHTML = contactOrder.lastName;
  document.getElementById("firstNameOrder").innerHTML = contactOrder.firstName;
  document.getElementById("adressOrder").innerHTML = contactOrder.address;
  document.getElementById("cityOrder").innerHTML = contactOrder.city;
  document.getElementById("emailOrder").innerHTML = contactOrder.email;
};