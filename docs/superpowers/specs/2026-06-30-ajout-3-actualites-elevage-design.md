# Ajout de 3 actualités « élevage » — Design

Date : 2026-06-30
Source : `Brief_publication_FRAO_3_actualites.txt` (Ngouye Fall)

## Objectif
Publier 3 articles d'actualité + leurs documents d'archive, texte **repris verbatim**
(corrigé uniquement de l'encodage cassé), en respectant le design system et la
structure d'article existants.

## Architecture (aucun nouveau gabarit)
- 3 objets ajoutés **en tête** de `actualitesData` dans [js/actualites-data.js](../../../js/actualites-data.js),
  avec champ `full_content` (HTML) — rendu par `generateRichContent()` dans
  [actualite-detail.html](../../../actualite-detail.html).
- Étant les 3 plus récents, ils deviennent les 3 articles « à la une » (page Actualités
  + aperçu accueil), sans modifier la logique de liste/filtre.
- `full_content` rédigé en **template literal (backticks)** pour éviter l'échappement
  massif des guillemets HTML et des apostrophes françaises. Les autres champs restent
  en double-quotes (cohérence fichier).

## Les 3 articles
| id | Titre | Date | Catégorie | Image hero |
|----|-------|------|-----------|------------|
| 4009 | La FRAO au cœur des débats sur l'élevage durable (GASL) | 11 Juin 2026 | Partenariat | **provisoire** (à remplacer) |
| 4008 | FRAO au cœur du financement de l'aviculture rurale | Mars 2026 | Agriculture | `assets/aviculture-1.jpeg` (réutilisé) |
| 4007 | PNDIES 1 — L'élevage climato-intelligent prend son envol au Sénégal | Déc 2025 | Climat | `assets/pndies-atelier-banniere.jpg` |

## Documents d'archive — accordéons `<details>` en bas de chaque article
- GASL → Déclaration de Dakar (1)
- Aviculture → TDR Groupe de Travail (2.A) + Note FRAO (2.B)
- PNDIES → Rapport d'atelier complet, annexes incluses (1, très long)
- Style ajouté dans `actualite-detail.html` (`.archive-doc` / `<summary>`), aligné au
  design system (vert/ambre, icône document). Contenu hérite des styles `.article-body`.

## Décisions validées
1. **Archives** : sections repliables dans l'article (pas de page/feed séparés).
2. **PNDIES bailleurs** : aligné sur le rapport → **BAD + GCA seulement**, BID et
   « 33 millions d'euros » retirés de l'article.
3. **Image GASL** : visuel provisoire existant, marqué `<!-- PHOTO GASL à remplacer -->`,
   + repère à l'emplacement [PHOTO 1] dans le texte.

## Données personnelles
Rapport PNDIES : **noms** des membres des groupes de travail conservés ; **coordonnées
(tél./e-mails) retirées** (déjà fait dans le brief) — ne pas republier sans accord.

## Photos PNDIES (déplacées dans assets/)
- `Pndies.jpg` → `assets/pndies-atelier-banniere.jpg` (hero, bannière de l'atelier)
- `AtelierPNDIES1.jpg` → `assets/pndies-atelier-session.jpg` (figure : séance de travail)
- `PNDIES1.jpg` → `assets/pndies-ly-interview.jpg` (figure : Pr Ly interviewé — légende fournie)

## Finitions
- 3 URLs ajoutées à [sitemap.xml](../../../sitemap.xml).
- Vérif : `node --check js/actualites-data.js` + revue visuelle des 3 pages + accordéons.

## Checklist d'implémentation
1. [ ] Déplacer/renommer les 3 photos PNDIES dans `assets/`.
2. [ ] Ajouter CSS `.archive-doc` dans `actualite-detail.html`.
3. [ ] Insérer les 3 objets en tête de `actualitesData` (texte verbatim + archives).
4. [ ] Mettre à jour `sitemap.xml`.
5. [ ] `node --check` + revue + serveur local.
