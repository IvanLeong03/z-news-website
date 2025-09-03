import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { fetchProfile, fetchPublisherRegion, editPublisherRegion } from "../services/profileService";
import { mapFrontendLangToBackend } from "../context/LangConverter";


function Account() {    
    const { language, setLanguage } = useLanguage();
    const [profile, setProfile] = useState();
    const [publisherRegions, setPublisherRegions] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
        try {
            const userProfile = await fetchProfile();
            setProfile(userProfile);
        } catch (error) {
            console.error("Failed to load topics:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };        
        loadProfile();
    }, []);

    useEffect(() => {
        const loadPublishers = async () => {
            try {
                const backendLang = mapFrontendLangToBackend(language);
                const response = await fetchPublisherRegion(backendLang);
                setPublisherRegions(response.regions);
                setSelectedRegions(response.selected);
            } catch (error) {
                console.error("Failed to load publisher regions:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadPublishers();
    }, []);

    const handleCheck = async (e, tag) => {
        const isChecked = e.target.checked;
        const action = isChecked ? "ADD" : "REMOVE";
        const backendLang = mapFrontendLangToBackend(language);

        try {
            await editPublisherRegion(action, tag, backendLang);
            setSelectedRegions((prev) =>
                isChecked ? [...prev, tag] : prev.filter((t) => t !== tag)
            );
        } catch (error) {
            console.error(`Failed to update region ${tag}:`, error);
            setError(error.message);
        }
    };

    return (
        <div className="w-1/2 mx-auto p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold my-16">
                {language === "zh-Hant" ? "帳戶設定" : language === "zh-Hans" ? "账户设置" : "Profile settings"}
            </h1>
            <div className="mt-24">
                {/* fetch every field from user object */}
                <div className="w-24 h-24 mb-8">
                    {profile && 
                    <img src={profile.profileIcon} className="object-cover"/>
                    }
                </div>
                {profile && <p className="my-2 font-semibold">{profile.profileID}</p>}
                <p className="mt-2 mb-8 text-[var(--color-text-lightgrey)]">admin@somedomain.com</p>

                <div className="flex items-center space-x-4 mt-8">
                    <p className="text-sm">
                        {language === "en" ? "Language" : language === "zh-Hant" ? "語言" : language === "zh-Hans" ? "语言" : "Language"}:
                    </p>
                    <select
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--colr-secondary-2)]"
                    >
                        <option value="en">English</option>
                        <option value="zh-Hant">繁體中文</option>
                        <option value="zh-Hans">简体中文</option>
                    </select>
                </div>  

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">
                        {language === "zh-Hant" ? "閱覽紀錄" : language === "zh-Hans" ? "阅览纪录" : "Reading History"}
                    </h2>
                    <Link to={"/account/reading-history"} className="text-[var(--color-dark-turquoise)] hover:underline">
                        <label className="text-sm text-[var(--color-text-lightgrey)]">
                            {language === "zh-Hant" ? "查看過往閱讀活動" : language === "zh-Hans" ? "查看过往阅读活动" : "View your past reading activity"}                            
                        </label>
                    </Link>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">
                        {language === "zh-Hant" ? "已儲存文章" : language === "zh-Hans" ? "已储存文章" : "Saved Articles"}
                    </h2>
                    <Link to={"/account/saved"} className="text-[var(--color-dark-turquoise)] hover:underline">
                        <label className="text-sm text-[var(--color-text-lightgrey)]">
                            {language === "zh-Hant" ? "查看收藏的文章" : language === "zh-Hans" ? "查看收藏的文章" : "View your saved items"}                            
                        </label>
                    </Link>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">
                        {language === "zh-Hant" ? "媒體地區" : language === "zh-Hans" ? "媒体地区" : "Media Region"}                    
                    </h2>
                    <label className="text-sm text-[var(--color-text-lightgrey)]">
                        {language === "zh-Hant" ? "根據地區編輯可供顯示的媒體" : language === "zh-Hans" ? "根据地区编辑可供显示的媒体" : "Edit which media to show according to region"}                    
                    </label>
                    <div className="grid grid-cols-2">
                        {publisherRegions.map((region) => (
                            <label key={region.tag} className="px-2 py-4">
                                <input
                                    type="checkbox"
                                    className="mx-2"
                                    checked={selectedRegions.includes(region.tag)}
                                    onChange={(e) => handleCheck(e, region.tag)}
                                />
                                {region.displayName}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">
                        {language === "zh-Hant" ? "付款設定" : language === "zh-Hans" ? "付款设置" : "Billing"}                                                
                    </h2>
                    <label className="text-sm text-[var(--color-text-lightgrey)]">
                        {language === "zh-Hant" ? "修改或新增付款方式" : language === "zh-Hans" ? "修改或新增付款方式" : "Manage your payment methods"}                    
                    </label>
                </div>
                              
                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">
                        {language === "zh-Hant" ? "管理訂閱" : language === "zh-Hans" ? "管理订阅" : "Manage subscription"}                        
                    </h2>
                    <label className="text-sm text-[var(--color-text-lightgrey)]">
                        {language === "zh-Hant" ? "查看並管理您目前的訂閱" : language === "zh-Hans" ? "查看和管理您当前的订阅" : "View and manage your current subscription"}                        
                    </label>
                </div>

                <div className="flex flex-col my-12">
                    <h2 className="font-semibold">
                        {language === "zh-Hant" ? "重設密碼" : language === "zh-Hans" ? "重设密码" : "Reset password"}                        
                    </h2>
                    <Link to={"/account/reading-history"} className="text-[var(--color-dark-turquoise)] hover:underline">
                        <label className="text-sm text-[var(--color-text-lightgrey)]">
                            {language === "zh-Hant" ? "按此獲取電郵重置密碼" : language === "zh-Hans" ? "按此获取电邮重置密码" : "Click to receive email link to reset password"}                                            
                        </label>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Account;