import { useEffect, useState } from "react";

const translateText = async (text, targetLang = "en") => {
  const res = await fetch(
    "https://translation.googleapis.com/language/translate/v2",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_GOOGLE_API_KEY",
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
      }),
    }
  );

  const data = await res.json();
  return data.data.translations[0].translatedText;
};

const AutoTranslatedText = ({ children, lang }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    translateText(children, lang).then(setTranslated);
  }, [children, lang]);

  return <span>{translated || children}</span>;
};

export default AutoTranslatedText;
