import { mockCategories } from '@/lib/mockData'

export async function GET() {
  return Response.json({
    success: true,
    data: mockCategories,
    total: mockCategories.length,
    totalSpent: mockCategories.reduce((a, c) => a + c.value, 0),
  })
}
