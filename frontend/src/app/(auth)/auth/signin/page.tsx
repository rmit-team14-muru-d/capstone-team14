'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/team')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/team')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/team')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 flex bg-black text-white">
      {/* Left panel, + grid*/}
      <div className="relative hidden w-2/3 flex-col items-center justify-center overflow-hidden bg-black p-16 lg:flex">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.15]"
          viewBox="0 0 800 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* grid*/}
          <g stroke="#ffffff" strokeWidth="1" fill="none">
            <path d="M0 0 L800 300" />
            <path d="M0 100 L700 900" />
            <path d="M0 250 L800 100" />
            <path d="M0 450 L800 650" />
            <path d="M150 0 L0 500" />
            <path d="M400 0 L200 900" />
            <path d="M650 0 L500 900" />
            <path d="M800 500 L300 900" />
            <path d="M800 750 L550 0" />
          </g>
        </svg>

        <div className="relative space-y-1">
          <h1 className="text-6xl font-black tracking-tight">
            Sign in to <span className="text-white">Name</span>
          </h1>
          <p className="text-zinc-500">Project Description</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center bg-zinc-950 border-1 border-zinc-800 px-8 py-16 lg:w-1/3 lg:px-20">
        <div className="mx-auto w-full max-w-md space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight">Welcome back!</h2>
            <p className="text-zinc-500">Sign in to access your workspace</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-8 shadow-2xl backdrop-blur">
            <div className="mb-8 flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10">
                <svg className="h-7 w-7 text-teal-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Name</h3>
                <p className="text-sm text-zinc-500">Sign in to your dashboard</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-zinc-950 px-3 text-zinc-600">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                  Email or Username
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-3 text-sm text-white shadow-sm placeholder:text-zinc-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none aria-invalid:border-red-500"
                    placeholder="name@domain.com"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-400" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 11V8a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 py-2.5 pl-10 pr-3 text-sm text-white shadow-sm placeholder:text-zinc-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none aria-invalid:border-red-500"
                    placeholder="••••••••••••"
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p id="password-error" className="text-xs text-red-400" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-teal-400 px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-teal-400 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}