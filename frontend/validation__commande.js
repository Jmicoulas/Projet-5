fetch('http://localhost:3000/api/teddies/order/', {
        method: "POST",
        body: JSON.stringify(products, contact),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json));


