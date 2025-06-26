import { useEffect, useRef } from "react";

const TestAd = () => {
  const adRef = useRef(null);
  const isDev = window.location.hostname === "localhost"; // Geliştirme ortamı kontrolü

  useEffect(() => {
    if (isDev) return; // Geliştirme ortamında reklam yüklenmesin

    if (window.adsbygoogle && adRef.current && !adRef.current.dataset.loaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current.dataset.loaded = "true";
      } catch (e) {
        console.error("Ad yükleme hatası:", e);
      }
    }
  }, [isDev]);

  if (isDev) {
    return (
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "#f0f0f0",
          textAlign: "center",
          lineHeight: "100px",
          color: "#999",
          border: "1px dashed #ccc",
        }}
      >
        [Reklam Alanı - Geliştirme Modu]
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3940256099942544"
      data-ad-slot="6300978111"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default TestAd;
