let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let temp;

//////////// get total ////////////
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#8a9163';
    } else {
        total.innerHTML = '';
        total.style.background = "#transparent";
    }

}


/////////// create product ////////////
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        discount: +discount.value,
        total: +total.innerHTML,
        count: +count.value,
        category: category.value,
    }

    if (mood === "create") 
    {
        /////////// count ///////////
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) 
            {
                datapro.push(newPro);
            }

        } else 
        {
            datapro.push(newPro);
        }
    }else{
        datapro[temp] = newPro;
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display ="block";
    }




    // save products in local storage
    localStorage.product = JSON.stringify(datapro);

    clearData();
    displayProducts();


}




//////////// clear inputs ///////////
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}

////////// read (displaying the products) ///////////
function displayProducts() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += ` <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updataProduct(${i})" id= "update">update</button></td>
    <td><button onclick="deleteProduct(${i})" id="delete" >delete</button></td>
</tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    getTotal();



    let deleteAll = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        deleteAll.innerHTML = `<button onclick='deletAll()'>Delete All (${datapro.length})</button>`
    }
    else {
        deleteAll.innerHTML = '';
    }
   
    
}
displayProducts();


/////////// delete ///////////
function deleteProduct(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    displayProducts();
}
/////////// delete All ///////////
function deletAll() {
    localStorage.clear();
    datapro.splice(0);
    displayProducts();
}



// update product
function updataProduct(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
    
}
// search
// Clean data 
