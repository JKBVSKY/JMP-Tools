import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function ScoreHistory({ dailyCalculations = [], setDailyCalculations }){
    const { t } = useTranslation();
    console.log("ScoreHistory received:", dailyCalculations); // Debugging log

    const totalTimeSum = dailyCalculations.reduce((sum, entry) => sum + entry.elapsedTime, 0);
    const totalPalletsSum = dailyCalculations.reduce((sum, entry) => sum + entry.totalPallets, 0);
    const averageScore = totalTimeSum > 0 ? (totalPalletsSum / (totalTimeSum / 3600)).toFixed(2) : "N/A";

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

    return (
        <div>
            <h2>{t("Score History")}</h2>
            {dailyCalculations.length > 0 ? (
                <div>
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t("Date")}</th>
                                <th>{t("Start Time")}</th>
                                <th>{t("End Time")}</th>
                                <th>{t("Total Time")}</th>
                                <th>{t("Pallets Loaded")}</th>
                                <th>{t("Score")}</th>
                                <th>Del</th>
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
                    <h2>MONTHLY STATISTICS</h2>
                    <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>Total Time</th>
                                <th>Pallets Loaded</th>
                                <th>Score</th>
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
                <p>{t("No records found.")}</p>
            )}
            <button onClick={handleResetTable}>Reset Table</button>
        </div>
    );
}
export default ScoreHistory;