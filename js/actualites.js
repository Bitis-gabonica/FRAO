document.addEventListener("DOMContentLoaded", () => {
    const featuredNewsGrid = document.getElementById("featured-news-grid");
    const articlesGrid = document.getElementById("articles-grid");
    const categoryFiltersUl = document.getElementById("category-filters");
    const yearFiltersUl = document.getElementById("year-filters");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const loadMoreWrapper = document.getElementById("load-more-wrapper");

    let currentCategory = "All";
    let currentYear = "All";

    // The first 2 items are featured (from the UNFILTERED source by default)
    const allPosts = actualitesData;
    let filteredPosts = [];

    // Items per page for the grid
    const itemsPerPage = 6;
    let currentPage = 1;

    function renderFeatured() {
        featuredNewsGrid.innerHTML = "";
        const featured = allPosts.slice(0, 3);

        featured.forEach(post => {
            const card = document.createElement("a");
            card.className = "featured-news-card";
            card.href = `actualite-detail.html?id=${post.id}`;
            card.style.cssText = "cursor: pointer; display: block; text-decoration: none;";
            card.innerHTML = `
        <div class="featured-img-wrapper" style="position: relative; border-radius: 12px; overflow: hidden; height: 350px; margin-bottom: 20px;">
          <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
          <span class="featured-arrow" style="position: absolute; bottom: 20px; right: 20px; width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: var(--primary-green-dark); transition: all 0.3s;">
             <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </span>
        </div>
        <div class="featured-content">
          <span style="color: var(--secondary-amber); font-weight: 600; font-size: 0.85rem;">${post.category}</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--primary-green-dark); margin: 10px 0;">${post.title}</h3>
          <span style="color: var(--text-muted); font-size: 0.85rem;">${post.read_time_min} min de lecture</span>
        </div>
      `;
            // hover effect on image
            card.addEventListener('mouseenter', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1.04)';
            });
            card.addEventListener('mouseleave', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
            });
            featuredNewsGrid.appendChild(card);
        });
    }

    function renderSidebar() {
        // Categories
        const categories = { "All": allPosts.length };
        // Years
        const years = { "All": allPosts.length };

        allPosts.forEach(p => {
            categories[p.category] = (categories[p.category] || 0) + 1;
            years[p.year] = (years[p.year] || 0) + 1;
        });

        // Sub-render category filters
        categoryFiltersUl.innerHTML = "";
        for (const [cat, count] of Object.entries(categories)) {
            const li = document.createElement("li");
            li.style.cursor = "pointer";
            li.style.color = currentCategory === cat ? "var(--primary-green-dark)" : "var(--text-light)";
            li.style.fontWeight = currentCategory === cat ? "600" : "400";

            let icon = "lucide:file-text";
            if (cat === "All") icon = "lucide:layers";
            if (cat === "Climat") icon = "lucide:cloud-rain";
            if (cat === "Genre") icon = "lucide:users";
            if (cat === "Gouvernance") icon = "lucide:shield";
            if (cat === "Partenariat") icon = "lucide:handshake";
            if (cat === "Agriculture") icon = "lucide:sprout";

            li.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;"><iconify-icon icon="${icon}" style="font-size: 1.1rem; color: var(--text-muted);"></iconify-icon> <span style="flex:1;">${cat}</span> <span style="font-size: 0.8rem; color: var(--text-muted);">(${count})</span></div>`;
            li.addEventListener("click", () => {
                currentCategory = cat;
                resetGrid();
            });
            categoryFiltersUl.appendChild(li);
        }

        // Sub-render year filters
        yearFiltersUl.innerHTML = "";
        Object.keys(years).sort((a, b) => b.localeCompare(a)).forEach(yr => {
            if (yr !== "All") {
                const li = document.createElement("li");
                li.style.cursor = "pointer";
                li.style.color = currentYear === yr ? "var(--primary-green-dark)" : "var(--text-light)";
                li.style.fontWeight = currentYear === yr ? "600" : "400";
                li.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;"><iconify-icon icon="lucide:calendar" style="font-size: 1.1rem; color: var(--text-muted);"></iconify-icon> <span style="flex:1;">${yr}</span> <span style="font-size: 0.8rem; color: var(--text-muted);">(${years[yr]})</span></div>`;
                li.addEventListener("click", () => {
                    currentYear = yr;
                    resetGrid();
                });
                yearFiltersUl.appendChild(li);
            }
        });

        // Add ALL to years at top
        const allYrLi = document.createElement("li");
        allYrLi.style.cursor = "pointer";
        allYrLi.style.color = currentYear === "All" ? "var(--primary-green-dark)" : "var(--text-light)";
        allYrLi.style.fontWeight = currentYear === "All" ? "600" : "400";
        allYrLi.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;"><iconify-icon icon="lucide:calendar" style="font-size: 1.1rem; color: var(--text-muted);"></iconify-icon> <span style="flex:1;">All</span> <span style="font-size: 0.8rem; color: var(--text-muted);">(${years["All"]})</span></div>`;
        allYrLi.addEventListener("click", () => {
            currentYear = "All";
            resetGrid();
        });
        yearFiltersUl.prepend(allYrLi);
    }

    function resetGrid() {
        currentPage = 1;
        applyFilters();
        renderSidebar(); // Update active states
    }

    function applyFilters() {
        // The list in the grid is all items starting from index 2 if NO filters are applied.
        // However, if filters ARE applied, we filter against the entire dataset to not hide anything from search.

        let baseData = allPosts;

        // Let's adopt a simple approach: if no filters (All, All), grid shows index 2..last.
        // If filtered, grid shows ALL items matching filter (even if they were top 2).
        if (currentCategory === "All" && currentYear === "All") {
            filteredPosts = allPosts.slice(2);
        } else {
            filteredPosts = allPosts.filter(p => {
                const matchCat = currentCategory === "All" || p.category === currentCategory;
                const matchYr = currentYear === "All" || p.year === currentYear;
                return matchCat && matchYr;
            });
        }

        articlesGrid.innerHTML = "";
        renderGridPage();
    }

    function renderGridPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = filteredPosts.slice(start, end);

        items.forEach(post => {
            const card = document.createElement("a");
            card.className = "news-card";
            card.href = `actualite-detail.html?id=${post.id}`;
            card.style.cssText = "cursor: pointer; display: block; text-decoration: none;";
            card.innerHTML = `
        <div class="news-card-img" style="border-radius: 12px; overflow: hidden; height: 200px; margin-bottom: 15px; position: relative;">
          <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;">
          <span class="featured-arrow" style="position: absolute; bottom: 15px; right: 15px; width: 35px; height: 35px; background: #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: var(--primary-green-dark); transition: all 0.3s; opacity: 0; transform: translateY(10px);">
             <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </span>
        </div>
        <div class="news-card-content">
          <span style="color: var(--secondary-amber); font-weight: 500; font-size: 0.8rem;">${post.category}</span>
          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--primary-green-dark); margin: 8px 0; line-height: 1.3;">${post.title}</h4>
          <span style="color: var(--text-muted); font-size: 0.75rem;">${post.date} &bull; ${post.read_time_min} min de lecture</span>
        </div>
      `;
            // Hover effects
            const arrow = card.querySelector('.featured-arrow');
            card.addEventListener('mouseenter', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
                if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateY(0)'; }
            });
            card.addEventListener('mouseleave', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
                if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateY(10px)'; }
            });
            articlesGrid.appendChild(card);
        });

        if (end < filteredPosts.length) {
            loadMoreWrapper.style.display = "flex";
        } else {
            loadMoreWrapper.style.display = "none";
        }
    }

    loadMoreBtn.addEventListener("click", () => {
        currentPage++;
        renderGridPage();
    });

    // Init
    renderFeatured();
    renderSidebar();
    applyFilters();
});
