"use client";
import { useEffect, useRef, useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import type { CreativeInput, EbookPage } from "@/lib/generator";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EbookPage() {
  const [pages, setPages] = useState<EbookPage[]>([]);
  const [title, setTitle] = useState<string>("My Classroom Ebook");
  const [pending, setPending] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  async function onGenerate(input: CreativeInput) {
    setPending(true);
    setPages([]);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "ebook", input })
    });
    const json = await res.json();
    setPending(false);
    if (json?.data) {
      setTitle(
        input.language === "hi"
          ? `${input.topic} ? ?????? ?? ????`
          : `${input.topic} ? Kids Ebook`
      );
      setPages(json.data);
    }
  }

  async function downloadPDF() {
    if (!containerRef.current) return;
    const nodes = Array.from(containerRef.current.querySelectorAll(".ebook-page"));
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [560, 360] });
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as HTMLElement;
      const canvas = await html2canvas(node, { backgroundColor: "#ffffff", scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, 560, 360);
    }
    pdf.save(`${title.replace(/\\s+/g, "_")}.pdf`);
  }

  useEffect(() => {
    // Smooth fonts in export
    document.body.style.webkitFontSmoothing = "antialiased";
    document.body.style.mozOsxFontSmoothing = "grayscale";
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Kids Ebook Builder</h1>
      <GeneratorForm onGenerate={onGenerate} />
      {pending && <div className="text-slate-600">Generating...</div>}
      {pages.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 w-full md:w-1/2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={downloadPDF} className="btn-primary ml-3 px-4 py-2">
              Download PDF
            </button>
          </div>
          <div ref={containerRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pages.map((p, idx) => (
              <div key={idx} className="ebook-page card p-4 w-[560px] h-[360px]">
                <div className="flex h-full flex-col">
                  <div className="text-lg font-semibold">{p.heading}</div>
                  <div className="mt-2 text-slate-700">{p.text}</div>
                  <div className="mt-3 grow overflow-hidden rounded-lg border border-slate-200">
                    {/* eslint-disable-next-line react/no-danger */}
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: p.svg }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

