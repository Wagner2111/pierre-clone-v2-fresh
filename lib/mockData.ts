export const mockUser = {
  name: 'Wagner',
  email: 'contasdigitalwagner@gmail.com',
  avatar: 'W',
}

export const mockStats = {
  gastoSetembro: 226.15,
  comparacaoAnterior: -47.8,
  maiorGasto: 'Utensílios para casa',
  ritmoGastos: 206.99,
}

export const mockAccounts = []

export const mockCards = [
  {
    id: '1',
    name: 'Nubank Platinum',
    lastDigits: '2869',
    limitTotal: 16100,
    limitUsed: 3700,
    dueDate: '15 out',
    brand: 'Mastercard',
  },
  {
    id: '2',
    name: 'Itaú Black',
    lastDigits: '5421',
    limitTotal: 25000,
    limitUsed: 8500,
    dueDate: '20 out',
    brand: 'Visa',
  },
]

export const mockCardInvoices = [
  { month: 'Ago', amount: 2100 },
  { month: 'Set', amount: 3200 },
  { month: 'Out', amount: 1800 },
  { month: 'Nov', amount: 2900 },
  { month: 'Dez', amount: 3700 },
]

export const mockTransactions = [
  {
    id: '1',
    icon: '💰',
    description: 'Pagamento recebido',
    category: 'Pagamento de cartão de crédito',
    account: 'Nubank',
    date: '15/09/2026',
    value: 789.37,
    type: 'income',
  },
  {
    id: '2',
    icon: '💰',
    description: 'Pagamento de fatura',
    category: 'Pagamento de cartão de crédito',
    account: 'Nubank',
    date: '15/09/2026',
    value: -789.37,
    type: 'expense',
  },
  {
    id: '3',
    icon: '💰',
    description: 'Transferência Recebida | 3D ENGENHARIA LTDA.',
    category: 'Transferências',
    account: 'Nubank',
    date: '15/09/2026',
    value: 820.0,
    type: 'income',
  },
  {
    id: '4',
    icon: '🏠',
    description: 'Dragao dos Parafusos P 4/12',
    category: 'Utensílios para casa',
    account: 'Nubank',
    date: '12/09/2026',
    value: -156.17,
    type: 'expense',
  },
  {
    id: '5',
    icon: '🛍️',
    description: 'PG *MEGA LIFE LTDA COM 11/12',
    category: 'Compras',
    account: 'Nubank',
    date: '04/09/2026',
    value: -69.98,
    type: 'expense',
  },
]

export const mockParcelamentos = [
  { id: '1', icon: '🏠', name: 'Dragao dos Parafusos P', parcels: '4/12', monthly: 156.18, remaining: 1249.36, status: 'ongoing', startDate: '01/09/2026' },
  { id: '2', icon: '🛍️', name: 'Kvn*Carteira Black', parcels: '4/12', monthly: 30.75, remaining: 246.0, status: 'ongoing', startDate: '05/09/2026' },
  { id: '3', icon: '🛍️', name: 'Kvn*Aiva Pro', parcels: '4/12', monthly: 50.94, remaining: 407.52, status: 'ongoing', startDate: '10/09/2026' },
  { id: '4', icon: '🛍️', name: 'Kvn*Aiva', parcels: '4/12', monthly: 24.35, remaining: 194.8, status: 'ongoing', startDate: '12/09/2026' },
  { id: '5', icon: '🛍️', name: 'Carajas Cons*Api Caraj', parcels: '4/10', monthly: 119.76, remaining: 718.56, status: 'ongoing', startDate: '08/09/2026' },
  { id: '6', icon: '🎮', name: 'PlayStation 5', parcels: '12/12', monthly: 199.99, remaining: 0, status: 'finished', startDate: '01/08/2025' },
  { id: '7', icon: '💻', name: 'Monitor LG UltraWide', parcels: '6/6', monthly: 250.0, remaining: 0, status: 'finished', startDate: '01/03/2026' },
  { id: '8', icon: '📱', name: 'iPhone 14 Pro Max', parcels: '24/24', monthly: 179.99, remaining: 0, status: 'finished', startDate: '01/09/2024' },
]

