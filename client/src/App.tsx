import Chat from './components/chat/Chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import AdminPage from './components/AdminPage';
import { AuthProvider } from './components/context/Context';
import AdminPanel from './components/AdminPanel';

export default function App() {
    // retrigger
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/admin-panel' element={
                    <AuthProvider allowedRoles={['Admin']}>
                        <AdminPanel />
                    </AuthProvider>
                } />
                <Route
                    path='/chat'
                    element={
                        <AuthProvider allowedRoles={['Admin', 'User']}>
                            <Chat />
                        </AuthProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
