export function mediaFactory() {
  var p = window.location.pathname;

  let donnees = JSON.parse(localStorage.getItem("photographersMedia"));
  //---------------------------------------------------------------------------------------------------------//

  function htmlMedia() {
    if (p.match(/^\/?photographer.html/)) {

      let listeMedia = '';

      let mediaLightBox = '';

      //----------------------------------------------------------------------//
      // Récupération de l'ID dans l'url
      let urlcourante = document.location.href;
      let url = new URL(urlcourante);
      let id = url.searchParams.get("id");
      const medias = donnees.media;

      let totalLikePhotos = [];
      let mediaPhotographer = [];

      for (let i = 0; i < medias.length; i++) {
        // Affichage des réalisations du photographe
        if (medias[i].photographerId == id) {

          // Calcul de la somme des like et injection du résultat dans le DOM
          totalLikePhotos.push(medias[i].likes);
          const reducers = (accumulator, currentValue) => accumulator + currentValue;
          let totalLike = totalLikePhotos.reduce(reducers);
          console.log(totalLike);

          document.querySelector('.nombreLike').innerHTML = totalLike;

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
      console.log(mediaPhotographer);

      for (let i = 0; i < mediaPhotographer.length; i++) {

        listeMedia +=   '<article>';

        if (mediaPhotographer[i].video) {
          listeMedia +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" onclick="ouvrirModal();imageActuelle(${1+i})"></video>`;
        }
        if (mediaPhotographer[i].image) {
          listeMedia +=       `<img src="assets/images/${mediaPhotographer[i].image}" onclick="ouvrirModal();imageActuelle(${1+i})" alt="Lilac breasted roller, closeup view ">`;
        }

        listeMedia +=       `<div class="titrecoeur">`;
        listeMedia +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`;
        listeMedia +=         `<div class="like">`;
        listeMedia +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`;
        listeMedia +=           `<div class="coeur" aria-label="likes">`;
        listeMedia +=             `<i class="fa-solid fa-heart"></i>`;
        listeMedia +=           `</div>`;
        listeMedia +=         `</div>`
        listeMedia +=       `</div>`;
        listeMedia +=   `</article>`;


        mediaLightBox += `<div class="image-lightbox">`
        mediaLightBox += `  <span class="fermer" onclick="fermerModal()">&times;</span>`
        mediaLightBox += `  <div class="imagetitre">`
        mediaLightBox += `    <div class="imagePrecSuiv">`
        mediaLightBox += `      <a class="precedant" onclick="plusImages(-1)">&#10094;</a>`

        if (mediaPhotographer[i].video) {
          mediaLightBox +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
        }
        if (mediaPhotographer[i].image) {
          mediaLightBox +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`;
        }

        mediaLightBox += `      <a class="suivant" onclick="plusImages(1)">&#10095;</a>`
        mediaLightBox += `    </div>`
        mediaLightBox += `    <div class="titre-lightbox">${mediaPhotographer[i].title}</div>`
        mediaLightBox += `  </div>`
        mediaLightBox += `</div>`
      }
      
      // Injection du nouveau code html dans le DOM
      const a = document.querySelector('#realisations')
      a.insertAdjacentHTML('beforeend', listeMedia);

      const b = document.querySelector(".contenu-lightbox")
      b.insertAdjacentHTML('beforeend', mediaLightBox);
      //b.appendChild(mediaLightBox);

      let popularite = document.querySelector("#popularite");
      popularite.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.likes > b.likes ? -1 : 1));
          console.log(mediaPhotographer);
          let listeMediaPopularite = '';

          for (let i = 0; i < mediaPhotographer.length; i++) {
            // Affichage des réalisations du photographe
            listeMediaPopularite +=   '<article>';

            if (mediaPhotographer[i].video != undefined) {
              listeMediaPopularite +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
            }
            if (mediaPhotographer[i].image != undefined) {
              listeMediaPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view">`;
            }
            listeMediaPopularite +=       `<div class="titrecoeur">`;
            listeMediaPopularite +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`;
            listeMediaPopularite +=         `<div class="like">`;
            listeMediaPopularite +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`;
            listeMediaPopularite +=           `<div class="coeur" aria-label="likes">`;
            listeMediaPopularite +=             `<i class="fa-solid fa-heart"></i>`;
            listeMediaPopularite +=           `</div>`;
            listeMediaPopularite +=         `</div>`
            listeMediaPopularite +=       `</div>`;
            listeMediaPopularite +=   `</article>`;
          }
          // Injection du nouveau code html dans le DOM
          let idRealisations = document.querySelector('#realisations')
          idRealisations.innerHTML = listeMediaPopularite;
        }
      )

      let titre = document.querySelector("#titre");
      titre.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.title > b.title ? 1 : -1));
          console.log(mediaPhotographer);
          let listeMediaTitre = '';


          for (let i = 0; i < mediaPhotographer.length; i++) {
            // Affichage des réalisations du photographe
            listeMediaTitre +=   '<article>';

            if (mediaPhotographer[i].video != undefined) {
              listeMediaTitre +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
            }
            if (mediaPhotographer[i].image != undefined) {
              listeMediaTitre +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view">`;
            }
            listeMediaTitre +=       `<div class="titrecoeur">`;
            listeMediaTitre +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`;
            listeMediaTitre +=         `<div class="like">`;
            listeMediaTitre +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`;
            listeMediaTitre +=           `<div class="coeur" aria-label="likes">`;
            listeMediaTitre +=             `<i class="fa-solid fa-heart"></i>`;
            listeMediaTitre +=           `</div>`;
            listeMediaTitre +=         `</div>`
            listeMediaTitre +=       `</div>`;
            listeMediaTitre +=   `</article>`;
          }
          // Injection du nouveau code html dans le DOM
          let idRealisations = document.querySelector('#realisations')
          idRealisations.innerHTML = listeMediaTitre;
        }
      )

      let date = document.querySelector("#date");
      date.addEventListener("click", () =>
        {
          mediaPhotographer.sort((a, b) => (a.date > b.date ? 1 : -1));
          console.log(mediaPhotographer);
          let listeMediaDate = '';

          for (let i = 0; i < mediaPhotographer.length; i++) {
            // Affichage des réalisations du photographe
            listeMediaDate +=   '<article>';
    
            if (mediaPhotographer[i].video != undefined) {
              listeMediaDate +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
            }
            if (mediaPhotographer[i].image != undefined) {
              listeMediaDate +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller, closeup view">`;
            }
            listeMediaDate +=       `<div class="titrecoeur">`;
            listeMediaDate +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`;
            listeMediaDate +=         `<div class="like">`;
            listeMediaDate +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`;
            listeMediaDate +=           `<div class="coeur" aria-label="likes">`;
            listeMediaDate +=             `<i class="fa-solid fa-heart"></i>`;
            listeMediaDate +=           `</div>`;
            listeMediaDate +=         `</div>`
            listeMediaDate +=       `</div>`;
            listeMediaDate +=   `</article>`;
          }
          // Injection du nouveau code html dans le DOM
          let idRealisations = document.querySelector('#realisations')
          idRealisations.innerHTML = listeMediaDate;
        }
      )

      function like() {
        // Recherche de .like pour liker
        let coeur = document.querySelectorAll(".like");
        coeur.forEach((coeur) => 
          {
            coeur.addEventListener("click", () => 
              {
                console.log("coeur ça marche");
                // Incrémentation du nombre de like pour le media sélectionné
                let coeurlike = coeur.firstChild;
                var text = coeurlike.textContent;
                text = parseInt(text) + 1;
                coeurlike.textContent = text;

                // Incrémentation du nombre de like total
                let totallikes = document.querySelector('.nombreLike');
                totallikes.textContent = parseInt(totallikes.textContent) + 1;
              }
            )
          }
        )
      }
      like();
    }    
  }
  htmlMedia();
}