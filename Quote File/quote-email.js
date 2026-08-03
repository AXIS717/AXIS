    const date = document.getElementById("date");
    date.min = new Date().toISOString().split("T")[0];

document.getElementById("request").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const customer = Object.fromEntries(formData);

    const features = [...document.querySelectorAll('input[name="features"]:checked')]
    .map(features => features.value)
    .join(", ");

    const service = document.querySelector('input[name="service"]:checked').value;

    const style = document.querySelector('input[name="style"]:checked').value;

    const budget = document.querySelector('input[name="budget"]:checked').value;

    const dateInput = document.getElementById("date").value;

    const contact = document.querySelector('input[name="contact"]:checked').value;

    const quoteId = `AXIS-${Date.now()}-${crypto.randomUUID().slice(0,8)}`;

    emailjs.send("service_w6th717", "template_apm9dqp", {
        customer_name: customer["full-name"],
        customer_email: customer["email"],
        customer_number: customer["cell-number"],
        customer_business: customer["business"],
        service_description: customer["project-details"],
        web_features: features,
        service_type: service,
        style_type: style,
        budget_type: budget,
        launch_date: dateInput,
        contact_method: contact,
        quote_id: quoteId
    })
        .then(function () {
            return emailjs.send("service_w6th717", "template_myukipq", {
                customer_name: customer["full-name"],
                customer_email: customer["email"],
                quote_id: quoteId
            });
    
            
        })

        .then(function () {
    
            try {
    
                alert("Quote sent successfully! Check Out For a Email");

                let form = document.getElementById("request");

    
                if (form) {
                    form.reset();
                }
    
            }

            catch (err) {
    
                console.error("Error inside then:", err);

            }

        })
    
    
        .catch(function (error) {
            console.error('Failed ...', error);
            alert("Failed to send quote. Please Try again");

        });
});

console.log("Quote form working");