export const mockCategories = [
  {
    icon: '🛍️',
    name: 'Compras',
    value: 492.1,
    previous: 492.1,
    percentage: 45.2,
    subcategories: [
      { name: 'Roupas e acessórios', value: 245.50 },
      { name: 'Eletrônicos', value: 156.60 },
      { name: 'Outros', value: 90.0 },
    ]
  },
  {
    icon: '🏠',
    name: 'Moradia',
    value: 156.17,
    previous: 156.17,
    percentage: 14.3,
    subcategories: [
      { name: 'Aluguel', value: 120.0 },
      { name: 'Utilidades', value: 36.17 },
    ]
  },
  {
    icon: '📚',
    name: 'Educação',
    value: 69.0,
    previous: 69.0,
    percentage: 6.3,
    subcategories: [
      { name: 'Cursos online', value: 49.99 },
      { name: 'Livros', value: 19.01 },
    ]
  },
  {
    icon: '🍔',
    name: 'Alimentação',
    value: 234.50,
    previous: 234.50,
    percentage: 21.5,
    subcategories: [
      { name: 'Restaurantes', value: 134.50 },
      { name: 'Supermercado', value: 100.0 },
    ]
  },
  {
    icon: '🚗',
    name: 'Transporte',
    value: 87.30,
    previous: 87.30,
    percentage: 8.0,
    subcategories: [
      { name: 'Uber/Táxi', value: 47.30 },
      { name: 'Combustível', value: 40.0 },
    ]
  },
  {
    icon: '🏥',
    name: 'Saúde',
    value: 156.00,
    previous: 156.00,
    percentage: 14.3,
    subcategories: [
      { name: 'Farmácia', value: 89.00 },
      { name: 'Consultas', value: 67.00 },
    ]
  },
]

export const mockChartData = [
  { day: "1", thisMont: 0, lastMonth: 100 },
  { day: "5", thisMont: 150, lastMonth: 200 },
  { day: "10", thisMont: 200, lastMonth: 300 },
  { day: "12", thisMont: 350, lastMonth: 400 },
  { day: "16", thisMont: 350, lastMonth: 450 },
]

export const mockHeatmapData = [
  { day: "1", value: 0 },
  { day: "2", value: 0 },
  { day: "3", value: 0 },
  { day: "4", value: 0 },
  { day: "5", value: 50 },
  { day: "6", value: 0 },
  { day: "7", value: 0 },
  { day: "8", value: 0 },
  { day: "9", value: 0 },
  { day: "10", value: 100 },
  { day: "11", value: 0 },
  { day: "12", value: 156.17 },
  { day: "13", value: 0 },
  { day: "14", value: 0 },
  { day: "15", value: 820 },
  { day: "16", value: 0 },
]

export const mockSubscriptions = [
  { id: '1', icon: '🎬', name: 'Netflix', value: 54.90, nextBilling: '15/10/2026', category: 'Entretenimento' },
  { id: '2', icon: '🎵', name: 'Spotify Premium', value: 19.90, nextBilling: '18/10/2026', category: 'Música' },
  { id: '3', icon: '☁️', name: 'OneDrive 100GB', value: 9.99, nextBilling: '20/10/2026', category: 'Cloud Storage' },
  { id: '4', icon: '📖', name: 'Kindle Unlimited', value: 14.99, nextBilling: '16/10/2026', category: 'Leitura' },
  { id: '5', icon: '💪', name: 'Gym Pass', value: 89.90, nextBilling: '01/11/2026', category: 'Saúde' },
  { id: '6', icon: '🎓', name: 'Udemy Plus', value: 29.99, nextBilling: '25/10/2026', category: 'Educação' },
]

export const mockTopCategories = [
  { name: 'Compras', value: 492.1, percentage: 45.2 },
  { name: 'Alimentação', value: 234.50, percentage: 21.5 },
  { name: 'Saúde', value: 156.00, percentage: 14.3 },
  { name: 'Transporte', value: 87.30, percentage: 8.0 },
]
