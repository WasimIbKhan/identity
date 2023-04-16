import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import IdentityBar from '../IdentityBar/IdentityBar'
const AppLayout = () => {
    return <div style={{
        padding: '00px 0px 0px 300px'
    }}>
        <IdentityBar />
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;