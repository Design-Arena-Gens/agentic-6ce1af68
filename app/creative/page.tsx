"use client";
import { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import type { CreativeInput, CreativeOutput } from "@/lib/generator";

export default function CreativePage() {
  const [data, setData] = useState<CreativeOutput | null>(null);
  const [pending, setPending] = useState(false);
  async function onGenerate(input: CreativeInput) {
    setPending(true);
    setData(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "creative", input })
    });
    const json = await res.json();
    setPending(false);
    if (json?.data) setData(json.data);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Creative Content Generator</h1>
      <GeneratorForm onGenerate={onGenerate} />
      {pending && <div className="text-slate-600">Generating...</div>}
      {data && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="card p-5">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
              {data.overview.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </section>
          <section className="card p-5">
            <h3 className="text-lg font-semibold">Activities</h3>
            <div className="mt-3 space-y-4">
              {data.activities.map((a, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 p-4">
                  <div className="font-medium">{a.name}</div>
                  <ol className="mt-2 list-decimal space-y-1 pl-6 text-slate-700">
                    {a.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>
          <section className="card p-5 md:col-span-2">
            <h3 className="text-lg font-semibold">Worksheet</h3>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-slate-700">Questions</div>
                <ol className="mt-2 list-decimal space-y-1 pl-6 text-slate-700">
                  {data.worksheet.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700">Guidelines</div>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
                  {data.worksheet.answers.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

