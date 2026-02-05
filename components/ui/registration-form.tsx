'use client'

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { registration } from "@/lib/actions";
import { useActionState } from "react"
import { useSearchParams } from 'next/navigation';


export default function RegistrationForm(){

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const[errorMessage, formAction, isPending] = useActionState(
        registration,
        undefined
    );
    return(
        <form action={formAction} className="space-y-3">
      <div className="flex-1 flex-col rounded-4xl text-center bg-neutral-800 px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-2xl`}>
          Registration
        </h1>
        <div className="w-full">
            <div>
            <label
              className="mb-3 mt-5 block text-xl font-medium text-white-900"
              htmlFor="name"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-1 placeholder:text-gray-500"
                id="name"
                type="name"
                name="name"
                placeholder="Enter your Username"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-amber-50" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xl font-medium text-white-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-1 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-amber-50" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xl font-medium text-white-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-1 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-amber-50" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button className="mt-4 w-[40%] outline-1 rounded-4xl text-2xl" aria-disabled={isPending}>
          Register
        </button>
        
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage.message}</p>
            </>
          )}
        </div>
        
      </div>
    </form>
    )
}