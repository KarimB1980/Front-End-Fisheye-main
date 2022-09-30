export function photographerFactory(data) {
//  const { name, portrait } = data;

var p = window.location.pathname;

if (p.match(/^\/?index.html/)) {
  const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
      const article = document.createElement( 'article' );
      const phototitre = document.createElement('a');
      phototitre.href = `photographer.html?id=${id}`;

      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      img.setAttribute("alt", "");
      const h2 = document.createElement( 'h2' );
      h2.textContent = name;
      article.appendChild(phototitre);
      phototitre.appendChild(img);
      phototitre.appendChild(h2);

      const texte = document.createElement('div');
      article.appendChild(texte);
      const villepays = document.createElement('h3');

      var a = new Array(city, country);
      var b = a.join(", ");

      villepays.textContent = b;
      texte.appendChild(villepays);

      const tag = document.createElement('h4');
      tag.textContent = tagline;
      texte.appendChild(tag);

      const prix = document.createElement('h5');

      var c = new Array(price, "€/jour");
      var d = c.join("");

      prix.textContent = d;
      texte.appendChild(prix);

      return (article);
    }
    return { name, picture, getUserCardDOM }
  }

    else if (p.match(/^\/?photographer.html/)) {

    const { name, portrait, city, country, tagline } = data;
    let entete = "";

    //entete += `<div class="photograph-header">`;
    entete +=   `<article>`;
    entete +=     `<div>`;
    entete +=       `<header>`;
    entete +=         `<h1>${name}</h1>`;
    entete +=       `</header>`;
    entete +=       `<h2>${city}, ${country}</h2>`;
    entete +=       `<h3>${tagline}</h3>`;
    entete +=     `</div>`;
    entete +=     `<button class="contact_button" onclick="displayModal()">Contactez-moi</button>`;
    entete +=     `<img src="assets/photographers/${portrait}" alt="">`;
    entete +=   `</article>`;
    //entete += `</div>`;

    document.querySelector(".photograph-header").innerHTML = entete;
  }
}

