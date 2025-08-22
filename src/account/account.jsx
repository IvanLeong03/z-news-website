import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SavedArticles from "./SavedArticles";

function Account() {    
    const { language } = useLanguage();

    return (
        <div className="w-1/2 mx-auto p-4">
            <h1 className="text-3xl font-bold my-16">Profile and Settings</h1>

            <div className="mt-24">
                {/* fetch every field from user object */}
                <p className="my-2 font-semibold">admin</p>
                <p className="mt-2 mb-24 text-[var(--color-text-lightgrey)]">something@somedomain.com</p>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">Reading History</h2>
                    <Link to={"/account/reading-history"} className="text-[var(--color-dark-turquoise)] hover:underline">
                        <label className="text-sm text-[var(--color-text-lightgrey)]">View your reading activity</label>
                    </Link>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">Saved articles</h2>
                    <Link to={"/account/saved-articles"} className="text-[var(--color-dark-turquoise)] hover:underline">
                        <label className="text-sm text-[var(--color-text-lightgrey)]">View your saved items</label>
                    </Link>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">Media Region</h2>
                    <label className="text-sm text-[var(--color-text-lightgrey)]">Edit which media to show according to region</label>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">Billing</h2>
                    <label className="text-sm text-[var(--color-text-lightgrey)]">Manage your payment methods</label>
                </div>
                              
                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">Manage subscription</h2>
                    <label className="text-sm text-[var(--color-text-lightgrey)]">View and manage your current subscription</label>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">Reset password</h2>
                    <Link to={"/account/reading-history"} className="text-[var(--color-dark-turquoise)] hover:underline">
                        <label className="text-sm text-[var(--color-text-lightgrey)]">Click to receive email link to reset password</label>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Account;