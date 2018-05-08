const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

let container = document.getElementsByClassName("flex-container justify")[0];
pain(container);

function pain(container) {
    for (var i = 0; i < 4; i++) {
        let item;
        item = document.createElement("div");
        item.className = "item";
        let h2, h2_node;
        h2 = document.createElement("h2");
        h2_node = document.createTextNode(countries[i].name);
        h2.appendChild(h2_node);
        item.appendChild(h2);
        let p, p_node;
        p = document.createElement("p");
        p_node = document.createTextNode(countries[i].continent);
        p.appendChild(p_node);
        item.appendChild(p);
        let inner_box;
        inner_box = document.createElement("div");
        inner_box.className = "inner-box";
        let h3, h3_node;
        h3 = document.createElement("h3");
        h3_node = document.createTextNode("City");
        h3.appendChild(h3_node);
        inner_box.appendChild(h3);
        inner_box.appendChild(city(countries[i].cities));
        item.appendChild(inner_box);
        inner_box = document.createElement("div");
        inner_box.className = "inner-box";
        h3 = document.createElement("h3");
        h3_node = document.createTextNode("Popular Photos");
        h3.appendChild(h3_node);
        inner_box.appendChild(h3);
        inner_box.appendChild(photo(countries[i].photos));
        item.appendChild(inner_box);
        let button, button_node;
        button = document.createElement("button");
        button_node = document.createTextNode("Visit");
        button.appendChild(button_node);
        item.appendChild(button);
        container.appendChild(item);
    }
}

function city(cities) {
    let ul = document.createElement("ul");
    let li, li_node;
    for (var i = 0; i < cities.length; i++) {
        li = document.createElement("li");
        li_node = document.createTextNode(cities[i]);
        li.appendChild(li_node);
        ul.appendChild(li);
    }
    return ul;
}
function photo(photos) {
    let photo = document.createElement("div");
    let img;
    for (var i = 0; i < photos.length; i++) {
        img = document.createElement("img");
        img.src = "images/" + photos[i];
        img.alt = photos[i];
        img.className = "photo";
        photo.appendChild(img);
    }
    return photo;
}