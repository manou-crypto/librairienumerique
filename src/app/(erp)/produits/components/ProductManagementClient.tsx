'use client';
import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import CategoryTreeSidebar from './CategoryTreeSidebar';
import ProductTable from './ProductTable';
import ProductFiltersBar from './ProductFiltersBar';
import AddEditProductModal from './AddEditProductModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export interface Product {
  id: string;
  name: string;
  reference: string;
  categoryId: string;
  categoryName: string;
  prixAchat: number;
  prixVente: number;
  stock: number;
  seuilAlerte: number;
  status: 'actif' | 'masque' | 'brouillon';
  visible: boolean;
  description: string;
  imageUrl?: string;
}

export const mockProducts: Product[] = [
  { id: 'p-001', name: 'Le Petit Prince', reference: 'LIV-0001', categoryId: 'cat-livres', categoryName: 'Livres', prixAchat: 8.50, prixVente: 18.99, stock: 45, seuilAlerte: 10, status: 'actif', visible: true, description: 'Conte poétique et philosophique d\'Antoine de Saint-Exupéry.', imageUrl: '' },
  { id: 'p-002', name: 'Cahier grand format 200p Clairefontaine', reference: 'FOU-0021', categoryId: 'cat-fournitures', categoryName: 'Fournitures scolaires', prixAchat: 1.90, prixVente: 4.50, stock: 312, seuilAlerte: 50, status: 'actif', visible: true, description: 'Cahier grand format 200 pages, papier blanc 90g/m².', imageUrl: '' },
  { id: 'p-003', name: 'Stylo BIC 4 couleurs (lot 12)', reference: 'FOU-0022', categoryId: 'cat-fournitures', categoryName: 'Fournitures scolaires', prixAchat: 2.10, prixVente: 4.90, stock: 8, seuilAlerte: 20, status: 'actif', visible: true, description: 'Lot de 12 stylos bille BIC 4 couleurs.', imageUrl: '' },
  { id: 'p-004', name: 'Clé USB SanDisk 64GB USB 3.0', reference: 'INF-0045', categoryId: 'cat-informatique', categoryName: 'Informatique', prixAchat: 12.00, prixVente: 23.95, stock: 0, seuilAlerte: 5, status: 'actif', visible: true, description: 'Clé USB SanDisk Ultra 64GB USB 3.0, vitesse jusqu\'à 100MB/s.', imageUrl: '' },
  { id: 'p-005', name: 'Dictionnaire Larousse 2026', reference: 'LIV-0012', categoryId: 'cat-livres', categoryName: 'Livres', prixAchat: 15.00, prixVente: 27.90, stock: 22, seuilAlerte: 8, status: 'actif', visible: true, description: 'Dictionnaire Larousse 2026 édition complète.', imageUrl: '' },
  { id: 'p-006', name: 'Règle plastique 30cm graduée', reference: 'FOU-0033', categoryId: 'cat-fournitures', categoryName: 'Fournitures scolaires', prixAchat: 0.40, prixVente: 1.20, stock: 3, seuilAlerte: 15, status: 'actif', visible: true, description: 'Règle en plastique transparent 30cm graduée en mm.', imageUrl: '' },
  { id: 'p-007', name: 'Cartouche encre Canon PG-545 Noire', reference: 'INF-0067', categoryId: 'cat-informatique', categoryName: 'Informatique', prixAchat: 6.50, prixVente: 12.90, stock: 0, seuilAlerte: 5, status: 'actif', visible: true, description: 'Cartouche d\'encre noire d\'origine Canon PG-545.', imageUrl: '' },
  { id: 'p-008', name: 'Cahier petits carreaux A4 96p', reference: 'FOU-0024', categoryId: 'cat-fournitures', categoryName: 'Fournitures scolaires', prixAchat: 1.10, prixVente: 2.80, stock: 6, seuilAlerte: 25, status: 'actif', visible: true, description: 'Cahier A4 96 pages petits carreaux Séyès.', imageUrl: '' },
  { id: 'p-009', name: 'Agenda 2026-2027 semainier A5', reference: 'BUR-0011', categoryId: 'cat-bureautique', categoryName: 'Bureautique', prixAchat: 3.80, prixVente: 8.90, stock: 34, seuilAlerte: 10, status: 'actif', visible: true, description: 'Agenda semainier A5 couverture rigide 2026-2027.', imageUrl: '' },
  { id: 'p-010', name: 'Rame papier A4 80g/m² 500 feuilles', reference: 'BUR-0003', categoryId: 'cat-bureautique', categoryName: 'Bureautique', prixAchat: 2.80, prixVente: 6.50, stock: 0, seuilAlerte: 10, status: 'actif', visible: true, description: 'Rame de 500 feuilles papier blanc A4 80g/m².', imageUrl: '' },
  { id: 'p-011', name: 'Souris sans fil Logitech M185', reference: 'INF-0089', categoryId: 'cat-informatique', categoryName: 'Informatique', prixAchat: 11.00, prixVente: 24.90, stock: 0, seuilAlerte: 5, status: 'masque', visible: false, description: 'Souris sans fil Logitech M185 nano récepteur USB.', imageUrl: '' },
  { id: 'p-012', name: 'Colle Pritt bâton 43g (lot 6)', reference: 'FOU-0041', categoryId: 'cat-fournitures', categoryName: 'Fournitures scolaires', prixAchat: 2.90, prixVente: 7.20, stock: 9, seuilAlerte: 20, status: 'actif', visible: true, description: 'Lot de 6 bâtons de colle Pritt 43g.', imageUrl: '' },
  { id: 'p-013', name: 'Surligneur Stabilo Boss (lot 4)', reference: 'FOU-0055', categoryId: 'cat-fournitures', categoryName: 'Fournitures scolaires', prixAchat: 1.80, prixVente: 4.30, stock: 67, seuilAlerte: 20, status: 'actif', visible: true, description: 'Lot de 4 surligneurs Stabilo Boss couleurs assorties.', imageUrl: '' },
  { id: 'p-014', name: 'Calculatrice scientifique Casio FX-82', reference: 'INF-0023', categoryId: 'cat-informatique', categoryName: 'Informatique', prixAchat: 9.00, prixVente: 18.50, stock: 15, seuilAlerte: 5, status: 'actif', visible: true, description: 'Calculatrice scientifique Casio FX-82ES PLUS.', imageUrl: '' },
  { id: 'p-015', name: 'Classeur à levier A4 dos 8cm', reference: 'BUR-0022', categoryId: 'cat-bureautique', categoryName: 'Bureautique', prixAchat: 1.50, prixVente: 3.90, stock: 88, seuilAlerte: 20, status: 'actif', visible: true, description: 'Classeur à levier A4 dos 8cm, couverture PP résistante.', imageUrl: '' },
  { id: 'p-016', name: 'L\'Étranger — Albert Camus', reference: 'LIV-0034', categoryId: 'cat-livres', categoryName: 'Livres', prixAchat: 4.00, prixVente: 9.50, stock: 18, seuilAlerte: 5, status: 'actif', visible: true, description: 'Roman d\'Albert Camus, édition Folio Gallimard.', imageUrl: '' },
  { id: 'p-017', name: 'Taille-crayon métal double trou', reference: 'FOU-0062', categoryId: 'cat-fournitures', categoryName: 'Fournitures scolaires', prixAchat: 0.60, prixVente: 1.80, stock: 42, seuilAlerte: 15, status: 'actif', visible: true, description: 'Taille-crayon en métal double trou avec réservoir.', imageUrl: '' },
  { id: 'p-018', name: 'Pochette plastique A4 perforée (x100)', reference: 'BUR-0034', categoryId: 'cat-bureautique', categoryName: 'Bureautique', prixAchat: 2.20, prixVente: 5.60, stock: 54, seuilAlerte: 15, status: 'brouillon', visible: false, description: 'Boîte de 100 pochettes plastique A4 perforées 80 microns.', imageUrl: '' },
];

