import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { Card, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Patient Dashboard",
};

export default async function PatientDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s an overview of your health activity
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Upcoming Appointments", value: "0", icon: "📅", color: "bg-emerald-50 text-emerald-700" },
          { label: "Prescriptions", value: "0", icon: "💊", color: "bg-blue-50 text-blue-700" },
          { label: "Unread Messages", value: "0", icon: "💬", color: "bg-amber-50 text-amber-700" },
          { label: "Total Spent", value: "₹0", icon: "💳", color: "bg-purple-50 text-purple-700" },
        ].map((stat) => (
          <Card key={stat.label} padding="md">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Quick Actions</CardTitle>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Find a Doctor", icon: "🔍", href: "/doctors" },
              { label: "AI Symptom Check", icon: "🤖", href: "/symptoms" },
              { label: "My Appointments", icon: "📅", href: "/patient/appointments" },
              { label: "My Prescriptions", icon: "📋", href: "/patient/prescriptions" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs font-medium text-gray-700">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Recent Activity</CardTitle>
          <div className="mt-4 flex flex-col items-center justify-center py-8 text-center">
            <span className="text-4xl">🏥</span>
            <p className="mt-3 text-sm text-gray-500">
              No recent activity yet.
            </p>
            <p className="text-xs text-gray-400">
              Book your first appointment to get started!
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
