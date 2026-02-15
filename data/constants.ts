import { Category, ToneOption } from '@/types'

export const categories: Category[] = [
  { id: 'crypto', label: 'Crypto', icon: 'crypto' },
  { id: 'politics', label: 'Politics', icon: 'briefcase' },
  { id: 'business', label: 'Business & Finance', icon: 'briefcase' },
  { id: 'technology', label: 'Technology', icon: 'settings' },
  { id: 'entertainment', label: 'Entertainment', icon: 'play-circle' },
]

export const toneOptions: ToneOption[] = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'spicy', label: 'Spicy' },
]