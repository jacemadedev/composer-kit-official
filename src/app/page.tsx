"use client"

import { useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PromptFineTuningAppComponent } from "@/components/prompt-fine-tuning-app"

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return session ? <PromptFineTuningAppComponent /> : <AuthLayout />
}
