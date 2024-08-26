import AdminTemplate from "@/Layouts/Custom/AdminTemplate";
import useAdminStore from "@/stores/useAdminStore";
import { useEffect } from "react";

const Dashboard = () => {
    const store = useAdminStore();

    useEffect(() => {
        store.setTitle("Dashboard");
    }, []);

    return (
        <div>
            <AdminTemplate>
                <h1>Dashboard</h1>
            </AdminTemplate>
        </div>
    );
};

export default Dashboard;
