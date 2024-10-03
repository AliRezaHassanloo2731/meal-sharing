"use client";

import { useState } from "react";

export default function Counter({ user }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello, {user.length}!</h1>
      <button onClick={() => setCount((c) => c + 1)}>
        {count}
      </button>
    </>
  );
}
