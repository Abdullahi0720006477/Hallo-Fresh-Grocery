import { Product } from '@/types';

export const products: Product[] = [
  // Fresh Vegetables
  {
    id: '1',
    name: 'Fresh Tomatoes',
    description: 'Ripe, juicy tomatoes from local farms in Eastleigh',
    price: 150,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcccf?w=400&h=400&fit=crop',
    category: 'Vegetables',
    stock: 50,
    rating: 4.5,
    reviews: 120,
    vendor: 'Eastleigh Fresh Farms'
  },
  {
    id: '2',
    name: 'Sukuma Wiki (Kale)',
    description: 'Nutritious and fresh kale, perfect for traditional meals',
    price: 80,
    image: 'https://images.unsplash.com/photo-1566781214261-eaa5bbd51b1b?w=400&h=400&fit=crop',
    category: 'Vegetables',
    stock: 60,
    rating: 4.7,
    reviews: 95,
    vendor: 'Local Farmers'
  },
  {
    id: '3',
    name: 'Onions',
    description: 'Golden onions, essential for every kitchen',
    price: 120,
    image: 'https://images.unsplash.com/photo-1587049352846-4a340bb3138b?w=400&h=400&fit=crop',
    category: 'Vegetables',
    stock: 70,
    rating: 4.3,
    reviews: 85,
    vendor: 'Eastleigh Fresh Farms'
  },
  {
    id: '4',
    name: 'Carrots',
    description: 'Sweet and crunchy carrots, great for salads and cooking',
    price: 100,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
    category: 'Vegetables',
    stock: 45,
    rating: 4.4,
    reviews: 70,
    vendor: 'Local Farmers'
  },
  {
    id: '5',
    name: 'Potatoes',
    description: 'Versatile potatoes for all your cooking needs',
    price: 90,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
    category: 'Vegetables',
    stock: 80,
    rating: 4.6,
    reviews: 110,
    vendor: 'Eastleigh Fresh Farms'
  },
  
  // Fresh Fruits
  {
    id: '6',
    name: 'Bananas',
    description: 'Fresh, yellow bananas rich in potassium',
    price: 200,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    category: 'Fruits',
    stock: 100,
    rating: 4.8,
    reviews: 150,
    vendor: 'Tropical Fruits Ltd'
  },
  {
    id: '7',
    name: 'Oranges',
    description: 'Juicy oranges, perfect for fresh juice',
    price: 250,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop',
    category: 'Fruits',
    stock: 55,
    rating: 4.6,
    reviews: 98,
    vendor: 'Citrus Farms Kenya'
  },
  {
    id: '8',
    name: 'Apples',
    description: 'Crisp red apples imported from South Africa',
    price: 350,
    image: 'https://images.unsplash.com/photo-1560806674-9f6241d67f3f?w=400&h=400&fit=crop',
    category: 'Fruits',
    stock: 40,
    rating: 4.7,
    reviews: 88,
    vendor: 'Premium Imports'
  },
  {
    id: '9',
    name: 'Mangoes',
    description: 'Sweet and aromatic mangoes, the king of fruits',
    price: 300,
    image: 'https://images.unsplash.com/photo-1585518419759-7fe978b81b4e?w=400&h=400&fit=crop',
    category: 'Fruits',
    stock: 65,
    rating: 4.9,
    reviews: 125,
    vendor: 'Tropical Fruits Ltd'
  },
  {
    id: '10',
    name: 'Avocados',
    description: 'Creamy avocados, perfect for breakfast',
    price: 280,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    category: 'Fruits',
    stock: 35,
    rating: 4.5,
    reviews: 75,
    vendor: 'Tropical Fruits Ltd'
  },

  // Grains & Cereals
  {
    id: '11',
    name: 'Maize Flour (2kg)',
    description: 'Fine maize flour for ugali and other dishes',
    price: 180,
    image: 'https://images.unsplash.com/photo-1585707572537-b6830487b716?w=400&h=400&fit=crop',
    category: 'Grains & Cereals',
    stock: 120,
    rating: 4.4,
    reviews: 140,
    vendor: 'Grain Mills Kenya'
  },
  {
    id: '12',
    name: 'Rice (2kg)',
    description: 'Quality long-grain rice, perfect for daily meals',
    price: 350,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop',
    category: 'Grains & Cereals',
    stock: 100,
    rating: 4.6,
    reviews: 160,
    vendor: 'Premium Grains'
  },
  {
    id: '13',
    name: 'Wheat Flour (2kg)',
    description: 'Premium wheat flour for baking and cooking',
    price: 220,
    image: 'https://images.unsplash.com/photo-1585707572537-b6830487b716?w=400&h=400&fit=crop',
    category: 'Grains & Cereals',
    stock: 90,
    rating: 4.5,
    reviews: 110,
    vendor: 'Grain Mills Kenya'
  },
  {
    id: '14',
    name: 'Beans (1kg)',
    description: 'Dried beans, rich in protein and fiber',
    price: 280,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop',
    category: 'Grains & Cereals',
    stock: 75,
    rating: 4.3,
    reviews: 85,
    vendor: 'Local Farmers'
  },

  // Dairy & Eggs
  {
    id: '15',
    name: 'Fresh Milk (1L)',
    description: 'Fresh pasteurized milk from local dairy farms',
    price: 150,
    image: 'https://images.unsplash.com/photo-1563056169-519f756eea0d?w=400&h=400&fit=crop',
    category: 'Dairy & Eggs',
    stock: 80,
    rating: 4.7,
    reviews: 130,
    vendor: 'Nairobi Dairy Farms'
  },
  {
    id: '16',
    name: 'Eggs (12 pieces)',
    description: 'Fresh farm eggs, rich in nutrients',
    price: 200,
    image: 'https://images.unsplash.com/photo-1582720471384-894fbb16e074?w=400&h=400&fit=crop',
    category: 'Dairy & Eggs',
    stock: 60,
    rating: 4.8,
    reviews: 115,
    vendor: 'Happy Hens Farm'
  },
  {
    id: '17',
    name: 'Yogurt (500ml)',
    description: 'Creamy yogurt, perfect for breakfast',
    price: 120,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291840?w=400&h=400&fit=crop',
    category: 'Dairy & Eggs',
    stock: 50,
    rating: 4.5,
    reviews: 95,
    vendor: 'Dairy Delight'
  },
  {
    id: '18',
    name: 'Cheese (200g)',
    description: 'Creamy cheese for cooking and snacking',
    price: 250,
    image: 'https://images.unsplash.com/photo-1452894895917-7794b93e9b1f?w=400&h=400&fit=crop',
    category: 'Dairy & Eggs',
    stock: 35,
    rating: 4.6,
    reviews: 78,
    vendor: 'Premium Dairy'
  },

  // Spices & Seasonings
  {
    id: '19',
    name: 'Pilipili (Chili Powder)',
    description: 'Hot and flavorful chili powder for authentic taste',
    price: 80,
    image: 'https://images.unsplash.com/photo-1596040306857-29185b8e0dd8?w=400&h=400&fit=crop',
    category: 'Spices & Seasonings',
    stock: 40,
    rating: 4.4,
    reviews: 60,
    vendor: 'Spice House'
  },
  {
    id: '20',
    name: 'Cooking Oil (1L)',
    description: 'Pure vegetable cooking oil for healthy meals',
    price: 320,
    image: 'https://images.unsplash.com/photo-1587049352846-4a340bb3138b?w=400&h=400&fit=crop',
    category: 'Spices & Seasonings',
    stock: 70,
    rating: 4.7,
    reviews: 140,
    vendor: 'Oil Refineries Ltd'
  },
  {
    id: '21',
    name: 'Salt (1kg)',
    description: 'Pure table salt for seasoning',
    price: 60,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop',
    category: 'Spices & Seasonings',
    stock: 100,
    rating: 4.5,
    reviews: 85,
    vendor: 'Salt Works'
  },
  {
    id: '22',
    name: 'Sugar (2kg)',
    description: 'Refined sugar for baking and beverages',
    price: 200,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop',
    category: 'Spices & Seasonings',
    stock: 85,
    rating: 4.6,
    reviews: 110,
    vendor: 'Sugar Mills'
  },

  // Beverages
  {
    id: '23',
    name: 'Tea (100g)',
    description: 'Premium black tea leaves for a perfect cup',
    price: 250,
    image: 'https://images.unsplash.com/photo-1597318972826-8b9e0b3e0c3f?w=400&h=400&fit=crop',
    category: 'Beverages',
    stock: 50,
    rating: 4.8,
    reviews: 120,
    vendor: 'Tea Estates Kenya'
  },
  {
    id: '24',
    name: 'Coffee (250g)',
    description: 'Aromatic coffee beans from Kenyan highlands',
    price: 450,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=400&fit=crop',
    category: 'Beverages',
    stock: 45,
    rating: 4.9,
    reviews: 135,
    vendor: 'Highland Coffee Roasters'
  },
  {
    id: '25',
    name: 'Juice (1L)',
    description: 'Fresh fruit juice, no added sugar',
    price: 180,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
    category: 'Beverages',
    stock: 60,
    rating: 4.4,
    reviews: 95,
    vendor: 'Juice Factory'
  },

  // Meat & Proteins
  {
    id: '26',
    name: 'Chicken Breast (1kg)',
    description: 'Fresh, lean chicken breast, perfect for healthy meals',
    price: 550,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
    category: 'Meat & Proteins',
    stock: 30,
    rating: 4.7,
    reviews: 105,
    vendor: 'Fresh Poultry Ltd'
  },
  {
    id: '27',
    name: 'Beef (1kg)',
    description: 'Quality beef cuts for your favorite dishes',
    price: 650,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop',
    category: 'Meat & Proteins',
    stock: 25,
    rating: 4.6,
    reviews: 90,
    vendor: 'Premium Meats'
  },
  {
    id: '28',
    name: 'Fish (1kg)',
    description: 'Fresh tilapia fish from local suppliers',
    price: 500,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop',
    category: 'Meat & Proteins',
    stock: 20,
    rating: 4.5,
    reviews: 75,
    vendor: 'Fisheries Kenya'
  },
];

export const categories = [
  { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'grains', name: 'Grains & Cereals', icon: '🌾' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'spices', name: 'Spices & Seasonings', icon: '🌶️' },
  { id: 'beverages', name: 'Beverages', icon: '☕' },
  { id: 'meat', name: 'Meat & Proteins', icon: '🍗' },
];
