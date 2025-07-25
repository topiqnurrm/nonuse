import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <section className="grid min-h-svh w-full place-items-center">
      <div className="flex flex-col items-center gap-y-4">
        <Loader2 className="size-16 animate-spin text-blue-500" />
      </div>
    </section>
  );
}
