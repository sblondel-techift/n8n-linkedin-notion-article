# Guide de Diagnostic des Propriétés Notion

## 🔍 Objectif

Ce workflow de diagnostic permet de récupérer automatiquement TOUTES les propriétés des deux bases de données Notion avec leurs types et configurations exactes.

## 📋 Utilisation

### 1. Importer le workflow

1. Ouvrez n8n
2. Importez le fichier `workflow-diagnostic-properties.json`
3. Configurez vos credentials Notion (si ce n'est pas déjà fait)

### 2. Exécuter le diagnostic

1. Cliquez sur "Execute Workflow"
2. Le workflow va récupérer en parallèle :
   - Le schéma de la base "Idées d'articles"
   - Le schéma de la base "Articles LinkedIn générés"

### 3. Consulter les résultats

Le workflow affiche :
- **Dans la console** : Un rapport détaillé avec toutes les propriétés
- **Dans le dernier nœud** : Un JSON structuré avec toutes les informations

## 📊 Informations récupérées

Pour chaque base de données, le workflow récupère :

### Informations générales
- Nom de la base
- ID de la base
- Nombre total de propriétés

### Pour chaque propriété
- **Nom exact** : Tel qu'il apparaît dans Notion (avec accents, espaces, etc.)
- **Type** : title, rich_text, checkbox, select, multi_select, number, date, etc.
- **ID interne** : Identifiant unique de la propriété
- **Configuration** : Options pour les selects, format pour les dates, etc.

## 🎯 Ce que vous devez vérifier

### Base "Idées d'articles"

Propriétés attendues :
- `Titre/Idée principale` (type: title)
- `Sources/URLs` (type: rich_text)
- `Notes personnelles` (type: rich_text)
- `Angle personnel` (type: rich_text)
- `Questions à adresser` (type: rich_text)
- `Traité` (type: checkbox)

### Base "Articles LinkedIn générés"

Propriétés attendues :
- `Titre` (type: title)
- `Contenu article` (type: rich_text)
- `Hashtags` (type: rich_text)
- `Post LinkedIn complet` (type: rich_text)
- `Public cible` (type: select)
- `Statistiques clés` (type: rich_text)

## ⚠️ Points d'attention

1. **Noms exacts** : Les noms doivent correspondre EXACTEMENT (casse, accents, espaces)
2. **Types corrects** : Vérifiez que les types correspondent à ce qui est attendu
3. **Options des selects** : Pour "Public cible", vérifiez que l'option "Professionnels et décideurs" existe

## 🔧 Résolution des problèmes

### Si une propriété manque
1. Créez-la dans Notion avec le nom exact
2. Assurez-vous du bon type (rich_text, checkbox, etc.)
3. Relancez le diagnostic

### Si le type est incorrect
1. Vous ne pouvez pas changer le type dans Notion
2. Créez une nouvelle propriété avec le bon type
3. Migrez les données si nécessaire
4. Mettez à jour le workflow principal

### Si les noms ne correspondent pas
1. Notez les noms exacts du diagnostic
2. Mettez à jour le workflow principal avec ces noms
3. OU renommez les propriétés dans Notion

## 📝 Exemple de rapport

```
📊 RAPPORT COMPLET DES PROPRIÉTÉS NOTION
========================================

📥 BASE "IDÉES D'ARTICLES"
ID: 507bd4507b644b78b44d4ceeb809f1e0
Nombre de propriétés: 8

Propriétés:
----------------------------------------
✓ Titre/Idée principale
  Type: title
  ID: title

✓ Traité
  Type: checkbox
  ID: xYz1

✓ Sources/URLs
  Type: rich_text
  ID: abc2

[...]

📝 BASE "ARTICLES LINKEDIN GÉNÉRÉS"
ID: 9b915f4f6bae479f9326ff2cfdabadd3
Nombre de propriétés: 10

Propriétés:
----------------------------------------
✓ Titre
  Type: title
  ID: title

✓ Public cible
  Type: select
  ID: def3
  Options: {
    "options": [
      {"name": "Professionnels et décideurs", "color": "blue"},
      {"name": "Entrepreneurs", "color": "green"}
    ]
  }

[...]
```

## 🚀 Prochaines étapes

1. **Exécutez le diagnostic**
2. **Copiez le rapport** depuis la console
3. **Partagez les résultats** pour qu'on puisse ajuster le workflow principal
4. **Corrigez les écarts** entre ce qui est attendu et ce qui existe

---

*Ce diagnostic est essentiel pour s'assurer que le workflow principal fonctionne correctement avec vos bases Notion.*