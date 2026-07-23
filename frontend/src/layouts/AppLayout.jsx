function AppLayout({ children }) {
  return (
    <>
      <header className="border-b bg-white p-4" role="banner">
        <h1 className="text-xl font-semibold">
          Car Dealership Inventory System
        </h1>
      </header>

      <main className="min-h-screen p-6">
        {children}
      </main>

      <footer
        className="border-t bg-gray-100 p-4 text-center text-sm"
        role="contentinfo"
      >
        © 2026 Car Dealership Inventory System
      </footer>
    </>
  );
}

export default AppLayout;   