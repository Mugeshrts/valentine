import React, { useState, useEffect, useRef } from 'react';

type Props = {
  onSuccess: () => void;
  correctCode?: string;
};

export const PasswordPrompt: React.FC<Props> = ({ onSuccess, correctCode = '0312' }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    if (value === correctCode) {
      setError('');
      try {
        sessionStorage.setItem('authorized', 'true');
      } catch (e) {}
      onSuccess();
    } else {
      setError('Incorrect code. Please try again.');
      setValue('');
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Enter 4-digit code</h2>
        <p className="text-sm text-white/75 mb-4">Please enter secret code to continue.</p>

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
          onKeyDown={handleKey}
          inputMode="numeric"
          maxLength={4}
          placeholder="----"
          className="w-full text-center text-2xl tracking-widest py-3 rounded-md bg-white/8 border border-white/10 focus:outline-none"
        />

        {error ? <p className="text-sm text-red-400 mt-3">{error}</p> : null}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => { setValue(''); setError(''); inputRef.current?.focus(); }}
            className="flex-1 py-2 bg-gray-700 rounded-md"
          >
            Clear
          </button>
          <button
            onClick={submit}
            className="flex-1 py-2 bg-orange-400 text-black font-semibold rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
