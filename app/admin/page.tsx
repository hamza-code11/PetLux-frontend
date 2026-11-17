import StatCards from '@/components/admin/dashboard/StatCard/StatCards';
// import WelcomeBanner from '@/components/admin/dashboard/WelcomeBanner/WelcomeBanner';
import styles from './page.module.css'; // Optional: Yahan layout spacing ke liye agar chahiye

export const metadata = { title: 'Dashboard' };

export default function AdminDashboardPage() {
  return (
    <div className={styles.page}>
      {/* <WelcomeBanner /> */}
      <StatCards />
    </div>
  );
}
