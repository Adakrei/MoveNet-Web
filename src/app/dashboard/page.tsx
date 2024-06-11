'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div>
                <h1>Dashboard</h1>
                <p>
                    This is a protected dashboard page, only visible to
                    authenticated users.
                </p>
            </div>
        </ProtectedRoute>
    );
}
