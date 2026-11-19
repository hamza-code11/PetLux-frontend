import styles from "./AuthLayout.module.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.authWrapper}>
      {children}
    </main>
  );
}
