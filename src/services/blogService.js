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
  // Using YouTube video IDs - thumbnails from YouTube's img server always work
  const popularGamingVideos = [
    {
      id: `video-1-${Date.now()}`,
      type: 'video',
      title: 'God of War Ragnarok - Full Gameplay Walkthrough',
      excerpt: 'Experience the epic conclusion of the Norse saga with Kratos and Atreus.',
      videoUrl: 'https://www.youtube.com/embed/hfJ4Km46A-0',
      thumbnail: 'https://i.ytimg.com/vi/hfJ4Km46A-0/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Gameplay',
      relatedGame: 'God of War Ragnarok',
      duration: '3:45:00'
    },
    {
      id: `video-2-${Date.now()}`,
      type: 'video',
      title: "Marvel's Spider-Man 2 - Official Trailer",
      excerpt: 'Watch all the intense action from the latest Spider-Man adventure.',
      videoUrl: 'https://www.youtube.com/embed/qIQ3xNqkVC4',
      thumbnail: 'https://i.ytimg.com/vi/qIQ3xNqkVC4/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: "Marvel's Spider-Man 2",
      duration: '3:30'
    },
    {
      id: `video-3-${Date.now()}`,
      type: 'video',
      title: 'Horizon Forbidden West - Story Trailer',
      excerpt: 'The full story of Aloy in the Forbidden West explained.',
      videoUrl: 'https://www.youtube.com/embed/Lq594XmpPBg',
      thumbnail: 'https://i.ytimg.com/vi/Lq594XmpPBg/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'Horizon Forbidden West',
      duration: '4:00'
    },
    {
      id: `video-4-${Date.now()}`,
      type: 'video',
      title: 'The Last of Us Part II - Launch Trailer',
      excerpt: 'Experience Ellie\'s emotional journey in this post-apocalyptic world.',
      videoUrl: 'https://www.youtube.com/embed/vhII1qlcZ4E',
      thumbnail: 'https://i.ytimg.com/vi/vhII1qlcZ4E/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'The Last of Us Part II',
      duration: '2:54'
    },
    {
      id: `video-5-${Date.now()}`,
      type: 'video',
      title: 'Ghost of Tsushima - Official Trailer',
      excerpt: 'Become Jin Sakai and defend Tsushima Island from the Mongol invasion.',
      videoUrl: 'https://www.youtube.com/embed/Ur0pQblaZcE',
      thumbnail: 'https://i.ytimg.com/vi/Ur0pQblaZcE/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'Ghost of Tsushima',
      duration: '2:45'
    },
    {
      id: `video-6-${Date.now()}`,
      type: 'video',
      title: 'Elden Ring - Official Launch Trailer',
      excerpt: 'Rise, Tarnished. Discover the Lands Between in this epic adventure.',
      videoUrl: 'https://www.youtube.com/embed/qqiC88f9ogU',
      thumbnail: 'https://i.ytimg.com/vi/qqiC88f9ogU/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'Elden Ring',
      duration: '3:17'
    },
    {
      id: `video-7-${Date.now()}`,
      type: 'video',
      title: 'Final Fantasy XVI - Awakening Trailer',
      excerpt: 'Experience the next chapter of the legendary Final Fantasy series.',
      videoUrl: 'https://www.youtube.com/embed/2tBnBAkHv9M',
      thumbnail: 'https://i.ytimg.com/vi/2tBnBAkHv9M/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'Final Fantasy XVI',
      duration: '4:12'
    },
    {
      id: `video-8-${Date.now()}`,
      type: 'video',
      title: 'Resident Evil 4 Remake - Reveal Trailer',
      excerpt: 'Leon S. Kennedy returns in this stunning remake of a classic.',
      videoUrl: 'https://www.youtube.com/embed/bOaKvTMOsws',
      thumbnail: 'https://i.ytimg.com/vi/bOaKvTMOsws/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'Resident Evil 4',
      duration: '2:03'
    },
    {
      id: `video-9-${Date.now()}`,
      type: 'video',
      title: 'God of War (2018) - Official Story Trailer',
      excerpt: 'Join Kratos and Atreus on their journey through the Norse realms.',
      videoUrl: 'https://www.youtube.com/embed/K0u_kAWLJOA',
      thumbnail: 'https://i.ytimg.com/vi/K0u_kAWLJOA/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'God of War',
      duration: '2:57'
    },
    {
      id: `video-10-${Date.now()}`,
      type: 'video',
      title: 'Red Dead Redemption 2 - Official Trailer',
      excerpt: 'Experience the epic tale of outlaw Arthur Morgan in the wild west.',
      videoUrl: 'https://www.youtube.com/embed/eaW0tYpxyp0',
      thumbnail: 'https://i.ytimg.com/vi/eaW0tYpxyp0/maxresdefault.jpg',
      date: new Date().toISOString().split('T')[0],
      category: 'Trailers',
      relatedGame: 'Red Dead Redemption 2',
      duration: '2:15'
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
  },
  {
    id: `news-fallback-4`,
    type: 'news',
    title: 'Spider-Man 2 Wins Game of the Year',
    excerpt: 'Insomniac Games superhero sequel takes home the top prize at The Game Awards.',
    content: 'Marvels Spider-Man 2 has been crowned Game of the Year at the prestigious Game Awards ceremony. The game impressed critics and players alike with its seamless switching between Peter Parker and Miles Morales, improved combat, and stunning recreation of New York City.',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/0e/Spider-Man_2_PS5_cover_art.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: "Marvel's Spider-Man 2"
  },
  {
    id: `news-fallback-5`,
    type: 'news',
    title: 'Final Fantasy VII Rebirth Breaks Records',
    excerpt: 'Square Enix announces record-breaking sales for the second part of the remake trilogy.',
    content: 'Final Fantasy VII Rebirth has achieved remarkable success, selling millions of copies in its first week. The game expands the story beyond Midgar, featuring an expansive open world and enhanced combat system that has delighted fans of the original.',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/79/Final_Fantasy_VII_Rebirth_box_art.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: 'Final Fantasy VII Rebirth'
  },
  {
    id: `news-fallback-6`,
    type: 'news',
    title: 'Hogwarts Legacy DLC Announced',
    excerpt: 'Warner Bros reveals new content coming to the magical open-world RPG.',
    content: 'Fans of Hogwarts Legacy have reason to celebrate as new downloadable content has been announced. The expansion will add new quests, locations, and magical abilities to the already expansive wizarding world adventure.',
    image: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Hogwarts_Legacy_cover_art.png',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: 'Hogwarts Legacy'
  },
  {
    id: `news-fallback-7`,
    type: 'news',
    title: 'PS5 Pro Performance Benchmarks Released',
    excerpt: 'First tests show significant improvements in frame rates and visual fidelity.',
    content: 'Early benchmarks of the PlayStation 5 Pro reveal impressive performance gains. Games like God of War Ragnarok and Horizon Forbidden West now run at stable 60fps with enhanced ray tracing, while new titles are taking full advantage of the upgraded hardware.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: null
  },
  {
    id: `news-fallback-8`,
    type: 'news',
    title: 'Death Stranding 2 Release Date Announced',
    excerpt: 'Hideo Kojimas highly anticipated sequel gets an official launch window.',
    content: 'Death Stranding 2: On The Beach has received an official release date. The game continues the story of Sam Porter Bridges and promises to deliver another unique gaming experience with new gameplay mechanics and an all-star cast.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Death_Stranding_2_cover_art.jpg/220px-Death_Stranding_2_cover_art.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'News',
    relatedGame: 'Death Stranding 2'
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
  },
  {
    id: `screenshot-fallback-3`,
    type: 'screenshot',
    title: 'God of War - Epic Battle Moments',
    excerpt: 'Intense combat screenshots from Kratos Norse journey.',
    images: [
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'
    ],
    date: new Date().toISOString().split('T')[0],
    category: 'Screenshots',
    relatedGame: 'God of War'
  },
  {
    id: `screenshot-fallback-4`,
    type: 'screenshot',
    title: 'Spider-Man - New York City Swinging',
    excerpt: 'Web-swinging through Manhattan never looked so good.',
    images: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
      'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=800',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800'
    ],
    date: new Date().toISOString().split('T')[0],
    category: 'Screenshots',
    relatedGame: "Marvel's Spider-Man"
  },
  {
    id: `screenshot-fallback-5`,
    type: 'screenshot',
    title: 'Elden Ring - The Lands Between',
    excerpt: 'Explore the dark fantasy world of the Elden Ring.',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'
    ],
    date: new Date().toISOString().split('T')[0],
    category: 'Screenshots',
    relatedGame: 'Elden Ring'
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
  },
  {
    id: `fact-fallback-3`,
    type: 'fact',
    title: 'Spider-Man PS4: Hidden Easter Eggs',
    excerpt: 'Secret references you might have missed in the web-slingers adventure.',
    content: 'The Avengers Tower appears in the skyline. You can find the bar from Daredevil. Theres a hidden tribute to Stan Lee. The Sanctum Sanctorum from Doctor Strange is explorable. Oscorp references hint at future villains. Miles Morales was introduced as a side character before his own game. The suit selection includes comic-accurate designs spanning decades.',
    image: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'Facts',
    relatedGame: "Marvel's Spider-Man"
  },
  {
    id: `fact-fallback-4`,
    type: 'fact',
    title: 'God of War: From Greece to Norse',
    excerpt: 'How Santa Monica Studio reinvented a beloved franchise.',
    content: 'The development took 5 years. The single-shot camera was incredibly challenging to implement. Christopher Judge was mocapped for every Kratos movement. Atreus was designed to never be annoying to players. The Leviathan Axe recall was inspired by Thors Mjolnir. Greek mythology elements are hidden throughout the game. The ending was changed multiple times during development.',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'Facts',
    relatedGame: 'God of War'
  },
  {
    id: `fact-fallback-5`,
    type: 'fact',
    title: 'Ghost of Tsushima: Samurai Accuracy',
    excerpt: 'How Sucker Punch honored Japanese culture and history.',
    content: 'The development team visited Tsushima Island multiple times. A Kurosawa Mode was added to honor legendary filmmaker Akira Kurosawa. The game features authentic Japanese voice acting. Real samurai combat techniques were studied. The Mongol invasion depicted was a real historical event. Wind replaces traditional waypoints for navigation. The PS5 version loads in under 2 seconds.',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg',
    date: new Date().toISOString().split('T')[0],
    category: 'Facts',
    relatedGame: 'Ghost of Tsushima'
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
