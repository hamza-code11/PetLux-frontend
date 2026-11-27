import StatCards from '@/components/admin/dashboard/StatCard/StatCards';
import WelcomeBanner from '@/components/admin/dashboard/WelcomeBanner/WelcomeBanner';
import RecentOrders from "@/components/admin/dashboard/RecentOrders/RecentOrders";
import styles from './page.module.css';

export const metadata = { title: 'Dashboard' };

export default function AdminDashboardPage() {
  return (
    <div className={styles.page}>
      <WelcomeBanner />
      <StatCards />
      <RecentOrders />
    </div>
  );
}
