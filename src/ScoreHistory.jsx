import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './ScoreHistory.css';

function ScoreHistory({ dailyCalculations = [], setDailyCalculations }){
    const { t } = useTranslation();
    console.log("ScoreHistory received:", dailyCalculations); // Debugging log

    const totalTimeSum = dailyCalculations.reduce((sum, entry) => sum + entry.elapsedTime, 0);
    const totalPalletsSum = dailyCalculations.reduce((sum, entry) => sum + entry.totalPallets, 0);
    const averageScore = totalTimeSum > 0 ? (totalPalletsSum / (totalTimeSum / 3600)).toFixed(2) : "N/A";
    const [showAddEntry, setShowAddEntry] = useState(false);

    const handleResetTable = () => {
        const isConfirmed = window.confirm("Are you sure you want to clear all calculations?");
        if (isConfirmed) {
            // Reset the calculations state to an empty array
            setDailyCalculations([]);
            localStorage.removeItem("dailyCalculations"); // Clear storage too
          }
    };

    const handleDeleteEntry = (indexToDelete) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
        if (isConfirmed) {
            const updatedCalculations = dailyCalculations.filter((_, index) => index !== indexToDelete);
            setDailyCalculations(updatedCalculations);
            localStorage.setItem("dailyCalculations", JSON.stringify(updatedCalculations));
        }
    };

        // Form state for new entry
    const [form, setForm] = useState({
        date: "",
        startTime: "",
        endTime: "",
        totalPallets: "",
    });

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleAddEntry = (e) => {
        e.preventDefault();

        // Calculate elapsedTime in seconds
        const start = new Date(`${form.date}T${form.startTime}`);
        const end = new Date(`${form.date}T${form.endTime}`);
        const elapsedTime = (end - start) / 1000; // seconds

        if (isNaN(elapsedTime) || elapsedTime <= 0) {
            alert("End time must be after start time.");
            return;
        }

        const totalPallets = parseInt(form.totalPallets, 10);
        if (isNaN(totalPallets) || totalPallets < 0) {
            alert("Please enter a valid number of pallets.");
            return;
        }

        const palletRate = (totalPallets / (elapsedTime / 3600)).toFixed(2);

        const newEntry = {
            timestamp: start.getTime(),
            startTime: start,
            endTime: form.endTime,
            elapsedTime,
            totalPallets,
            palletRate,
        };

        const updatedCalculations = [...dailyCalculations, newEntry];
        setDailyCalculations(updatedCalculations);
        localStorage.setItem("dailyCalculations", JSON.stringify(updatedCalculations));

        // Reset form
        setForm({
            date: "",
            startTime: "",
            endTime: "",
            totalPallets: "",
        });
    };

    return (
        <div className="score-history">
            <h2>{t('ScoreHistory.title')}</h2>
            {showAddEntry && (
                <form onSubmit={handleAddEntry} className="add-entry-form" style={{ marginBottom: "20px" }}>
                    <fieldset>
                        <legend>{t('ScoreHistory.addentry')}</legend>
                        <label>
                            {t('ScoreHistory.date')}:
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleFormChange}
                                required
                            />
                        </label>
                        <label>
                            {t('ScoreHistory.startTime')}:
                            <input
                                type="time"
                                name="startTime"
                                value={form.startTime}
                                onChange={handleFormChange}
                                required
                                step="1"
                            />
                        </label>
                        <label>
                            {t('ScoreHistory.endTime')}:
                            <input
                                type="time"
                                name="endTime"
                                value={form.endTime}
                                onChange={handleFormChange}
                                required
                                step="1"
                            />
                        </label>
                        <label>
                            {t('ScoreHistory.totalPallets')}:
                            <input
                                type="number"
                                name="totalPallets"
                                value={form.totalPallets}
                                onChange={handleFormChange}
                                min="0"
                                required
                            />
                        </label>
                        <button type="submit">{t('ScoreHistory.addentry')}</button>
                    </fieldset>
                </form>
            )}
            {dailyCalculations.length > 0 ? (
                <div>
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t("ScoreHistory.date")}</th>
                                <th>{t("ScoreHistory.startTime")}</th>
                                <th>{t("ScoreHistory.endTime")}</th>
                                <th>{t("ScoreHistory.totalTime")}</th>
                                <th>{t("ScoreHistory.totalPallets")}</th>
                                <th>{t("ScoreHistory.score")}</th>
                                <th>{t("ScoreHistory.del")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyCalculations.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(entry.timestamp).toLocaleDateString()}</td>
                                    <td>{new Date(entry.startTime).toLocaleTimeString()}</td>
                                    <td>{entry.endTime}</td>
                                    <td>{(entry.elapsedTime / 3600).toFixed(2) + 'h'}</td>
                                    <td>{entry.totalPallets}</td>
                                    <td>{entry.palletRate}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleDeleteEntry(index)} 
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "red",
                                                fontSize: "18px",
                                                cursor: "pointer"
                                            }}
                                            title="Delete Entry"
                                        >
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2>{t('ScoreHistory.summary')}</h2>
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>{t("ScoreHistory.totalTime")}</th>
                                <th>{t("ScoreHistory.totalPallets")}</th>
                                <th>{t("ScoreHistory.score")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{(totalTimeSum / 3600).toFixed(2) + "h"}</td> 
                                <td>{totalPalletsSum}</td>
                                <td>{averageScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>{t('ScoreHistory.noentries')}</p>
            )}
            <div className="button-row">
                <button
                    type="button"
                    onClick={() => setShowAddEntry((prev) => !prev)}
                    style={{ marginBottom: "12px" }}
                    >
                    {showAddEntry ? t('ScoreHistory.hidentry') : t('ScoreHistory.addentry')}
                    </button>
                <button onClick={handleResetTable}>{t('ScoreHistory.reset')}</button>
            </div>
        </div>
    );
}
export default ScoreHistory;