# 🔧 Correction de l'erreur "JSON parameter needs to be valid JSON"

## 📅 Date : 16 janvier 2025

## ❌ Erreur rencontrée

```
JSON parameter needs to be valid JSON
```

Au niveau du nœud "💾 Créer Article dans Notion" (HTTP Request)

## 🎯 Cause du problème

Le jsonBody dans le HTTP Request utilisait des expressions n8n `{{ }}` à l'intérieur d'une chaîne JSON, ce qui n'est pas supporté correctement. Les expressions n'étaient pas évaluées, créant un JSON invalide.

❌ **Code problématique** :
```json
"jsonBody": "={\n  \"properties\": {\n    \"Titre\": {\n      \"title\": [\n        {\n          \"text\": {\n            \"content\": \"{{ $json.titre }}\"\n          }\n        }\n      ]\n    }\n  }\n}"
```

## ✅ Solution appliquée

J'ai ajouté un nouveau nœud intermédiaire pour préparer l'objet JSON correctement avant de l'envoyer.

### 1. **Nouveau nœud "🔧 Préparer payload Notion"**

Ce nœud Code JavaScript construit l'objet JSON proprement :

```javascript
// Préparation du JSON pour l'API Notion
const notionPayload = {
  parent: {
    database_id: "9b915f4f6bae479f9326ff2cfdabadd3"
  },
  properties: {
    "Titre": {
      title: [
        {
          text: {
            content: $json.titre || "Sans titre"
          }
        }
      ]
    },
    "Contenu article": {
      rich_text: [
        {
          text: {
            content: $json.contenuArticle || ""
          }
        }
      ]
    },
    // ... autres propriétés
  }
};

return {
  ...($json || {}),
  notionPayload: notionPayload
};
```

### 2. **HTTP Request simplifié**

Le nœud HTTP Request utilise maintenant simplement :
```
"jsonBody": "={{ $json.notionPayload }}"
```

## 🔄 Nouveau flux

```
📋 Préparer données finales
   ↓
🔧 Préparer payload Notion (NOUVEAU)
   ↓
💾 Créer Article dans Notion
```

## 🚨 Points clés

1. **Ne jamais mélanger** expressions n8n `{{ }}` dans des chaînes JSON
2. **Utiliser un nœud Code** pour construire des objets JSON complexes
3. **Toujours prévoir** des valeurs par défaut (`|| ""`) pour éviter null/undefined
4. **Séparer la logique** : un nœud pour préparer les données, un autre pour l'envoi

## ✨ Avantages de cette approche

- ✅ JSON toujours valide
- ✅ Plus facile à déboguer
- ✅ Gestion d'erreur robuste
- ✅ Réutilisable pour d'autres requêtes

## 📁 Fichier créé

- **`workflow-principal-v3.json`** : Version corrigée avec le nouveau nœud

---

*Cette erreur est courante dans n8n lors de l'utilisation de HTTP Request avec des payloads JSON complexes. La solution est de toujours préparer l'objet dans un nœud Code séparé.*
