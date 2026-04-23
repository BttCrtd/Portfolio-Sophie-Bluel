import { generateProjects } from "./index.js";

/************************* Fonction pour ouvrir Modal ***********************/
function modalDisplay() {
  const background = document.querySelector(".background");
  const modalePopup = document.querySelector(".modale");
  const section = document.querySelector(".modale-gallery-photo");
  background.classList.add("active");
  modalePopup.classList.add("active");
  section.classList.add("active")  
}

/* Ouverture Modale au click sur le bouton modifier */
const editButton = document.querySelector(".edit-btn");
if (editButton) {
  editButton.addEventListener("click", () => {
    modalDisplay();
    displayListProject();
  });
}

/******************* Fonction pour femer Modale ***************************/
function modalClose() {
  /** Réinitilisation Formulaire */
  resetForm()
  /** Suppression des messages **/
  const statutMessage = document.querySelector(".operation-status-add-new-project")
  statutMessage.innerHTML = ""
  const operationStatus = document.querySelector(".operation-status-remove-project");
  operationStatus.innerHTML = ""
  /** Fermeture **/
  const background = document.querySelector(".background");
  const modalePopup = document.querySelector(".modale");
  const addPhotoModal = document.querySelector(".modale-add-photo");
    if (addPhotoModal) {
      addPhotoModal.classList.remove("active")
    }
  const galerryPhotoModal = document.querySelector(".modale-gallery-photo");
    if (galerryPhotoModal) {
      galerryPhotoModal.classList.remove("active")
    }
  background.classList.remove("active");
  modalePopup.classList.remove("active");
}

/*Fermeture Modale au click sur le bouton de fermeture ou en dehors de la Modale */
const modalBackground = document.querySelector(".background");
if (modalBackground) {
  modalBackground.addEventListener("click", () => {
    modalClose();
  });   
}

const closeBtn = document.querySelectorAll(".close-btn");
closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {  
    modalClose();
  });
});


/* Affichage Modal formulaire d'ajout de projet au click sur le bouton "Ajouter une photo" */
const goAddFormModal = document.querySelector(".add-photo-btn");
if (goAddFormModal) {
  goAddFormModal.addEventListener("click", () => {
    const operationStatus = document.querySelector(".operation-status-remove-project");
    operationStatus.innerHTML = ""
    const section = document.querySelector(".modale-gallery-photo");
    section.classList.remove("active")
    const sectionAddPhoto = document.querySelector(".modale-add-photo");
    sectionAddPhoto.classList.add("active");
    validateForm()
  });
}

/* Revenir Modale galerie photo au click sur la flèche*/
const goGalleryModal = document.querySelector(".back");

if (goGalleryModal) {
  goGalleryModal.addEventListener("click", () => { 
    resetForm()
    const statutMessage = document.querySelector(".operation-status-add-new-project")
    statutMessage.innerHTML = ""
    const sectionAddPhoto = document.querySelector(".modale-add-photo");
    sectionAddPhoto.classList.remove("active");
    const sectionGallery = document.querySelector(".modale-gallery-photo");
    sectionGallery.classList.add("active");
    displayListProject();
  });
}

/*******************************************************************************************/
/************************** Galery Modale **************************************************/
/*******************************************************************************************/
/* Fonction de récupération de la liste des projets */
function displayListProject() {
  const galleryList = document.querySelector(".project-list-container");
  galleryList.innerHTML = "";
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((projectList) => {
      for (let project of projectList) {
        // Création d'un conteneur pour le projet
        const imageProjectContainer = document.createElement("div");
        imageProjectContainer.id = `${project.id}`;
        // Creation de l'image du projet
        const imageProject = document.createElement("img");
        imageProject.src = project.imageUrl;
        imageProject.alt = project.title;
        // Creation du bouton pour supprimer l'image
        const binBtn = document.createElement("button");
        binBtn.id = `${project.id}`;
        binBtn.classList.add("delete-btn");
        const binIcon = document.createElement("i");
        binIcon.classList.add("fa-solid");
        binIcon.classList.add("fa-trash-can");
        binBtn.appendChild(binIcon);
        // Assemblage et ajout du projet dans la gallerie
        imageProjectContainer.appendChild(imageProject);
        imageProjectContainer.appendChild(binBtn);
        galleryList.appendChild(imageProjectContainer);
      }
      deleteProject();
    })
    .catch(() => {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-view-project-list");
      errorMessage.innerText = "Une erreur est survenue lors de la récupération des projets";
      galleryList.appendChild(errorMessage);
    });
}

