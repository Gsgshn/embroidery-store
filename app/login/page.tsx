
import LoginForm from '@/components/ui/login-form';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex mt-[5%] justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4 ">
        
        <Suspense>
          <LoginForm />
        </Suspense>
          
        
      </div>
    </main>
  );
}