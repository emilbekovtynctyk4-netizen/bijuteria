// ===================================================
// LUMÉRA JEWELRY — Search Box Component
// src/components/Header/SearchBox.jsx
// ===================================================

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from 'lib/cn';
import { ROUTES } from 'constants';
import styles from './SearchBox.module.css';

// ---- SVG Icons ----
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

// Mock recent searches (в реальном приложении — из localStorage)
const RECENT_SEARCHES = [
  'золотые кольца',
  'серьги с камнями',
  'браслеты',
  'новинки',
];

// Mock search suggestions
const SEARCH_SUGGESTIONS = [
  { id: 1, name: 'Золотое кольцо "Элегант"', category: 'Кольца', price: 1250 },
  { id: 2, name: 'Серьги с фианитами', category: 'Серьги', price: 890 },
  { id: 3, name: 'Браслет "Венеция"', category: 'Браслеты', price: 750 },
];

export default function SearchBox({ 
  autoFocus = false, 
  placeholder = 'Поиск...',
  onClose = null 
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // ---- Auto-focus ----
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // ---- Mock search API call ----
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      // Mock filtered results
      const filtered = SEARCH_SUGGESTIONS.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Navigate to catalog with search query
    navigate(`${ROUTES.CATALOG}?q=${encodeURIComponent(query.trim())}`);
    
    // Clear and close
    setQuery('');
    setIsFocused(false);
    inputRef.current?.blur();
    onClose?.();
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`${ROUTES.PRODUCT}/${suggestion.id}`);
    setQuery('');
    setIsFocused(false);
    onClose?.();
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    navigate(`${ROUTES.CATALOG}?q=${encodeURIComponent(searchTerm)}`);
    setIsFocused(false);
    onClose?.();
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const showDropdown = isFocused && (query.length >= 2 || query.length === 0);

  return (
    <div className={styles.searchBox}>
      <form className={styles.searchBox__form} onSubmit={handleSubmit}>
        <div className={cn(
          styles.searchBox__field,
          isFocused && styles['searchBox__field--focused']
        )}>
          <SearchIcon />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Delay to allow clicking on suggestions
              setTimeout(() => setIsFocused(false), 150);
            }}
            placeholder={placeholder}
            className={styles.searchBox__input}
            autoComplete="off"
            spellCheck="false"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className={styles.searchBox__clear}
              aria-label="Очистить поиск"
            >
              <CloseIcon />
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={styles.searchBox__close}
              aria-label="Закрыть поиск"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div className={styles.searchBox__dropdown}>
          {/* Loading */}
          {isLoading && (
            <div className={styles.searchBox__loading}>
              <div className={styles.searchBox__spinner} />
              <span>Поиск...</span>
            </div>
          )}

          {/* Suggestions */}
          {!isLoading && suggestions.length > 0 && (
            <div className={styles.searchBox__section}>
              <div className={styles.searchBox__sectionTitle}>Товары</div>
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  className={styles.searchBox__suggestion}
                  onClick={() => handleSuggestionClick(item)}
                >
                  <SearchIcon />
                  <div className={styles.searchBox__suggestionContent}>
                    <div className={styles.searchBox__suggestionName}>
                      {item.name}
                    </div>
                    <div className={styles.searchBox__suggestionMeta}>
                      {item.category} • {item.price} сом
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent searches (when no query) */}
          {!isLoading && query.length === 0 && RECENT_SEARCHES.length > 0 && (
            <div className={styles.searchBox__section}>
              <div className={styles.searchBox__sectionTitle}>Недавние поиски</div>
              {RECENT_SEARCHES.map((term) => (
                <button
                  key={term}
                  className={styles.searchBox__recent}
                  onClick={() => handleRecentSearchClick(term)}
                >
                  <ClockIcon />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {!isLoading && query.length >= 2 && suggestions.length === 0 && (
            <div className={styles.searchBox__empty}>
              <SearchIcon />
              <div>
                <div className={styles.searchBox__emptyTitle}>Ничего не найдено</div>
                <div className={styles.searchBox__emptyText}>
                  Попробуйте изменить запрос
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}