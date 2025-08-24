import { ThemeToggle } from "@/common/ThemeToggle";
import HomeIndex from "@/Pages/Home/HomeIndex";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen gap-16 bg-background text-foreground">
      {/* Header with Theme Toggle */}
      <header className="w-full flex justify-between items-center p-8 sm:p-6">
        <div className="text-3xl font-bold">Lock Chat</div>
        <div><ThemeToggle /></div>
      </header>

      <main className="flex-1 p-8 sm:p-6">
        <HomeIndex/>
      </main>

      <footer className="text-muted mt-auto border border-t-2 py-2 px-4">
        All Right Reserved to @El-drago11
      </footer>
    </div>
  );
}

