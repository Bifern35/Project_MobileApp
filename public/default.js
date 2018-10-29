getHomeData();
document.addEventListener('prechange', function (event) {
    if (event.index == 0) {
        console.log('Home clicked');
        // get data for home screen  
        getHomeData();
    } else if (event.index == 1) {
        console.log('Product clicked');
        // get data for product screen  
        var name1 = localStorage.getItem('name');
        console.log("test" + name1)
        // get data for all product screen  
        if (name1 == null) {
            console.log(name1)
            getProductData(name1);
        }
        else {
            getProductData(name1)
        }
        localStorage.clear();
    } else if (event.index == 2) {
        console.log('Cart clicked');
        // get data for cart screen  
        getCartData();
    }
});
function changeTab(name) {
    localStorage.setItem('name', name);
    document.getElementById('tabbar').setActiveTab(1);
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
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function getProductData(name1) {
    //Get all product firebase
    if (name1 == null) {
        var apr = db.collection("PRODUCTS")
        apr.get().then(function (querySnapshot) {

            var product_template = $('#product_template').html();
            console.log(querySnapshot);
            var html = ejs.render(product_template, { products: querySnapshot.docs });
            $('#products').html(html);
        })
    }
    else {
        var apr = db.collection("PRODUCTS").where("category", "==", name1);//.where("category", "==", "sport"); //เลือกเฉพาะ
        apr.get().then(function (querySnapshot) {
            var product_template = $('#product_template').html();
            console.log(querySnapshot);
            var html = ejs.render(product_template, { products: querySnapshot.docs });
            $('#products').html(html);
        })
    }
}
function getCartData() {
    var docRef = db.collection("UI").doc("cart");
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var data = doc.data();
            $('#appname').html(data.appname);
            var cart_template = $('#cart_template').html();
            var html = ejs.render(cart_template, { cart: data.cart });
            $('#carts').html(html);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

