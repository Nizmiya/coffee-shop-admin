import { users, branches } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StaffJaffnaPage() {
  const staff = users.filter(u => (u.role === 'manager' || u.role === 'staff') && u.branchId === 'jaffna');
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {staff.map(staff => (
        <Card key={staff.id} className="group bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 border-0 shadow-xl hover:scale-105 transition-transform">
          <CardHeader className="flex flex-col items-center gap-2 pb-0">
            <img
              src={staff.avatar || '/assets/avatar.png'}
              alt={staff.name}
              className="w-20 h-20 rounded-full border-4 border-orange-200 shadow-lg object-cover bg-white"
            />
            <CardTitle className="text-lg font-bold text-orange-800 mt-2 text-center">
              {staff.name}
            </CardTitle>
            <Badge className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-3 py-1 rounded-full">
              {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-1 text-sm text-gray-700">
            <div className="font-medium">{branches.find(b => b.id === staff.branchId)?.name || 'Jaffna Branch'}</div>
            <div className="text-xs text-gray-500">{staff.email}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 