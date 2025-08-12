// Préparation des données pour la sauvegarde Notion - VERSION 5

// D'abord, récupérer les données du nœud Notion
const notionItem = $('📥 Récupérer Idée Non Traitée').first().json;

// DEBUG : Afficher la structure pour comprendre
console.log('=== STRUCTURE NOTION ITEM ===');
console.log('Clés disponibles:', Object.keys(notionItem || {}));

// Vérifier si les données existent et extraire le titre avec gestion d'erreur
let titre = "Sans titre";
try {
  // Récupérer depuis les données préparées si disponible
  const preparedData = $('🔍 Préparer données idée').first().json;
  if (preparedData?.extracted?.titre) {
    titre = preparedData.extracted.titre;
  } else {
    // Sinon essayer différentes façons d'accéder au titre
    if (notionItem?.properties?.title) {
      titre = notionItem.properties.title[0]?.plain_text || notionItem.properties.title[0]?.text?.content || "Sans titre";
    } else if (notionItem?.properties?.['Titre/Idée principale']) {
      titre = notionItem.properties['Titre/Idée principale'].title[0]?.plain_text || 
              notionItem.properties['Titre/Idée principale'].title[0]?.text?.content || "Sans titre";
    }
  }
} catch (e) {
  console.log("Erreur lors de l'extraction du titre initial:", e.message);
}

// Récupérer l'ID de l'idée
const ideaId = notionItem?.id || "";

// Récupérer le contenu COMPLET de l'article depuis Claude
let contenuArticleComplet = "";
try {
  contenuArticleComplet = $('✍️ Agent Rédaction Claude').first().json.output || "";
} catch (e) {
  console.log("Erreur lors de la récupération du contenu Claude:", e.message);
}

// Extraire le titre depuis la première ligne du contenu si pas de titre
let titreFinal = titre;
const lignes = contenuArticleComplet.split('\n').filter(l => l.trim());
if ((titre === "Sans titre" || titre.length < 5) && lignes.length > 0) {
  // Chercher une ligne qui ressemble à un titre (pas trop longue, pas de ponctuation finale sauf ?)
  for (let i = 0; i < Math.min(3, lignes.length); i++) {
    const ligne = lignes[i].trim();
    if (ligne.length > 10 && ligne.length < 150 && !ligne.endsWith('.') && !ligne.startsWith('-')) {
      titreFinal = ligne;
      console.log("Titre extrait du contenu:", titreFinal);
      break;
    }
  }
}

// Récupérer les hashtags depuis GPT
let hashtags = "";
try {
  hashtags = $('🏷️ Agent Hashtags GPT').first().json.output || "";
} catch (e) {
  console.log("Erreur lors de la récupération des hashtags:", e.message);
}

// Extraction des statistiques clés du contenu
const stats = contenuArticleComplet.match(/\d+[%€$]?|\d+\s*(millions?|milliards?|%)/gi) || [];
const statistiquesCles = stats.join(', ');

// Créer le post LinkedIn avec emojis
const emojis = ["🚀", "📊", "💡", "🎯", "✨", "🔍", "📈", "🌟", "⚡", "🏆", "💪", "🔥"];
const emojiAleatoire = emojis[Math.floor(Math.random() * emojis.length)];

// Post LinkedIn complet avec emoji et hashtags
const postLinkedInComplet = `${emojiAleatoire} ${contenuArticleComplet}\n\n${hashtags}`;

// Créer des versions résumées pour les propriétés (limite 2000 caractères)
const LIMITE_CHARS = 1900; // Un peu moins que 2000 pour la sécurité

const contenuResume = contenuArticleComplet.length > LIMITE_CHARS ? 
  contenuArticleComplet.substring(0, LIMITE_CHARS) + "... [Voir article complet]" : 
  contenuArticleComplet;

const postLinkedInResume = postLinkedInComplet.length > LIMITE_CHARS ? 
  postLinkedInComplet.substring(0, LIMITE_CHARS) + "... [Voir article complet]" : 
  postLinkedInComplet;

// Log pour débogage
console.log("=== DONNÉES PRÉPARÉES ===");
console.log("- Titre final:", titreFinal);
console.log("- ID de l'idée:", ideaId);
console.log("- Longueur article complet:", contenuArticleComplet.length);
console.log("- Longueur post LinkedIn:", postLinkedInComplet.length);
console.log("- Hashtags:", hashtags);
console.log("- Emoji choisi:", emojiAleatoire);

// Retourner toutes les données
return {
  // Données pour les propriétés (avec limite de caractères)
  titre: titreFinal,
  contenuArticle: contenuResume,
  hashtags: hashtags,
  postLinkedInComplet: postLinkedInResume,
  statistiquesCles: statistiquesCles.substring(0, LIMITE_CHARS),
  
  // Données complètes pour le corps de la page
  contenuArticleComplet: contenuArticleComplet,
  postLinkedInCompletTotal: postLinkedInComplet,
  
  // Métadonnées
  ideaId: ideaId,
  dateGeneration: new Date().toISOString(),
  longueurArticle: contenuArticleComplet.length,
  nombreMots: contenuArticleComplet.split(/\s+/).length
};
