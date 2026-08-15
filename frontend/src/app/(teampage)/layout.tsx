import { redirect } from 'next/navigation'
import { getServerSession } from '@/actions/auth.actions'

export default async function TeampageLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  if (!session) redirect('/auth/signin')

  return <div className="min-h-screen bg-black">{children}</div>
}