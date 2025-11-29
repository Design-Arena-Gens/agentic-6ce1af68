"use client";
import { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import type { CreativeInput, VisualFrame } from "@/lib/generator";

export default function VisualStoriesPage() {
  const [frames, setFrames] = useState<VisualFrame[]>([]);
  const [pending, setPending] = useState(false);
  async function onGenerate(input: CreativeInput) {
    setPending(true);
    setFrames([]);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "visual", input })
    });
    const json = await res.json();
    setPending(false);
    if (json?.data) setFrames(json.data);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Visual Story Maker</h1>
      <GeneratorForm onGenerate={onGenerate} />
      {pending && <div className="text-slate-600">Generating...</div>}
      {frames.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {frames.map((f, i) => (
            <figure key={i} className="card overflow-hidden">
              {/* eslint-disable-next-line react/no-danger */}
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: f.svg }}
              />
              <figcaption className="px-4 py-3 text-slate-800 border-t border-slate-200">
                {f.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

