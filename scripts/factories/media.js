// Fonction d'affichage des medias du photographe sélectionné
export function mediaFactory() {
  var p = window.location.pathname;

  let donnees = JSON.parse(localStorage.getItem("photographersMedia"));

  if (p.match(/^\/?photographer.html/)) {
    // Récupération de l'ID dans l'url
    let urlcourante = document.location.href;
    let url = new URL(urlcourante);
    let id = url.searchParams.get("id");
    const medias = donnees.media;

    let totalLikePhotos = [];
    let mediaPhotographer = [];

    for (let i = 0; i < medias.length; i++) {
      // Calcul de la somme des likes et création d'un tableau "mediaPhotographer" contenant les réalisations du photographe
      if (medias[i].photographerId == id) {

        // Calcul de la somme des like et injection du résultat dans le DOM
        totalLikePhotos.push(medias[i].likes);
        const reducers = (accumulator, currentValue) => accumulator + currentValue;
        let totalLike = totalLikePhotos.reduce(reducers);

        document.querySelector('.totalNombreLike').innerHTML = totalLike;

        let donneesmediaphotographer = {
          title: medias[i].title,
          likes: medias[i].likes,
          date: medias[i].date,
          video: medias[i].video,
          image: medias[i].image
        }
        mediaPhotographer.push(donneesmediaphotographer);
      }
    }

    // Tri des medias par popularité des réalisations du photographe (ordre décroissant de likes)
    mediaPhotographer.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    let listeMediaPopularite = '';
    let mediaLightBoxPopularite = '';

    for (let i = 0; i < mediaPhotographer.length; i++) {
      // Affichage des réalisations du photographe et création du contenu de la lightbox
      listeMediaPopularite +=   '<article>'

      if (mediaPhotographer[i].video) {
        listeMediaPopularite +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})"><video><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video></button>`
      }
      if (mediaPhotographer[i].image) {
        listeMediaPopularite +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true"><img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view"></button>`
      }
      listeMediaPopularite +=       `<div class="titrecoeur">`
      listeMediaPopularite +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`
      listeMediaPopularite +=           `<div class="like">`
      listeMediaPopularite +=             `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`
      listeMediaPopularite +=             `<button>`
      listeMediaPopularite +=               `<div class="coeur" aria-label="likes">`
      listeMediaPopularite +=                 `<i class="fa-solid fa-heart"></i>`
      listeMediaPopularite +=               `</div>`
      listeMediaPopularite +=             `</button>`
      listeMediaPopularite +=           `</div>`
      listeMediaPopularite +=       `</div>`
      listeMediaPopularite +=   `</article>`

      mediaLightBoxPopularite += `<div class="image-lightbox">`
      mediaLightBoxPopularite += `  <button class="fermer" aria-label="close dialog" onclick="fermerModal()">&times;</button>`
      mediaLightBoxPopularite += `  <div class="imagetitre">`
      mediaLightBoxPopularite += `    <div class="imagePrecSuiv">`
      mediaLightBoxPopularite += `      <button class="precedant" aria-label="Previous image" onclick="plusImages(-1)">&#10094;</button>`
      if (mediaPhotographer[i].video) {
        mediaLightBoxPopularite +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`
      }
      if (mediaPhotographer[i].image) {
        mediaLightBoxPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`
      }
      mediaLightBoxPopularite += `      <button class="suivant" aria-label="Next image" onclick="plusImages(1)">&#10095;</button>`
      mediaLightBoxPopularite += `    </div>`
      mediaLightBoxPopularite += `    <div class="titre-lightbox">${mediaPhotographer[i].title}</div>`
      mediaLightBoxPopularite += `  </div>`
      mediaLightBoxPopularite += `</div>`
    }
    // Injection du nouveau code html dans le DOM
    let idRealisations = document.querySelector('#realisations')
    idRealisations.innerHTML = listeMediaPopularite;

    const b = document.querySelector(".contenu-lightbox")
    b.innerHTML= mediaLightBoxPopularite;

    //----------------------------------------------------------------------------------------------------------//

    // Fonction d'affichage du menu déroulant
    function clicMenuDeroulant() {
      let valeurSousMenu = document.querySelector(".valeur-sous-menu");

      valeurSousMenu.addEventListener("click", () =>
        {
          let sousMenuDeroulant = document.querySelector(".sous-menu")
          sousMenuDeroulant.style.display = "block";

          triPopularite();
          triTitre();
          triDate();
        }
      )
    }
    clicMenuDeroulant();

    // Fonction de tri des médias du photographe par popularité
    function triPopularite() {
      let popularite = document.querySelector("#boutonPopularite");
      // Lancement de la fonction au clic
      popularite.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.likes > b.likes ? -1 : 1));
          let listeMediaPopularite = '';
          let mediaLightBoxPopularite = '';

          for (let i = 0; i < mediaPhotographer.length; i++) {
            // Affichage des réalisations du photographe triées par popularité et création du contenu de la lightbox
            listeMediaPopularite +=   '<article>';

            if (mediaPhotographer[i].video != undefined) {
              listeMediaPopularite +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})"><video><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video></button>`;
            }
            if (mediaPhotographer[i].image != undefined) {
              listeMediaPopularite +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true"><img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view"></button>`;
            }
            listeMediaPopularite +=       `<div class="titrecoeur">`;
            listeMediaPopularite +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`;
            listeMediaPopularite +=         `<div class="like">`;
            listeMediaPopularite +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`;
            listeMediaPopularite +=             `<button>`
            listeMediaPopularite +=               `<div class="coeur" aria-label="likes">`;
            listeMediaPopularite +=                 `<i class="fa-solid fa-heart"></i>`;
            listeMediaPopularite +=               `</div>`;
            listeMediaPopularite +=             `</button>`
            listeMediaPopularite +=         `</div>`
            listeMediaPopularite +=       `</div>`;
            listeMediaPopularite +=   `</article>`;

            mediaLightBoxPopularite += `<div class="image-lightbox">`
            mediaLightBoxPopularite += `  <button class="fermer" aria-label="close dialog" onclick="fermerModal()">&times;</button>`
            mediaLightBoxPopularite += `  <div class="imagetitre">`
            mediaLightBoxPopularite += `    <div class="imagePrecSuiv">`
            mediaLightBoxPopularite += `      <button class="precedant" aria-label="Previous image" onclick="plusImages(-1)">&#10094;</button>`

            if (mediaPhotographer[i].video) {
              mediaLightBoxPopularite +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
            }
            if (mediaPhotographer[i].image) {
              mediaLightBoxPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`;
            }

            mediaLightBoxPopularite += `      <button class="suivant" aria-label="Next image" onclick="plusImages(1)">&#10095;</button>`
            mediaLightBoxPopularite += `    </div>`
            mediaLightBoxPopularite += `    <div class="titre-lightbox">${mediaPhotographer[i].title}</div>`
            mediaLightBoxPopularite += `  </div>`
            mediaLightBoxPopularite += `</div>`
          }
          // Injection du nouveau code html dans le DOM
          let idRealisations = document.querySelector('#realisations');
          idRealisations.innerHTML = listeMediaPopularite;

          const b = document.querySelector(".contenu-lightbox");
          b.innerHTML= mediaLightBoxPopularite;

          const c = document.querySelector("#selectionTri");
          c.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Popularité <i class="fa fa-angle-down"></i></p></button>`

          like();
          totallikes();

          let sousMenu = document.querySelector('.sous-menu');
          sousMenu.style.display = "none";

          clicMenuDeroulant();
        }
      )
    }
    triPopularite();

    // Fonction de tri des médias du photographe par Titre
    function triTitre() {
      let titre = document.querySelector("#boutonTitre");
      // Lancement de la fonction au clic
      titre.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.title > b.title ? 1 : -1));
          let listeMediaTitre = '';
          let mediaLightBoxTitre = '';

          for (let i = 0; i < mediaPhotographer.length; i++) {
            // Affichage des réalisations du photographe triées par titre et création du contenu de la lightbox
            listeMediaTitre +=   '<article>';

            if (mediaPhotographer[i].video != undefined) {
              listeMediaTitre +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})"><video><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video></button>`;
            }
            if (mediaPhotographer[i].image != undefined) {
              listeMediaTitre +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true"><img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view"></button>`;
            }
            listeMediaTitre +=       `<div class="titrecoeur">`;
            listeMediaTitre +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`;
            listeMediaTitre +=         `<div class="like">`;
            listeMediaTitre +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`;
            listeMediaTitre +=             `<button>`
            listeMediaTitre +=               `<div class="coeur" aria-label="likes">`;
            listeMediaTitre +=                 `<i class="fa-solid fa-heart"></i>`;
            listeMediaTitre +=               `</div>`;
            listeMediaTitre +=             `</button>`
            listeMediaTitre +=         `</div>`
            listeMediaTitre +=       `</div>`;
            listeMediaTitre +=   `</article>`;

            mediaLightBoxTitre += `<div class="image-lightbox">`
            mediaLightBoxTitre += `  <button class="fermer" aria-label="close dialog" onclick="fermerModal()">&times;</button>`
            mediaLightBoxTitre += `  <div class="imagetitre">`
            mediaLightBoxTitre += `    <div class="imagePrecSuiv">`
            mediaLightBoxTitre += `      <button class="precedant" aria-label="Previous image" onclick="plusImages(-1)">&#10094;</button>`
            if (mediaPhotographer[i].video) {
              mediaLightBoxTitre +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
            }
            if (mediaPhotographer[i].image) {
              mediaLightBoxTitre +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`;
            }
            mediaLightBoxTitre += `      <button class="suivant" aria-label="Next image" onclick="plusImages(1)">&#10095;</button>`
            mediaLightBoxTitre += `    </div>`
            mediaLightBoxTitre += `    <div class="titre-lightbox">${mediaPhotographer[i].title}</div>`
            mediaLightBoxTitre += `  </div>`
            mediaLightBoxTitre += `</div>`
          }
          // Injection du nouveau code html dans le DOM
          let idRealisations = document.querySelector('#realisations');
          idRealisations.innerHTML = listeMediaTitre;

          const b = document.querySelector(".contenu-lightbox");
          b.innerHTML= mediaLightBoxTitre;

          const c = document.querySelector("#selectionTri");
          c.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Titre <i class="fa fa-angle-down"></i></p></button>`

          let menuDeroulant1 = document.querySelector('.sous-menu');
          menuDeroulant1.style.display = "none";

          like();
          totallikes();

          let sousMenu = document.querySelector('.sous-menu');
          sousMenu.style.display = "none";

          clicMenuDeroulant();
        }
      )
    }
    triTitre();

    // Fonction de tri des médias du photographe par date
    function triDate() {
      let date = document.querySelector("#boutonDate");
      // Lancement de la fonction au clic
      date.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.date > b.date ? 1 : -1));
          let listeMediaDate = '';
          let mediaLightBoxDate = '';

          for (let i = 0; i < mediaPhotographer.length; i++) {
            // Affichage des réalisations du photographe triées par date et création du contenu de la lightbox
            listeMediaDate +=   '<article>'

            if (mediaPhotographer[i].video != undefined) {
              listeMediaDate +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})"><video><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video></button>`
            }
            if (mediaPhotographer[i].image != undefined) {
              listeMediaDate +=       `<button onclick="ouvrirModal();imageActuelle(${1+i})" role="button" aria-pressed="true"><img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view"></button>`
            }
            listeMediaDate +=       `<div class="titrecoeur">`
            listeMediaDate +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`
            listeMediaDate +=         `<div class="like">`
            listeMediaDate +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`
            listeMediaDate +=             `<button>`
            listeMediaDate +=               `<div class="coeur" aria-label="likes">`
            listeMediaDate +=                 `<i class="fa-solid fa-heart"></i>`
            listeMediaDate +=               `</div>`
            listeMediaDate +=             `</button>`
            listeMediaDate +=         `</div>`
            listeMediaDate +=       `</div>`
            listeMediaDate +=   `</article>`

            mediaLightBoxDate += `<div class="image-lightbox">`
            mediaLightBoxDate += `  <button class="fermer" aria-label="close dialog" onclick="fermerModal()">&times;</button>`
            mediaLightBoxDate += `  <div class="imagetitre">`
            mediaLightBoxDate += `    <div class="imagePrecSuiv">`
            mediaLightBoxDate += `      <button class="precedant" aria-label="Previous image" onclick="plusImages(-1)">&#10094;</button>`
            if (mediaPhotographer[i].video) {
              mediaLightBoxDate +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`
            }
            if (mediaPhotographer[i].image) {
              mediaLightBoxDate +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`
            }
            mediaLightBoxDate += `      <button class="suivant" aria-label="Next image" onclick="plusImages(1)">&#10095;</button>`
            mediaLightBoxDate += `    </div>`
            mediaLightBoxDate += `    <div class="titre-lightbox">${mediaPhotographer[i].title}</div>`
            mediaLightBoxDate += `  </div>`
            mediaLightBoxDate += `</div>`
          }
          // Injection du nouveau code html dans le DOM
          let idRealisations = document.querySelector('#realisations')
          idRealisations.innerHTML = listeMediaDate;

          const b = document.querySelector(".contenu-lightbox");
          b.innerHTML= mediaLightBoxDate;

          const c = document.querySelector("#selectionTri");
          c.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Date <i class="fa fa-angle-down"></i></p></button>`

          let menuDeroulant1 = document.querySelector('.sous-menu');
          menuDeroulant1.style.display = "none";

          like();
          totallikes();

          let sousMenu = document.querySelector('.sous-menu');
          sousMenu.style.display = "none";

          clicMenuDeroulant();
        }
      )
    }
    triDate();

    // Fonction d'incrémentation du nombre de likes des médias
    function like() {
      // Recherche de .like pour liker
      let coeur = document.querySelectorAll(".like");
      coeur.forEach((coeur) => 
        {
          coeur.addEventListener("click", () => 
            {
              let coeurlike = coeur.firstChild;
              let text = coeurlike.textContent;
              text = parseInt(text) + 1;
              coeurlike.textContent = text;

              // Incrémentation du nombre de like total
              let totallikes = document.querySelector('.totalNombreLike');
              totallikes.textContent = parseInt(totallikes.textContent) + 1;
            }
          )
        }
      )
    }
    like();

    // Fonction de calcul du nombre total de likes
    function totallikes() {
      let coeurs = document.querySelectorAll('.nombrelike');
      let totalLikeCoe = [];
      coeurs.forEach((coeur) => 
        {
          totalLikeCoe.push(parseInt(coeur.textContent));
          const reducers = (accumulator, currentValue) => accumulator + currentValue;
          let totalLikeCoeurs = totalLikeCoe.reduce(reducers);
          document.querySelector('.totalNombreLike').innerHTML = totalLikeCoeurs;
        }
      )
    }

    //Fonction de reconnaissance des touches flèche gauche, flèche droite et esc pour l'utilisation au clavier de la lightbox
    function clavierLightbox() {
      document.onkeydown = (evenement) => {
        evenement = evenement || window.event;
        if (evenement.key === 'ArrowLeft') {
          plusImages(-1);
        } else if (evenement.key === 'ArrowRight') {
          plusImages(1);
        } else if (evenement.key === 'Escape') {
          fermerModal();
          closeModal();
        }
      }
    }
    clavierLightbox();
  }    
}