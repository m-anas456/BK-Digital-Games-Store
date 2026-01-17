import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaLightbulb, FaVideo, FaImages, FaSearch, FaCalendar, FaGamepad, FaPlay, FaTimes, FaChevronLeft, FaChevronRight, FaSync, FaExternalLinkAlt } from 'react-icons/fa';
import fetchAllBlogContent, { getCategories } from '../services/blogService';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch blog content on mount
  useEffect(() => {
    loadBlogContent();
  }, []);

  const loadBlogContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const content = await fetchAllBlogContent();
      setPosts(content);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load blog content. Please try again.');
      console.error('Blog loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => getCategories(posts), [posts]);

  // Filter posts based on type, category, and search
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by type
    if (activeType !== 'all') {
      filtered = filtered.filter(post => post.type === activeType);
    }

    // Filter by category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(post => post.category === activeFilter);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.relatedGame && post.relatedGame.toLowerCase().includes(query))
      );
    }

    return filtered.reverse();
  }, [posts, activeFilter, activeType, searchQuery]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time ago
  const getTimeAgo = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return formatDate(date.toISOString());
  };

  // Get icon for post type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'news': return <FaNewspaper />;
      case 'fact': return <FaLightbulb />;
      case 'video': return <FaVideo />;
      case 'screenshot': return <FaImages />;
      default: return <FaNewspaper />;
    }
  };

  // Open modal for post
  const openPost = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  // Navigate images in screenshot gallery
  const nextImage = () => {
    if (selectedPost && selectedPost.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedPost.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedPost && selectedPost.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedPost.images.length - 1 : prev - 1
      );
    }
  };

  // Type filter buttons
  const typeFilters = [
    { id: 'all', label: 'All Posts', icon: <FaGamepad /> },
    { id: 'news', label: 'News', icon: <FaNewspaper /> },
    { id: 'fact', label: 'Facts', icon: <FaLightbulb /> },
    { id: 'video', label: 'Videos', icon: <FaVideo /> },
    { id: 'screenshot', label: 'Screenshots', icon: <FaImages /> }
  ];

  return (
    <div className="blog-page">
      {/* Compact Header */}
      <section className="blog-header">
        <h1 className="blog-title">
          <FaGamepad className="title-icon" />
          Games Blog
        </h1>
        {lastUpdated && (
          <button className="refresh-btn" onClick={loadBlogContent} disabled={loading} title="Refresh content">
            <FaSync className={loading ? 'spinning' : ''} />
          </button>
        )}
      </section>

      {/* Search and Filters */}
      <section className="blog-filters">
        <div className="filters-container">
          {/* Search Bar */}
          <div className="blog-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Type Filters */}
          <div className="type-filters">
            {typeFilters.map(filter => (
              <button
                key={filter.id}
                className={`type-btn ${activeType === filter.id ? 'active' : ''}`}
                onClick={() => setActiveType(filter.id)}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-content">
        <div className="blog-container">
          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Fetching latest gaming content...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-state">
              <p>{error}</p>
              <button className="retry-btn" onClick={loadBlogContent}>
                <FaSync /> Try Again
              </button>
            </div>
          )}

          {/* No Posts */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="no-posts">
              <FaSearch className="no-posts-icon" />
              <h3>No posts found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="posts-grid">
              {filteredPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className={`post-card post-${post.type}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openPost(post)}
                >
                  <div className="post-image">
                    <img 
                      src={post.type === 'video' ? post.thumbnail : (post.type === 'screenshot' ? post.images?.[0] : post.image)} 
                      alt={post.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800';
                      }}
                    />
                    <div className="post-type-badge">
                      {getTypeIcon(post.type)}
                      <span>{post.type}</span>
                    </div>
                    {post.type === 'video' && (
                      <div className="play-overlay">
                        <FaPlay />
                      </div>
                    )}
                    {post.type === 'screenshot' && post.images && (
                      <div className="gallery-count">
                        <FaImages />
                        <span>{post.images.length} images</span>
                      </div>
                    )}
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-date">
                        <FaCalendar />
                        {formatDate(post.date)}
                      </span>
                      {post.relatedGame && (
                        <span className="post-game">
                          <FaGamepad />
                          {post.relatedGame}
                        </span>
                      )}
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    {post.source && (
                      <span className="post-source">Source: {post.source}</span>
                    )}
                    <button className="read-more-btn">
                      {post.type === 'video' ? 'Watch Now' : post.type === 'screenshot' ? 'View Gallery' : 'Read More'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Post Modal */}
      {selectedPost && (
        <div className="post-modal" onClick={closePost}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closePost}>
              <FaTimes />
            </button>

            {/* News or Fact Post */}
            {(selectedPost.type === 'news' || selectedPost.type === 'fact') && (
              <div className="modal-article">
                <div className="modal-image">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800';
                    }}
                  />
                </div>
                <div className="modal-body">
                  <div className="modal-meta">
                    <span className="modal-type">
                      {getTypeIcon(selectedPost.type)}
                      {selectedPost.category}
                    </span>
                    <span className="modal-date">
                      <FaCalendar />
                      {formatDate(selectedPost.date)}
                    </span>
                    {selectedPost.source && (
                      <span className="modal-source">
                        Source: {selectedPost.source}
                      </span>
                    )}
                  </div>
                  <h2 className="modal-title">{selectedPost.title}</h2>
                  {selectedPost.relatedGame && (
                    <Link to="/games" className="modal-game-link">
                      <FaGamepad /> Related: {selectedPost.relatedGame}
                    </Link>
                  )}
                  <div className="modal-text">
                    {selectedPost.content?.split('. ').map((sentence, index) => (
                      <p key={index}>{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</p>
                    ))}
                  </div>
                  {selectedPost.url && (
                    <a href={selectedPost.url} target="_blank" rel="noopener noreferrer" className="read-original-btn">
                      <FaExternalLinkAlt /> Read Original Article
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Video Post */}
            {selectedPost.type === 'video' && (
              <div className="modal-video">
                <div className="video-container">
                  <iframe
                    src={selectedPost.videoUrl}
                    title={selectedPost.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="modal-body">
                  <div className="modal-meta">
                    <span className="modal-type">
                      <FaVideo />
                      {selectedPost.category}
                    </span>
                    <span className="modal-date">
                      <FaCalendar />
                      {formatDate(selectedPost.date)}
                    </span>
                    {selectedPost.duration && (
                      <span className="video-duration">
                        <FaPlay />
                        {selectedPost.duration}
                      </span>
                    )}
                  </div>
                  <h2 className="modal-title">{selectedPost.title}</h2>
                  {selectedPost.relatedGame && (
                    <Link to="/games" className="modal-game-link">
                      <FaGamepad /> Related: {selectedPost.relatedGame}
                    </Link>
                  )}
                  <p className="modal-excerpt">{selectedPost.excerpt}</p>
                </div>
              </div>
            )}

            {/* Screenshot Gallery */}
            {selectedPost.type === 'screenshot' && selectedPost.images && (
              <div className="modal-gallery">
                <div className="gallery-main">
                  <button className="gallery-nav prev" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <img 
                    src={selectedPost.images[currentImageIndex]} 
                    alt={`${selectedPost.title} - Image ${currentImageIndex + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800';
                    }}
                  />
                  <button className="gallery-nav next" onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                  <div className="gallery-counter">
                    {currentImageIndex + 1} / {selectedPost.images.length}
                  </div>
                </div>
                <div className="gallery-thumbnails">
                  {selectedPost.images.map((img, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800';
                        }}
                      />
                    </button>
                  ))}
                </div>
                <div className="modal-body">
                  <h2 className="modal-title">{selectedPost.title}</h2>
                  {selectedPost.relatedGame && (
                    <Link to="/games" className="modal-game-link">
                      <FaGamepad /> Related: {selectedPost.relatedGame}
                    </Link>
                  )}
                  <p className="modal-excerpt">{selectedPost.excerpt}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
