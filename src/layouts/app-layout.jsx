import Header from "@/components/ui/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <main className="min-h-screen mr-5 ml-2">
                <Header />
                <Outlet />
            </main>
            <div className="p-10 text-center bg-gray-400 mt-10">
                Made by Rohit
            </div>
        </div>
    );
};

export default AppLayout;