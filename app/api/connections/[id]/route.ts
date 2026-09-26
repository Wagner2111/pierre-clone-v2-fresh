import { fetchConnectionData, disconnectAccount } from '@/lib/pluggy'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const connectionId = params.id

    const connection = await fetchConnectionData(connectionId)

    return Response.json({
      id: connection.id,
      status: connection.status,
      connected: connection.status === 'success',
      bank: connection.institutionName,
      connectedAt: connection.createdAt,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error fetching connection'
    console.error('API error:', message)
    return Response.json(
      { error: message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const connectionId = params.id

    await disconnectAccount(connectionId)

    return Response.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error deleting connection'
    return Response.json(
      { error: message },
      { status: 500 }
    )
  }
}
