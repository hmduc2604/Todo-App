import { ThemeProvider } from "@/context/ThemeContext";
import { TodoProvider } from "@/context/TodoContext";
import { ToastProvider } from "@/context/ToastContext";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <ThemeProvider>
          <TodoProvider>
            <ToastProvider>{children}</ToastProvider>
          </TodoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

