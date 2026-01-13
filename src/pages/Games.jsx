import { useState, useMemo, useCallback } from 'react';
import { FaSearch, FaFilter, FaPlaystation, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import GameCard from '../components/GameCard';
import games from '../data/games';
import './Games.css';

const ITEMS_PER_PAGE = 12;

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique genres from games - memoized
  const genres = useMemo(() => 
    ['All', ...new Set(games.map(game => game.genre))],
    []
  );

  // Filter and sort games - memoized for performance
  const filteredGames = useMemo(() => {
    return games
      .filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre;
        return matchesSearch && matchesGenre;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.title.localeCompare(b.title);
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0; // Keep original order from games.js
        }
      });
  }, [searchTerm, selectedGenre, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredGames, currentPage]);

  // Reset to first page when filters change
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleGenreChange = useCallback((e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="games-page">
      {/* Page Header */}
      <section className="games-header">
        <div className="header-content">
          <h1>
            <FaPlaystation className="header-icon" />
            PlayStation 4 Games
          </h1>
          <p>Browse our collection of the best PS4 digital games</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="games-filters">
        <div className="filters-container">
          {/* Search Bar */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Genre Filter */}
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select 
              value={selectedGenre} 
              onChange={handleGenreChange}
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="filter-group">
            <select 
              value={sortBy} 
              onChange={handleSortChange}
            >
              <option value="default">Default Order</option>
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <span>Showing {paginatedGames.length} of {filteredGames.length} games</span>
        </div>
      </section>

      {/* Games Grid */}
      <section className="games-grid-section">
        {paginatedGames.length > 0 ? (
          <>
            <div className="games-grid">
              {paginatedGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft /> Prev
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h3>No games found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Games;
