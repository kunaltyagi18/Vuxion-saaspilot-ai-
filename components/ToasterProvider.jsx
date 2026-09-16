"use client";
import { Toaster } from "react-hot-toast";

/**
 * ToasterProvider — Global toast notification container.
 * Yeh component "use client" hai kyunki react-hot-toast browser pe run hota hai.
 * RootLayout (Server Component) mein directly Toaster nahi daal sakte,
 * isliye ek thin client wrapper bana diya.
 */
export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={10}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          borderRadius: "12px",
          padding: "14px 18px",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          maxWidth: "380px",
        },
        // Success toast style
        success: {
          duration: 4000,
          iconTheme: {
            primary: "#4f46e5",
            secondary: "#fff",
          },
          style: {
            background: "#f5f3ff",
            color: "#3730a3",
            border: "1px solid #c7d2fe",
          },
        },
        // Error toast style
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
          },
        },
      }}
    />
  );
}
