import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Empower Primary Teachers with AI
          </h1>
          <p className="mt-3 text-slate-700">
            Create unique lesson ideas, visual stories, and kids ebooks in
            minutes. Designed for Indian classrooms with bilingual support.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/creative" className="btn-primary px-4 py-2">
              Get Creative Content
            </Link>
            <Link href="/visual-stories" className="btn-ghost px-4 py-2">
              Make Visual Stories
            </Link>
            <Link href="/ebook" className="btn-ghost px-4 py-2">
              Build Kids Ebook
            </Link>
          </div>
        </div>
        <div className="card p-6">
          <ul className="space-y-4">
            <li>
              <span className="badge mr-2">Creative</span>
              Lesson plans, activities, worksheets tailored by grade and topic.
            </li>
            <li>
              <span className="badge mr-2">Visual</span>
              Storyboards with auto-drawn SVG scenes for classroom display.
            </li>
            <li>
              <span className="badge mr-2">Ebook</span>
              Assemble a multi-page illustrated PDF ready to share/print.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Works without external AI keys by using on-device creativity
            templates. Optionally set OPENAI_API_KEY for extra flair.
          </p>
        </div>
      </section>
    </div>
  );
}

