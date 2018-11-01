getHomeData();
total();
document.addEventListener('prechange', function (event) {
    if (event.index == 0) {
        console.log('Home clicked');
        getHomeData();
    } else if (event.index == 1) {
        console.log('Product clicked');  
        var namep = localStorage.getItem('name');
        var products = localStorage.getItem('products');
        console.log(namep)
        console.log(products); 
        if (namep == null && products == null) {
            getProductData();
        }
        else if (namep != null && products == null) {
            getProductData(namep)
        } else {}
            localStorage.clear();
        
    } else if (event.index == 2) {
        console.log('Cart clicked');
        getcart();
    }
});
function changeTab(name) {
    localStorage.setItem('name', name);
    document.getElementById('tabbar').setActiveTab(1);
}
function gotocart(){
    document.getElementById('tabbar').setActiveTab(2);
}
function getHomeData() {
    var docRef = db.collection("UI").doc("home");
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var data = doc.data();
            $('#appname').html(data.appname);
            var style = "background: url('" + data.slides[0] + "') no-repeat center; background-size: contain;'";
            $('#carousel1').attr('style', style)
            var style = "background: url('" + data.slides[1] + "') no-repeat center; background-size: contain;'";
            $('#carousel2').attr('style', style)
            var style = "background: url('" + data.slides[2] + "') no-repeat center; background-size: contain;'";
            $('#carousel3').attr('style', style)
            var icon_template = $('#icon_template').html();
            var html = ejs.render(icon_template, { categories: data.categories });
            $('#icons').html(html);
        } else {
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function getProductData(namep) {
    if (namep == null) {
        var apr = db.collection("PRODUCTS")
        apr.get().then(function (querySnapshot) {
            var product_template = $('#product_template').html();
            console.log(querySnapshot);
            var html = ejs.render(product_template, { products: querySnapshot.docs });
            $('#products').html(html);
        })
    }
    else {
        var apr = db.collection("PRODUCTS").where("category", "==", namep);//.where("category", "==", "sport"); //เลือกเฉพาะ
        apr.get().then(function (querySnapshot) {
            var product_template = $('#product_template').html();
            console.log(querySnapshot);
            var html = ejs.render(product_template, { products: querySnapshot.docs });
            $('#products').html(html);
        })
    }
}

function getDetail(detail) {
    localStorage.setItem("detail", detail)
    showDetailP();
    myNavigator.pushPage('detail.html');

}

function showDetailP() {
    var dataproduct = localStorage.getItem('detail');
    var apr = db.collection("PRODUCTS").where("name", "==", dataproduct);
    apr.get().then(function (querySnapshot) {
        var Detailproduct_template = $('#productDetail_template').html();
        var html = ejs.render(Detailproduct_template, { productDetail: querySnapshot.docs });
        $('#showDetail').html(html);
    })

}

var incarts = [];
function addtocart(add2cart) {
    localStorage.clear('quentinTarantino');
    localStorage.setItem('quentinTarantino', add2cart);
    var retrievedData = localStorage.getItem("quentinTarantino");
    console.log(retrievedData);
    incarts.push(retrievedData);
    alert(incarts);
}

function getcart() {
    console.log('functioncart');
    console.log(incarts);
    document.getElementById('cart').innerHTML = '';
    incarts.forEach(function (incarts) {
        var apr = db.collection("PRODUCTS").where("name", "==", incarts);
        apr.get().then(function (querySnapshot) {
            console.log(querySnapshot.docs)
            var cart_template = $('#cart_template').html();
            var html = ejs.render(cart_template, { carts: querySnapshot.docs });
            $('#cart').append(html);

        })

    })
}

function search(search) {
    const filterItems = (needle, heystack) => {
        let query = needle.toLowerCase();
        return heystack.filter(product => product.data().name.toLowerCase().indexOf(needle) >= 0);
    }
    console.log(filterItems(search, data));
    var product = filterItems(search, data);
    localStorage.setItem('products', product);
    console.log(product);
    showSearch(product);
    document.getElementById('tabbar').setActiveTab(1);
}

const data = [];
function total() {
    console.log(search);
    db.collection("PRODUCTS").get()
        .then(function (querySnapshot) {
            querySnapshot.docs.forEach(function(product) {
                data.push(product);
                console.log(data);
            });
        });
}

function showSearch(product) {
    console.log(product);
    var product_template = $('#product_template').html();
    var html = ejs.render(product_template, { products: product });
    $('#products').html(html);
}
