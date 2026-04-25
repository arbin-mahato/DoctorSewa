import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { PatientDashboardContent } from "@/components/dashboard/DashboardContent";

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
      <PatientDashboardContent
        userName={session.user.name?.split(" ")[0] || "Patient"}
        role="patient"
      />
    </DashboardLayout>
  );
}
