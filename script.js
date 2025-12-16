// This DB (as well as 3 others) have 7 keys instead of 6, so I'm using this one.
const DB_URL = "https://js-dynamic-portfolio-data-makerslab-emlyon-cdweb-8f83155c64a0cc.gitlab.io/json/patisserie.json";

// Card for section "Avantages"
function createBoonCard(info) {
    // Wireframe
    // <article class="card-base column align-center border">
    //     <h3 class="sub-heading">Boon #N</h3>
    //     <p>Boon description</p>
    // </article>

    let card = document.createElement("article");
    card.classList.add("card-base");
    card.classList.add("column");
    card.classList.add("align-center");
    card.classList.add("border");

    let title = document.createElement("h3");
    title.classList.add("sub-heading");
    title.textContent = `Avantage ${info.index}`;

    let description = document.createElement("p");
    description.textContent = info.text;

    card.appendChild(title);
    card.appendChild(description);

    return card;
}

// Card for section "Produits"
function createProductCard(info) {
    // Wireframe
    // <article class="card-base column align-center">
    //     <img src="IMAGE_URL" alt="product image">
    //     <div class="column align-left">
    //         <h3 class="bold-text">Product name</h3>
    //         <p>Product description</p>
    //     </div>
    // </article>

    let card = document.createElement("article");
    card.classList.add("card-base");
    card.classList.add("column");
    card.classList.add("align-center");

    let img = document.createElement("img")
    img.setAttribute("src", info["image-url"]);
    img.setAttribute("alt", "image");

    let content = document.createElement("div");
    content.classList.add("column");
    content.classList.add("align-left");

    let title = document.createElement("h3");
    title.classList.add("bold-text");
    title.textContent = info.nom;

    let description = document.createElement("p");
    description.textContent = info.description;

    content.appendChild(title);
    content.appendChild(description);

    card.appendChild(img);
    card.appendChild(content);

    return card;
}

// Card for section "Services"
function createServiceCard(info) {
    // Wireframe
    // <article class="card-base column align-center">
    //     <h3 class="sub-heading">Service title</h3>
    //     <p>service description</p>
    // </article>

    let card = document.createElement("article");
    card.classList.add("card-base");
    card.classList.add("column");
    card.classList.add("align-center");

    let title = document.createElement("h3");
    title.classList.add("sub-heading");
    title.textContent = info.nom;

    let description = document.createElement("p");
    description.textContent = info.description;

    card.appendChild(title);
    card.appendChild(description);

    return card;
}

// Card for section "Temoignages"
function createTestimonyCard(info) {
    // Wireframe
    // <article class="card-base column align-left border">
    //     <p>Rating: N/5</p>
    //     <p>"Comment"</p>
    //     <div class="column align-left">
    //         <h3 class="bold-text">Person Name</h3>
    //         <p>Client Type</p>
    //     </div>
    // </article>

    let card = document.createElement("article");
    card.classList.add("card-base");
    card.classList.add("column");
    card.classList.add("align-left");
    card.classList.add("border");

    let rating = document.createElement("p");
    rating.textContent = `Note: ${info.note}/5`;

    let comment = document.createElement("p");
    comment.textContent = `"${info.commentaire}"`;

    let clientInfoHolder = document.createElement("div");
    clientInfoHolder.classList.add("column");
    clientInfoHolder.classList.add("align-left");

    let clientName = document.createElement("h3");
    clientName.classList.add("bold-text");

    let clientType = document.createElement("p");
    clientType.textContent = info.typeExperience;

    clientInfoHolder.appendChild(clientName);
    clientInfoHolder.appendChild(clientType);

    card.appendChild(rating);
    card.appendChild(comment);
    card.appendChild(clientInfoHolder);

    return card;
}

// Transforms "avantagesClients" from type String[] to type Object[], with Object properties "text" and "index"
function fixClientBoonArray(boons) {
    let fixed = [];

    boons.forEach((boon, i) => {
        fixed.push({
            text: boon,
            index: i + 1,
        })
    });

    return fixed;
}

// Gets all the elements by a class and then sets their "textContent" to "content"
function setElementContent(elementClass, content) {
    let allElements = document.getElementsByClassName(elementClass);
    if (!allElements) return;

    for (let element of allElements) {
        element.textContent = content;
    }
}

// Gets the HTML container with ID, empties it, then loops over all elements and transforms them into HTML cards to add to the container
function populateContainer(containerID, elements, toCardCall) {
    let container = document.getElementById(containerID);
    if (!container) return;

    container.innerHTML = "";

    elements.forEach(e => {
        let card = toCardCall(e);
        container.appendChild(card);
    })
}

// Script "entry point"
fetch(DB_URL)
    .then(response => response.json())
    .then(data => {
        data.avantagesClients = fixClientBoonArray(data.avantagesClients);

        setElementContent("logo", data.nomCommercial);
        setElementContent("slogan", data.phraseAccroche);
        setElementContent("hero-cta", data.texteAppelAction);

        populateContainer("avantages-card-holder", data.avantagesClients, createBoonCard);
        populateContainer("produits-card-holder", data.produits, createProductCard);
        populateContainer("services-card-holder", data.services, createServiceCard);
        populateContainer("temoignages-card-holder", data.temoignages, createTestimonyCard);
    });
