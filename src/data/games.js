// PlayStation 4 Games Data
// Using verified working image URLs from Wikipedia Commons

const games = [
  {
    id: 1,
    title: "God of War",
    price: 2999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    description: "Journey with Kratos and Atreus in this epic Norse mythology adventure.",
    rating: 4.9,
    genre: "Action-Adventure"
  },
  {
    id: 2,
    title: "The Last of Us Part II",
    price: 3999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png",
    description: "Experience Ellie's emotional journey in this post-apocalyptic masterpiece.",
    rating: 4.8,
    genre: "Action-Adventure"
  },
  {
    id: 3,
    title: "Marvel's Spider-Man",
    price: 2499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg",
    description: "Swing through New York as the iconic web-slinger.",
    rating: 4.9,
    genre: "Action-Adventure"
  },
  {
    id: 4,
    title: "Horizon Zero Dawn",
    price: 1999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/Horizon_Zero_Dawn.jpg",
    description: "Hunt robotic creatures in a beautiful post-apocalyptic world.",
    rating: 4.8,
    genre: "Action RPG"
  },
 
  {
    id: 6,
    title: "Ghost of Tsushima",
    price: 3999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg",
    description: "Become the legendary Ghost and save Tsushima island.",
    rating: 4.9,
    genre: "Action-Adventure"
  },
  
  {
    id: 8,
    title: "Red Dead Redemption 2",
    price: 3499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    description: "Live the outlaw life in the dying Wild West.",
    rating: 4.9,
    genre: "Action-Adventure"
  },
 
  {
    id: 10,
    title: "Call of Duty: Modern Warfare",
    price: 4499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1f/Call_of_Duty_Modern_Warfare_%282019%29_cover.jpg",
    description: "Experience intense modern combat warfare.",
    rating: 4.5,
    genre: "FPS"
  },
 
  {
    id: 11,
    title: "Grand Theft Auto V",
    price: 2999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
    description: "Live the criminal life in Los Santos.",
    rating: 4.7,
    genre: "Action-Adventure"
  },
  {
    id: 12,
    title: "The Witcher 3: Wild Hunt",
    price: 2499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    description: "Hunt monsters as Geralt of Rivia in this epic RPG.",
    rating: 4.9,
    genre: "Action RPG"
  },
 
  {
    id: 13,
    title: "Sekiro: Shadows Die Twice",
    price: 3499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg",
    description: "Master the way of the shinobi in feudal Japan.",
    rating: 4.8,
    genre: "Action-Adventure"
  },
  {
    id: 14,
    title: "Death Stranding",
    price: 2999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/2/22/Death_Stranding.jpg",
    description: "Reconnect a fractured world in this unique experience.",
    rating: 4.5,
    genre: "Action"
  },
 
  {
    id: 16,
    title: "Final Fantasy VII Remake",
    price: 3999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/c/ce/FFVIIRemake.png",
    description: "Relive the classic in this stunning remake.",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    id: 17,
    title: "Elden Ring",
    price: 5499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
    description: "Explore the Lands Between in this epic open-world adventure.",
    rating: 4.9,
    genre: "Action RPG"
  },
  {
    id: 18,
    title: "Resident Evil Village",
    price: 3499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png",
    description: "Survive the horrors of a mysterious village.",
    rating: 4.7,
    genre: "Horror"
  },
  {
    id: 19,
    title: "Cyberpunk 2077",
    price: 2999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    description: "Become a cyberpunk mercenary in Night City.",
    rating: 4.5,
    genre: "Action RPG"
  },
  {
    id: 20,
    title: "Assassin's Creed Valhalla",
    price: 3499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/2ee/2eeed8524b2a559b36b733195847a341.jpg",
    description: "Lead Viking raids against Saxon kingdoms.",
    rating: 4.6,
    genre: "Action RPG"
  },
  {
    id: 21,
    title: "Days Gone",
    price: 1999,
    console: "PS4",
    image: "https://media.rawg.io/media/games/d1d/d1d4a549b5fec5edcd31e2224ae5cdae.jpg",
    description: "Survive in a post-apocalyptic world overrun by Freakers.",
    rating: 4.5,
    genre: "Action-Adventure"
  },
  {
    id: 22,
    title: "God of War Ragnarök",
    price: 5999,
    console: "PS4",
    image: "https://media.rawg.io/media/games/6b1/6b14dc4cc1785e396580c69166e295a2.jpg",
    description: "Continue Kratos and Atreus' epic Norse saga.",
    rating: 4.9,
    genre: "Action-Adventure"
  },
  {
    id: 23,
    title: "Mortal Kombat 11",
    price: 2499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/3/30/Mortal_Kombat_11_cover_art.png",
    description: "Experience the ultimate fighting game tournament.",
    rating: 4.6,
    genre: "Fighting"
  },
  {
    id: 24,
    title: "NBA 2K24",
    price: 4499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/cb6/cb67f5fa89d9b1221dd6f05bbccb2f71.jpg",
    description: "The most realistic basketball simulation.",
    rating: 4.3,
    genre: "Sports"
  },
  {
    id: 25,
    title: "NieR: Automata",
    price: 2499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/2/21/Nier_Automata_cover_art.jpg",
    description: "Battle for humanity's survival as android soldiers.",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    id: 26,
    title: "Monster Hunter: World",
    price: 2999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg",
    description: "Hunt massive monsters in a living ecosystem.",
    rating: 4.7,
    genre: "Action RPG"
  },
  {
    id: 27,
    title: "Devil May Cry 5",
    price: 2499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/41e/41e431c485ce24bebc35e5f04bf31c0a.jpg",
    description: "Stylish demon-slaying action at its finest.",
    rating: 4.8,
    genre: "Action"
  },
  {
    id: 28,
    title: "Tekken 7",
    price: 1999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4e/Tekken_7_cover_art.jpg",
    description: "The legendary fighting series continues.",
    rating: 4.6,
    genre: "Fighting"
  },
  {
    id: 29,
    title: "Horizon Forbidden West",
    price: 4999,
    console: "PS4",
    image: "https://media.rawg.io/media/games/a3e/a3ea202c7a7fa4f06388aac4dd81b62d.jpg",
    description: "Explore distant lands with Aloy in this sequel.",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    id: 30,
    title: "Ratchet & Clank",
    price: 1499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/416/416c26ef6618c05dad4a24a8c018e950.jpg",
    description: "Join the iconic duo on their galactic adventure.",
    rating: 4.7,
    genre: "Action-Adventure"
  },
  {
    id: 31,
    title: "Uncharted: The Nathan Drake Collection",
    price: 1999,
    console: "PS4",
    image: "https://media.rawg.io/media/games/91c/91c4f377c1e09755b60a0102c5252843.jpg",
    description: "Three classic adventures remastered.",
    rating: 4.8,
    genre: "Action-Adventure"
  },
  {
    id: 32,
    title: "The Last of Us Remastered",
    price: 1499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/a5a/a5a7fb8d9cb8063a8b42ee002b410db6.jpg",
    description: "The definitive version of the masterpiece.",
    rating: 4.9,
    genre: "Action-Adventure"
  },
  {
    id: 33,
    title: "Detroit: Become Human",
    price: 2499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/951/951572a3dd1e42544bd39a5d5b42d234.jpg",
    description: "Shape the future of androids and humanity.",
    rating: 4.6,
    genre: "Adventure"
  },
  {
    id: 34,
    title: "Until Dawn",
    price: 1499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/f3e/f3eec35c6218dcfd93a537751e6571f4.jpg",
    description: "Your choices determine who survives.",
    rating: 4.5,
    genre: "Horror"
  },
  {
    id: 35,
    title: "Shadow of the Colossus",
    price: 1999,
    console: "PS4",
    image: "https://media.rawg.io/media/games/562/562553814dd54e001a541e4b83571e98.jpg",
    description: "Battle giant colossi in this stunning remake.",
    rating: 4.7,
    genre: "Action-Adventure"
  },
  {
    id: 36,
    title: "Infamous Second Son",
    price: 1499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/6b7/6b7d24310ad7098b9fd2cb49b9ea679f.jpg",
    description: "Wield superpowers in this open-world action game.",
    rating: 4.5,
    genre: "Action-Adventure"
  },
  {
    id: 37,
    title: "Dark Souls III",
    price: 2499,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg",
    description: "Face the ultimate challenge in this dark fantasy.",
    rating: 4.8,
    genre: "Action RPG"
  },
  {
    id: 38,
    title: "Street Fighter V",
    price: 1999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/8/80/Street_Fighter_V_box_artwork.png",
    description: "The legendary fighting franchise returns.",
    rating: 4.4,
    genre: "Fighting"
  },
  {
    id: 39,
    title: "Metal Gear Solid V: The Phantom Pain",
    price: 1999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8f/Metal_Gear_Solid_V_The_Phantom_Pain_cover.png",
    description: "Legendary stealth action gameplay.",
    rating: 4.8,
    genre: "Action"
  },
  {
    id: 40,
    title: "Resident Evil 2",
    price: 2999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_2_%282019%29_cover_art.jpg",
    description: "Survive the horror of Raccoon City.",
    rating: 4.8,
    genre: "Horror"
  },
    {
    id: 5,
    title: "Uncharted 4: A Thief's End",
    price: 1999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0e/Uncharted_4_box_artwork.jpg",
    description: "Join Nathan Drake on his final treasure hunting adventure.",
    rating: 4.9,
    genre: "Action-Adventure"
  },
   {
    id: 7,
    title: "Bloodborne",
    price: 1499,
    console: "PS4",
    image: "https://media.rawg.io/media/games/214/214b29aeff13a0ae6a70571f7418f6a7.jpg",
    description: "Face your fears in this challenging gothic action RPG.",
    rating: 4.8,
    genre: "Action RPG"
  },
   {
    id: 15,
    title: "Persona 5 Royal",
    price: 3999,
    console: "PS4",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b0/Persona_5_Royal.jpg",
    description: "Live as a student by day, phantom thief by night.",
    rating: 4.9,
    genre: "JRPG"
  },
   {
    id: 9,
    title: "FIFA 24",
    price: 4999,
    console: "PS4",
    image: "https://media.rawg.io/media/games/bba/bbab7a65a421e601e7f7eb78ffa498ea.jpg",
    description: "The world's game with HyperMotion technology.",
    rating: 4.3,
    genre: "Sports"
  }
];

export default games;
