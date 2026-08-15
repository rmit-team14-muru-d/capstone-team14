'use client'

import { useState, useMemo } from 'react'
import { Plus, LogOut } from 'lucide-react'
import { TeamList } from '@/features/team/TeamList'
import { RegisterTeamMemberForm } from '@/features/team/RegisterTeamMemberForm'
import { useCollection } from '@/hooks/useFirestore'
import { getTeamMembersCollection } from '@/lib/firebase/firestore'
import { useAuth } from '@/hooks/useAuth'
import { where } from 'firebase/firestore'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function TeamPage() {
  const memberRef = useMemo(() => getTeamMembersCollection(), [])
  const constraints = useMemo(() => [where('_schemaVersion', '==', 1)], [])

  const { data: members } = useCollection(memberRef, ...constraints)
  const { user, signOut } = useAuth()
  const [showForm, setShowForm] = useState(false)

  if (!user) return <FullPageSpinner />

  const hasJoined = members.some((m) => m.uid === user?.uid)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-8 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tight text-teal-400 sm:text-6xl">
            TELSTRA MURU-D
          </h1>
          <p className="mt-3 text-lg font-semibold text-zinc-400">
            The Team behind the project
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {members.length} {members.length === 1 ? 'member' : 'members'}
          </p>
          <div className="flex items-center gap-3">
            {!hasJoined && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-md bg-teal-400 px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-teal-300"
              >
                <Plus className="h-4 w-4" />
                Join Team
              </button>
            )}
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </div>
        </div>

        <TeamList />

        {showForm && <RegisterTeamMemberForm onSuccess={() => setShowForm(false)} />}
      </div>
    </div>
  )
}