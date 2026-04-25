'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardTitle } from '@/components/ui/Card';
import { animations } from '@/lib/animations';

interface DashboardContentProps {
  userName: string;
  role: 'patient' | 'doctor';
}

// Patient-specific content
const patientStats = [
  { label: "Upcoming Appointments", value: "0", icon: "📅", color: "bg-emerald-50 text-emerald-700" },
  { label: "Prescriptions", value: "0", icon: "💊", color: "bg-blue-50 text-blue-700" },
  { label: "Unread Messages", value: "0", icon: "💬", color: "bg-amber-50 text-amber-700" },
  { label: "Total Spent", value: "₹0", icon: "💳", color: "bg-purple-50 text-purple-700" },
];

const patientActions = [
  { label: "Find a Doctor", icon: "🔍", href: "/doctors" },
  { label: "AI Symptom Check", icon: "🤖", href: "/symptoms" },
  { label: "My Appointments", icon: "📅", href: "/patient/appointments" },
  { label: "My Prescriptions", icon: "📋", href: "/patient/prescriptions" },
];

const patientAppointments = [
  { doctor: "Dr. Sharma", specialty: "General Medicine", time: "No upcoming", status: "none" },
];

// Doctor-specific content
const doctorStats = [
  { label: "Today's Appointments", value: "0", icon: "📅", color: "bg-emerald-50 text-emerald-700" },
  { label: "Total Patients", value: "0", icon: "👥", color: "bg-blue-50 text-blue-700" },
  { label: "This Month's Earnings", value: "₹0", icon: "💰", color: "bg-amber-50 text-amber-700" },
  { label: "Avg Rating", value: "—", icon: "⭐", color: "bg-purple-50 text-purple-700" },
];

const doctorActions = [
  { label: "Manage Schedule", icon: "🕐", href: "/doctor/schedule" },
  { label: "Go On-Call", icon: "📞", href: "/doctor/instant-consult" },
  { label: "My Patients", icon: "👥", href: "/doctor/patients" },
  { label: "AI Assistant", icon: "🤖", href: "/doctor/ai-assistant" },
];

export function PatientDashboardContent({ userName }: DashboardContentProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) animations.staggerChildren(statsRef.current, 0.08);
    if (actionsRef.current) animations.staggerChildren(actionsRef.current, 0.06);
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {userName} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s an overview of your health activity
        </p>
      </div>

      {/* Quick Stats — stagger in */}
      <div ref={statsRef} className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {patientStats.map((stat) => (
          <Card key={stat.label} padding="md" hoverable={false} style={{ opacity: 0 }}>
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

      {/* Quick Actions + Upcoming Appointments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="elevated">
          <CardTitle>Quick Actions</CardTitle>
          <div ref={actionsRef} className="mt-4 grid grid-cols-2 gap-3">
            {patientActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 text-center transition-all duration-200 hover:bg-gray-50 hover:shadow-sm hover:-translate-y-0.5"
                style={{ opacity: 0 }}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs font-medium text-gray-700">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </Card>

        <Card variant="elevated">
          <CardTitle>Upcoming Appointments</CardTitle>
          <div className="mt-4">
            {patientAppointments[0].status === "none" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="text-4xl">📅</span>
                <p className="mt-3 text-sm text-gray-500">
                  No upcoming appointments
                </p>
                <Link
                  href="/doctors"
                  className="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Book your first appointment →
                </Link>
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </>
  );
}

export function DoctorDashboardContent({ userName }: DashboardContentProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) animations.staggerChildren(statsRef.current, 0.08);
    if (actionsRef.current) animations.staggerChildren(actionsRef.current, 0.06);
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, Dr. {userName} 🩺
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s your schedule and practice overview
        </p>
      </div>

      {/* Quick Stats — stagger in */}
      <div ref={statsRef} className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {doctorStats.map((stat) => (
          <Card key={stat.label} padding="md" hoverable={false} style={{ opacity: 0 }}>
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

      {/* Today's Schedule + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="elevated">
          <CardTitle>Today&apos;s Schedule</CardTitle>
          <div className="mt-4 flex flex-col items-center justify-center py-8 text-center">
            <span className="text-4xl">📋</span>
            <p className="mt-3 text-sm text-gray-500">
              No appointments scheduled for today.
            </p>
            <p className="text-xs text-gray-400">
              Set up your availability to start receiving bookings.
            </p>
          </div>
        </Card>

        <Card variant="elevated">
          <CardTitle>Quick Actions</CardTitle>
          <div ref={actionsRef} className="mt-4 grid grid-cols-2 gap-3">
            {doctorActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-4 text-center transition-all duration-200 hover:bg-gray-50 hover:shadow-sm hover:-translate-y-0.5"
                style={{ opacity: 0 }}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs font-medium text-gray-700">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
