# Contexte pour Claude - Projet Workflow LinkedIn

## 🎯 Résumé du projet

L'utilisateur (Sébastien Blondel) développe un workflow n8n pour automatiser la génération d'articles LinkedIn à partir d'idées stockées dans Notion. Le workflow utilise plusieurs agents IA en chaîne pour rechercher, rédiger et optimiser le contenu.

## 💡 Problème principal résolu

### Erreur initiale
- **Symptôme** : "Cannot read properties of undefined (reading 'text')" lors de la sauvegarde dans Notion
- **Cause** : Problème de mapping des propriétés entre n8n et l'API Notion
- **Solution appliquée** : Remplacement du nœud Notion standard par un Agent IA avec l'outil Notion

## 🔄 Workflow actuel

1. **Déclenchement manuel** → Récupère une idée non traitée depuis Notion
2. **Agent Perplexity** → Recherche d'informations actuelles sur le sujet
3. **Agent Claude** → Rédaction de l'article (800-1200 mots)
4. **Agent GPT-4** → Génération de hashtags optimisés
5. **Agent IA avec Notion Tool** → Sauvegarde de l'article dans Notion
6. **Mise à jour** → Marque l'idée comme traitée

## 📊 Bases de données Notion

### Base "Idées d'articles" (ID: 507bd4507b644b78b44d4ceeb809f1e0)
- **Titre** : Titre de l'idée
- **Contexte et sources** : Informations de base
- **Notes personnelles** : Angle éditorial souhaité
- **Questions à adresser** : Points spécifiques à couvrir
- **Statut** : Traité/Non traité
- **Date de traitement** : Timestamp

### Base "Articles LinkedIn générés" (ID: 9b915f4f6bae479f9326ff2cfdabadd3)
- **Titre** : Titre de l'article
- **Contenu Article** : Corps de l'article
- **Public Cible** : Audience visée
- **Hashtags** : Tags générés
- **Date de génération** : Timestamp
- **Idée source** : Relation vers l'idée originale
- **Image URL** : Image associée (optionnel)
- **Performance** : Métriques (optionnel)
- **Post LinkedIn Complet** : Version finale
- **Statistiques Clés** : Data points
- **URL** : Lien vers le post publié

## 🛠️ Modifications apportées (07/08/2025)

1. **Remplacement du nœud "Sauvegarder Article"** :
   - Ancien : Nœud Notion standard avec mapping manuel
   - Nouveau : Agent IA avec Claude Sonnet + Notion Tool
   
2. **Avantages de la nouvelle approche** :
   - Gestion automatique du format Notion
   - Plus de flexibilité sur les propriétés
   - Meilleure gestion des erreurs
   - Debug plus facile

## ⚠️ Points d'attention

1. **Noms des propriétés** : Doivent correspondre EXACTEMENT entre n8n et Notion (casse, espaces, accents)
2. **Simplify** : Toujours mettre sur `False` dans les nœuds Notion
3. **Relations** : L'ID de l'idée source doit être passé correctement pour la relation
4. **Credentials** : Vérifier que toutes les API sont bien configurées

## 🔍 Debugging

### Si erreur de sauvegarde Notion :
1. Vérifier que les propriétés existent dans la base cible
2. S'assurer que les types correspondent (text, title, date, relation)
3. Tester avec des données minimales d'abord
4. Utiliser l'Agent IA plutôt que le nœud standard

### Commandes utiles n8n :
- Test d'un seul nœud : Clic sur "Execute Node"
- Voir les données : Onglet "Output" après exécution
- Debug : Onglet "JSON" pour voir la structure exacte

## 📈 Améliorations futures suggérées

1. **Gestion d'erreurs robuste** : Try/catch et notifications
2. **Logs détaillés** : Traçabilité complète du processus
3. **Batch processing** : Traiter plusieurs idées à la fois
4. **Scheduling** : Automatisation complète via CRON
5. **Analytics** : Suivi de performance des articles générés
6. **Templates** : Différents formats selon le type de contenu
7. **Review humaine** : Étape de validation avant publication

## 🚀 Pour reprendre le projet

1. Importer le fichier `hartran-linkedin-article-problem.json` dans n8n
2. Vérifier les IDs des bases de données Notion
3. Configurer les credentials (Notion, Claude, OpenAI, OpenRouter)
4. Tester d'abord avec le déclencheur manuel
5. Vérifier que l'Agent IA sauvegarde correctement

## 📝 Notes de l'utilisateur

- Préfère les solutions avec Agent IA pour plus de flexibilité
- Souhaite garder la structure du workflow existante
- A besoin de documentation claire pour reprendre plus tard
- Utilise n8n self-hosted version 1.105.3

## 🔗 Ressources

- Documentation n8n : https://docs.n8n.io
- API Notion : https://developers.notion.com
- MCP Notion : Pour intégration avancée avec l'Agent IA

---

*Ce document sert de mémoire pour Claude lors des futures sessions de travail sur ce projet.*