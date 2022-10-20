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
    htmlPhotographers +=`    <article>`
    htmlPhotographers +=`      <div>`
    htmlPhotographers +=`        <header>`
    htmlPhotographers +=`          <h1>${name}</h1>`
    htmlPhotographers +=`        </header>`
    htmlPhotographers +=`        <h2>${city}, ${country}</h2>`
    htmlPhotographers +=`        <h3>${tagline}</h3>`
    htmlPhotographers +=`      </div>`
    htmlPhotographers +=`      <button class="contact_button" name="Contact me" onclick="displayModal()">Contactez-moi</button>`
    htmlPhotographers +=`      <img src="assets/photographers/${portrait}" alt="">`
    htmlPhotographers +=`    </article>`
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</main>`
    htmlPhotographers +=`<nav>`
    htmlPhotographers +=`  <div class="menu">`
    htmlPhotographers +=`    <label for="sous-menu">Trier par</label>`
    htmlPhotographers +=`      <div id="selectionTri">`
    htmlPhotographers +=`        <button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Popularité <i class="fa fa-angle-down"></i></p></button>`
    htmlPhotographers +=`      </div>`
    htmlPhotographers +=`    <ul class="sous-menu" style="display: none">`
    htmlPhotographers +=`      <button id="boutonPopularite" tabindex="0"><li id="popularite"><p> Popularité <i class="fa fa-angle-up" aria-hidden="true"></i></p><li></button>`
    //htmlPhotographers +=`      <div class="espace"></div>`
    htmlPhotographers +=`      <hr>`
    htmlPhotographers +=`      <button id="boutonDate" tabindex="0"><li id="date">Date<li></button>`
    //htmlPhotographers +=`      <div class="espace"></div>`
    htmlPhotographers +=`      <hr>`
    htmlPhotographers +=`      <button id="boutonTitre" tabindex="0"><li id="titre">Titre<li></button>`
    htmlPhotographers +=`    </ul>`
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</nav>`
    htmlPhotographers +=`<section id="realisations">`
    htmlPhotographers +=`</section>`
    htmlPhotographers +=`<div class="blocliketarif" style="display: block;">`
    htmlPhotographers +=`  <div class="liketarif">`
    htmlPhotographers +=`    <div class="likes">`
    htmlPhotographers +=`      <h3 class="totalNombreLike"></h3>`
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
    htmlPhotographers +=`  <div class="contenu-lightbox">`
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</div>`
    htmlPhotographers +=`<div id="contact_modal">`
		htmlPhotographers +=`	 <div class="modal" aria-labelledby="Contact me ${name}">`
		htmlPhotographers +=`	   <header>`
    htmlPhotographers +=`      <h2>Contactez-moi</h2>`
    htmlPhotographers +=`      <img src="assets/icons/close.svg" alt="Contact Me" onclick="closeModal()">`
    htmlPhotographers +=`    </header>`
		htmlPhotographers +=`    <form id="formulaire" role=”dialog”>`
		htmlPhotographers +=`	     <div>`
    htmlPhotographers +=`        <h2>${name}</h2>`
		htmlPhotographers +=`	 	     <label for="first">Prénom</label>`
    htmlPhotographers +=`        <input type="text" id="first" name="prenom" required minlength="2" maxlength="100">`
    htmlPhotographers +=`        <p id="firstMessageErreur"></p>`
    htmlPhotographers +=`			   <label for="last">Nom</label>`
    htmlPhotographers +=`        <input type="text" id="last" name="nom" required minlength="2" maxlength="100">`
    htmlPhotographers +=`        <p id="lastMessageErreur"></p>`
		htmlPhotographers +=`			   <label for="email">Email</label>`
    htmlPhotographers +=`        <input type="text" id="email" name="email" required minlength="2" maxlength="100">`
    htmlPhotographers +=`        <p id="emailMessageErreur"></p>`
		htmlPhotographers +=`			   <label for="message">Votre message</label>`
    htmlPhotographers +=`        <textarea rows="10" cols="20" aria-multiline="true" role="textbox" id="message" name="message" required minlength="2" maxlength="200"></textarea>`
    htmlPhotographers +=`        <p id="messageMessageErreur"></p>`
		htmlPhotographers +=`		   </div>`
    htmlPhotographers +=`      <button id="envoyer" onclick="envoyerFormulaire()">Envoyer</button>`
		htmlPhotographers +=`    </form>`
		htmlPhotographers +=`	 </div>`
		htmlPhotographers +=`</div>`
    /*htmlPhotographers +=`<script src="/scripts/pages/photographer.js" type="module"></script>`
    htmlPhotographers +=`<script defer src="/scripts/utils/lightbox.js"></script>`
    htmlPhotographers +=`<script defer src="/scripts/utils/contactForm.js"></script>`*/

    // Injection du code html dans le body
    document.querySelector("#body").innerHTML = htmlPhotographers;
  }
}