document.addEventListener("DOMContentLoaded", () => {
    const portfolioGrid = document.getElementById("portfolio-grid");
    if (!portfolioGrid) return;

    let html = "";

    projectsData.forEach(project => {
        html += `
      <div class="program-card flip-card" onclick="window.location.href='projet.html?id=${project.id}'">
        <div class="flip-card-inner">
          
          <!-- Front Side -->
          <div class="flip-card-front" style="background-image: url('${project.image}');">
             <div class="front-overlay"></div>
             <h3 class="front-title">${project.title}</h3>
             <div class="icon-top-right"><iconify-icon icon="lucide:arrow-up-right"></iconify-icon></div>
          </div>
          
          <!-- Back Side -->
          <div class="flip-card-back">
             <h3 class="back-title">${project.title}</h3>
             <p class="back-desc">${project.description}</p>
             <div class="program-details">
                <div class="detail-row">
                  <span>Type</span>
                  <span>${project.type}</span>
                </div>
                <div class="detail-row">
                  <span>Zone</span>
                  <span>${project.zone}</span>
                </div>
                <div class="detail-row">
                  <span>Secteur</span>
                  <span>${project.secteur}</span>
                </div>
              </div>
          </div>
          
        </div>
      </div>
    `;
    });

    portfolioGrid.innerHTML = html;
});
