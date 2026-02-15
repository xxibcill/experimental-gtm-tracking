export type CategoryId = 'crypto' | 'politics' | 'business' | 'technology' | 'entertainment'

export interface Category {
  id: CategoryId
  label: string
  icon: string
}

export type ToneOfVoice = 'neutral' | 'professional' | 'casual' | 'spicy'

export interface ToneOption {
  value: ToneOfVoice
  label: string
}

export interface NewsStory {
  id: string
  categoryId: CategoryId
  title: string
  description: string
}