import Footer from "../components/navForDeskTop/footer";
import NavbarProtect from "../components/navForDeskTop/navbar";
import SideBar from "../components/navForDeskTop/sidebar";

export default function ProtectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <NavbarProtect />
      <SideBar />
      <main className="overflow-x-hidden h-screen">
        <div
          className="
          overflow-y-auto 
          pl-36 pr-36 m-0 mx-auto ">
          {children}
        </div>
      </main>
      <div className="xsm:flex sm:hidden">
        <Footer />
      </div>
    </div>
  );
}
