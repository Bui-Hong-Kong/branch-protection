import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { SockItem } from '../types';
import { Search, Filter, SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export const CataloguePage: React.FC = () => {
  const {
    socks,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    availableTags,
  } = useApp();

  const [pageSize, setPageSize] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter socks
  const filteredSocks = useMemo(() => {
    return socks
      .filter((sock: SockItem) => {
        // Tag filter
        if (selectedTag !== 'all' && !sock.tags.includes(selectedTag)) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = sock.name.toLowerCase().includes(q);
          const matchDesc = sock.description.toLowerCase().includes(q);
          const matchTag = sock.tags.some((t: string) => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchTag) return false;
        }
        return true;
      })
      .sort((a: SockItem, b: SockItem) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [socks, selectedTag, searchQuery, sortBy]);

  // Pagination calculation
  const totalItems = filteredSocks.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedSocks = filteredSocks.slice(startIndex, startIndex + pageSize);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedTag('all');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 space-y-4 sm:space-y-8 animate-fadeIn">
      {/* Header & Search */}
      <div className="space-y-3">
        <div className="text-[10px] sm:text-xs text-[#8B8579] font-medium">
          <span>WeaveSocks</span>
          <span className="mx-1.5">/</span>
          <span className="text-[#FF6B4A]">Catalogue</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#1E293B] tracking-tight">
              Sock Catalogue
            </h1>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <p className="text-xs sm:text-sm text-[#64748B]">
                Showing <span className="font-bold text-[#1E293B]">{totalItems}</span> joyful pairs in stock.
              </p>
              {(selectedTag !== 'all' || searchQuery || sortBy !== 'featured') && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#FF6B4A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search socks, tags or yarn..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D5D2C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#8B8579] hover:text-[#1E293B]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Controls Bar: Tightened, compact layout with sleek scrollbars on mobile */}
      <div className="bg-[#FAF9F5] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#E8E6DF] space-y-2">
        {/* Full-width Tag Filter: Sleek horizontal scrollbar so no buttons get cropped on narrow displays */}
        <div className="w-full">
          <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap pb-1.5 pt-0.5 scrollbar-thin -mx-0.5 px-0.5">
            <span className="text-[11px] font-semibold text-[#64748B] mr-1 hidden sm:flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-[#FF6B4A]" /> Filter:
            </span>
            {availableTags.map((tag: string) => (
              <button
                key={tag}
                onClick={() => handleTagSelect(tag)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-xl capitalize transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedTag === tag
                    ? 'bg-[#1E293B] text-white shadow-xs'
                    : 'bg-white text-[#475569] hover:bg-[#F1EFEA] border border-[#E8E6DF] active:scale-95'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Page Size Row: Compact layout with horizontal scrollbar if screen is narrow */}
        <div className="pt-2 border-t border-[#E8E6DF] flex items-center justify-between gap-2 text-xs overflow-x-auto scrollbar-thin pb-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <SlidersHorizontal className="w-3 h-3 text-[#64748B]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#D5D2C8] rounded-lg px-2 py-1 text-xs text-[#1E293B] focus:ring-1 focus:ring-[#FF6B4A] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A–Z)</option>
            </select>

            {(selectedTag !== 'all' || searchQuery || sortBy !== 'featured') && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-[#FF6B4A] hover:underline flex items-center gap-1 cursor-pointer ml-0.5 whitespace-nowrap"
                title="Reset all filters and search"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0 pl-2">
            <span className="text-[#8B8579] text-[11px]">Size:</span>
            {[6, 12, 24].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  pageSize === size
                    ? 'bg-[#FF6B4A] text-white shadow-xs'
                    : 'bg-white text-[#475569] hover:bg-[#F1EFEA] border border-[#E8E6DF]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2 Columns on Mobile, 3 on Desktop */}
      {paginatedSocks.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {paginatedSocks.map((sock: SockItem) => (
            <ProductCard key={sock.id} sock={sock} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#E8E6DF] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF5F2] text-[#FF6B4A] mx-auto flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-[#1E293B]">No socks found</h3>
          <p className="text-xs text-[#64748B]">Try selecting "All" or a different tag.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#FF6B4A] text-white text-xs font-bold rounded-xl"
          >
            Show All Socks
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-4 border-t border-[#E8E6DF] flex items-center justify-between text-xs">
          <div className="text-[#64748B]">
            Page <span className="font-bold text-[#1E293B]">{safeCurrentPage}</span> of{' '}
            <span className="font-bold text-[#1E293B]">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded-lg border border-[#D5D2C8] bg-white disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  safeCurrentPage === page
                    ? 'bg-[#1E293B] text-white'
                    : 'bg-white text-[#475569] border border-[#E8E6DF]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={safeCurrentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#D5D2C8] bg-white disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
