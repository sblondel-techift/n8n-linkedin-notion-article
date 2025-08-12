// Préparation des données pour la sauvegarde Notion - VERSION 7

// Récupérer les données du nœud Notion
const notionItem = $('📥 Récupérer Idée Non Traitée').first().json;

// Récupérer l'ID de l'idée
const ideaId = notionItem?.id || "";

// Récupérer le contenu COMPLET de l'article depuis Claude
let contenuArticleComplet = "";
try {
  contenuArticleComplet = $('✍️ Agent Rédaction Claude').first().json.output || "";
} catch (e) {
  console.log("Erreur lors de la récupération du contenu Claude:", e.message);
}

// Extraire le titre depuis le contenu - chercher après "Titre:"
let titreFinal = "Sans titre";
const matchTitre = contenuArticleComplet.match(/Titre\s*:\s*(.+)/i);
if (matchTitre && matchTitre[1]) {
  titreFinal = matchTitre[1].trim();
  console.log("Titre extrait avec regex:", titreFinal);
} else {
  // Si pas trouvé, prendre la première ligne non vide
  const lignes = contenuArticleComplet.split('\n').filter(l => l.trim());
  if (lignes.length > 0 && lignes[0].length > 10 && lignes[0].length < 200) {
    titreFinal = lignes[0].trim();
    console.log("Titre pris depuis première ligne:", titreFinal);
  }
}

// Récupérer les hashtags depuis GPT
let hashtags = "";
try {
  hashtags = $('🏷️ Agent Hashtags GPT').first().json.output || "";
} catch (e) {
  console.log("Erreur lors de la récupération des hashtags:", e.message);
}

// Récupérer le post LinkedIn synthétisé
let postLinkedInSynthetise = "";
try {
  postLinkedInSynthetise = $('📱 Synthèse LinkedIn Claude').first().json.output || "";
  console.log("Post LinkedIn synthétisé récupéré");
} catch (e) {
  console.log("Erreur lors de la récupération du post LinkedIn:", e.message);
  // Fallback
  const emojis = ["🚀", "📊", "💡", "🎯", "✨"];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  postLinkedInSynthetise = `${emoji} ${contenuArticleComplet.substring(0, 400)}...\n\n${hashtags}`;
}

// Extraction des statistiques clés
const stats = contenuArticleComplet.match(/\d+[%€$]?|\d+\s*(millions?|milliards?|%)/gi) || [];
const statistiquesCles = stats.join(', ');

// IMPORTANT : Pour la propriété "Contenu article"
// On va essayer une approche intelligente
let contenuPourPropriete = "";

// Si l'article fait moins de 2000 caractères, on le met en entier
if (contenuArticleComplet.length <= 2000) {
  contenuPourPropriete = contenuArticleComplet;
  console.log("Article complet tient dans la propriété");
} else {
  // Sinon, on crée un résumé intelligent
  // Option 1 : Prendre le début jusqu'à une fin de phrase
  let cutIndex = 1950; // Un peu moins que 2000 pour la marge
  
  // Chercher la fin de phrase la plus proche avant 1950
  const finsDePhrases = ['. ', '! ', '? ', '\n\n'];
  for (const fin of finsDePhrases) {
    const lastIndex = contenuArticleComplet.lastIndexOf(fin, cutIndex);
    if (lastIndex > 1500) { // Au moins 1500 caractères
      cutIndex = lastIndex + fin.length - 1;
      break;
    }
  }
  
  contenuPourPropriete = contenuArticleComplet.substring(0, cutIndex).trim();
  
  // Ajouter une indication discrète
  if (!contenuPourPropriete.endsWith('.') && !contenuPourPropriete.endsWith('!') && !contenuPourPropriete.endsWith('?')) {
    contenuPourPropriete += '...';
  }
  
  console.log(`Article résumé intelligemment : ${cutIndex} caractères sur ${contenuArticleComplet.length}`);
}

// Pour le post LinkedIn, même logique
let postLinkedInPourPropriete = postLinkedInSynthetise;
if (postLinkedInSynthetise.length > 2000) {
  // Le post synthétisé ne devrait pas dépasser 500 mots donc ~3000 caractères max
  // Mais au cas où, on coupe intelligemment
  let cutIndex = 1950;
  const finsDePhrases = ['. ', '! ', '? ', '\n\n'];
  for (const fin of finsDePhrases) {
    const lastIndex = postLinkedInSynthetise.lastIndexOf(fin, cutIndex);
    if (lastIndex > 1500) {
      cutIndex = lastIndex + fin.length - 1;
      break;
    }
  }
  postLinkedInPourPropriete = postLinkedInSynthetise.substring(0, cutIndex).trim();
}

// Log pour débogage
console.log("=== DONNÉES PRÉPARÉES V7 ===");
console.log("- Titre final:", titreFinal);
console.log("- Longueur article complet:", contenuArticleComplet.length);
console.log("- Longueur contenu propriété:", contenuPourPropriete.length);
console.log("- Longueur post LinkedIn:", postLinkedInSynthetise.length);
console.log("- Article tronqué ?", contenuArticleComplet.length > 2000 ? "Oui (limite Notion)" : "Non");

// Retourner toutes les données
return {
  // Données pour les propriétés
  titre: titreFinal,
  contenuArticle: contenuPourPropriete,
  hashtags: hashtags,
  postLinkedInComplet: postLinkedInPourPropriete,
  statistiquesCles: statistiquesCles.substring(0, 2000),
  
  // Données complètes pour le corps de la page
  contenuArticleComplet: contenuArticleComplet,
  postLinkedInCompletTotal: postLinkedInSynthetise,
  
  // Métadonnées
  ideaId: ideaId,
  dateGeneration: new Date().toISOString(),
  longueurArticle: contenuArticleComplet.length,
  nombreMots: contenuArticleComplet.split(/\s+/).length,
  articleTronque: contenuArticleComplet.length > 2000
};
