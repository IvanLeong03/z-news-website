import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SavedArticles from "./SavedArticles";

function Account() {    
    const { language, setLanguage } = useLanguage();
    
    return (
        <div className="w-1/2 mx-auto p-4">
            <h1 className="text-3xl font-bold my-16">
                {language === "zh-Hant" ? "帳戶設定" : language === "zh-Hans" ? "账户设置" : "Profile settings"}
            </h1>
            <div className="mt-24">
                {/* fetch every field from user object */}
                <p className="my-2 font-semibold">admin</p>
                <p className="mt-2 mb-8 text-[var(--color-text-lightgrey)]">admin@somedomain.com</p>

                <div className="flex items-center space-x-4">
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