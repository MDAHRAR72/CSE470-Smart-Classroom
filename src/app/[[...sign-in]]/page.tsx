"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const SignInPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#0ABBB6] to-[#0179D4]">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full space-y-6 rounded-2xl bg-white/5 px-4 py-10 shadow-xl ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-center">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              Smart Classroom
            </h1>
          </div>
          <h2 className="text-xl font-bold text-zinc-200">
            Sign in to your Account
          </h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label>Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full rounded-md bg-white/30 px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-black data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label>Password</Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="w-full rounded-md bg-white/30 px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-black data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="w-full rounded-md bg-[#FF6B6B] px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-black hover:bg-[#FF6B6B]/90 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-black active:text-white/70"
          >
            Sign In
          </SignIn.Action>
          <p className="text-center text-sm text-zinc-200">
            Don&apos;t have an account?{" "}
            <Clerk.Link
              navigate="sign-up"
              className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
            >
              Register
            </Clerk.Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default SignInPage;
