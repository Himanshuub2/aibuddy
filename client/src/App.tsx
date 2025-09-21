import Chat from './components/chat/Chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import { AuthProvider } from './components/context/Context';

export default function App() {
    console.log(import.meta.env.VITE_API_URL, '<URL');

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route
                    path='/chat'
                    element={
                        <AuthProvider>
                            <Chat />
                        </AuthProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
