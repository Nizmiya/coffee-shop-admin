'use client'

import { useState, useEffect } from 'react';
import { promotions as initialPromotions, branches } from '@/lib/mock-data';
import { useDashboardStore } from '@/lib/store/dashboard-store';

const branchOptions = [
  { id: 'all', name: 'All Branches' },
  ...branches.map(b => ({ id: b.id, name: b.name }))
];

function getLocalPromotions() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('promotions');
    if (data) return JSON.parse(data);
  }
  return initialPromotions;
}

export default function PromotionsPage() {
  const { selectedBranchView } = useDashboardStore();
  const [showForm, setShowForm] = useState(false);
  const [promoList, setPromoList] = useState(getLocalPromotions());
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'weekly',
    branchId: 'all',
    start: '',
    end: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('promotions', JSON.stringify(promoList));
    }
  }, [promoList]);

  const handleAdd = (e) => {
    e.preventDefault();
    setError('');
    if (!form.start || !form.end) {
      setError('Start and end date/time are required.');
      return;
    }
    if (new Date(form.end) <= new Date(form.start)) {
      setError('End date/time must be after start date/time.');
      return;
    }
    const newPromo = {
      id: 'promo' + (promoList.length + 1),
      ...form,
      createdAt: new Date(),
    };
    setPromoList([newPromo, ...promoList]);
    setShowForm(false);
    setForm({ title: '', description: '', type: 'weekly', branchId: 'all', start: '', end: '' });
  };

  const handleDelete = (id) => {
    setPromoList(promoList.filter(p => p.id !== id));
  };

  // Filter promotions by selected branch
  let filteredPromos = promoList;
  if (selectedBranchView === 'all') {
    filteredPromos = promoList.filter(p => p.branchId === 'all' || p.branchId === 'jaffna' || p.branchId === 'colombo');
  } else {
    filteredPromos = promoList.filter(p => p.branchId === selectedBranchView);
  }
  const weekly = filteredPromos.filter(p => p.type === 'weekly');
  const monthly = filteredPromos.filter(p => p.type === 'monthly');

  function formatDateTime(dt) {
    if (!dt) return '';
    const d = new Date(dt);
    return d.toLocaleString();
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">Promotions</h1>
        <button
          className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold shadow hover:scale-105 transition"
          onClick={() => setShowForm(true)}
        >
          + Add New Promotion
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl mx-auto">
          {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input required className="w-full border rounded px-3 py-2" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea required className="w-full border rounded px-3 py-2" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Type</label>
            <select className="w-full border rounded px-3 py-2" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Branch</label>
            <select className="w-full border rounded px-3 py-2" value={form.branchId} onChange={e => setForm(f => ({ ...f, branchId: e.target.value }))}>
              {branchOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Start Date/Time</label>
              <input type="datetime-local" required className="w-full border rounded px-3 py-2" value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">End Date/Time</label>
              <input type="datetime-local" required className="w-full border rounded px-3 py-2" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold">Add Promotion</button>
          </div>
        </form>
      )}
      <div>
        <h2 className="text-xl font-bold mb-2 text-orange-700">Weekly Offers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {weekly.map(promo => (
            <div key={promo.id} className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-4 rounded-lg shadow relative">
              <button onClick={() => handleDelete(promo.id)} className="absolute top-2 right-2 text-xs text-red-600 font-bold bg-white rounded-full px-2 py-1 shadow hover:bg-red-100">Delete</button>
              <div className="font-bold text-orange-800 text-lg">{promo.title}</div>
              <div className="text-gray-700 mb-1">{promo.description}</div>
              <div className="text-xs text-gray-500">{branchOptions.find(b => b.id === promo.branchId)?.name || 'All Branches'}</div>
              <div className="text-xs text-gray-400">{promo.type.charAt(0).toUpperCase() + promo.type.slice(1)} Offer</div>
              <div className="text-xs text-gray-500 mt-1">{formatDateTime(promo.start)} - {formatDateTime(promo.end)}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 text-orange-700">Monthly Offers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {monthly.map(promo => (
            <div key={promo.id} className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-4 rounded-lg shadow relative">
              <button onClick={() => handleDelete(promo.id)} className="absolute top-2 right-2 text-xs text-red-600 font-bold bg-white rounded-full px-2 py-1 shadow hover:bg-red-100">Delete</button>
              <div className="font-bold text-orange-800 text-lg">{promo.title}</div>
              <div className="text-gray-700 mb-1">{promo.description}</div>
              <div className="text-xs text-gray-500">{branchOptions.find(b => b.id === promo.branchId)?.name || 'All Branches'}</div>
              <div className="text-xs text-gray-400">{promo.type.charAt(0).toUpperCase() + promo.type.slice(1)} Offer</div>
              <div className="text-xs text-gray-500 mt-1">{formatDateTime(promo.start)} - {formatDateTime(promo.end)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 