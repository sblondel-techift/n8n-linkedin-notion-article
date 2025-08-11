# Guide de Configuration des Credentials N8N

## Workflow créé avec succès ! 🎉

Votre workflow est maintenant disponible à : https://n8n.srv802498.hstgr.cloud/workflow/8fRjPcH3dc54VPPX

## Credentials à configurer dans N8N

Pour que le workflow fonctionne, vous devez configurer les credentials suivants dans N8N :

### 1. Notion API
- **Type** : Notion API
- **Nom suggéré** : "Notion - Articles LinkedIn"
- **Token requis** : Votre token d'intégration Notion
- **Comment l'obtenir** :
  1. Allez sur https://www.notion.so/my-integrations
  2. Créez une nouvelle intégration
  3. Copiez le token
  4. Donnez accès à l'intégration aux deux bases de données :
     - Banque d'idées (ID: 507bd4507b644b78b44d4ceeb809f1e0)
     - Articles générés (ID: 9b915f4f6bae479f9326ff2cfdabadd3)

### 2. Perplexity API
- **Type** : HTTP Request (Header Auth)
- **Nom suggéré** : "Perplexity API"
- **Configuration** :
  - Header Name : `Authorization`
  - Header Value : `Bearer YOUR_PERPLEXITY_API_KEY`
- **Comment l'obtenir** :
  1. Créez un compte sur https://www.perplexity.ai
  2. Allez dans les paramètres API
  3. Générez une clé API

### 3. Claude (Anthropic) API
- **Type** : HTTP Request (Header Auth)
- **Nom suggéré** : "Claude API"
- **Configuration** :
  - Header Name : `x-api-key`
  - Header Value : `YOUR_ANTHROPIC_API_KEY`
- **Comment l'obtenir** :
  1. Créez un compte sur https://console.anthropic.com
  2. Générez une clé API

### 4. OpenAI API
- **Type** : HTTP Request (Header Auth)
- **Nom suggéré** : "OpenAI API"
- **Configuration** :
  - Header Name : `Authorization`
  - Header Value : `Bearer YOUR_OPENAI_API_KEY`
- **Comment l'obtenir** :
  1. Créez un compte sur https://platform.openai.com
  2. Générez une clé API

## Structure du Workflow

Le workflow suit cette séquence :

1. **🚀 Déclencheur Manuel** : Lance le processus
2. **📥 Récupérer Idée Non Traitée** : Récupère la prochaine idée avec statut "Non traité" (priorité haute en premier)
3. **🔍 Enrichir avec Perplexity** : Recherche approfondie sur le sujet
4. **✍️ Rédiger avec Claude** : Génère l'article de 800-1200 mots
5. **🏷️ Générer Hashtags** : Crée 10 hashtags pertinents avec GPT-4
6. **💾 Sauvegarder Article** : Enregistre dans la base "Articles LinkedIn Générés"
7. **✅ Marquer Idée Traitée** : Met à jour le statut de l'idée source

## Colonnes Notion importantes

### Base "Banque d'idées" :
- **Titre** : Le sujet de l'article
- **Contexte et sources** : Informations de base pour la recherche
- **Notes personnelles** : Angle éditorial spécifique (optionnel)
- **Question à adresser** : Focus particulier pour l'article (optionnel)
- **Statut** : "Non traité" → "Traité"
- **Priorité** : Détermine l'ordre de traitement

### Base "Articles générés" :
- **Titre** : Repris de l'idée source
- **Contenu** : Article complet généré
- **Hashtags** : 10 hashtags optimisés
- **Date de génération** : Automatique
- **Statut** : "Publié"
- **Idée source** : Relation vers l'idée originale

## Test du workflow

Pour tester avec votre idée GTM :
1. Vérifiez que l'idée a bien le statut "Non traité" dans Notion
2. Configurez tous les credentials dans N8N
3. Cliquez sur "Execute Workflow" dans N8N
4. Vérifiez le résultat dans la base "Articles LinkedIn Générés"