/* Suppression des projets */
function deleteProject() {
  const binsbtn = document.querySelectorAll(".delete-btn");
  const galeryList = document.querySelector(".project-list-container");
  binsbtn.forEach((bin) => {
    bin.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Voulez-vous vraiment supprimer ce projet ?")
      const idProject = bin.id;
      fetch(`http://localhost:5678/api/works/${idProject}`, {
        method: "DELETE",
        body: idProject,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
            Accept: "*/*",
          },
        })
        .then((reponse) => {
          if (reponse.ok) {
            const operationStatus = document.querySelector(".operation-status-remove-project");
            operationStatus.innerText = "Projet supprimé";
            galeryList.removeChild(document.getElementById(idProject));
            generateProjects();
          } else {
            const operationStatus = document.querySelector(".operation-status-remove-project");
            operationStatus.innerText = "Une erreur est survenue lors de la suppression du projet";
          }
        })
        .catch(() => {
          const operationStatus = document.querySelector(".operation-status-remove-project");
          operationStatus.innerText = "Une erreur est survenue lors de la suppression du projet";
        });
    });
  });
}

/****************************************************************************************************/
/****************************************** FORMULAIRE **********************************************/
/****************************************************************************************************/
/**** Ajouter une image dans le formulaire ****/
function addImage() {
  const errorPhoto = document.getElementById("error-photo");

  const uploadPhoto = document.querySelector(".add-photo-here");
  uploadPhoto.classList.add("active");

  const viewPhoto = document.querySelector(".viewPhoto");
  const inputFile = document.getElementById("fileInput");
  let preview = document.createElement('img')
  preview.id = "preview"

  const addPhotoButton = document.querySelector(".plusAddPhoto-btn");
  addPhotoButton.addEventListener("click", () => {
    inputFile.click();
  });
  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    viewPhoto.insertBefore(preview, inputFile)
    if (file) {
      const urlImg = new FileReader();
      urlImg.onload = function (e) {
        preview.src = e.target.result;
        viewPhoto.classList.add("active");
        errorPhoto.innerText = "";
      };
      uploadPhoto.classList.remove("active");
      urlImg.readAsDataURL(file);
    } else {
      errorPhoto.innerText = "Une erreur est survenue lors du chargement de l'image";
    }
  });
}

addImage();

/***** Récupération des catégories pour le formulaire *****/
function catégorieForm() {
  const errorCategory = document.getElementById("error-category");
  const formSelect = document.getElementById("choice-category");
  formSelect.innerHTML = ""; // Réinitialisation des options
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  formSelect.appendChild(defaultOption);
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        formSelect.appendChild(option);
      });
    })
    .catch(() => {
      errorCategory.innerText = "Une erreur est survenue lors du chargement des catégories";
    });
}

catégorieForm();

/***************************************************************************************************************/
/**************** Function pour valider le formulaire avant envoie et activation du boutton d'envoie ***********/
function validateForm() {
  let check = false
  
  const validationButton = document.querySelector(".validation-btn");

  const titleProject = document.getElementById("title");
  const categoryProject = document.getElementById("choice-category");
  const imgSrc = document.getElementById("fileInput");

  if (imgSrc.files.length > 0 && titleProject.value !== "" && categoryProject.value !== "") {
    validationButton.disabled = false;
    check = true
  } else {
    validationButton.disabled = true
    check = false
  }
  return check
}

/* Appel à validateform pour activé boutton d'envoie */
const titleProject = document.getElementById("title");
const categoryProject = document.getElementById("choice-category");
const imgSrc = document.getElementById("fileInput");

if (titleProject) {
  titleProject.addEventListener("input", validateForm);
}
if (categoryProject) {
  categoryProject.addEventListener("change", validateForm);
}
if (imgSrc) {
  imgSrc.addEventListener("change", validateForm);
}


/************************************************************************************/
/********************* Fonction pour envoyer le formulaire  *************************/
function sandingForm(){
  const statutMessage = document.querySelector(".operation-status-add-new-project")
  if(validateForm){
    const titleProject = document.getElementById("title");
    const categoryProject = document.getElementById("choice-category");
    const imgSrc = document.getElementById("fileInput");
    const formData = new FormData()

    formData.append("image", imgSrc.files[0]);
    formData.append("title", titleProject.value);
    formData.append("category", parseInt(categoryProject.value));

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((reponse) => {
      if(reponse.ok){
        generateProjects()
        statutMessage.innerHTML = "Projet ajouté"
        modalClose()
      }
    })
    .catch(() => {
      statutMessage.innerHTML = "Une erreur s'est produite"
    })
  }
}

/*** Function qui réinitialise le formulaire  ***/
function resetForm(){
  const titleProject = document.getElementById("title");
    const categoryProject = document.getElementById("choice-category");
    const inputFile = document.getElementById("fileInput");
    if(titleProject){
      titleProject.value = ""
    }
    if (categoryProject) {
      categoryProject.value = ""
    }
    if(inputFile) {
      inputFile.value = ""
    }
    const uploadPhoto = document.querySelector(".add-photo-here");
    const viewPhoto = document.querySelector(".viewPhoto");
    uploadPhoto.classList.add("active")
    viewPhoto.classList.remove("active")
}

/*** Envoie Formulaire ***/
const sendingFormButton = document.querySelector(".validation-btn")
sendingFormButton.addEventListener("click", sandingForm)