export const products = [
  {
    id: 1,
    title: 'Golden Ring Aurora',
    price: 1200,
    oldPrice: 1500,
    badge: 'Хит',
    category: 'rings',
    material: 'Позолота 18К, кристаллы',
    weight: '3.2 г',
    description: 'Изысканное кольцо с нежным сиянием и элегантным дизайном для любого образа.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Pearl Necklace',
    price: 1800,
    oldPrice: 2200,
    badge: '-15%',
    category: 'necklaces',
    material: 'Жемчуг, стержень из серебра',
    weight: '4.6 г',
    description: 'Шикарное ожерелье с жемчужной нитью, добавляющее изящности вечернему образу.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Silver Earrings',
    price: 950,
    oldPrice: 1200,
    badge: 'Новинка',
    category: 'earrings',
    material: 'Серебро 925, кристаллы',
    weight: '2.8 г',
    description: 'Минималистичные серьги в трендовом серебряном оттенке для повседневной носки.',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Luxury Bracelet',
    price: 1450,
    oldPrice: 1700,
    badge: 'Bestseller',
    category: 'bracelets',
    material: 'Позолота 18К, керамические вставки',
    weight: '5.4 г',
    description: 'Стильный браслет с тонкой фактурой, который подчеркнёт женственность и статус.',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1200&auto=format&fit=crop',
  },
];

export function findProductById(id) {
  return products.find((product) => String(product.id) === String(id));
}
