import { policies } from "@/content/policies";

export default function PrivacyPage() {
  const p = policies.privacy;
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">{p.title}</h1>
      <div className="mt-8 space-y-4 text-[#A1A1A6] leading-relaxed">
        {p.body.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
    </article>
  );
}
