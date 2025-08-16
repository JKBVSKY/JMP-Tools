import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import ReactMarkdown from "react-markdown";  // To render markdown
import remarkGfm from "remark-gfm";  // Optional: For GitHub-flavored Markdown (tables, strikethrough, etc.)
import './HomePage.css';  // Import your custom CSS file for styling



const HomePage = () => {
    const { i18n } = useTranslation();
    const [changelog, setChangelog] = useState("");

  useEffect(() => {
    const lang = i18n.language === "pl" ? "pl" : "en";
    fetch(`/changelog_${lang}.md`)
      .then((res) => res.text())
      .then(setChangelog);
  }, [i18n.language]);

  return (
    <div className="changelog-container">
      {/* <h1>{t('App.welcome')}</h1> */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{changelog}</ReactMarkdown>
    </div>
  );
};

export default HomePage;
