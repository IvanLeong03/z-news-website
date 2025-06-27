import React from "react";

function Account() {    
    return (
        <div className="w-1/2 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <p className="text-gray-700 mb-2">Manage your account settings and preferences.</p>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
            </form>
        </div>
    );
}

export default Account;