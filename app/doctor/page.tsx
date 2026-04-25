import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { DoctorDashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Doctor Dashboard",
};

export default async function DoctorDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <DoctorDashboardContent
        userName={session.user.name?.split(" ").pop() || "Doctor"}
        role="doctor"
      />
    </DashboardLayout>
  );
}
