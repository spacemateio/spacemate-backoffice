import React from "react";

interface ErrorResponse {
  message: string;
  name: string;
  stack: string;
  config: {
    url: string;
    method: string;
    headers: Record<string, string>;
    data: string;
  };
  code: string;
  status: number;
}

const ErrorDisplay: React.FC<{ error: ErrorResponse }> = ({ error }) => {
  const handleCopy = () => {
    const errorText = `
      Hata: ${error.name}
      Mesaj: ${error.message}
      Durum Kodu: ${error.status}
      Hata Kodu: ${error.code}
      URL: ${error.config.url}
      Yöntem: ${error.config.method}
      Veri: ${error.config.data}
    `;
    navigator.clipboard
      .writeText(errorText)
      .then(() => {
        alert("Veri panoya kopyalandı!");
      })
      .catch((err) => {
        console.error("Kopyalama hatası: ", err);
      });
  };

  return (
    <div
      className="p-4 bg-red-100 border border-red-400 text-red-700 rounded cursor-pointer"
      onClick={handleCopy}
    >
      <p className="mb-3 text-xl font_bold text-blue-500">
        Warning: Clicking this area will copy the error information to the
        clipboard.
      </p>
      <h2 className="font-bold mb-2">Hata: {error.name}</h2>
      <p>
        <strong>Mesaj:</strong> {error.message}
      </p>
      <p>
        <strong>Durum Kodu:</strong> {error.status}
      </p>
      <p>
        <strong>Hata Kodu:</strong> {error.code}
      </p>
      <p>
        <strong>URL:</strong> {error.config.url}
      </p>
      <p>
        <strong>Yöntem:</strong> {error.config.method}
      </p>
      <p>
        <strong>Veri:</strong> {error.config.data}
      </p>
      <details className="mt-2">
        <summary>Detaylar</summary>
        <pre className="whitespace-pre-wrap">{error.stack}</pre>
      </details>
    </div>
  );
};

export default ErrorDisplay;
