# Propriétés Exactes des Bases de Données Notion

## 📥 Base "Banque d'idées - Articles IA"

**ID**: `507bd450-7b64-4b78-b44d-4ceeb809f1e0`  
**Nom**: Banque d'idées - Articles IA  
**Description**: Base de données pour collecter idées et sources d'articles à générer via l'automatisation N8N

### Propriétés disponibles

| Nom de la propriété | ID | Type | Description | Options/Config |
|---------------------|-----|------|-------------|----------------|
| **Titre/Idée principale** | `title` | title | Titre principal de l'idée | - |
| **Traité** | `dMJW` | checkbox | Cocher quand l'article a été généré via N8N | - |
| **Sources/URLs** | `%5C%7BVd` | rich_text | Liens vers articles, études, vidéos de référence | - |
| **Notes personnelles** | `CBGr` | rich_text | Vos réflexions, insights, angles uniques sur le sujet | - |
| **Angle personnel** | `%60bsi` | rich_text | Votre valeur ajoutée/expertise sur le sujet | - |
| **Questions à adresser** | `f%7Cpb` | rich_text | Les points que l'article doit absolument couvrir | - |
| **Data/Statistiques** | `%60zPe` | rich_text | Chiffres ou données à exploiter dans l'article | - |
| **Pourquoi maintenant?** | `TYs%3B` | rich_text | L'actualité ou le contexte qui rend ce sujet pertinent | - |
| **Citations clés** | `UE_S` | rich_text | Phrases importantes à potentiellement intégrer | - |
| **Style visuel** | `GG%3De` | rich_text | Description pour la génération d'image associée | - |
| **Mots-clés** | `MTjS` | multi_select | Mots-clés pour le SEO et la pertinence | (Vide) |
| **Type de contenu** | `QdEC` | select | Type d'article | Article d'opinion, Analyse, Tutoriel, News, Tendance, Retour d'expérience |
| **Public visé** | `%5CNPj` | select | Audience cible | Entrepreneurs, Managers, Développeurs, Marketeurs, Grand public, Experts tech |
| **Priorité** | `CpCD` | select | Niveau de priorité | Haute (rouge), Moyenne (jaune), Basse (gris) |
| **Longueur souhaitée** | `%3BwXl` | select | Taille de l'article | Court (300-500 mots), Moyen (500-800 mots), Long (800-1200 mots) |
| **Date création** | `B%3AS%40` | created_time | Date de création automatique | - |

### ✅ Propriétés utilisées dans le workflow actuel

1. ✅ **Titre/Idée principale** - Correct
2. ✅ **Traité** - Correct (checkbox)
3. ✅ **Sources/URLs** - Correct
4. ✅ **Notes personnelles** - Correct
5. ✅ **Angle personnel** - Correct
6. ✅ **Questions à adresser** - Correct

### ⚠️ Nouvelles propriétés non utilisées

- Data/Statistiques
- Pourquoi maintenant?
- Citations clés
- Style visuel
- Mots-clés
- Type de contenu
- Public visé
- Priorité
- Longueur souhaitée

## 📝 Base "Articles LinkedIn Générés"

**ID**: `9b915f4f-6bae-479f-9326-ff2cfdabadd3`  
**Nom**: Articles LinkedIn Générés  
**Description**: Base de données pour stocker les articles LinkedIn générés automatiquement via le workflow N8N à partir de la banque d'idées

### Propriétés disponibles

| Nom de la propriété | ID | Type | Description | Options/Config |
|---------------------|-----|------|-------------|----------------|
| **Titre** | `title` | title | Titre de l'article | - |
| **Contenu article** | `c%40E%3B` | rich_text | Article complet généré par Claude | - |
| **Hashtags** | `LdGk` | rich_text | Hashtags optimisés générés pour LinkedIn | - |
| **Post LinkedIn complet** | `zmxy` | rich_text | Version finale avec article + hashtags prête à publier | - |
| **Public cible** | `W%40Bn` | select | Audience cible | Entrepreneurs, Managers, Développeurs, Marketeurs, Grand public, Experts tech, **Professionnels et décideurs** |
| **Statistiques clés** | `wrJU` | rich_text | Principales données et chiffres utilisés dans l'article | - |
| **Date génération** | `Quiv` | created_time | Date de création automatique | - |
| **Image URL** | `Pnnh` | url | URL de l'image générée par DALL-E | - |
| **URL LinkedIn** | `sjG%5E` | url | Lien vers le post publié sur LinkedIn | - |
| **Performance** | `NHYw` | number | Nombre d'engagements sur LinkedIn | Format: number |

### ✅ Propriétés utilisées dans le workflow actuel

1. ✅ **Titre** - Correct
2. ✅ **Contenu article** - Correct
3. ✅ **Hashtags** - Correct
4. ✅ **Post LinkedIn complet** - Correct
5. ✅ **Public cible** - Correct (avec l'option "Professionnels et décideurs" disponible ✅)
6. ✅ **Statistiques clés** - Correct

### ⚠️ Propriétés non utilisées

- Date génération (automatique)
- Image URL (pour futures intégrations DALL-E)
- URL LinkedIn (à remplir après publication manuelle)
- Performance (métriques post-publication)

## 🎯 Résumé de la compatibilité

### ✅ Workflow COMPATIBLE

**Bonne nouvelle !** Le workflow actuel est compatible avec vos bases de données Notion :

1. **Base "Idées"** : Toutes les propriétés utilisées existent ✅
2. **Base "Articles"** : Toutes les propriétés utilisées existent ✅
3. **Option "Professionnels et décideurs"** : Présente dans le select "Public cible" ✅

### 🚀 Améliorations possibles

Le workflow pourrait être enrichi en utilisant les propriétés supplémentaires disponibles :

#### Depuis la base "Idées"
- **Longueur souhaitée** : Adapter dynamiquement la longueur de l'article (Court/Moyen/Long)
- **Public visé** : Personnaliser le ton selon l'audience
- **Type de contenu** : Ajuster la structure (tutoriel, analyse, opinion...)
- **Data/Statistiques** : Intégrer les données fournies
- **Priorité** : Traiter d'abord les idées prioritaires

#### Pour la base "Articles"
- **Image URL** : Intégrer DALL-E pour générer des images
- **URL LinkedIn** : Ajouter publication automatique via API LinkedIn
- **Performance** : Tracker les métriques après publication

## 📋 Mapping exact à utiliser

### Pour récupérer depuis "Idées"
```javascript
$json.properties?.['Titre/Idée principale']?.title?.[0]?.plain_text
$json.properties?.['Sources/URLs']?.rich_text?.[0]?.plain_text
$json.properties?.['Notes personnelles']?.rich_text?.[0]?.plain_text
$json.properties?.['Angle personnel']?.rich_text?.[0]?.plain_text
$json.properties?.['Questions à adresser']?.rich_text?.[0]?.plain_text
```

### Pour sauvegarder dans "Articles"
```json
{
  "Titre": { "title": [{ "text": { "content": "..." } }] },
  "Contenu article": { "rich_text": [{ "text": { "content": "..." } }] },
  "Hashtags": { "rich_text": [{ "text": { "content": "..." } }] },
  "Post LinkedIn complet": { "rich_text": [{ "text": { "content": "..." } }] },
  "Public cible": { "select": { "name": "Professionnels et décideurs" } },
  "Statistiques clés": { "rich_text": [{ "text": { "content": "..." } }] }
}
```

### Pour marquer comme traité
```json
{
  "Traité": { "checkbox": true }
}
```

---

*Document mis à jour le 11 août 2025*