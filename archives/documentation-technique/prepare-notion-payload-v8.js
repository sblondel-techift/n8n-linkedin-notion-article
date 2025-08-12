// Préparation du JSON pour l'API Notion - VERSION 8

// Fonction pour diviser intelligemment un texte long en blocs de max 2000 caractères
function diviserTexteEnBlocs(texte, maxLength = 1950) {
  if (texte.length <= maxLength) {
    return [texte];
  }
  
  const blocs = [];
  let restant = texte;
  
  while (restant.length > 0) {
    if (restant.length <= maxLength) {
      blocs.push(restant);
      break;
    }
    
    // Chercher un point de coupure naturel (fin de phrase)
    let cutIndex = maxLength;
    const finsDePhrases = ['. ', '! ', '? ', '.\n', '!\n', '?\n'];
    
    for (const fin of finsDePhrases) {
      const lastIndex = restant.lastIndexOf(fin, maxLength);
      if (lastIndex > maxLength * 0.7) { // Au moins 70% du max
        cutIndex = lastIndex + fin.length - 1;
        break;
      }
    }
    
    // Si pas de fin de phrase, chercher un espace
    if (cutIndex === maxLength) {
      const lastSpace = restant.lastIndexOf(' ', maxLength);
      if (lastSpace > maxLength * 0.7) {
        cutIndex = lastSpace;
      }
    }
    
    blocs.push(restant.substring(0, cutIndex).trim());
    restant = restant.substring(cutIndex).trim();
  }
  
  return blocs;
}

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
    "Hashtags": {
      rich_text: [
        {
          text: {
            content: $json.hashtags || ""
          }
        }
      ]
    },
    "Post LinkedIn complet": {
      rich_text: [
        {
          text: {
            content: $json.postLinkedInComplet || ""
          }
        }
      ]
    },
    "Public cible": {
      select: {
        name: "Professionnels et décideurs"
      }
    },
    "Statistiques clés": {
      rich_text: [
        {
          text: {
            content: $json.statistiquesCles || ""
          }
        }
      ]
    }
  },
  // Ajouter le contenu complet dans le corps de la page
  children: [
    {
      object: "block",
      type: "heading_1",
      heading_1: {
        rich_text: [
          {
            type: "text",
            text: {
              content: $json.titre || "Article LinkedIn"
            }
          }
        ]
      }
    },
    {
      object: "block",
      type: "divider",
      divider: {}
    },
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "📄 Article complet"
            }
          }
        ]
      }
    },
    // Diviser l'article en paragraphes puis en blocs si nécessaire
    ...(($json.contenuArticleComplet || "").split('\n\n')
      .filter(p => p.trim())
      .flatMap(paragraphe => {
        // Si le paragraphe est trop long, le diviser en plusieurs blocs
        const blocs = diviserTexteEnBlocs(paragraphe, 1950);
        return blocs.map(bloc => ({
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: bloc
                }
              }
            ]
          }
        }));
      })),
    {
      object: "block",
      type: "divider",
      divider: {}
    },
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "🚀 Post LinkedIn prêt à publier"
            }
          }
        ]
      }
    },
    {
      object: "block",
      type: "callout",
      callout: {
        rich_text: [
          {
            type: "text",
            text: {
              // Le post LinkedIn aussi peut être long, on le divise si nécessaire
              content: diviserTexteEnBlocs($json.postLinkedInCompletTotal || "", 1950)[0]
            }
          }
        ],
        icon: {
          type: "emoji",
          emoji: "📱"
        },
        color: "blue_background"
      }
    },
    // Si le post LinkedIn est trop long pour un seul callout, ajouter la suite
    ...(diviserTexteEnBlocs($json.postLinkedInCompletTotal || "", 1950).slice(1).map(bloc => ({
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: bloc
            }
          }
        ]
      }
    }))),
    {
      object: "block",
      type: "divider",
      divider: {}
    },
    {
      object: "block",
      type: "heading_3",
      heading_3: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "📊 Métadonnées"
            }
          }
        ]
      }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `Généré le : ${new Date($json.dateGeneration).toLocaleString('fr-FR')}`
            }
          }
        ]
      }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `Longueur : ${$json.nombreMots || 0} mots (${$json.longueurArticle || 0} caractères)`
            }
          }
        ]
      }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `ID de l'idée source : ${$json.ideaId}`
            }
          }
        ]
      }
    },
    {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            type: "text",
            text: {
              content: `Article tronqué dans les propriétés : ${$json.articleTronque ? "Oui (limite API 2000 car)" : "Non"}`
            }
          }
        ]
      }
    }
  ]
};

// Log pour debug
console.log("=== PAYLOAD NOTION V8 ===");
console.log("- Nombre de propriétés:", Object.keys(notionPayload.properties).length);
console.log("- Nombre de blocs children:", notionPayload.children.length);

// Vérifier si des paragraphes ont été divisés
const articleComplet = $json.contenuArticleComplet || "";
const paragraphesOriginaux = articleComplet.split('\n\n').filter(p => p.trim()).length;
const blocsFinaux = notionPayload.children.filter(b => b.type === 'paragraph').length;
console.log(`- Paragraphes originaux: ${paragraphesOriginaux}`);
console.log(`- Blocs paragraph finaux: ${blocsFinaux}`);
if (blocsFinaux > paragraphesOriginaux) {
  console.log(`  → ${blocsFinaux - paragraphesOriginaux} paragraphes ont été divisés car trop longs`);
}

// Retourner le payload avec toutes les autres données
return {
  ...($json || {}),
  notionPayload: notionPayload
};
