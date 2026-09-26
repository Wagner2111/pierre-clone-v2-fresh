import { mockTransactions } from '@/lib/mockData'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const category = searchParams.get('category')

  let filtered = mockTransactions

  if (type) {
    filtered = filtered.filter(t => t.type === type)
  }

  if (category) {
    filtered = filtered.filter(t => t.category.toLowerCase().includes(category.toLowerCase()))
  }

  return Response.json({
    success: true,
    data: filtered,
    total: filtered.length,
  })
}
