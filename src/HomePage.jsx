import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import ReactMarkdown from "react-markdown";  // To render markdown
import remarkGfm from "remark-gfm";  // Optional: For GitHub-flavored Markdown (tables, strikethrough, etc.)
import './HomePage.css';  // Import your custom CSS file for styling



const HomePage = () => {
    const { t } = useTranslation();
    const [changelog, setChangelog] = useState("");

  useEffect(() => {
    fetch("./changelog.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch changelog");
        }
        return response.text();
      })
      .then((text) => {
        setChangelog(text);
      })
      .catch((error) => console.error("Error fetching changelog:", error));
  }, []);

  return (
    <div className="changelog-container">
      {/* <h1>{t('App.welcome')}</h1> */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{changelog}</ReactMarkdown>
    </div>
  );
};

export default HomePage;
