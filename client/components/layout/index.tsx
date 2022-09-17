import { ReactNode, FC } from "react";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