export type SortField = 'name' | 'prixVente' | 'prixAchat' | 'stock' | 'marge';
export type SortDir = 'asc' | 'desc';

export default function ProductManagementClient() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') result = result.filter((p) => p.categoryId === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.reference.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') result = result.filter((p) => p.status === statusFilter);
    if (stockFilter === 'rupture') result = result.filter((p) => p.stock === 0);
    if (stockFilter === 'alerte') result = result.filter((p) => p.stock > 0 && p.stock <= p.seuilAlerte);
    if (stockFilter === 'ok') result = result.filter((p) => p.stock > p.seuilAlerte);
    result.sort((a, b) => {
      let valA: number | string;
      let valB: number | string;
      if (sortField === 'marge') {
        valA = ((a.prixVente - a.prixAchat) / a.prixVente) * 100;
        valB = ((b.prixVente - b.prixAchat) / b.prixVente) * 100;
      } else {
        valA = a[sortField as keyof Product] as number | string;
        valB = b[sortField as keyof Product] as number | string;
      }
      if (typeof valA === 'string' && typeof valB === 'string') return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return sortDir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
    return result;
  }, [products, selectedCategory, searchQuery, statusFilter, stockFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedProducts.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedProducts.map((p) => p.id)));
  };

  const handleToggleVisible = (id: string) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, visible: !p.visible, status: !p.visible ? 'actif' : 'masque' } : p));
    toast.success('Visibilité du produit mise à jour.');
  };

  const handleSaveProduct = (product: Product) => {
    if (products.find((p) => p.id === product.id)) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      toast.success(`Produit "${product.name}" mis à jour.`);
    } else {
      setProducts((prev) => [...prev, product]);
      toast.success(`Produit "${product.name}" ajouté au catalogue.`);
    }
    setEditingProduct(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast.success(`Produit "${deleteTarget.name}" supprimé.`);
  };

  const handleBulkDelete = () => {
    const count = selectedIds.size;
    setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    toast.success(`${count} produit${count > 1 ? 's' : ''} supprimé${count > 1 ? 's' : ''}.`);
  };

  const handleBulkHide = () => {
    const count = selectedIds.size;
    setProducts((prev) => prev.map((p) => (selectedIds.has(p.id) ? { ...p, visible: false, status: 'masque' as const } : p)));
    setSelectedIds(new Set());
    toast.success(`${count} produit${count > 1 ? 's' : ''} masqué${count > 1 ? 's' : ''}.`);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <CategoryTreeSidebar selectedCategory={selectedCategory} onSelectCategory={(id) => { setSelectedCategory(id); setCurrentPage(1); }} products={products} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProductFiltersBar searchQuery={searchQuery} onSearchChange={(v) => { setSearchQuery(v); setCurrentPage(1); }} statusFilter={statusFilter} onStatusChange={(v) => { setStatusFilter(v); setCurrentPage(1); }} stockFilter={stockFilter} onStockChange={(v) => { setStockFilter(v); setCurrentPage(1); }} totalFiltered={filteredProducts.length} totalAll={products.length} onAddProduct={() => setIsAddModalOpen(true)} selectedCount={selectedIds.size} onBulkDelete={handleBulkDelete} onBulkHide={handleBulkHide} />
        <ProductTable products={paginatedProducts} selectedIds={selectedIds} onToggleSelect={toggleSelect} onToggleSelectAll={toggleSelectAll} allSelected={selectedIds.size === paginatedProducts.length && paginatedProducts.length > 0} sortField={sortField} sortDir={sortDir} onSort={handleSort} onEdit={(p) => setEditingProduct(p)} onDelete={(p) => setDeleteTarget(p)} onToggleVisible={handleToggleVisible} currentPage={currentPage} totalPages={totalPages} totalItems={filteredProducts.length} pageSize={pageSize} onPageChange={setCurrentPage} />
      </div>
      <AddEditProductModal open={isAddModalOpen || editingProduct !== null} onClose={() => { setIsAddModalOpen(false); setEditingProduct(null); }} product={editingProduct} onSave={handleSaveProduct} />
      <DeleteConfirmModal open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} product={deleteTarget} onConfirm={handleDeleteConfirm} />
    </div>
  );
}
