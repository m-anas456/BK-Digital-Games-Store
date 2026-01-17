// Blog Service - Fetches dynamic gaming content from various APIs
const RAWG_API_KEY = 'c84fd8c0e34f42aea0eb94584d44fe01'; // Free RAWG API key

// Fetch latest gaming news from free news APIs
export const fetchGamingNews = async () => {
  try {
    // Using GNews API (free tier - 100 requests/day)
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=playstation+games&lang=en&country=us&max=10&apikey=demo`
    );
    
    if (!response.ok) {
      throw new Error('News API failed');
    }
    
    const data = await response.json();
    
    return data.articles?.map((article, index) => ({
      id: `news-${index}-${Date.now()}`,
      type: 'news',
      title: article.title,
      excerpt: article.description?.slice(0, 150) + '...' || 'Read the full article for more details.',
      content: article.content || article.description,
      image: article.image || 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800',
      date: article.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
      category: 'News',
      relatedGame: null,
      source: article.source?.name || 'Gaming News',
      url: article.url
    })) || [];
  } catch (error) {
    console.log('News API error, using fallback:', error);
    return getFallbackNews();
  }
};

// Fetch game screenshots from RAWG API
export const fetchGameScreenshots = async () => {
  try {
    // Get popular games
    const gamesResponse = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&platforms=18,187&ordering=-rating&page_size=8`
    );
    
    if (!gamesResponse.ok) {
      throw new Error('RAWG API failed');
    }
    
    const gamesData = await gamesResponse.json();
    
    const screenshotPosts = await Promise.all(
      gamesData.results?.slice(0, 6).map(async (game, index) => {
        try {
          // Fetch screenshots for each game
          const screenshotsResponse = await fetch(
            `https://api.rawg.io/api/games/${game.id}/screenshots?key=${RAWG_API_KEY}`
          );
          const screenshotsData = await screenshotsResponse.json();
          
          const images = screenshotsData.results?.slice(0, 6).map(s => s.image) || [];
          
          if (images.length === 0) {
            images.push(game.background_image);
          }
          
          return {
            id: `screenshot-${game.id}-${Date.now()}`,
            type: 'screenshot',
            title: `${game.name} - Screenshot Gallery`,
            excerpt: `Stunning screenshots from ${game.name}. Explore the beautiful visuals and epic moments.`,
            images: images,
            date: game.released || new Date().toISOString().split('T')[0],
            category: 'Screenshots',
            relatedGame: game.name,
            rating: game.rating
          };
        } catch (err) {
          return null;
        }
      }) || []
    );
    
    return screenshotPosts.filter(post => post !== null);
  } catch (error) {
    console.log('Screenshots API error, using fallback:', error);
    return getFallbackScreenshots();
  }
};

