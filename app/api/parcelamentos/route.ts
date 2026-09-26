import { mockParcelamentos } from '@/lib/mockData'

export async function GET() {
  return Response.json({
    success: true,
    data: mockParcelamentos,
    total: mockParcelamentos.length,
    stats: {
      ativo: 9,
      valorTotal: 8078.05,
      pago: 4502.5,
      progresso: 56,
    },
  })
}
