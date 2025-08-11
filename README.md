# Workflow n8n - Générateur d'Articles LinkedIn avec Notion

## 📁 Structure du projet

```
communication-hartran/
├── workflow-principal.json      # Workflow n8n principal avec agents IA
├── archives/
│   └── workflow-original.json   # Version originale fournie par l'utilisateur
├── docs/
│   ├── CLAUDE.md               # Contexte complet du projet
│   ├── PROPERTIES-NOTION.md    # Documentation des propriétés Notion
│   └── HISTORIQUE.md           # Historique des modifications
└── README.md                   # Ce fichier

```

## 🚀 Installation et utilisation

1. **Importer le workflow dans n8n** :
   - Utilisez `workflow-principal.json`
   - Ce workflow contient 4 agents IA configurés

2. **Configurer les credentials** :
   - Notion API
   - Anthropic (Claude)
   - OpenRouter (Perplexity)
   - OpenAI (GPT-4)

3. **Vérifier les IDs des bases Notion** :
   - Base Idées : `507bd4507b644b78b44d4ceeb809f1e0`
   - Base Articles : `9b915f4f6bae479f9326ff2cfdabadd3`

## 🔄 Fonctionnement du workflow

### Étapes du processus :
1. **Déclencheur manuel** : Lancement du workflow
2. **Récupération idée** : Cherche une idée non traitée dans Notion
3. **Agent Perplexity** : Recherche d'informations actuelles
4. **Agent Claude** : Rédaction de l'article (800-1200 mots)
5. **Agent GPT-4** : Génération des hashtags optimisés
6. **Agent Notion** : Sauvegarde de l'article dans la base
7. **Mise à jour** : Marque l'idée comme traitée

## 📊 Bases de données Notion

### Base "Idées d'articles"
- **Titre/Idée principale** : Le sujet de l'article
- **Contexte et sources** : URLs et références
- **Notes personnelles** : Réflexions et angle éditorial
- **Questions à adresser** : Points spécifiques à couvrir
- **Statut** : Non traité / Traité
- **Traité** : Checkbox pour marquer comme traité

### Base "Articles LinkedIn générés"
- **Titre** : Titre de l'article
- **Contenu article** : Corps du texte
- **Hashtags** : Tags générés
- **Post LinkedIn complet** : Version finale formatée
- **Public cible** : Audience visée
- **Statistiques clés** : Points de données importants

## ⚠️ Résolution de problèmes

### Si les agents IA ne génèrent pas de contenu :
1. Vérifier les credentials API
2. Tester chaque agent individuellement
3. Vérifier la structure de sortie des agents
4. S'assurer que les modèles sont disponibles

### Si erreur "undefined" sur l'ID :
- Utiliser la référence directe : `$('📥 Récupérer Idée Non Traitée').item.json.id`
- Ne pas utiliser `$json` pour référencer d'autres nœuds

## 📝 Notes importantes

- **Version n8n** : 1.105.3 Self Hosted
- **Simplify** : Toujours désactivé dans les nœuds Notion
- **Expressions** : Format `={{ }}` avec JavaScript

## 🔧 Développement

Pour modifier le workflow :
1. Importer dans n8n
2. Faire les modifications
3. Exporter le JSON
4. Remplacer `workflow-principal.json`
5. Commiter les changements

---

*Dernière mise à jour : 11 août 2025*