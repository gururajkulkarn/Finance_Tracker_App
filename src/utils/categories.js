import {
  UtensilsCrossed,
  ShoppingCart,
  Zap,
  Home,
  Bus,
  Clapperboard,
  Stethoscope,
  Boxes,
} from 'lucide-react'

// Each category carries its own accent color so charts, badges, and list
// items stay visually consistent across the whole app.
export const CATEGORIES = [
  { id: 'Food', label: 'Food', color: '#D9A656', icon: UtensilsCrossed },
  { id: 'Grocery', label: 'Grocery', color: '#79A88A', icon: ShoppingCart },
  { id: 'Electricity', label: 'Electricity', color: '#E0C156', icon: Zap },
  { id: 'Rent', label: 'Rent', color: '#7B92C9', icon: Home },
  { id: 'Transport', label: 'Transport', color: '#9AC7AC', icon: Bus },
  { id: 'Entertainment', label: 'Entertainment', color: '#C97BAE', icon: Clapperboard },
  { id: 'Medical', label: 'Medical', color: '#E07856', icon: Stethoscope },
  { id: 'Others', label: 'Others', color: '#8FA39B', icon: Boxes },
]

export const CATEGORY_MAP = CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c
  return acc
}, {})

export function getCategory(id) {
  return CATEGORY_MAP[id] || CATEGORY_MAP.Others
}