// Fetch gaming videos from YouTube (using search embed URLs)
export const fetchGamingVideos = async () => {
  // YouTube Data API requires API key, so we'll use curated video IDs
  // These are popular gaming channels that frequently upload
  const popularGamingVideos = [
    {
      id: `video-1-${Date.now()}`,
      type: 'video',
      title: 'God of War Ragnarok - Full Gameplay Walkthrough',
      excerpt: 'Experience the epic conclusion of the Norse saga with Kratos and Atreus.',
      videoUrl: 'https://www.youtube.com/embed/EE-4GvjKcfs',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Gameplay',
      relatedGame: 'God of War Ragnarok',
      duration: '3:45:00'
    },
    {
      id: `video-2-${Date.now()}`,
      type: 'video',
      title: "Marvel's Spider-Man 2 - All Boss Fights",
      excerpt: 'Watch all the intense boss battles from the latest Spider-Man adventure.',
      videoUrl: 'https://www.youtube.com/embed/nq1M_Wc4FIc',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/0/0e/Spider-Man_2_PS5_cover_art.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Gameplay',
      relatedGame: "Marvel's Spider-Man 2",
      duration: '2:30:00'
    },
    {
      id: `video-3-${Date.now()}`,
      type: 'video',
      title: 'Horizon Forbidden West - Complete Story',
      excerpt: 'The full story of Aloy in the Forbidden West explained.',
      videoUrl: 'https://www.youtube.com/embed/Lq594XmpPBg',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/6/69/Horizon_Forbidden_West_cover_art.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Gameplay',
      relatedGame: 'Horizon Forbidden West',
      duration: '4:00:00'
    },
    {
      id: `video-4-${Date.now()}`,
      type: 'video',
      title: 'The Last of Us Part II - Grounded Difficulty',
      excerpt: 'Can you survive the hardest difficulty? Watch this intense playthrough.',
      videoUrl: 'https://www.youtube.com/embed/vhII1qlcZ4E',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png',
      date: new Date().toISOString().split('T')[0],
      category: 'Gameplay',
      relatedGame: 'The Last of Us Part II',
      duration: '5:00:00'
    },
    {
      id: `video-5-${Date.now()}`,
      type: 'video',
      title: 'Ghost of Tsushima - Legends Mode Guide',
      excerpt: 'Master the multiplayer Legends mode with tips and strategies.',
      videoUrl: 'https://www.youtube.com/embed/Ur0pQblaZcE',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Gameplay',
      relatedGame: 'Ghost of Tsushima',
      duration: '45:00'
    },
    {
      id: `video-6-${Date.now()}`,
      type: 'video',
      title: 'Elden Ring - All Endings Explained',
      excerpt: 'Discover all the different endings and how to unlock them.',
      videoUrl: 'https://www.youtube.com/embed/DYDs_Inzkz4',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Gameplay',
      relatedGame: 'Elden Ring',
      duration: '30:00'
    }
  ];
  
  return popularGamingVideos;
};

// Fetch gaming facts from RAWG API (game details)
export const fetchGamingFacts = async () => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&platforms=18,187&ordering=-metacritic&page_size=10`
    );
    
    if (!response.ok) {
      throw new Error('RAWG API failed');
    }
    
    const data = await response.json();
    
    const facts = data.results?.map((game, index) => {
      const factContent = generateGameFacts(game);
      
      return {
        id: `fact-${game.id}-${Date.now()}`,
        type: 'fact',
        title: `${game.name}: Amazing Facts You Didn't Know`,
        excerpt: `Discover fascinating facts about ${game.name}, one of the highest-rated games on PlayStation.`,
        content: factContent,
        image: game.background_image,
        date: game.released || new Date().toISOString().split('T')[0],
        category: 'Facts',
        relatedGame: game.name,
        metacritic: game.metacritic,
        playtime: game.playtime
      };
    }) || [];
    
    return facts;
  } catch (error) {
    console.log('Facts API error, using fallback:', error);
    return getFallbackFacts();
  }
};

// Generate facts based on game data
const generateGameFacts = (game) => {
  const facts = [];
  
  if (game.metacritic) {
    facts.push(`${game.name} has a Metacritic score of ${game.metacritic}, making it one of the highest-rated games.`);
  }
  
  if (game.playtime) {
    facts.push(`The average playtime is around ${game.playtime} hours to complete the main story.`);
  }
  
  if (game.genres?.length > 0) {
    facts.push(`The game blends multiple genres including ${game.genres.map(g => g.name).join(', ')}.`);
  }
  
  if (game.released) {
    const releaseYear = new Date(game.released).getFullYear();
    facts.push(`Originally released in ${releaseYear}, the game has become a modern classic.`);
  }
  
  if (game.rating) {
    facts.push(`Players have rated this game ${game.rating}/5 stars based on community reviews.`);
  }
  
  if (game.tags?.length > 0) {
    const topTags = game.tags.slice(0, 5).map(t => t.name).join(', ');
    facts.push(`Key features include: ${topTags}.`);
  }
  
  facts.push(`The game features stunning visuals and immersive gameplay that has captivated millions of players worldwide.`);
  facts.push(`With its compelling story and memorable characters, this title has left a lasting impact on gaming.`);
  
  return facts.join(' ');
};

