"use client";

import { useActionState, useEffect } from "react";
import { loginAsAdmin } from "@/app/actions/auth";
import { Loader2, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In to Dashboard"
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAsAdmin, null);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#FF6B35]/25">
            B
          </div>
          <span className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 tracking-tight">
            Birmingham Removals
          </span>
        </Link>
        
        <div className="glass-card p-8 sm:p-10 shadow-xl border-gray-200/60">
          <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-space)] mb-2 text-center">
            Admin Portal
          </h1>
          <p className="text-muted text-center mb-8 text-sm">
            Enter your credentials to manage operations.
          </p>

          <form action={formAction} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 text-gray-900"
                />
              </div>
            </div>

            {state?.error && (
              <div className="p-3 mt-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium text-center border border-red-100">
                {state.error}
              </div>
            )}

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
