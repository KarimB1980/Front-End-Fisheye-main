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

    const { name, portrait, city, country, tagline, price } = data;

    let htmlPhotographers = "";

    htmlPhotographers +=`<header>`
    htmlPhotographers +=`  <a href="index.html"><img src="assets/images/logo.png" class="logo" alt="Fisheye Home page"></a>`
    htmlPhotographers +=`</header>`
    htmlPhotographers +=`<main id="main">`
    htmlPhotographers +=`  <div class="photograph-header">`
    htmlPhotographers +=`    <article>`;
    htmlPhotographers +=`      <div>`;
    htmlPhotographers +=`        <header>`;
    htmlPhotographers +=`          <h1>${name}</h1>`;
    htmlPhotographers +=`        </header>`;
    htmlPhotographers +=`        <h2>${city}, ${country}</h2>`;
    htmlPhotographers +=`        <h3>${tagline}</h3>`;
    htmlPhotographers +=`      </div>`;
    htmlPhotographers +=`      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>`;
    htmlPhotographers +=`      <img src="assets/photographers/${portrait}" alt="">`;
    htmlPhotographers +=`    </article>`;
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</main>`
    htmlPhotographers +=`<nav>`
    htmlPhotographers +=`  <div class="menu">`
    htmlPhotographers +=`    <label for="sous-menu">Trier par</label>`
    htmlPhotographers +=`    <ul class="sous-menu" tabindex="0">`
    htmlPhotographers +=`      <li tabindex="0" id="popularite"><p> Popularité <i class="fa fa-angle-up" aria-hidden="true"></i></p><li>`
    htmlPhotographers +=`      <div class="espace"></div>`
    htmlPhotographers +=`      <li tabindex="0" id="date">Date<li>`
    htmlPhotographers +=`      <div class="espace"></div>`
    htmlPhotographers +=`      <li tabindex="0" id="titre">Titre<li>`
    htmlPhotographers +=`    </ul>`
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</nav>`
    htmlPhotographers +=`<section id="realisations">`
    htmlPhotographers +=`</section>`
    htmlPhotographers +=`<div class="blocliketarif" style="display: block;">`
    htmlPhotographers +=`  <div class="liketarif">`
    htmlPhotographers +=`    <div class="likes">`
    htmlPhotographers +=`      <h3 class="nombreLike"></h3>`
    htmlPhotographers +=`      <div class="coeur" aria-label="likes">`
    htmlPhotographers +=`        <i class="fa-solid fa-heart"></i>`
    htmlPhotographers +=`      </div>`
    htmlPhotographers +=`    </div>`
    htmlPhotographers +=`    <div class="tarifJour">`
    htmlPhotographers +=`      <h3 class="tarifParJour"></h3><h3>${price} € / jour</h3>`
    htmlPhotographers +=`    </div>`
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</div>`
    htmlPhotographers +=`<div id="lightbox" class="modal-lightbox">`
    htmlPhotographers +=` <div class="contenu-lightbox">`
    htmlPhotographers +=` </div>`
    htmlPhotographers +=`</div>`
    htmlPhotographers +=`<div id="contact_modal">`
		htmlPhotographers +=`	<div class="modal">`
		htmlPhotographers +=`		<header>`
    htmlPhotographers +=`      <h2>Contactez-moi</h2>`
    htmlPhotographers +=`      <img src="assets/icons/close.svg" alt="Contact Me" onclick="closeModal()">`
    htmlPhotographers +=`    </header>`
		htmlPhotographers +=`		<form>`
		htmlPhotographers +=`			<div>`
		htmlPhotographers +=`				<label for="prenom">Prénom</label>`
    htmlPhotographers +=`       <input type="text" id="prenom" name="prenom" required minlength="2" maxlength="100">`
    htmlPhotographers +=`				<label for="nom">Nom</label>`
    htmlPhotographers +=`       <input type="text" id="nom" name="nom" required minlength="2" maxlength="100">`
		htmlPhotographers +=`				<label for="email">Email</label>`
    htmlPhotographers +=`       <input type="text" id="email" name="email" required minlength="2" maxlength="100">`
		htmlPhotographers +=`				<label for="message">Votre message</label>`
    htmlPhotographers +=`       <input type="text" id="message" name="message" required minlength="2" maxlength="100">`
		htmlPhotographers +=`			</div>`
    htmlPhotographers +=`      <button class="contact_button">Envoyer</button>`
		htmlPhotographers +=`		</form>`
		htmlPhotographers +=`	</div>`
		htmlPhotographers +=`</div>`
    htmlPhotographers +=`<script src="/scripts/pages/photographer.js" type="module"></script>`
    htmlPhotographers +=`<script src="/scripts/utils/lightbox.js"></script>`
    htmlPhotographers +=`<script src="/scripts/utils/contactForm.js"></script>`

    // Injection du code html dans le body
    document.querySelector("#body").innerHTML = htmlPhotographers;
  }
}