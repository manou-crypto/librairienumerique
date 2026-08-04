'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { id: 'cat-livres', name: 'Livres', value: 6840, color: '#1D4ED8' },
  { id: 'cat-fournitures', name: 'Fournitures scolaires', value: 4120, color: '#0EA5E9' },
  { id: 'cat-informatique', name: 'Informatique', value: 3980, color: '#F97316' },
  { id: 'cat-bureautique', name: 'Bureautique', value: 2240, color: '#8B5CF6' },
  { id: 'cat-autres', name: 'Autres', value: 1160, color: '#94A3B8' },
];

const total = data.reduce((s, d) => s + d.value, 0);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-card border border-border rounded-xl shadow-elevated px-3 py-2 text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ background: item.payload.color }} />
        <span className="font-semibold text-foreground">{item.name}</span>
      </div>
      <p className="tabular-nums text-muted-foreground">{item.value.toLocaleString('fr-FR')} €</p>
      <p className="text-muted-foreground">{((item.value / total) * 100).toFixed(1)}%</p>
    </div>
  );
}

export default function CategoryPieChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
            {data.map((entry) => <Cell key={entry.id} fill={entry.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-1.5 mt-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
            <span className="text-xs text-muted-foreground flex-1 truncate">{item.name}</span>
            <span className="text-xs font-semibold tabular-nums text-foreground">{((item.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
