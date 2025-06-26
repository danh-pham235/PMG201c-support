import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Layout;