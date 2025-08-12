// Préparation du JSON pour l'API Notion - VERSION 5
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
            // Version résumée pour la propriété
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
            // Version résumée avec emoji et hashtags
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
    // Diviser l'article en paragraphes pour Notion
    ...($json.contenuArticleComplet || "").split('\n\n').filter(p => p.trim()).map(paragraphe => ({
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: paragraphe.substring(0, 2000) // Limite par bloc
            }
          }
        ]
      }
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
              content: $json.postLinkedInCompletTotal || ""
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
    }
  ]
};

// Retourner le payload avec toutes les autres données
return {
  ...($json || {}),
  notionPayload: notionPayload
};
