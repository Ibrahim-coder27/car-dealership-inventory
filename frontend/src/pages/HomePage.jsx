import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import vehicleService from "../services/vehicleService";
import { toast } from "react-hot-toast";

function HomePage() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    make: "", model: "", category: "", minPrice: "", maxPrice: "", sortBy: "",
  });

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    make: "", model: "", category: "SUV", price: "", quantity: "",
  });
  const [restockQty, setRestockQty] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchVehicles = async (activeFilters = null) => {
    setLoading(true);
    try {
      const data = activeFilters
        ? await vehicleService.searchVehicles(activeFilters)
        : await vehicleService.getAllVehicles();
      setVehicles(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryTabClick = (category) => {
    const updated = { ...filters, category: category === filters.category ? "" : category };
    setFilters(updated);
    const active = {};
    Object.keys(updated).forEach((k) => { if (updated[k]) active[k] = updated[k]; });
    fetchVehicles(active);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const active = {};
    Object.keys(filters).forEach((k) => { if (filters[k]) active[k] = filters[k]; });
    fetchVehicles(active);
  };

  const handleReset = () => {
    setFilters({ make: "", model: "", category: "", minPrice: "", maxPrice: "", sortBy: "" });
    fetchVehicles();
  };

  const handlePurchase = async (id) => {
    try {
      const updated = await vehicleService.purchaseVehicle(id, 1);
      setVehicles((prev) => prev.map((v) => (v._id === id ? updated : v)));
      toast.success("Vehicle purchased successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Purchase failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await vehicleService.deleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
      toast.success("Vehicle deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed.");
    }
  };

  const validateForm = () => {
    if (!formData.make.trim()) { toast.error("Make is required"); return false; }
    if (!formData.model.trim()) { toast.error("Model is required"); return false; }
    if (formData.price === "" || Number(formData.price) < 0) { toast.error("Valid price required"); return false; }
    if (formData.quantity === "" || Number(formData.quantity) < 0) { toast.error("Valid quantity required"); return false; }
    return true;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setActionLoading(true);
    try {
      const added = await vehicleService.createVehicle({
        make: formData.make.trim(), model: formData.model.trim(),
        category: formData.category, price: Number(formData.price), quantity: Number(formData.quantity),
      });
      setVehicles((prev) => [added, ...prev]);
      setShowAddModal(false);
      toast.success("Vehicle added!");
      setFormData({ make: "", model: "", category: "SUV", price: "", quantity: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add vehicle.");
    } finally { setActionLoading(false); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setActionLoading(true);
    try {
      const updated = await vehicleService.updateVehicle(selectedVehicle._id, {
        make: formData.make.trim(), model: formData.model.trim(),
        category: formData.category, price: Number(formData.price), quantity: Number(formData.quantity),
      });
      setVehicles((prev) => prev.map((v) => (v._id === selectedVehicle._id ? updated : v)));
      setShowEditModal(false);
      toast.success("Vehicle updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    } finally { setActionLoading(false); }
  };

  const handleRestockSubmit = async (e) => {
    e.preventDefault();
    if (restockQty <= 0) { toast.error("Quantity must be > 0"); return; }
    setActionLoading(true);
    try {
      const updated = await vehicleService.restockVehicle(selectedVehicle._id, Number(restockQty));
      setVehicles((prev) => prev.map((v) => (v._id === selectedVehicle._id ? updated : v)));
      setShowRestockModal(false);
      toast.success("Vehicle restocked!");
      setRestockQty(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Restock failed.");
    } finally { setActionLoading(false); }
  };

  const openEditModal = (v) => {
    setSelectedVehicle(v);
    setFormData({ make: v.make, model: v.model, category: v.category, price: v.price, quantity: v.quantity });
    setShowEditModal(true);
  };
  const openRestockModal = (v) => { setSelectedVehicle(v); setRestockQty(1); setShowRestockModal(true); };
  const openAddModal = () => {
    setFormData({ make: "", model: "", category: "SUV", price: "", quantity: "" });
    setShowAddModal(true);
  };

  // Sort local list if sortBy specified
  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (filters.sortBy === "price_asc") return a.price - b.price;
    if (filters.sortBy === "price_desc") return b.price - a.price;
    if (filters.sortBy === "stock_desc") return b.quantity - a.quantity;
    if (filters.sortBy === "make_asc") return a.make.localeCompare(b.make);
    return 0;
  });

  // Stats
  const totalModels = vehicles.length;
  const totalStock = vehicles.reduce((s, v) => s + v.quantity, 0);
  const outOfStock = vehicles.filter((v) => v.quantity === 0).length;
  const lowStock = vehicles.filter((v) => v.quantity > 0 && v.quantity < 3).length;

  const inputClass = "w-full rounded-xl border border-surface-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white";

  const categoryGradients = {
    SUV: "from-indigo-600 to-purple-600",
    Sedan: "from-blue-600 to-cyan-600",
    Hatchback: "from-teal-600 to-emerald-600",
    Truck: "from-amber-600 to-orange-600",
  };

  const categoryColors = {
    SUV: "bg-purple-50 text-purple-700 border-purple-200",
    Sedan: "bg-blue-50 text-blue-700 border-blue-200",
    Hatchback: "bg-teal-50 text-teal-700 border-teal-200",
    Truck: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Banner */}
      <div className="animate-fade-in-up mb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-700 via-indigo-800 to-purple-900 p-8 sm:p-10 shadow-2xl">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute -right-12 -top-12 w-80 h-80 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-indigo-400/20 blur-xl" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Inventory Stream
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Home Dashboard
              </h1>
              <p className="mt-2 text-primary-100 text-sm max-w-lg">
                Manage, search, purchase, and restock vehicles across your dealership network in real-time.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{user?.name}</p>
                <span className="text-xs text-primary-200 capitalize font-medium">{user?.role} Account</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-children">
        {[
          { label: "Total Models", value: totalModels, color: "text-surface-800", bg: "bg-surface-50", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
          { label: "Total Stock", value: totalStock, color: "text-primary-600", bg: "bg-primary-50", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
          { label: "Out of Stock", value: outOfStock, color: outOfStock > 0 ? "text-red-600" : "text-surface-800", bg: outOfStock > 0 ? "bg-red-50" : "bg-surface-50", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
          { label: "Low Stock", value: lowStock, color: lowStock > 0 ? "text-amber-600" : "text-surface-800", bg: lowStock > 0 ? "bg-amber-50" : "bg-surface-50", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">{stat.label}</span>
              <div className={`w-8 h-8 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <svg className={`w-4 h-4 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
            <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter Panel */}
      <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-5 border-b border-surface-100">
          <div>
            <h2 className="text-lg font-bold text-surface-800">Search & Filter Inventory</h2>
            <p className="text-xs text-surface-400 mt-0.5">Filter by make, model, price range, or category</p>
          </div>
          <button onClick={openAddModal} className="btn-primary flex items-center gap-2 text-sm !py-2.5 !px-5 shadow-md hover:shadow-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add New Vehicle
          </button>
        </div>

        {/* Category Quick Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-5 mb-4">
          <span className="text-xs font-bold text-surface-400 uppercase tracking-wider mr-2">Category:</span>
          {["", "SUV", "Sedan", "Hatchback", "Truck"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryTabClick(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                filters.category === cat
                  ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                  : "bg-white text-surface-600 border-surface-200 hover:bg-surface-100"
              }`}
            >
              {cat === "" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1.5">Make</label>
            <input type="text" name="make" value={filters.make} onChange={handleFilterChange} placeholder="e.g. Toyota" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1.5">Model</label>
            <input type="text" name="model" value={filters.model} onChange={handleFilterChange} placeholder="e.g. Camry" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1.5">Min Price ($)</label>
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1.5">Max Price ($)</label>
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="100,000" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1.5">Sort By</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className={inputClass}>
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="stock_desc">Stock: High to Low</option>
              <option value="make_asc">Make: A to Z</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-5 flex justify-end gap-3 mt-1">
            <button type="button" onClick={handleReset} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-surface-500 hover:text-surface-700 bg-surface-100 hover:bg-surface-200 transition-all">
              Reset Filters
            </button>
            <button type="submit" className="btn-primary text-sm !py-2.5">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Apply Search
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Vehicle Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="spinner" />
          <span className="mt-4 text-surface-400 font-semibold text-sm">Loading inventory...</span>
        </div>
      ) : sortedVehicles.length === 0 ? (
        <div className="glass-card rounded-3xl py-20 text-center animate-fade-in">
          <svg className="w-16 h-16 text-surface-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-bold text-surface-700">No Matching Vehicles Found</h3>
          <p className="text-surface-400 mt-1 text-sm">Try resetting or adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {sortedVehicles.map((vehicle) => {
            const oos = vehicle.quantity === 0;
            const low = vehicle.quantity > 0 && vehicle.quantity < 3;
            const bgGradient = categoryGradients[vehicle.category] || "from-primary-600 to-indigo-600";

            return (
              <div key={vehicle._id} className="glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
                {/* Visual Top Card Banner */}
                <div className={`h-28 bg-gradient-to-r ${bgGradient} p-5 relative flex justify-between items-start overflow-hidden`}>
                  <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-4 translate-y-2 pointer-events-none">
                    <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4h14v4z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 uppercase tracking-wider">
                    {vehicle.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${
                    oos
                      ? "bg-red-500/90 text-white border-red-400"
                      : low
                      ? "bg-amber-400/90 text-surface-900 border-amber-300"
                      : "bg-emerald-500/90 text-white border-emerald-400"
                  }`}>
                    {oos ? "Out of Stock" : low ? `Low Stock (${vehicle.quantity})` : `${vehicle.quantity} In Stock`}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">{vehicle.make}</span>
                    <h3 className="text-2xl font-black text-surface-800 mt-0.5 group-hover:text-primary-600 transition-colors">
                      {vehicle.model}
                    </h3>
                  </div>

                  <div className="mt-6 flex items-end justify-between pt-4 border-t border-surface-100">
                    <div>
                      <span className="block text-xs font-bold text-surface-400 uppercase tracking-wider">Price</span>
                      <span className="text-2xl font-black text-surface-900">
                        ${vehicle.price?.toLocaleString()}
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${categoryColors[vehicle.category] || "bg-surface-100 text-surface-700"}`}>
                      {vehicle.make}
                    </span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="bg-surface-50/80 p-4 border-t border-surface-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => handlePurchase(vehicle._id)}
                    disabled={oos}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      oos
                        ? "bg-surface-200 text-surface-400 cursor-not-allowed border border-surface-300"
                        : "btn-primary !rounded-xl shadow-md hover:shadow-indigo-500/25"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {oos ? "Out of Stock" : "Purchase Vehicle"}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(vehicle)}
                      className="flex-1 py-2 px-3 text-xs font-bold text-surface-700 bg-white hover:bg-surface-100 border border-surface-200 rounded-xl shadow-xs transition-all duration-150 flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    {user?.role === "admin" && (
                      <>
                        <button
                          onClick={() => openRestockModal(vehicle)}
                          className="flex-1 py-2 px-3 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Restock
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          className="flex-1 py-2 px-3 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ MODALS ═══ */}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-8 modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-surface-100 pb-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-surface-800">Add New Vehicle</h3>
                <p className="text-xs text-surface-400 mt-0.5">Enter details to add to inventory</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-xl hover:bg-surface-100 flex items-center justify-center text-surface-400 hover:text-surface-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Make</label><input required value={formData.make} onChange={(e) => setFormData({ ...formData, make: e.target.value })} placeholder="e.g. Tesla" className={inputClass} /></div>
              <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Model</label><input required value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} placeholder="e.g. Model Y" className={inputClass} /></div>
              <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Category</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputClass}><option value="SUV">SUV</option><option value="Sedan">Sedan</option><option value="Hatchback">Hatchback</option><option value="Truck">Truck</option></select></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Price ($)</label><input type="number" min="0" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="45000" className={inputClass} /></div>
                <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Quantity</label><input type="number" min="0" required value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} placeholder="5" className={inputClass} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-5 border-t border-surface-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-surface-500 hover:bg-surface-100 border border-surface-200 transition-all">Cancel</button>
                <button type="submit" disabled={actionLoading} className="btn-primary text-sm !py-2.5 !px-6">{actionLoading ? "Adding..." : "Add Vehicle"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-8 modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-surface-100 pb-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-surface-800">Edit Vehicle</h3>
                <p className="text-xs text-surface-400 mt-0.5">Update vehicle specifications</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="w-8 h-8 rounded-xl hover:bg-surface-100 flex items-center justify-center text-surface-400 hover:text-surface-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Make</label><input required value={formData.make} onChange={(e) => setFormData({ ...formData, make: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Model</label><input required value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Category</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputClass}><option value="SUV">SUV</option><option value="Sedan">Sedan</option><option value="Hatchback">Hatchback</option><option value="Truck">Truck</option></select></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Price ($)</label><input type="number" min="0" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className={inputClass} /></div>
                <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Quantity</label><input type="number" min="0" required value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className={inputClass} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-5 border-t border-surface-100">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-surface-500 hover:bg-surface-100 border border-surface-200 transition-all">Cancel</button>
                <button type="submit" disabled={actionLoading} className="btn-primary text-sm !py-2.5 !px-6">{actionLoading ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 modal-overlay" onClick={() => setShowRestockModal(false)}>
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 sm:p-8 modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-surface-100 pb-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-surface-800">Restock Vehicle</h3>
                <p className="text-xs text-surface-400 mt-0.5">Increase stock count</p>
              </div>
              <button onClick={() => setShowRestockModal(false)} className="w-8 h-8 rounded-xl hover:bg-surface-100 flex items-center justify-center text-surface-400 hover:text-surface-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-sm text-surface-600 mb-4">Restocking <span className="font-bold text-surface-900">{selectedVehicle?.make} {selectedVehicle?.model}</span></p>
            <form onSubmit={handleRestockSubmit} className="space-y-4">
              <div><label className="block text-xs font-bold text-surface-500 uppercase tracking-wider mb-1.5">Quantity to Add</label><input type="number" min="1" required value={restockQty} onChange={(e) => setRestockQty(e.target.value)} className={inputClass} /></div>
              <div className="flex justify-end gap-3 pt-5 border-t border-surface-100">
                <button type="button" onClick={() => setShowRestockModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-surface-500 hover:bg-surface-100 border border-surface-200 transition-all">Cancel</button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md transition-all disabled:opacity-50">{actionLoading ? "Updating..." : "Restock"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;