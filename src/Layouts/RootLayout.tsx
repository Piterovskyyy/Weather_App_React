import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavPanel from "../components/Nav/NavPanel";
const RootLayout = () => {
  return (
    <>
      <NavPanel />
      <main className="flex flex-col max-w-full md:flex-1 md:pl-[64px]">
        <Header></Header>
        <Outlet />
      </main>
    </>
  );
};
export default RootLayout;
