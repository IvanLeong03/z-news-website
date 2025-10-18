import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { fetchProfile, fetchPublisherRegion, editPublisherRegion } from "../services/profileService";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import ReactCountryFlag from 'react-country-flag';
import AsiaEmoji from "../assets/asia.png"

function Account() {
    const { language } = useLanguage();

    const [profile, setProfile] = useState(null);
    const [publisherRegions, setPublisherRegions] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [accountStatus, setAccountStatus] = useState("free");

    const [profileLoading, setProfileLoading] = useState(true);
    const [regionsLoading, setRegionsLoading] = useState(true);

    const [profileError, setProfileError] = useState(null);
    const [regionsError, setRegionsError] = useState(null);

    const flags = {
        "hk": "HK",
        "china": "CN",
        "uk": "GB",
        "usa": "US",
        "europe-others": "EU",
    }


    const loadProfile = useCallback(async () => {
        try {
            setProfileLoading(true);
            setProfileError(null);
            const userProfile = await fetchProfile(); // may 401 when not logged in
            setProfile(userProfile ?? null);
        } catch (e) {
            setProfile(null);
            setProfileError(e?.message || "Failed to load profile");
        } finally {
            setProfileLoading(false);
        }
    }, []);

    const loadRegions = useCallback(async () => {
        try {
            setRegionsLoading(true);
            setRegionsError(null);
            const backendLang = mapFrontendLangToBackend(language);
            const resp = await fetchPublisherRegion(backendLang);
            setPublisherRegions(resp?.regions ?? []);
            setSelectedRegions(resp?.selected ?? []);
        } catch (e) {
            setPublisherRegions([]);
            setSelectedRegions([]);
            setRegionsError(e?.message || "Failed to load publisher regions");
        } finally {
            setRegionsLoading(false);
        }
    }, [language]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    useEffect(() => {
        loadRegions();
    }, [loadRegions]);

    const handleCheck = async (e, tag) => {
        const isChecked = e.target.checked;
        const action = isChecked ? "ADD" : "REMOVE";
        const backendLang = mapFrontendLangToBackend(language);
        try {
            await editPublisherRegion(action, tag, backendLang);
            setSelectedRegions((prev) => (isChecked ? [...prev, tag] : prev.filter((t) => t !== tag)));
        } catch (e) {
            // surface non-blocking error UI if you want
            console.error(e);
        }
    };

    return (
        <div className="max-w-[50%] mx-auto p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold my-16">
                {language === "zh-Hant" ? "帳戶設定" : language === "zh-Hans" ? "账户设置" : "Profile settings"}
            </h1>

          <div className="mt-24">
              {/* Header row: name/email + avatar */}
              <div className="flex justify-between items-start">
                  <div className="min-w-0">
                      {/* Profile ID / Name */}
                      {profileLoading ? (
                          <div className="h-6 w-40 bg-gray-200 rounded motion-safe:animate-pulse my-2" />
                      ) : profile ? (
                          <p className="my-2 text-xl text-[var(--color-primary)] font-semibold">{profile.profileID}</p>
                      ) : (
                          <p className="my-2 text-sm text-gray-500">—</p>
                      )}

                      {/* Email */}
                      {profileLoading ? (
                          <div className="h-4 w-56 bg-gray-200 rounded motion-safe:animate-pulse mt-2 mb-8" />
                      ) : profile ? (
                          <p className="mt-2 mb-8 text-[var(--color-text-lightgrey)]">youremail@email.com</p>
                      ) : (
                          <p className="mt-2 mb-8 text-[var(--color-text-lightgrey)]">Not signed in (email)</p>
                      )}

                      {profileError && (
                          <div className="text-xs text-red-600">
                              {profileError}{" "}
                              <button onClick={loadProfile} className="underline">Retry</button>
                          </div>
                      )}
                  </div>

                {/* Avatar (skeleton while loading) */}
                  <div className="w-24 h-24 mb-8">
                      {profileLoading ? (
                          <div className="w-24 h-24 rounded-full bg-gray-200 motion-safe:animate-pulse" />
                      ) : profile?.profileIcon ? (
                          <img
                            src={profile.profileIcon}
                            alt="Profile avatar"
                            className="w-24 h-24 object-cover rounded-full"
                          />
                      ) : (
                          <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500">
                              No photo
                          </div>
                      )}
                  </div>
              </div>

            {/* Account tier */}
            <div className="my-8">
                <label>Account: {accountStatus}</label>
                {accountStatus === "free" && (
                    <button className="block my-4 text-lg text-[var(--color-primary)]">Upgrade to premium</button>
                )}
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

            {/* Regions */}
            <div className="flex flex-col my-12" aria-busy={regionsLoading}>
                <h2 className="font-semibold">
                    {language === "zh-Hant" ? "媒體地區" : language === "zh-Hans" ? "媒体地区" : "Media Region"}
                </h2>
                <label className="text-sm text-[var(--color-text-lightgrey)]">
                    {language === "zh-Hant"
                      ? "根據地區編輯可供顯示的媒體"
                      : language === "zh-Hans"
                      ? "根据地区编辑可供显示的媒体"
                      : "Edit which media to show according to region"}
                </label>

                {regionsError && (
                    <div className="text-xs text-red-600 mt-2">
                        {regionsError}{" "}
                        <button onClick={loadRegions} className="underline">Retry</button>
                    </div>
                )}

                <div className="grid grid-cols-2 mt-4 gap-3">
                    {regionsLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-10 rounded-full bg-gray-200 motion-safe:animate-pulse" />
                        ))
                        : publisherRegions.map((region) => (
                            <label
                              key={region.tag}
                              className="p-4 rounded-full border border-black mx-2 my-1 flex items-center gap-2"
                            >
                                <input
                                  type="checkbox"
                                  className="mx-1"
                                  checked={selectedRegions.includes(region.tag)}
                                  onChange={(e) => handleCheck(e, region.tag)}
                                />
                                    {region.displayName}
                                    {flags[region.tag] ? (
                                    <ReactCountryFlag countryCode={flags[region.tag]} />
                                ) : region.tag === "asia-others" ? (
                                    <img src={AsiaEmoji} alt="Asia" className="w-5 h-5" />
                                ) : null}                            
                            </label>
                      ))}
                </div>
            </div>

            {/* …other sections unchanged… */}
            <div className="flex flex-col my-12">
                <h2 className="font-semibold">
                    {language === "zh-Hant" ? "付款設定" : language === "zh-Hans" ? "付款设置" : "Billing"} (to be implemented)                                                   
                </h2>
                <label className="text-sm text-[var(--color-text-lightgrey)]">
                    {language === "zh-Hant" ? "修改或新增付款方式" : language === "zh-Hans" ? "修改或新增付款方式" : "Manage your payment methods"}                    
                </label>
            </div>
                            
            <div className="flex flex-col my-12">
                <h2 className="font-semibold">
                    {language === "zh-Hant" ? "管理訂閱" : language === "zh-Hans" ? "管理订阅" : "Manage subscription"}  (to be implemented)                         
                </h2>
                <label className="text-sm text-[var(--color-text-lightgrey)]">
                    {language === "zh-Hant" ? "查看並管理您目前的訂閱" : language === "zh-Hans" ? "查看和管理您当前的订阅" : "View and manage your current subscription"}                        
                </label>
            </div>

            <div className="flex flex-col my-12">
                <h2 className="font-semibold">
                    {language === "zh-Hant" ? "重設密碼" : language === "zh-Hans" ? "重设密码" : "Reset password"} (to be implemented)                   
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
