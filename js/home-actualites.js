document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("actualites-preview-grid");
  if (!grid || typeof actualitesData === "undefined") return;

  const recent = actualitesData.slice(0, 3);

  grid.innerHTML = recent.map(post => `
    <a class="actu-preview-card" href="actualite-detail.html?id=${post.id}">
      <div class="actu-preview-img" style="background-image: url('${post.image}');"></div>
      <div class="actu-preview-body">
        <span class="actu-preview-meta">
          <span class="actu-preview-cat">${post.category}</span>
          <span class="actu-preview-date">${post.date}</span>
        </span>
        <h3>${post.title}</h3>
        <p>${post.excerpt.length > 140 ? post.excerpt.slice(0, 140) + "…" : post.excerpt}</p>
        <span class="actu-preview-link">Lire <iconify-icon icon="lucide:arrow-right"></iconify-icon></span>
      </div>
    </a>
  `).join("");
});
