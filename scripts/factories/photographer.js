// Fonction de gestion du DOM de la page index.html et photographers.html
export function photographerFactory(data) {

  var p = window.location.pathname;
  // Modification du DOM de la page index.html
  if (!p.match(/^\/?photographer.html/)) {

    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;

    // Fonction de création du DOM d'une carte d'un photographe
    function getUserCardDOM() {
      // Création d'un élément "article"
      const article = document.createElement( 'article' );
      // Création d'un élément "a"
      const phototitre = document.createElement('a');
      // Création de l'url contenant l'id du photographe
      phototitre.href = `photographer.html?id=${id}`;
      // Injection de l'aria-label du photographe dans l'élement "a" créé précédemment
      phototitre.setAttribute("aria-label", name);
      // Création d'un élément "img"
      const img = document.createElement( 'img' );
      // Injection du lien de vers l'image du photographe dans l'élement "img" créé précédemment
      img.setAttribute("src", picture);
      // Injection du texte alternatif de l'image du photographe dans l'élement "img" créé précédemment
      img.setAttribute("alt", name);
      // Création d'un élément "h2"
      const h2 = document.createElement( 'h2' );
      // Injection du nom photographe dans l'élément "h2" créé précédemment
      h2.textContent = name;
      // Ajout de phototitre comme enfant de article
      article.appendChild(phototitre);
      // Ajout de img comme enfant de phototitre
      phototitre.appendChild(img);
      // Ajout de h2 comme enfant de phototitre
      phototitre.appendChild(h2);
      // Création d'un élément "div"
      const texte = document.createElement('div');
      // Ajout de texte comme enfant de article
      article.appendChild(texte);
      // Création d'un élément "h3"
      const villepays = document.createElement('h3');
      // Création d'un tableua pour la ville et le pays du photographe
      let a = new Array(city, country);
      // Jonction de la ville et pays avec une virgule et un espace
      let b = a.join(", ");
      // Injection de la ville et pays avec une virgule et un espace dans "villepays"
      villepays.textContent = b;
      // Ajout de "villepays" comme enfant de "texte"
      texte.appendChild(villepays);
      // Création d'un élément "h4"
      const tag = document.createElement('h4');
      // Injection de "tagline" dans "tag"
      tag.textContent = tagline;
      // Ajout de "tag" comme enfant de "texte"
      texte.appendChild(tag);
      // Création d'un élément "h5"
      const prix = document.createElement('h5');
      // Création d'un tableau pour le tarif journalier du photographe
      let c = new Array(price,"€/jour");
      // Jonction des valeurs du tableau "c"
      let d = c.join("");
      // Injection de "d" dans "textContent"
      prix.textContent = d;
      // Ajout de "prix" comme enfant de "texte" 
      texte.appendChild(prix);
      
      return (article);
    }
    return { name, picture, getUserCardDOM }
  }
  // Modification du DOM de la page photographer.html
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
    htmlPhotographers +=`        <button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Popularité <em class="fa fa-angle-down"></em></p></button>`
    htmlPhotographers +=`      </div>`
    htmlPhotographers +=`    <ul class="sous-menu" style="display: none">`
    htmlPhotographers +=`      <button id="boutonPopularite" tabindex="0"><li id="popularite"><p> Popularité <em class="fa fa-angle-up"></em></p><li></button>`
    htmlPhotographers +=`      <hr>`
    htmlPhotographers +=`      <button id="boutonDate" tabindex="0"><li id="date">Date<li></button>`
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
    htmlPhotographers +=`        <em class="fa-solid fa-heart"></em>`
    htmlPhotographers +=`      </div>`
    htmlPhotographers +=`    </div>`
    htmlPhotographers +=`    <div class="tarifJour">`
    htmlPhotographers +=`      <h3 class="tarifParJour"></h3><h3>${price} € / jour</h3>`
    htmlPhotographers +=`    </div>`
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</div>`
    htmlPhotographers +=`<div id="lightbox" class="modal-lightbox">`
    htmlPhotographers +=`  <div class="contenu-lightbox" style="display: none">`
    htmlPhotographers +=`  </div>`
    htmlPhotographers +=`</div>`
    htmlPhotographers +=`<div id="contact_modal">`
		htmlPhotographers +=`	 <div class="modal" aria-labelledby="Contact me ${name}">`
		htmlPhotographers +=`	   <header>`
    htmlPhotographers +=`      <h2>Contactez-moi</h2>`
    htmlPhotographers +=`      <button id="fermerModal" aria-label="Close Contact me" onclick="closeModal()"><img src="assets/icons/close.svg"  alt="Contact Me"></button>`
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
    htmlPhotographers +=`      <button id="envoyer" aria-label="Send">Envoyer</button>`
		htmlPhotographers +=`    </form>`
		htmlPhotographers +=`	 </div>`
		htmlPhotographers +=`</div>`

    // Injection du code html dans le body
    document.querySelector("#body").innerHTML = htmlPhotographers;
  }
}