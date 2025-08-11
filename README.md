# Workflow N8n - Génération d'Articles LinkedIn

## 📋 Vue d'ensemble

Ce projet contient un workflow n8n automatisé pour générer des articles LinkedIn professionnels à partir d'idées stockées dans Notion.

### 🎯 Objectif
Automatiser la création d'articles LinkedIn de qualité en utilisant l'IA pour :
- Rechercher des informations pertinentes (Perplexity)
- Rédiger l'article (Claude)
- Générer des hashtags optimisés (GPT-4)
- Sauvegarder dans Notion

## 🏗️ Architecture du Workflow

```
[Notion: Idées] → [Recherche IA] → [Rédaction IA] → [Hashtags IA] → [Sauvegarde Notion] → [Mise à jour statut]
```

### Composants principaux :
1. **📥 Récupérer Idée Non Traitée** : Extrait une idée non traitée de Notion
2. **🔍 Agent Recherche Perplexity** : Recherche d'informations actuelles
3. **✍️ Agent Rédaction Claude** : Rédaction de l'article (800-1200 mots)
4. **🏷️ Agent Hashtags GPT** : Génération de 10 hashtags pertinents
5. **💾 Agent IA - Sauvegarder Article** : Sauvegarde dans Notion via Agent IA
6. **✅ Marquer Idée Traitée** : Mise à jour du statut

## 📁 Structure du projet

```
communication-hartran/
├── workflows/
│   ├── hartran-linkedin-article-CURRENT.json  # Version actuelle du workflow
│   └── versions/                               # Historique des versions
│       ├── workflow-update.json
│       ├── workflow-with-ai-agents.json
│       ├── workflow-fixed.json
│       └── ...
├── docs/
│   └── HISTORIQUE.md                          # Historique détaillé des modifications
├── README.md                                   # Ce fichier
├── CLAUDE.md                                   # Contexte pour l'IA
└── hartran-linkedin-article-problem.json      # Fichier de travail actuel
```

## 🔧 Configuration requise

### Bases de données Notion
- **Base Idées** : `507bd4507b644b78b44d4ceeb809f1e0`
  - Colonnes : Titre, Contexte et sources, Notes personnelles, Questions à adresser, Statut, Date de traitement
  
- **Base Articles Générés** : `9b915f4f6bae479f9326ff2cfdabadd3`
  - Colonnes : Titre, Contenu Article, Public Cible, Hashtags, Date de génération, Idée source (relation)

### Credentials nécessaires
- Notion API (OAuth2)
- Anthropic API (Claude)
- OpenAI API (GPT-4)
- OpenRouter API (Perplexity)

## 🚨 État actuel et problèmes

### ✅ Résolu
- Remplacement du nœud Notion problématique par un Agent IA
- L'Agent IA gère maintenant la sauvegarde avec plus de flexibilité

### ⚠️ À vérifier
1. Tester le nouveau workflow avec l'Agent IA pour la sauvegarde
2. Vérifier que toutes les propriétés sont correctement mappées
3. S'assurer que les credentials sont bien configurés

## 🚀 Prochaines étapes

1. **Test du workflow modifié**
   - Importer `hartran-linkedin-article-problem.json` dans n8n
   - Vérifier les IDs des bases de données
   - Tester avec une idée simple

2. **Optimisations possibles**
   - Ajouter gestion d'erreurs
   - Logs détaillés pour debug
   - Notification en cas de succès/échec

3. **Améliorations futures**
   - Support multi-langues
   - Personnalisation du ton selon l'audience
   - Analyse de performance des articles

## 📝 Notes importantes

- **Simplify** doit être sur `False` dans les nœuds Notion
- Les noms de propriétés doivent correspondre EXACTEMENT entre n8n et Notion
- L'Agent IA offre plus de flexibilité pour gérer les formats Notion

## 🐛 Debug

Si erreur "Cannot read properties of undefined (reading 'text')" :
1. Vérifier que l'idée source contient bien du texte
2. S'assurer que les propriétés existent dans Notion
3. Utiliser l'Agent IA plutôt que le nœud Notion standard

## 📞 Support

Pour toute question sur ce workflow, consulter :
- La documentation n8n : https://docs.n8n.io
- L'API Notion : https://developers.notion.com
- Ce README et le fichier CLAUDE.md pour le contexte complet