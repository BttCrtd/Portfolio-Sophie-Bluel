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
async function generateProjects() {
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
            const myProject = projectSheet(project.id, listProject);
            containerProjects.appendChild(myProject);
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