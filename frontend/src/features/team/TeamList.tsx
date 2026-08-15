'use client'

import { useState, useMemo } from 'react'
import { Users, Trash2, AlertTriangle } from 'lucide-react'
import { useCollection } from '@/hooks/useFirestore'
import { getTeamMembersCollection } from '@/lib/firebase/firestore'
import { useAuth } from '@/hooks/useAuth'
import { formatDate } from '@/lib/utils'
import { EmptyState } from '@/components/shared/EmptyState'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'
import { where } from 'firebase/firestore'
import { deleteTeamMemberAction } from './actions'

const ROLE_LABELS: Record<string, string> = {
  PM: 'Project Manager',
  DEV: 'Developer',
  QA: 'QA Engineer',
  UX: 'UX Designer',
  BA: 'Business Analyst',
}

const BLURB_LIMIT = 140

export function TeamList() {
  const teamRef = useMemo(() => getTeamMembersCollection(), [])
  const constraints = useMemo(() => [where('_schemaVersion', '==', 1)], [])

  const {
    data: members,
    loading,
    error,
  } = useCollection(teamRef, ...constraints)
  const { user } = useAuth()
  const [deleting, setDeleting] = useState(false)
  const [confirmTarget, setConfirmTarget] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  if (loading) return <FullPageSpinner />

  if (error) {
    console.error('Error fetching team members:', error)
    return <p className="text-red-500">Error fetching team members.</p>
  }

  if (members.length === 0) {
    return (
      <EmptyState
        title="No team members yet"
        description="Be the first to join the team."
        icon={Users}
      />
    )
  }

  const handleDelete = async () => {
    setDeleting(true)
    await deleteTeamMemberAction()
    setDeleting(false)
    setConfirmTarget(null)
  }

  const toggleExpanded = (uid: string) => {
    setExpanded((prev) => ({ ...prev, [uid]: !prev[uid] }))
  }

    return (
    <div className="grid gap-4 sm:grid-cols-2">
      {members.map((member) => {
        const isOwn = member.uid === user?.uid
        const isExpanded = expanded[member.uid]
        const blurb = member.blurb ?? ''
        const isLong = blurb.length > BLURB_LIMIT
        const displayBlurb = isExpanded || !isLong ? blurb : `${blurb.slice(0, BLURB_LIMIT)}…`

        return (
          <div
            key={member.uid}
            className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
          >
            <div className="relative h-56 w-full bg-gradient-to-br from-cyan-400 via-teal-500 to-teal-800">
              {member.photoURL && (
                <img
                  src={member.photoURL}
                  alt={member.displayName ?? ''}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {isOwn && (
              <button
                type="button"
                onClick={() => setConfirmTarget(member.uid)}
                disabled={deleting}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/40 text-white/80 backdrop-blur transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
                aria-label="Leave team"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}

            <div className="p-4">
              {confirmTarget === member.uid ? (
                <div className="flex flex-col items-center gap-2 py-1 text-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <p className="text-xs font-medium text-zinc-200">Leave the team?</p>
                  <p className="text-[11px] text-zinc-500">
                    This will remove your member profile. You can rejoin later.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleting}
                      className="rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                    >
                      {deleting ? 'Removing...' : 'Remove'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmTarget(null)}
                      disabled={deleting}
                      className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-teal-400">
                    {ROLE_LABELS[member.role] ?? member.role}
                  </p>
                  <p className="mt-0.5 text-base font-bold text-white">
                    {member.displayName ?? member.email}
                    {isOwn && (
                      <span className="ml-1 text-xs font-normal text-zinc-500">(you)</span>
                    )}
                  </p>
                  {blurb && (
                    <p className="mt-1.5 break-words text-xs leading-relaxed text-zinc-400">
                      {displayBlurb}
                    </p>
                  )}
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(member.uid)}
                      className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-400 underline underline-offset-2 hover:text-teal-300"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                  {member.createdAt && (
                    <p className="mt-2 text-[11px] text-zinc-600">
                      Joined {formatDate(member.createdAt.toDate())}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}