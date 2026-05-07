document.addEventListener("DOMContentLoaded", () => {
    // Extract ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (projectId && projectsData) {
        const project = projectsData.find(p => p.id === parseInt(projectId));

        if (project) {
            document.title = project.title + " | FRAO";
            document.getElementById("project-title").innerText = project.title;
            document.getElementById("project-image").src = project.image;
            document.getElementById("project-image").alt = project.title;

            document.getElementById("project-desc").innerText = project.description;
            document.getElementById("project-type").innerText = project.type;
            document.getElementById("project-zone").innerText = project.zone;
            document.getElementById("project-secteur").innerText = project.secteur;
        } else {
            document.getElementById("project-title").innerText = "Projet introuvable.";
        }
    } else {
        window.location.href = "projets.html";
    }
});
