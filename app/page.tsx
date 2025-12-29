import Form from "@/components/Form";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-slate-100 dark:bg-slate-950/50 sm:items-start text-center rounded-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-6xl leading-18">
          Welcome to <span className="text-indigo-500 dark:text-indigo-300">API Dictionary!</span>
        </h1>
        <section className="flex flex-col items-center gap-y-10 w-full justify-center mt-20 text-black dark:text-white">
          <Form/>
        </section>
      </main>
    </div>
  );
}
