import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Config from '@/config/Config';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();

    // Check if token is present and valid
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        try {
            jwt.verify(token, Config.getJwtSecret());
        } catch (err) {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
