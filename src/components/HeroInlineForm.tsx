"use client";

import { startTransition, useState } from "react";

export function HeroInlineForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="flex flex-col gap-3 rounded-[1.5rem] border border-orange-100 bg-white p-4 shadow-sm md:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(() => setSubmitted(true));
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="회사 이메일"
        className="h-12 flex-1 rounded-xl border border-orange-100 px-4 text-sm outline-none ring-0"
      />
      <button
        type="submit"
        className="h-12 rounded-xl bg-stone-950 px-5 text-sm font-medium text-white"
      >
        {submitted ? "접수 준비됨" : "교육 상담 요청"}
      </button>
    </form>
  );
}
