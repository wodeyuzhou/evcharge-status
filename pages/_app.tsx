import { useEffect } from "react";
import { AppProps } from "next/app"; // AppProps 타입 가져오기

function MyApp({ Component, pageProps }: AppProps) { // Component와 pageProps 정의
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          console.log("ServiceWorker registration successful:", registration);
        },
        (error) => {
          console.log("ServiceWorker registration failed:", error);
        }
      );
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
