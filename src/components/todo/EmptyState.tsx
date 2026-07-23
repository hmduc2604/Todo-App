import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="flex items-center gap-10">
      <Image src="/Selfie.png" alt="empty" width={280} height={280} />

      <div className="max-w-xs text-zinc-600 italic">
        <p>Empty as my motivation on Monday 😅.</p>
        <p>Lets start adding stuff!</p>
      </div>
    </div>
  );
}
