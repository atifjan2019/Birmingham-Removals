"use client";

import { useActionState } from "react";
import { loginAsAdmin } from "@/app/actions/auth";
import { Loader2, LockKeyhole } from "lucide-react";
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
          Checking...
        </>
      ) : (
        "Unlock Dashboard"
      )}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAsAdmin, null);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700 ml-1 block">PIN Code</label>
        <div className="relative">
          <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            inputMode="numeric"
            name="pin"
            placeholder="Enter 6-digit PIN"
            autoComplete="current-password"
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
  );
}
