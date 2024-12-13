import React from 'react';

export function DemoCredentials() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Demo Credentials:
          </span>
        </div>
      </div>
      <div className="mt-2 text-sm text-center">
        <p className="text-gray-600">Admin: admin@work.com / test123</p>
        <p className="text-gray-600">User: user@work.com / test123</p>
      </div>
    </div>
  );
}