// Fallback data when APIs fail
const getFallbackNews = () => [
  {
    id: `news-fallback-1`,
    type: 'news',
    title: 'PlayStation State of Play Announces Major Releases',
    excerpt: 'Sony reveals exciting lineup of upcoming PlayStation exclusives and third-party titles.',
    content: 'Sony Interactive Entertainment held its latest State of Play event, showcasing an impressive lineup of games coming to PlayStation platforms. The event featured world premieres, gameplay reveals, and release date announcements for highly anticipated titles.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1200px-PlayStation_logo.svg.png',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: null
  },
  {
    id: `news-fallback-2`,
    type: 'news',
    title: 'GTA 6 Release Date Confirmed',
    excerpt: 'Rockstar Games officially announces the release window for the most anticipated game.',
    content: 'After years of speculation, Rockstar Games has finally confirmed the release details for Grand Theft Auto VI. The game will feature the series first female protagonist and return to Vice City with next-gen graphics and gameplay.',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_VI_cover.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: 'GTA VI'
  },
  {
    id: `news-fallback-3`,
    type: 'news',
    title: 'PlayStation Plus Monthly Games Revealed',
    excerpt: 'Check out this months free games for PlayStation Plus subscribers.',
    content: 'PlayStation Plus members can look forward to another exciting month of free games. The lineup includes action-packed adventures, indie gems, and multiplayer favorites that offer something for every type of gamer.',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: null
  }
];

const getFallbackScreenshots = () => [
  {
    id: `screenshot-fallback-1`,
    type: 'screenshot',
    title: 'Ghost of Tsushima - Stunning Landscapes',
    excerpt: 'Beautiful screenshots showcasing the incredible art direction.',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
    ],
    date: new Date().toISOString().split('T')[0],
    category: 'Screenshots',
    relatedGame: 'Ghost of Tsushima'
  },
  {
    id: `screenshot-fallback-2`,
    type: 'screenshot',
    title: 'Horizon Zero Dawn - Photo Mode Gallery',
    excerpt: 'Breathtaking captures of Aloys world.',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800'
    ],
    date: new Date().toISOString().split('T')[0],
    category: 'Screenshots',
    relatedGame: 'Horizon Zero Dawn'
  }
];

const getFallbackFacts = () => [
  {
    id: `fact-fallback-1`,
    type: 'fact',
    title: '10 Amazing Facts About The Last of Us',
    excerpt: 'Discover fascinating behind-the-scenes facts about Naughty Dogs masterpiece.',
    content: 'The game took over 3 years to develop. Troy Baker improvised many of Joels lines. The infected were inspired by a real fungus (Cordyceps). The games soundtrack was recorded using unconventional instruments. The giraffe scene was almost cut. Joel was originally going to die in the first game. The game has over 100 unique infected designs. The HBO series is the most faithful game adaptation ever made.',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png',
    date: new Date().toISOString().split('T')[0],
    category: 'Facts',
    relatedGame: 'The Last of Us Part II'
  },
  {
    id: `fact-fallback-2`,
    type: 'fact',
    title: 'Red Dead Redemption 2: Mind-Blowing Details',
    excerpt: 'The incredible attention to detail that makes RDR2 a masterpiece.',
    content: 'Red Dead Redemption 2 features over 500,000 lines of dialogue. Horse testicles shrink in cold weather. NPCs remember your interactions. Arthurs hair and beard grow in real-time. Each gun shows realistic wear and requires maintenance. Animals have realistic ecosystem behaviors. The game took 8 years and over 2000 people to create.',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'Facts',
    relatedGame: 'Red Dead Redemption 2'
  }
];

// Main function to fetch all blog content
export const fetchAllBlogContent = async () => {
  const [news, screenshots, videos, facts] = await Promise.all([
    fetchGamingNews(),
    fetchGameScreenshots(),
    fetchGamingVideos(),
    fetchGamingFacts()
  ]);
  
  // Combine and shuffle all posts
  const allPosts = [...news, ...screenshots, ...videos, ...facts];
  
  // Sort by date (newest first)
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return allPosts;
};

// Get categories from posts
export const getCategories = (posts) => {
  const categories = [...new Set(posts.map(post => post.category))];
  return ['All', ...categories];
};

export default fetchAllBlogContent;
