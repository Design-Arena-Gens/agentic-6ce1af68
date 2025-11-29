"use client";
import { useState } from "react";
import type { CreativeInput } from "@/lib/generator";

export type GeneratorFormProps = {
  onGenerate: (input: CreativeInput) => Promise<void> | void;
  defaultSubject?: string;
  defaultTopic?: string;
};

export default function GeneratorForm(props: GeneratorFormProps) {
  const [grade, setGrade] = useState("3");
  const [subject, setSubject] = useState(props.defaultSubject ?? "EVS");
  const [topic, setTopic] = useState(props.defaultTopic ?? "My Family");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [tone, setTone] = useState<"playful" | "warm" | "formal">("playful");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const input: CreativeInput = { grade, subject, topic, language, tone };
      await props.onGenerate(input);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Grade</span>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            {["1", "2", "3", "4", "5"].map((g) => (
              <option key={g} value={g}>
                Class {g}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="EVS, English, Maths..."
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Topic</span>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., My Family, Plants, Numbers..."
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="en">English</option>
            <option value="hi">?????</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Tone</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as any)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="playful">Playful</option>
            <option value="warm">Warm</option>
            <option value="formal">Formal</option>
          </select>
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-4 py-2 disabled:opacity-70"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </form>
  );
}

