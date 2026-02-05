"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <p>Загрузка...</p>;
  }
  console.log(session)
  if (status === "authenticated") {
    return (
      
        <button className="mx-5 my-10 p-1 cursor-pointer hover:outline-1 h-[15%] rounded-2xl" 
        onClick={() => signOut()}>SignOut</button>
      
    );
  }

  return <button className="mx-5 my-10 p-1 cursor-pointer hover:outline-1 h-[15%] rounded-2xl" onClick={() => router.push("/login")}>SingIn</button>;
}
