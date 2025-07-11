import React from "react";

function Account() {    
    return (
        <div className="w-1/2 mx-auto">
            <h1 className="text-2xl font-bold my-4">Account Overview and Settings</h1>
            <p className="text-gray-700 my-2">Manage your account settings and preferences.</p>
            {/*
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
            */}
            <div className="my-12">
                {/* fetch every field from user object */}
                <p className="my-2">email: something@somedomain.com</p>
                <p className="mt-8">subscription: free/paid</p>
                <button className="rounded-xl my-4 px-2 border border-[var(--color-line-grey)]">edit subscription</button>

                <p>Billing method: None/card/paypal ...</p>
                <button className="rounded-xl my-4 px-2 border border-[var(--color-line-grey)]">change payment method</button>
                <br/>
                <button className="rounded-xl my-4 px-2 border border-[var(--color-line-grey)]">change password</button>
                {/* to be added as a feature in future updates
                <div>
                    <label className="block font-semibold mb-1">Font Size</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                        <option>Extra Large</option>
                    </select>
                </div>
                */}
            </div>
        </div>
    );
}

export default Account;