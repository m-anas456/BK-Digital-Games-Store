import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaLightbulb, FaVideo, FaImages, FaSearch, FaCalendar, FaGamepad, FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import blogPosts, { getCategories } from '../data/blogData';
import './Blog.css';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = getCategories();

  // Filter posts based on type, category, and search
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

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

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeFilter, activeType, searchQuery]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-background">
          <div className="blog-particles"></div>
        </div>
        <div className="blog-hero-content">
          <h1 className="blog-title">
            <span className="title-icon"><FaGamepad /></span>
            Games Blog
          </h1>
          <p className="blog-subtitle">
            Latest news, fascinating facts, gameplay videos, and stunning screenshots
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="blog-filters">
        <div className="filters-container">
          {/* Search Bar */}
          <div className="blog-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search news, facts, videos..."
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
          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <FaSearch className="no-posts-icon" />
              <h3>No posts found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
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
                      src={post.type === 'video' ? post.thumbnail : (post.type === 'screenshot' ? post.images[0] : post.image)} 
                      alt={post.title}
                      loading="lazy"
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
                    {post.type === 'screenshot' && (
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
                  <img src={selectedPost.image} alt={selectedPost.title} />
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
                  </div>
                  <h2 className="modal-title">{selectedPost.title}</h2>
                  {selectedPost.relatedGame && (
                    <Link to="/games" className="modal-game-link">
                      <FaGamepad /> Related: {selectedPost.relatedGame}
                    </Link>
                  )}
                  <div className="modal-text">
                    {selectedPost.content.split('. ').map((sentence, index) => (
                      <p key={index}>{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</p>
                    ))}
                  </div>
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
            {selectedPost.type === 'screenshot' && (
              <div className="modal-gallery">
                <div className="gallery-main">
                  <button className="gallery-nav prev" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <img 
                    src={selectedPost.images[currentImageIndex]} 
                    alt={`${selectedPost.title} - Image ${currentImageIndex + 1}`}
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
                      <img src={img} alt={`Thumbnail ${index + 1}`} />
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
