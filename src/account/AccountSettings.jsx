import React, { useState } from 'react';

const AccountSettings = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [username, setUsername] = useState('Zimuth-Admin');

    const handleSave = (e) => {
        e.preventDefault();
        // Save logic here
        alert('Settings saved!');
    };

    return (
        <div className='max-w-1/2 mx-auto p-6 my-4 bg-white rounded-lg shadow-md'>
            <h2>Account Settings</h2>


            
        </div>
    );
};

export default AccountSettings;