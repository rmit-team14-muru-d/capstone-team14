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
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        viewBox="0 0 800 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g stroke="#ffffff" strokeWidth="0.6" fill="none">
          <path d="M50 0 L50 900" />
          <path d="M200 0 L200 900" />
          <path d="M400 0 L400 900" />
          <path d="M600 0 L600 900" />
          <path d="M750 0 L750 900" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-2xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-teal-400 sm:text-4xl">
            TELSTRA MURU-D
          </h1>
          <p className="mt-2 text-sm font-semibold text-zinc-400">
            The Team behind the project
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            {members.length} {members.length === 1 ? 'member' : 'members'}
          </p>
          <div className="flex items-center gap-2">
            {!hasJoined && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-1.5 rounded-md bg-teal-400 px-3 py-1.5 text-xs font-bold text-black transition-colors hover:bg-teal-300"
              >
                <Plus className="h-3.5 w-3.5" />
                Join Team
              </button>
            )}
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900"
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