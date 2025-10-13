import { useState } from "react";
import { adminSyncModels } from "./api/adminApi";
import { logout } from "./api/authApi";
import { useNavigate } from "react-router-dom";


export default function AdminPanel() {
    const [syncMessage, setSyncMessage] = useState<string>('');
    const navigate = useNavigate();

    async function syncModels() {
        try {
            const response = await adminSyncModels();
            setSyncMessage(response);
        } catch (error) {
            console.error(error);
        }
    }
    async function handleLogout() {
        await logout();
        navigate('/');
    }
    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Panel</h1>
            <h2>Sync AI LLM Models</h2>
            <button
                style={{ padding: "10px 20px", backgroundColor: "#000000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                onClick={syncModels}
            >
                Sync Models
            </button>
            {
                <h2>{syncMessage}</h2>
            }

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}