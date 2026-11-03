// Lists products, optionally filtered by category.
const PRODUCTS = [
  { id: 1, name: 'Desk lamp', category: 'home', price: 24.5 },
  { id: 2, name: 'Notebook', category: 'office', price: 3.2 },
  { id: 3, name: 'Office chair', category: 'office', price: 129 },
  { id: 4, name: 'Plant pot', category: 'home', price: 9.9 },
];

module.exports = function handler(req, res) {
  const category = req.query.category;
  const items = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
  res.json({ count: items.length, items });
};
