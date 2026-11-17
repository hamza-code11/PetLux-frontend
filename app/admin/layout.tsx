import AdminShell from '@/components/admin/layout/AdminShell/AdminShell';
import AdminGuard from '@/components/admin/layout/AdminGuard';

export const metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin — One + One',
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
