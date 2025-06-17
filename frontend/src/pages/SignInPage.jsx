import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <SignIn
          signUpUrl="/"
          forceRedirectUrl="/home"
        />
      </div>
    </main>
  );
};

export default SignInPage;
