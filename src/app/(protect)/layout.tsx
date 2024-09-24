import Footer from "../components/navForDeskTop/footer";
import NavbarProtect from "../components/navForDeskTop/navbar";
import SideBar from "../components/navForDeskTop/sidebar";
import { BasicMemo } from "../lib/basicMemo";
import { CalendarProvider } from "../lib/context/calendarContext";

export default function ProtectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CalendarProvider>
      <div
        className="flex flex-col h-screen min-h-screen  
">
        <NavbarProtect />
        <SideBar />
        <main
          className="
          overflow-x-hidden 
          h-full    
          xsm:m-0 
          xsm:pt-3 
          xsm:pb-3  
          xsm:pr-1 
          xsm:pl-1
          sm:pl-24 ">
          {children}
        </main>
      </div>
    </CalendarProvider>
  );
}
