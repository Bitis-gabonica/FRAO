document.addEventListener("DOMContentLoaded", () => {
    const allProjectsGrid = document.getElementById("all-projects-grid");
    if (!allProjectsGrid) return;

    let html = "";

    projectsData.forEach(project => {
        // Generate static cards (no flip) that go to project detail page
        html += `
      <div class="program-card" onclick="window.location.href='projet.html?id=${project.id}'" style="overflow: hidden;">
        <h3 class="program-title">${project.title}</h3>
        <div class="program-image" style="border-radius: 0;">
          <img src="${project.image}" alt="${project.title}">
          <div class="icon-top-right"><iconify-icon icon="lucide:arrow-up-right"></iconify-icon></div>
        </div>
        <div class="program-details" style="padding: 24px;">
          <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 20px; line-height: 1.5;">${project.description}</p>
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
    `;
    });

    allProjectsGrid.innerHTML = html;
});
