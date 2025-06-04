export default function App() {
  return (
    <div className="min-h-screen min-w-[320px] rounded-xl font-mono flex flex-col">
      <header className="bg-gray-500 text-white p-4 text-xl font-bold">
        Events App - Saltstrong.com Test
      </header>

      <main className="flex-1 m-6 p-4 border border-stone-300 rounded-xl bg-stone-200 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="text-lg">
          This is a Test from Saltstrong.com as part of the interview process.
        </p>
        <button
          className="cursor-pointer bg-blue-400 hover:bg-blue-500 p-2 rounded-xl text-white self-end" 
        >
          Add Event
        </button>
        <div className="events-list"></div>
        {/* Start Map Area */}
        <div></div>
        {/* End Map Area */}
        {/* Start Add Event Area */}
        <div></div>
        {/* End Add Event Area */}
      </main>

      <footer className="bg-gray-500 text-white p-4 text-center">
        © 2025 - By <a href="https://josemolinaresume.com/" target="_Blank" className="underline">Jose Molina</a>
      </footer>
    </div>
  )
}
