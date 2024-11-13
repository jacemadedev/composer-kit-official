import { Card } from "@/components/ui/card"
import { AuthForm } from "./auth-form"

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">AI Prompt Tuner</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
} 