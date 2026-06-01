document.getElementById("orderForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const formData = new FormData(this);
    const customer = Object.fromEntries(formData);

    const itemsList = cart.map(item => `${item.product} | Size: ${item.size} | R${item.price}`).join("\n");

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = 250;
    const total = subtotal + shipping;
    const orderId = "#AXIS ORD-" + Math.floor(Math.random() * 1000) + "-" + Date.now();

    

    emailjs.send("service_wlxbcf7", "template_in3x94n", {
        customer_name: customer.name,
        cunstomer_email: customer.email,
        phone: customer.phone,
        zipcode: customer.zipcode,
        town: customer.town,
        addres: customer.addres,
        order_items: itemsList,
        subtotal: subtotal,
        total_price: total,
        order_id: orderId
    })

    .then(function() {
        return emailjs.send("service_wlxbcf7", "template_mbq0iuh", {
            customer_name: customer.name,
            customer_email: customer.email,
            zipcode: customer.zipcode,
            town: customer.town,
            addres: customer.addres,
            order_items: itemsList,
            subtotal: subtotal,
            total_price: total,
            order_id: orderId
        });
    })

    .then(function() {
    try {
        alert("Order sent successfully! Check Out For a Email");

        cart = [];
        localStorage.removeItem("cart");

        if (typeof updateCartCounter === "function") {
            updateCartCounter();
        }

        if (typeof displayCart === "function") {
            displayCart();
        }

        let form = document.getElementById("orderForm");
        if (form) {
            form.reset();
        }

        setTimeout(function() {
            location.reload(); 
        }, 2000);

    } catch (err) {
        console.error("Error inside then:", err);
    }
})
.catch(function(error) {
    console.error('Failed ...', error);
    alert("Failed to send order. Please Try again");
});

});

console.log("Email sender working");
