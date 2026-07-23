import { ThemeProvider } from "@/context/ThemeContext";
import { TodoProvider } from "@/context/TodoContext";
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
          <TodoProvider>{children}</TodoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
