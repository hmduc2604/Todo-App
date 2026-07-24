import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
      <Image
        src="/Selfie.png"
        alt="empty"
        width={280}
        height={280}
        className="w-40 sm:w-[280px]"
      />

      <div className="max-w-xs text-center text-zinc-600 italic sm:text-left">
        <p>Empty as my motivation on Monday 😅.</p>
        <p>Lets start adding stuff!</p>
      </div>
    </div>
  );
}
