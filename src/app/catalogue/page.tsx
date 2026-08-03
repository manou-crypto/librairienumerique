'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Grid3X3, List, X, BookOpen, Laptop, Pencil, Package } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const CATEGORIES = [
{ id: 'all', label: 'Tous les produits', icon: Package },
{ id: 'livres', label: 'Livres', icon: BookOpen },
{ id: 'informatique', label: 'Informatique', icon: Laptop },
{ id: 'fournitures', label: 'Fournitures scolaires', icon: Pencil },
{ id: 'bureautique', label: 'Bureautique', icon: Package }];


const PRICE_RANGES = [
{ id: 'all', label: 'Tous les prix' },
{ id: '0-500', label: 'Moins de 500 DA' },
{ id: '500-2000', label: '500 – 2 000 DA' },
{ id: '2000-5000', label: '2 000 – 5 000 DA' },
{ id: '5000+', label: 'Plus de 5 000 DA' }];


interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  badge?: string;
}

const PRODUCTS: Product[] = [
{ id: 1, name: 'Le Petit Prince', category: 'livres', price: 850, stock: 24, image: "https://img.rocket.new/generatedImages/rocket_gen_img_10ab47496-1766275490517.png", description: 'Antoine de Saint-Exupéry — Édition illustrée', badge: 'Bestseller' },
{ id: 2, name: 'Algorithmes & Structures de données', category: 'livres', price: 2400, stock: 8, image: "https://img.rocket.new/generatedImages/rocket_gen_img_146a15013-1777404960902.png", description: 'Guide complet pour développeurs' },
{ id: 3, name: 'Laptop Lenovo IdeaPad', category: 'informatique', price: 85000, stock: 3, image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d3fe116-1772267193126.png", description: 'Core i5, 8GB RAM, 512GB SSD', badge: 'Nouveau' },
{ id: 4, name: 'Souris sans fil Logitech', category: 'informatique', price: 3200, stock: 15, image: "https://img.rocket.new/generatedImages/rocket_gen_img_115930f7d-1784562155226.png", description: 'Ergonomique, autonomie 18 mois' },
{ id: 5, name: 'Cahier grand format 200p', category: 'fournitures', price: 180, stock: 120, image: "https://images.unsplash.com/photo-1613866463234-732f7ebec4a2", description: 'Papier 90g, couverture rigide' },
{ id: 6, name: 'Stylos Bic (lot de 10)', category: 'fournitures', price: 250, stock: 200, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c3042ed3-1785770396738.png", description: 'Bleu, noir, rouge — pointe fine' },
{ id: 7, name: 'Imprimante HP LaserJet', category: 'bureautique', price: 42000, stock: 2, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1003905b1-1785770397219.png", description: 'Laser monochrome, 30 ppm', badge: 'Promo' },
{ id: 8, name: 'Ramette papier A4 500f', category: 'bureautique', price: 650, stock: 80, image: "https://img.rocket.new/generatedImages/rocket_gen_img_172b5c35e-1785770398404.png", description: 'Papier blanc 80g/m²' },
{ id: 9, name: 'Histoire de l\'Algérie', category: 'livres', price: 1200, stock: 18, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0edffc7-1767001282696.png", description: 'Édition enrichie, cartes et photos' },
{ id: 10, name: 'Clé USB 64GB Kingston', category: 'informatique', price: 1800, stock: 30, image: "https://img.rocket.new/generatedImages/rocket_gen_img_158ea07b8-1785025414521.png", description: 'USB 3.0, lecture 100MB/s' },
{ id: 11, name: 'Règle + Équerre + Rapporteur', category: 'fournitures', price: 320, stock: 60, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cdaa152c-1766506542703.png", description: 'Kit géométrie complet' },
{ id: 12, name: 'Dictionnaire Larousse 2026', category: 'livres', price: 3500, stock: 12, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b68a0966-1767974925245.png", description: 'Édition complète 90 000 mots', badge: 'Nouveau' }];


function priceInRange(price: number, rangeId: string): boolean {
  if (rangeId === 'all') return true;
  if (rangeId === '0-500') return price < 500;
  if (rangeId === '500-2000') return price >= 500 && price <= 2000;
  if (rangeId === '2000-5000') return price > 2000 && price <= 5000;
  if (rangeId === '5000+') return price > 5000;
  return true;
}

export default function CataloguePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchPrice = priceInRange(p.price, selectedPrice);
      return matchSearch && matchCat && matchPrice;
    });
  }, [search, selectedCategory, selectedPrice]);

  const activeFiltersCount = [selectedCategory !== 'all', selectedPrice !== 'all'].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Public Navbar */}
      <nav className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground text-base">LibrairieNumerique</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <Link href="/catalogue" className="text-primary font-semibold">Catalogue</Link>
            <Link href="/login" className="btn-primary text-sm py-1.5 px-4">Espace admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Notre Catalogue</h1>
          <p className="text-blue-100 text-sm mb-6">Livres, fournitures scolaires, bureautique et matériel informatique</p>
          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit, une référence..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border-0 bg-white text-foreground text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50" />
            
            {search &&
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            }
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="card-base p-4 sticky top-24">
              <h3 className="text-sm font-bold text-foreground mb-3">Catégories</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                      }>
                      
                      <Icon size={15} className="shrink-0" />
                      {cat.label}
                    </button>);

                })}
              </div>

              <h3 className="text-sm font-bold text-foreground mt-5 mb-3">Fourchette de prix</h3>
              <div className="space-y-1">
                {PRICE_RANGES.map((range) =>
                <button
                  key={range.id}
                  onClick={() => setSelectedPrice(range.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPrice === range.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                  }>
                  
                    {range.label}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filtered.length}</span> produit{filtered.length !== 1 ? 's' : ''}
                </span>
                {(selectedCategory !== 'all' || selectedPrice !== 'all') &&
                <button
                  onClick={() => {setSelectedCategory('all');setSelectedPrice('all');}}
                  className="flex items-center gap-1 text-xs text-primary hover:underline">
                  
                    <X size={12} /> Réinitialiser
                  </button>
                }
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden flex items-center gap-1.5 btn-secondary text-xs py-1.5 px-3">
                  
                  <SlidersHorizontal size={14} />
                  Filtres
                  {activeFiltersCount > 0 &&
                  <span className="bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{activeFiltersCount}</span>
                  }
                </button>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}>
                    
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}>
                    
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filters panel */}
            {filtersOpen &&
            <div className="lg:hidden card-base p-4 mb-4 fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-foreground mb-2">Catégorie</h3>
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) =>
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      selectedCategory === cat.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`
                      }>
                      
                          {cat.label}
                        </button>
                    )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground mb-2">Prix</h3>
                    <div className="space-y-1">
                      {PRICE_RANGES.map((range) =>
                    <button
                      key={range.id}
                      onClick={() => setSelectedPrice(range.id)}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      selectedPrice === range.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`
                      }>
                      
                          {range.label}
                        </button>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            }

            {/* Products grid */}
            {filtered.length === 0 ?
            <div className="card-base p-16 text-center">
                <Package size={40} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-semibold text-foreground">Aucun produit trouvé</p>
                <p className="text-xs text-muted-foreground mt-1">Essayez d'autres termes ou réinitialisez les filtres</p>
              </div> :
            viewMode === 'grid' ?
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((product) =>
              <div key={product.id} className="card-base overflow-hidden group hover:shadow-md transition-shadow duration-200">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                    src={product.image}
                    alt={`${product.name} — ${product.description}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                      {product.badge &&
                  <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {product.badge}
                        </span>
                  }
                      {product.stock <= 5 &&
                  <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Stock limité
                        </span>
                  }
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                        {CATEGORIES.find((c) => c.id === product.category)?.label}
                      </p>
                      <h3 className="text-sm font-semibold text-foreground leading-tight mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-primary">{product.price.toLocaleString('fr-DZ')} DA</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock > 0 ? `En stock (${product.stock})` : 'Rupture'}
                        </span>
                      </div>
                    </div>
                  </div>
              )}
              </div> :

            <div className="space-y-2">
                {filtered.map((product) =>
              <div key={product.id} className="card-base p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img src={product.image} alt={`${product.name} — ${product.description}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          {CATEGORIES.find((c) => c.id === product.category)?.label}
                        </p>
                        {product.badge &&
                    <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{product.badge}</span>
                    }
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-bold text-primary">{product.price.toLocaleString('fr-DZ')} DA</p>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                      </span>
                    </div>
                  </div>
              )}
              </div>
            }
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <BookOpen size={12} className="text-white" />
            </div>
            <span className="font-semibold text-foreground">LibrairieNumerique</span>
          </div>
          <p>© 2026 LibrairieNumerique — Tous droits réservés</p>
          <Link href="/login" className="text-primary hover:underline">Espace administration →</Link>
        </div>
      </footer>
    </div>);

}