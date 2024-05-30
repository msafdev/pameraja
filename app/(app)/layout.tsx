import Nav from "@/components/main/nav";
import Sidebar from "@/components/sidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex w-full h-[100svh]">
        <Sidebar />
        <section
          id="main"
          className="h-[100svh] grow flex flex-col w-full z-0 bg-background overflow-y-auto"
        >
          <Nav />
          {children}
        </section>
      </main>
    </>
  );
}
