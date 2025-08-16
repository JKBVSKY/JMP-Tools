import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Settings = ({ settings, setSettings }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // If the language was changed, call your language change function
        if (name === "language") {
            changeLanguage(value);
        }

        // Only ask for permission when notifications are enabled
        if (name === "notifications" && checked) {
            if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
            }
        }
    };

    const handleSave = () => {
        // Save settings logic here (e.g., localStorage, API call)
        alert(t('Settings.language-changed', { lng: settings.language }));
    };

    return (
        <div className="settings-box">
            <h2>{t('Settings.title')}</h2>
            <div className="settings-row">
                <label>
                    <input
                        type="checkbox"
                        name="darkMode"
                        checked={settings.darkMode}
                        onChange={handleChange}
                    />
                    {t('Settings.darkmode')}
                </label>
            </div>
            <div className="settings-row">
                <label>
                    <input
                        type="checkbox"
                        name="notifications"
                        checked={settings.notifications}
                        onChange={handleChange}
                    />
                    {t('Settings.notification')}
                </label>
            </div>
            <div className="settings-row">
                <label>
                    {t('Settings.language')}:
                    <select
                        name="language"
                        value={settings.language}
                        onChange={handleChange}
                    >
                        <option value="en">English</option>
                        <option value="pl">Polish</option>
                    </select>
                </label>
            </div>
            <button type="button" onClick={handleSave}>
                {t('Settings.save')}
            </button>
        </div>
    );
};

export default Settings;