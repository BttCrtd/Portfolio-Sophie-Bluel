// Création d'une fiche projet
function projectSheet(idProject, listProject) {
  for (const project of listProject) {
    if (idProject === project.id) {
      const figureProject = document.createElement("figure");
      const imgProject = document.createElement("img");
      
      const urlImage = project.imageUrl;
      const altImage = project.title;
      imgProject.src = urlImage;
      imgProject.alt = altImage;
      
      const titleProject = document.createElement("figcaption");
      titleProject.innerText = project.title;
      
      figureProject.appendChild(imgProject);
      figureProject.appendChild(titleProject);
      return figureProject;
    }
  }
}

// Affichage des fiches projets
async function generateProjects(idcategorie) {
  const containerProjects = document.querySelector(".gallery");
  containerProjects.innerHTML = "";
  
  try {
    await fetch("http://localhost:5678/api/works")
      .then((response) => {
        return response.json();
      })
      .then((listProject) => {
        // Création de toutes les fiches projets //
          for (const project of listProject) {
            if (idcategorie){
              if (project.categoryId === idcategorie) {
                const myProject = projectSheet(project.id, listProject);
                containerProjects.appendChild(myProject);
              };
            } else {
                const myProject = projectSheet(project.id, listProject);
                containerProjects.appendChild(myProject);
              
            }
          }
        } 
      );
  } catch {
    console.log("Une erreur est survenue lors du chargement des travaux");
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Une erreur est survenue lors du chargement des travaux";
    document.querySelector(".gallery").appendChild(errorMessage);
  }
}

generateProjects();


/* ----------  Catégories de projets  ---------- */
/* Création d'un bouton de filtrage de catégorie de projet */
function categorieButton(categoryName, categoryID = null, isActive = false) {
    const categoriesContainer = document.querySelector(".categories-container");
    const buttonCategory = document.createElement("button");
    buttonCategory.innerText = categoryName;

    if (categoryID !== null) {
      buttonCategory.id = categoryID;
    }
    
    if (isActive) {
      buttonCategory.classList.add("active");
    }

    buttonCategory.addEventListener("click", () => {
      const buttons = categoriesContainer.querySelectorAll("button");
      buttons.forEach((button) => button.classList.remove("active"));
      buttonCategory.classList.add("active");
      generateProjects(Number(buttonCategory.id))
    });
    categoriesContainer.appendChild(buttonCategory);
  }

/* Récupération et affichaches des catégories de projets */
async function getCategoriesProject() {
  try {
    await fetch("http://localhost:5678/api/categories")
      .then((response) => {
        return response.json();
      }) 
      .then((listCategories) => {
        categorieButton("Tous",null, true);
        for (const category of listCategories) {
          categorieButton(category.name, category.id);
        }
        });
      ;
  } catch (error) {
    console.log("Une erreur est survenue lors du chargement des catégories de projets", error);
  }
}

getCategoriesProject();