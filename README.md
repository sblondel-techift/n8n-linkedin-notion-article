# Workflow n8n - Génération Automatique d'Articles LinkedIn

## 🎯 Objectif
Automatiser la création d'articles LinkedIn professionnels à partir d'idées stockées dans Notion, en utilisant l'IA pour la recherche, la rédaction et l'optimisation.

## ✅ État du projet : FINALISÉ (Version 8)

Le workflow est maintenant **100% fonctionnel et optimisé**. Toutes les problématiques ont été résolues, notamment la préservation complète du contenu généré.

## 🔄 Architecture du Workflow

### Vue d'ensemble
```
Notion (Idées) → n8n → AI Agents → Notion (Articles) → LinkedIn (manuel)
```

### Flux détaillé (V8)
1. **📥 Récupération** : Extraction d'une idée non traitée depuis Notion
2. **🔍 Préparation** : Extraction robuste des données de l'idée
3. **🔎 Recherche** : Agent Perplexity pour gathering d'informations
4. **✍️ Rédaction** : Agent Claude pour article complet (800-1200 mots)
5. **🏷️ Hashtags** : Agent GPT pour génération de tags optimisés
6. **📱 Synthèse** : Agent Claude pour post LinkedIn copywrité (300-500 mots)
7. **📋 Compilation** : Agrégation et formatage des données
8. **🔧 Payload** : Construction du JSON avec division intelligente des blocs
9. **💾 Sauvegarde** : Création de la page Notion avec article complet
10. **✅ Validation** : Marquage de l'idée comme traitée

## 🛠️ Configuration Requise

### Prérequis
- **n8n v1.105.3+** (self-hosted)
- Compte Notion avec API activée
- Accès API : OpenRouter (Claude, Perplexity, GPT)
- Node.js 18+

### Credentials nécessaires
- **Notion** : Token d'intégration interne
- **OpenRouter** : Clé API avec crédits suffisants

## 📊 Structure des Données

### Base "Banque d'idées - Articles IA" (Input)
**ID**: `507bd450-7b64-4b78-b44d-4ceeb809f1e0`

Propriétés principales :
- **Titre/Idée principale** : Le sujet à développer
- **Traité** : Checkbox pour marquer comme fait
- **Sources/URLs** : Références externes
- **Notes personnelles** : Vos insights
- **Angle personnel** : Votre expertise
- **Questions à adresser** : Points clés

### Base "Articles LinkedIn Générés" (Output)
**ID**: `9b915f4f6bae479f9326ff2cfdabadd3`

Propriétés générées :
- **Titre** : Extrait automatiquement du contenu
- **Contenu article** : Version optimisée (max 2000 car)
- **Hashtags** : Tags LinkedIn pertinents
- **Post LinkedIn complet** : Synthèse copywritée
- **Public cible** : "Professionnels et décideurs"
- **Statistiques clés** : Chiffres extraits

## 🚀 Installation et utilisation

### 1. Importer le workflow
```bash
# Dans n8n, importer : workflow-principal-v8.json
```

### 2. Configurer les credentials
- Ajouter credential Notion avec votre token
- Ajouter credential OpenRouter avec votre API key

### 3. Vérifier les IDs
Les IDs des bases Notion sont déjà configurés dans le workflow.

### 4. Lancer le workflow
- Mode manuel : Cliquer sur "Execute Workflow"
- Mode auto : Configurer un trigger schedule

## 💡 Points importants

### Limites techniques
- **Propriétés Notion** : Max 2000 caractères (limite API)
- **Blocs Notion** : Max 2000 caractères par bloc
- **Solution V8** : Division intelligente des paragraphes longs

### Où trouver le contenu complet ?
- **Propriétés** = Version résumée/aperçu
- **Corps de la page** = Article COMPLET sans limite

### Coûts estimés
- ~0.10-0.20€ par article généré
- Dépend de la longueur et du nombre d'appels API

## 📁 Organisation des fichiers

```
communication-hartran/
├── workflow-principal-v8.json    # ⭐ VERSION À UTILISER
├── workflow-principal-v7.json    # Version précédente
├── workflow-principal-v6.json    # Version avec synthèse LinkedIn
├── README.md                     # Ce fichier
├── SYNTHESE-FINALE-PROJET.md     # Résumé complet du projet
├── docs/
│   ├── CLAUDE.md                 # Architecture technique
│   ├── HISTORIQUE.md             # Chronologie des versions
│   └── PROPERTIES-NOTION.md      # Schémas des bases
└── archives/                     # Anciennes versions
```

## 🎯 Résultats garantis

✅ Articles de 800-1200 mots sur le sujet défini
✅ Post LinkedIn optimisé avec emojis et CTA
✅ Hashtags pertinents et actuels
✅ Aucune perte de contenu (V8)
✅ Formatage professionnel

## 🐛 Troubleshooting

Si erreur :
1. Vérifier les credentials API
2. Consulter les logs n8n
3. Vérifier que l'idée a bien toutes les propriétés
4. S'assurer d'avoir des crédits OpenRouter

## 📈 Évolutions futures possibles

- Publication automatique sur LinkedIn
- Génération d'images avec DALL-E
- Multi-langues
- Analytics des performances

---

**Version actuelle : V8 (16 janvier 2025)**

*Workflow créé pour automatiser complètement la génération de contenu LinkedIn professionnel*