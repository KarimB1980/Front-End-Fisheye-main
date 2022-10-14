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

        //function totallikes() {
          // Calcul de la somme des like et injection du résultat dans le DOM
          totalLikePhotos.push(medias[i].likes);
          const reducers = (accumulator, currentValue) => accumulator + currentValue;
          let totalLike = totalLikePhotos.reduce(reducers);
          console.log(totalLike);

          document.querySelector('.totalNombreLike').innerHTML = totalLike;
        //}
        //totallikes();

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
      //console.log(mediaPhotographer);

      //----------------------------------------------------------------------------------------------------------//

      mediaPhotographer.sort((a, b) => (a.likes > b.likes ? -1 : 1));
      console.log(mediaPhotographer);
      let listeMediaPopularite = '';
      let mediaLightBoxPopularite = '';

      for (let i = 0; i < mediaPhotographer.length; i++) {
        // Affichage des réalisations du photographe
        listeMediaPopularite +=   '<article>';

        if (mediaPhotographer[i].video) {
          listeMediaPopularite +=       `<video onclick="ouvrirModal();imageActuelle(${1+i})"><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video>`;
        }
        if (mediaPhotographer[i].image) {
          listeMediaPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" onclick="ouvrirModal();imageActuelle(${1+i})" alt="Lilac breasted roller, closeup view">`;
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


        mediaLightBoxPopularite += `<div class="image-lightbox">`
        mediaLightBoxPopularite += `  <span class="fermer" onclick="fermerModal()">&times;</span>`
        mediaLightBoxPopularite += `  <div class="imagetitre">`
        mediaLightBoxPopularite += `    <div class="imagePrecSuiv">`
        mediaLightBoxPopularite += `      <a class="precedant" onclick="plusImages(-1)">&#10094;</a>`

        if (mediaPhotographer[i].video) {
          mediaLightBoxPopularite +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
        }
        if (mediaPhotographer[i].image) {
          mediaLightBoxPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`;
        }

        mediaLightBoxPopularite += `      <a class="suivant" onclick="plusImages(1)">&#10095;</a>`
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


      let valeurSousMenu = document.querySelector(".valeur-sous-menu");
      //valeurSousMenu.style.display = "block";
      //console.log(valeurSousMenu);

      let SousMenuDate = document.querySelector("#date");
      let SousMenuTitre = document.querySelector("#titre");

      function clicMenuDeroulant() {
        valeurSousMenu.addEventListener("click", () =>
          {
            let sousMenu = '';
            sousMenu +=`  <button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Popularité <i class="fa fa-angle-down"></i></p></button>`


            // Injection du nouveau code html dans le DOM
            let menuDeroulant = document.querySelector('#selectionTri');
            menuDeroulant.innerHTML = sousMenu;

            let sousMenuDeroulant = document.querySelector(".sous-menu")
            sousMenuDeroulant.style.display = "block";

            triPopularite();
            triTitre();
            triDate();

          }
        )
      }
      clicMenuDeroulant();



      function triPopularite() {
        let popularite = document.querySelector("#popularite");
        popularite.addEventListener("click", () =>
          {
            mediaPhotographer.sort((a, b) => (a.likes > b.likes ? -1 : 1));
            console.log(mediaPhotographer);
            let listeMediaPopularite = '';
            let mediaLightBoxPopularite = '';

            for (let i = 0; i < mediaPhotographer.length; i++) {
              // Affichage des réalisations du photographe
              listeMediaPopularite +=   '<article>';

              if (mediaPhotographer[i].video != undefined) {
                listeMediaPopularite +=       `<video onclick="ouvrirModal();imageActuelle(${1+i})"><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video>`;
              }
              if (mediaPhotographer[i].image != undefined) {
                listeMediaPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" onclick="ouvrirModal();imageActuelle(${1+i})" alt="Lilac breasted roller, closeup view">`;
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

              mediaLightBoxPopularite += `<div class="image-lightbox">`
              mediaLightBoxPopularite += `  <span class="fermer" onclick="fermerModal()">&times;</span>`
              mediaLightBoxPopularite += `  <div class="imagetitre">`
              mediaLightBoxPopularite += `    <div class="imagePrecSuiv">`
              mediaLightBoxPopularite += `      <a class="precedant" onclick="plusImages(-1)">&#10094;</a>`

              if (mediaPhotographer[i].video) {
                mediaLightBoxPopularite +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
              }
              if (mediaPhotographer[i].image) {
                mediaLightBoxPopularite +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`;
              }

              mediaLightBoxPopularite += `      <a class="suivant" onclick="plusImages(1)">&#10095;</a>`
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
            //const c = document.querySelector(".valeur-sous-menu");
            c.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Popularité <i class="fa fa-angle-down"></i></p></button>`
            //c.textContent  =`Popularité`;

            like();
            totallikes();

            //let valeurSousMenu = document.querySelector('#selectionTri');
            //valeurSousMenu.style.display = "block";

            let sousMenu = document.querySelector('.sous-menu');
            sousMenu.style.display = "none";
            console.log(sousMenu);

            clicMenuDeroulant();
          }
        )
      }
      triPopularite();

      function triTitre() {

        let titre = document.querySelector("#titre");
        titre.addEventListener("click", () =>
          {
            mediaPhotographer.sort((a, b) => (a.title > b.title ? 1 : -1));
            console.log(mediaPhotographer);
            let listeMediaTitre = '';
            let mediaLightBoxTitre = '';

            for (let i = 0; i < mediaPhotographer.length; i++) {
              // Affichage des réalisations du photographe
              listeMediaTitre +=   '<article>';

              if (mediaPhotographer[i].video != undefined) {
                listeMediaTitre +=       `<video onclick="ouvrirModal();imageActuelle(${1+i})"><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video>`;
              }
              if (mediaPhotographer[i].image != undefined) {
                listeMediaTitre +=       `<img src="assets/images/${mediaPhotographer[i].image}" onclick="ouvrirModal();imageActuelle(${1+i})" alt="Lilac breasted roller, closeup view">`;
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


              mediaLightBoxTitre += `<div class="image-lightbox">`
              mediaLightBoxTitre += `  <span class="fermer" onclick="fermerModal()">&times;</span>`
              mediaLightBoxTitre += `  <div class="imagetitre">`
              mediaLightBoxTitre += `    <div class="imagePrecSuiv">`
              mediaLightBoxTitre += `      <a class="precedant" onclick="plusImages(-1)">&#10094;</a>`

              if (mediaPhotographer[i].video) {
                mediaLightBoxTitre +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`;
              }
              if (mediaPhotographer[i].image) {
                mediaLightBoxTitre +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`;
              }

              mediaLightBoxTitre += `      <a class="suivant" onclick="plusImages(1)">&#10095;</a>`
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
            //const c = document.querySelector(".valeur-sous-menu");
            //c.innerHTML = `<li tabindex="0" id="valeur-sousmenu"><p class="valeurTriSousMenu"> Titre <i class="fa fa-angle-down"></i></p><li>`;
            c.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Titre <i class="fa fa-angle-down"></i></p></button>`
            //c.textContent  =`Titre`;

            let menuDeroulant1 = document.querySelector('.sous-menu');
            menuDeroulant1.style.display = "none";
            console.log(menuDeroulant1);

            like();
            totallikes();

            //let valeurSousMenu = document.querySelector('#selectionTri');
            //valeurSousMenu.style.display = "block";

            let sousMenu = document.querySelector('.sous-menu');
            sousMenu.style.display = "none";

            clicMenuDeroulant();
          }
        )
      }
      triTitre();

      function triDate() {
        let date = document.querySelector("#date");
        date.addEventListener("click", () =>
          {
            mediaPhotographer.sort((a, b) => (a.date > b.date ? 1 : -1));
            console.log(mediaPhotographer);
            let listeMediaDate = '';
            let mediaLightBoxDate = '';

            for (let i = 0; i < mediaPhotographer.length; i++) {
              // Affichage des réalisations du photographe
              listeMediaDate +=   '<article>'

              if (mediaPhotographer[i].video != undefined) {
                listeMediaDate +=       `<video onclick="ouvrirModal();imageActuelle(${1+i})"><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4" ></video>`
              }
              if (mediaPhotographer[i].image != undefined) {
                listeMediaDate +=       `<img src="assets/images/${mediaPhotographer[i].image}" onclick="ouvrirModal();imageActuelle(${1+i})" alt="Lilac breasted roller, closeup view">`
              }
              listeMediaDate +=       `<div class="titrecoeur">`
              listeMediaDate +=         `<h3 class="productName">${mediaPhotographer[i].title}</h3>`
              listeMediaDate +=         `<div class="like">`
              listeMediaDate +=           `<h3 class="nombrelike">${mediaPhotographer[i].likes}</h3>`
              listeMediaDate +=           `<div class="coeur" aria-label="likes">`
              listeMediaDate +=             `<i class="fa-solid fa-heart"></i>`
              listeMediaDate +=           `</div>`
              listeMediaDate +=         `</div>`
              listeMediaDate +=       `</div>`
              listeMediaDate +=   `</article>`


              mediaLightBoxDate += `<div class="image-lightbox">`
              mediaLightBoxDate += `  <span class="fermer" onclick="fermerModal()">&times;</span>`
              mediaLightBoxDate += `  <div class="imagetitre">`
              mediaLightBoxDate += `    <div class="imagePrecSuiv">`
              mediaLightBoxDate += `      <a class="precedant" onclick="plusImages(-1)">&#10094;</a>`

              if (mediaPhotographer[i].video) {
                mediaLightBoxDate +=       `<video controls><source src="assets/images/${mediaPhotographer[i].video}" type="video/mp4"></video>`
              }
              if (mediaPhotographer[i].image) {
                mediaLightBoxDate +=       `<img src="assets/images/${mediaPhotographer[i].image}" alt="Lilac breasted roller">`
              }

              mediaLightBoxDate += `      <a class="suivant" onclick="plusImages(1)">&#10095;</a>`
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
            //const c = document.querySelector(".valeur-sous-menu");
            //c.innerHTML = `<li tabindex="0" id="valeur-sousmenu"><p class="valeurTriSousMenu"> Date <i class="fa fa-angle-down"></i></p><li>`;
            c.innerHTML =`<button tabindex="0" class="valeur-sous-menu"><p class="valeurTriSousMenu"> Date <i class="fa fa-angle-down"></i></p></button>`
            //c.textContent  =`Date`;

            let menuDeroulant1 = document.querySelector('.sous-menu');
            menuDeroulant1.style.display = "none";
            console.log(menuDeroulant1);

            like();
            totallikes();

            //let valeurSousMenu = document.querySelector('.valeur-sous-menu');
            //valeurSousMenu.style.display = "block";

            let sousMenu = document.querySelector('.sous-menu');
            sousMenu.style.display = "none";

            clicMenuDeroulant();
          }
        )
      }
      triDate();

      function like() {
        // Recherche de .like pour liker
        let coeur = document.querySelectorAll(".like");
        coeur.forEach((coeur) => 
          {
            coeur.addEventListener("click", () => 
              {
                //console.log("coeur ça marche");
                // Incrémentation du nombre de like pour le media sélectionné
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

      function totallikes() {
        let coeur = document.querySelectorAll('.nombrelike');
        //console.log(coeur);
        let totalLikeCoe = [];
        coeur.forEach((coeurs) => 
          {
            totalLikeCoe.push(parseInt(coeurs.textContent));
            //console.log(totalLikeCoe);
            const reducers = (accumulator, currentValue) => accumulator + currentValue;
            let totalLikeCoeurs = totalLikeCoe.reduce(reducers);
            console.log(totalLikeCoeurs);
            document.querySelector('.totalNombreLike').innerHTML = totalLikeCoeurs;
          }
        )
      }
    }    
  }
  htmlMedia();
}