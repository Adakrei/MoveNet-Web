'use client';

import ProtectedRoute from '../../components/ProtectedRoute';

export default function ProtectedPage() {
    return (
        <ProtectedRoute>
            <div>
                <h1>Protected Content</h1>
                <p>Only visible to authenticated users.</p>
            </div>
        </ProtectedRoute>
    );
}
