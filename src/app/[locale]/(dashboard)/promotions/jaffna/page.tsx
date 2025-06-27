'use client'

import { promotions } from '@/lib/mock-data';

export default function PromotionsJaffnaPage() {
  const jaffnaPromos = promotions.filter(p => p.branchId === 'jaffna');
  const weekly = jaffnaPromos.filter(p => p.type === 'weekly');
  const monthly = jaffnaPromos.filter(p => p.type === 'monthly');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">Jaffna Promotions</h1>
      <div>
        <h2 className="text-xl font-bold mb-2 text-orange-700">Weekly Offers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {weekly.map(promo => (
            <div key={promo.id} className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-4 rounded-lg shadow">
              <div className="font-bold text-orange-800 text-lg">{promo.title}</div>
              <div className="text-gray-700 mb-1">{promo.description}</div>
              <div className="text-xs text-gray-400">{promo.type.charAt(0).toUpperCase() + promo.type.slice(1)} Offer</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 text-orange-700">Monthly Offers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {monthly.map(promo => (
            <div key={promo.id} className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-4 rounded-lg shadow">
              <div className="font-bold text-orange-800 text-lg">{promo.title}</div>
              <div className="text-gray-700 mb-1">{promo.description}</div>
              <div className="text-xs text-gray-400">{promo.type.charAt(0).toUpperCase() + promo.type.slice(1)} Offer</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 