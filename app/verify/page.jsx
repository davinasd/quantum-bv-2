"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Verify() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');

  const verifyCode=(verificationCode)=>{
    if(verificationCode == "adhithi") return true;
    return false;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your backend API to verify the code
    const isValidCode = verifyCode(verificationCode);

    if (isValidCode) {
      // If the code is valid, redirect the user to their dashboard
      router.push('/');
    } else {
      // If the code is invalid, display an error message
      alert('Invalid verification code. Please try again.');
    }
  };

  return (
    <div>
      <h1>Verify Your Identity</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Verification Code:
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </label>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}