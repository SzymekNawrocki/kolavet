export const CATEGORIES = ['psy', 'koty', 'egzotyczne', 'porady'] as const;
export type Category = typeof CATEGORIES[number];

export const CATEGORY_LABELS_PL: Record<Category, string> = {
  psy: 'Psy',
  koty: 'Koty',
  egzotyczne: 'Egzotyczne',
  porady: 'Porady',
};
