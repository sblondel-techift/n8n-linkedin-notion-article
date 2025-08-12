# Contexte pour Claude - Projet Workflow LinkedIn

## 🎯 Résumé du projet

L'utilisateur (Steve Blondel) a développé un workflow n8n pour automatiser la génération d'articles LinkedIn à partir d'idées stockées dans Notion. Le workflow utilise plusieurs agents IA en chaîne pour rechercher, rédiger et optimiser le contenu.

## ✅ STATUT : WORKFLOW 100% FONCTIONNEL

Le workflow est maintenant complètement opérationnel après résolution de tous les problèmes techniques.

## 🔄 Workflow Final

1. **🚀 Déclencheur Manuel** → Lance le workflow
2. **📥 Récupérer Idée Non Traitée** → Récupère une idée avec `Traité = false` depuis Notion
3. **🔍 Agent Perplexity** → Recherche d'informations actuelles sur le sujet
4. **✍️ Agent Claude** → Rédaction de l'article (800-1200 mots)
5. **🏷️ Agent GPT-4** → Génération de 10 hashtags optimisés
6. **📋 Préparer données finales** → Compilation des données
7. **💾 Créer Article dans Notion** → Sauvegarde via HTTP Request
8. **📊 Extraire données article** → Récupération des infos de l'article créé
9. **✅ Marquer Idée Traitée** → Coche la case "Traité" avec référence directe à l'ID
10. **✨ Message de succès** → Confirmation finale

## 📊 Bases de Données Notion

### Base "Idées d'articles" (ID: `507bd4507b644b78b44d4ceeb809f1e0`)
| Propriété | Type | Description |
|-----------|------|-------------|
| **Titre/Idée principale** | Title | Titre de l'idée |
| **Sources/URLs** | Rich Text | Contexte et sources |
| **Notes personnelles** | Rich Text | Angle éditorial |
| **Angle personnel** | Rich Text | Perspective unique |
| **Questions à adresser** | Rich Text | Points à couvrir |
| **Traité** | Checkbox | Statut (coché = traité) |

### Base "Articles LinkedIn générés" (ID: `9b915f4f6bae479f9326ff2cfdabadd3`)
| Propriété | Type | Description |
|-----------|------|-------------|
| **Titre** | Title | Titre de l'article |
| **Contenu article** | Rich Text | Corps de l'article (2000 car. max) |
| **Hashtags** | Rich Text | Tags générés |
| **Post LinkedIn complet** | Rich Text | Version finale |
| **Public cible** | Select | "Professionnels et décideurs" |
| **Statistiques clés** | Rich Text | Data points |

## 🛠️ Solutions Techniques Appliquées

### Problème 1 : Mapping des propriétés
- **Symptôme** : "Cannot read properties of undefined"
- **Solution** : Utilisation de nœuds HTTP Request au lieu du nœud Notion v2.2

### Problème 2 : ID undefined
- **Symptôme** : L'ID de l'idée n'était pas transmis entre les nœuds
- **Solution** : Ajout d'un nœud intermédiaire pour capturer l'ID

### Problème 3 : Expression non évaluée
- **Symptôme** : `{{ $json.ideaId }}` envoyé littéralement
- **Solution finale** : 
  ```javascript
  ={{ `https://api.notion.com/v1/pages/${$('📥 Récupérer Idée Non Traitée').item.json.id}` }}
  ```
  - Préfixe `=` pour évaluation JavaScript
  - Référence directe au nœud source
  - Template literals pour interpolation

## ⚙️ Configuration Technique

### Versions
- **n8n** : 1.105.3 (Self Hosted)
- **Notion API** : Version 2022-06-28
- **Agents IA** :
  - Claude 3.5 Sonnet (20241022)
  - GPT-4
  - Perplexity Sonar Pro

### Points Clés
1. **HTTP Request** : Utilisé pour création et mise à jour (plus stable)
2. **Références directes** : `$('nom-du-nœud')` pour garantir l'accès aux données
3. **Simplify** : Toujours désactivé dans les nœuds Notion
4. **Expressions** : Syntaxe `={{ }}` avec préfixe `=` pour JavaScript

## 📁 Fichiers du Projet

- `workflow-final.json` : Version finale fonctionnelle
- `README.md` : Documentation complète
- `CLAUDE.md` : Ce fichier de contexte

## 🔍 Guide de Dépannage

### Pour tester le workflow
1. Importer `workflow-final.json` dans n8n
2. Configurer les credentials (Notion, Claude, OpenAI, OpenRouter)
3. Vérifier les IDs des bases de données
4. Exécuter avec le déclencheur manuel

### En cas d'erreur
1. Vérifier les noms exacts des propriétés Notion
2. S'assurer que l'intégration Notion a accès aux bases
3. Tester chaque nœud individuellement
4. Consulter les logs n8n

## 📈 Métriques de Succès

- ✅ Article généré avec 800-1200 mots
- ✅ Hashtags pertinents générés
- ✅ Article sauvegardé dans Notion
- ✅ Idée marquée comme traitée
- ✅ Workflow exécuté sans erreur

## 🚀 Prochaines Étapes Possibles

1. **Automatisation** : Remplacer déclencheur manuel par schedule
2. **Publication** : Intégrer API LinkedIn pour publier directement
3. **Images** : Ajouter génération d'images avec DALL-E
4. **Analytics** : Tracker performances des articles
5. **Templates** : Créer différents formats selon le type

## 📝 Notes Importantes

- Les propriétés rich_text sont limitées à 2000 caractères
- L'URL de mise à jour DOIT utiliser une référence directe à l'ID
- Les credentials ne doivent jamais être commitées
- Toujours tester en manuel avant d'automatiser

---

*Dernière mise à jour : 11 août 2025*
*Statut : FONCTIONNEL ET STABLE*
*Auteur : Sébastien Blondel*