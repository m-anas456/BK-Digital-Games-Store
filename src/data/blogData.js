// Blog Data for BK Digital Games
// Contains news, facts, videos, and screenshots for games

const blogPosts = [
  {
    id: 1,
    type: "news",
    title: "God of War Ragnarok Breaks Sales Records",
    excerpt: "The latest installment in the God of War franchise has sold over 11 million copies worldwide in its first week.",
    content: "Santa Monica Studio's God of War Ragnarok has become the fastest-selling first-party game in PlayStation history. The game continues the story of Kratos and Atreus as they face the Norse apocalypse, Ragnarok. Players have praised the game's emotional storytelling, improved combat mechanics, and stunning visuals.",
    image: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
    date: "2024-12-15",
    category: "News",
    relatedGame: "God of War"
  },
  {
    id: 2,
    type: "news",
    title: "GTA 6 Trailer Breaks YouTube Records",
    excerpt: "Rockstar Games' GTA 6 trailer becomes the most viewed video game trailer in YouTube history.",
    content: "The highly anticipated Grand Theft Auto VI trailer has shattered records, garnering over 100 million views within 24 hours. The game will be set in Vice City and feature the series' first female protagonist. Fans worldwide are eagerly awaiting the 2025 release date.",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_VI_cover.jpg",
    date: "2024-12-10",
    category: "News",
    relatedGame: "GTA V"
  },
  {
    id: 3,
    type: "news",
    title: "PlayStation Plus January 2025 Games Revealed",
    excerpt: "Sony announces the free games lineup for PlayStation Plus subscribers this January.",
    content: "PlayStation Plus members can look forward to an exciting lineup this January, including several highly-rated titles. The Essential tier will feature action-packed games while Extra and Premium members get access to additional classics and day-one releases.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1200px-PlayStation_logo.svg.png",
    date: "2024-12-28",
    category: "News",
    relatedGame: null
  },
  {
    id: 4,
    type: "fact",
    title: "10 Amazing Facts About The Last of Us",
    excerpt: "Discover fascinating behind-the-scenes facts about Naughty Dog's masterpiece.",
    content: "1. The game took over 3 years to develop. 2. Troy Baker improvised many of Joel's lines. 3. The infected were inspired by a real fungus (Cordyceps). 4. The game's soundtrack was recorded using unconventional instruments. 5. Ellie was almost voiced by Ellen Page. 6. The giraffe scene was almost cut. 7. Joel was originally going to die in the first game. 8. The game has over 100 unique infected designs. 9. Naughty Dog created a real-world survival guide. 10. The HBO series is the most faithful game adaptation ever made.",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png",
    date: "2024-12-05",
    category: "Facts",
    relatedGame: "The Last of Us Part II"
  },
  {
    id: 5,
    type: "fact",
    title: "Spider-Man PS4: Hidden Easter Eggs You Missed",
    excerpt: "Insomniac Games packed Spider-Man with incredible references and secrets.",
    content: "Marvel's Spider-Man on PS4 is filled with Easter eggs that reference the comics, movies, and even other games. From the Avengers Tower to references to Miles Morales' future, the game rewards eagle-eyed players with countless surprises. Did you know you can find the bar from Netflix's Daredevil series, or that there are hidden tributes to Stan Lee throughout New York?",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg",
    date: "2024-11-28",
    category: "Facts",
    relatedGame: "Marvel's Spider-Man"
  },
  {
    id: 6,
    type: "fact",
    title: "Ghost of Tsushima: The Real History Behind the Game",
    excerpt: "Explore the true historical events that inspired this samurai epic.",
    content: "Ghost of Tsushima is set during the first Mongol invasion of Japan in 1274. While Jin Sakai is fictional, the game accurately portrays many aspects of Japanese culture and the Mongol invasion tactics. The real Tsushima Island was indeed invaded, and the samurai defenders were vastly outnumbered. Sucker Punch worked closely with historians to create an authentic experience.",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg",
    date: "2024-11-20",
    category: "Facts",
    relatedGame: "Ghost of Tsushima"
  },
  {
    id: 7,
    type: "video",
    title: "God of War - Epic Boss Fight Compilation",
    excerpt: "Relive the most intense boss battles from Kratos' Norse journey.",
    videoUrl: "https://www.youtube.com/embed/K0u_kAWLJOA",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    date: "2024-12-12",
    category: "Gameplay",
    relatedGame: "God of War",
    duration: "15:30"
  },
  {
    id: 8,
    type: "video",
    title: "Spider-Man PS4 - All Suits Showcase",
    excerpt: "Check out every unlockable suit in Marvel's Spider-Man.",
    videoUrl: "https://www.youtube.com/embed/q4GdJVvdxss",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg",
    date: "2024-12-08",
    category: "Gameplay",
    relatedGame: "Marvel's Spider-Man",
    duration: "12:45"
  },
  {
    id: 9,
    type: "video",
    title: "Horizon Zero Dawn - Machine Hunting Guide",
    excerpt: "Learn the best strategies to take down every machine in the game.",
    videoUrl: "https://www.youtube.com/embed/wzx96gYA8ek",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/93/Horizon_Zero_Dawn.jpg",
    date: "2024-11-25",
    category: "Gameplay",
    relatedGame: "Horizon Zero Dawn",
    duration: "20:15"
  },
  {
    id: 10,
    type: "video",
    title: "The Last of Us Part II - Stealth Walkthrough",
    excerpt: "Master the art of stealth in this comprehensive guide.",
    videoUrl: "https://www.youtube.com/embed/vhII1qlcZ4E",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png",
    date: "2024-11-18",
    category: "Gameplay",
    relatedGame: "The Last of Us Part II",
    duration: "25:00"
  },
  {
    id: 11,
    type: "screenshot",
    title: "Ghost of Tsushima - Stunning Landscapes",
    excerpt: "The most beautiful screenshots captured from Ghost of Tsushima's photo mode.",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800"
    ],
    date: "2024-12-01",
    category: "Screenshots",
    relatedGame: "Ghost of Tsushima"
  },
  {
    id: 12,
    type: "screenshot",
    title: "Horizon Zero Dawn - Photo Mode Gallery",
    excerpt: "Breathtaking captures of Aloy's world and the mechanical beasts.",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
    ],
    date: "2024-11-22",
    category: "Screenshots",
    relatedGame: "Horizon Zero Dawn"
  },
  {
    id: 13,
    type: "news",
    title: "Elden Ring DLC Shadow of the Erdtree Announced",
    excerpt: "FromSoftware reveals massive expansion for their award-winning title.",
    content: "The highly anticipated Elden Ring DLC 'Shadow of the Erdtree' promises to deliver a massive new area to explore with new bosses, weapons, and lore. FromSoftware has stated this will be the largest expansion they've ever created, surpassing the size of some standalone games.",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
    date: "2024-12-20",
    category: "News",
    relatedGame: "Elden Ring"
  },
  {
    id: 14,
    type: "fact",
    title: "Red Dead Redemption 2: Mind-Blowing Details",
    excerpt: "The incredible attention to detail that makes RDR2 a masterpiece.",
    content: "Red Dead Redemption 2 features over 500,000 lines of dialogue, making it one of the most script-heavy games ever made. Horse testicles shrink in cold weather. NPCs remember your interactions. Arthur's hair and beard grow in real-time. Each gun shows realistic wear and requires maintenance. Animals have realistic ecosystem behaviors. The game took 8 years and over 2000 people to create.",
    image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    date: "2024-11-15",
    category: "Facts",
    relatedGame: "Red Dead Redemption 2"
  },
  {
    id: 15,
    type: "video",
    title: "Uncharted 4 - Cinematic Gameplay Highlights",
    excerpt: "The most jaw-dropping action sequences from Nathan Drake's final adventure.",
    videoUrl: "https://www.youtube.com/embed/hh5HV4iic1Y",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/0e/Uncharted_4.jpg",
    date: "2024-11-10",
    category: "Gameplay",
    relatedGame: "Uncharted 4"
  },
  {
    id: 16,
    type: "screenshot",
    title: "God of War - Epic Battle Screenshots",
    excerpt: "Capture the intensity of Kratos' most brutal encounters.",
    images: [
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
    ],
    date: "2024-11-05",
    category: "Screenshots",
    relatedGame: "God of War"
  }
];

// Get all unique categories
export const getCategories = () => {
  const categories = [...new Set(blogPosts.map(post => post.category))];
  return ['All', ...categories];
};

// Get posts by type
export const getPostsByType = (type) => {
  return blogPosts.filter(post => post.type === type);
};

// Get posts by category
export const getPostsByCategory = (category) => {
  if (category === 'All') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

// Get related posts by game
export const getRelatedPosts = (gameName) => {
  return blogPosts.filter(post => post.relatedGame === gameName);
};

// Search posts
export const searchPosts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    (post.relatedGame && post.relatedGame.toLowerCase().includes(lowercaseQuery))
  );
};

export default blogPosts;
