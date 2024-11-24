import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="text-center">
        <h1 className="pt-12 pb-5 text-4xl">SEO PAGE 1</h1>
        <nav>
          <ul className="flex justify-center gap-4">
            <li className="hover:scale-110">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:scale-110">
              <Link to="/graph">Graphs</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
