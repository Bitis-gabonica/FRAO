# Restructuration FRAO — Design

Date : 2026-05-08
Source : retour Ngouye Fall + PSQ6 (Plan Stratégique Quinquennal 2021-2025)

## Contexte

Le retour de Ngouye Fall pointe :
1. **Confusion d'identité** entre frao.org et d'autres sites (ORGA, LinkedIn) — besoin d'identification immédiate.
2. **Plan du site** trop fragmenté avec redondances (Mission, Impact, Approche se recoupent).
3. **Contenu de Qui sommes-nous** : ajouter origine, caractère non lucratif, gouvernance ; reprendre années d'expérience et reconnaissance ; mettre en valeur le vert.

## Décisions de conception

### Navigation finale (5 entrées)

| Entrée | Cible |
|---|---|
| Qui sommes-nous | `qui-sommes-nous.html` *(nouveau)* |
| Programmes | `projets.html` (existant) |
| Actualités | `actualites.html` (existant) |
| Partenaires | `index.html#partenaires` *(nouveau)* |
| Contacts | `index.html#contact` *(enrichi)* |

Pas de page Publications pour le moment (manque de documents). PSQ6 sera référencé depuis Qui sommes-nous.

### Architecture des fichiers

- `index.html` : home allégée (5 sections : héro identifiant, raison d'être, programmes en bref, actualités récentes, partenaires, contacts)
- `qui-sommes-nous.html` : nouveau, 6 sections issues du PSQ6
- `projets.html`, `projet.html`, `actualites.html`, `actualite-detail.html` : inchangés sauf nav header
- Sections **supprimées** d'index.html : `#who-we-are`, `#mission`, `#piliers`, `#approach` (migrées vers qui-sommes-nous.html)

### Page `qui-sommes-nous.html`

1. **Hero d'introduction** — titre complet FRAO + ligne d'identité institutionnelle.
2. **Notre histoire** — initiative paysanne ouest-africaine, soutien Fondation Ford + CRDI, création fin années 80 sous nom PRAAP, évolution vers FRAO. Frise chronologique compacte.
3. **Notre identité** — 3 cartes : organisation à but non lucratif, 35+ ans d'expérience, reconnaissance internationale (FIDA, BAD, FAO, KOICA…).
4. **Vision & Mission** — verbatim PSQ6 en 2 blocs côte à côte.
5. **Orientations stratégiques** — 3 OS du PSQ6 en cartes :
   - **OS1** : Chaînes de valeurs agricoles compétitives (3 axes)
   - **OS2** : Adaptation et résilience au changement climatique (3 axes)
   - **OS3** : Gouvernance pour développement durable (2 axes)
6. **Gouvernance** — Conseil des Gouverneurs + Direction Exécutive (sans nominer pour rester évolutif).

### Home (`index.html`) allégée

1. **Hero identifiant** — « Fondation Rurale de l'Afrique de l'Ouest » + sous-titre identitaire visible immédiatement (anti-confusion).
2. **Notre raison d'être** — 1 manifeste + 3 chiffres clés.
3. **Programmes en bref** — 3 cartes flip (composant existant), lien vers projets.html.
4. **Actualités récentes** — grille 3 derniers articles, style éditorial, lien vers actualites.html.
5. **Partenaires** *(nouveau `#partenaires`)* — 4 catégories : Bailleurs, Institutionnels/régionaux, Techniques, Terrain/ONG. Cartes minimalistes monogramme + nom + rôle, logos à venir.
6. **Contacts** *(`#contact` enrichi)* — adresse complète, NINEA, carte Google Maps embed, réseaux sociaux.

## Style global

- **Esthétique** : minimaliste, moderne, fin, illustré.
- **Whitespace** généreux, grille aérée.
- **Lignes** : 1px bordures, ombres très légères (≤ 0.06 opacité).
- **Typographie** : Montserrat 500-600 pour titres, Work Sans 300-400 pour corps (existant, conservé).
- **Couleurs** : `--primary-green: #176b2f` mis en valeur (titres de section, accents, badges OS, monogrammes), `--secondary-amber` en touche.
- **Illustrations** : SVG line-art, 1.5px stroke, vert primaire, sobres (pas d'illustrations bavardes).
- **Responsive** : mobile-first, breakpoints existants conservés (~768px, ~480px). Toutes nouvelles sections testées en mobile.

## Anti-confusion (point 1 du retour)

- Titre `<title>` complet « Fondation Rurale de l'Afrique de l'Ouest (FRAO) » sur toutes les pages.
- Hero home affiche le nom complet en grand dès le 1er fold.
- Logo header agrandi à 96px (déjà fait).
- Meta og:title, og:description renforcés.
- `<h1>` explicite sur chaque page principale.

## Partenaires recensés (depuis PSQ6 + actualités)

- **Bailleurs / financiers** : Fondation Ford, CRDI, FIDA, BAD, KOICA, ITC, Ville de Lyon, La Guilde
- **Institutionnels / régionaux** : FAO, CORAF, CEDEAO, UEMOA
- **Techniques** : 2iE, ITA, École Polytechnique de Dakar, IPAS, CNA
- **Terrain / ONG** : Better World, Plan Sénégal, AIDR, KKGB, ADENA, FAX, AEPN

## Hors scope

- Page Publications (à reporter, manque de contenu).
- Formulaire de contact fonctionnel (statique, mailto suffit).
- Logos partenaires (à fournir plus tard, monogrammes en attendant).
- Refonte CSS globale (on étend, on ne casse pas).
- Réorganisation des projets ou actualités existants.

## Validation

Validation user en chat : section 1 ✓, section 2 ✓, section 3 ✓, section 4 (carte blanche : « FAIS TOUT JE TE FAIS CONFIANCE, soit minimaliste moderne fin illustré et respecte le responsive »).
