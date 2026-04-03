import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Trusted by 1,000+ patients
            </div>

            {/* Heading */}
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Your health, our{" "}
              <span className="text-emerald-600">priority</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Book appointments with verified doctors, get video consultations,
              and manage your health — all from one platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/symptoms"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                🤖 Check Symptoms with AI
              </Link>
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50"
              >
                Find a Doctor →
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: "500+", label: "Verified Doctors" },
            { value: "25+", label: "Specialties" },
            { value: "10K+", label: "Appointments Booked" },
            { value: "4.8★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              How DoctorSewa Works
            </h2>
            <p className="mt-3 text-gray-600">
              Three simple steps to better healthcare
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Search & Choose",
                desc: "Find doctors by specialty, ratings, or use AI to match your symptoms with the right specialist.",
              },
              {
                step: "02",
                icon: "📅",
                title: "Book & Pay",
                desc: "Pick a time slot, confirm your appointment, and pay securely via Razorpay — all in under 2 minutes.",
              },
              {
                step: "03",
                icon: "🩺",
                title: "Consult & Heal",
                desc: "Join a video call with your doctor, get prescriptions digitally, and follow up via chat for 7 days — free.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <span className="absolute -top-3 right-6 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                  {item.step}
                </span>
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to take control of your health?
          </h2>
          <p className="mt-3 text-emerald-100">
            Join thousands of patients and doctors on DoctorSewa
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signup"
              className="inline-flex rounded-xl bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50"
            >
              Get Started — It&apos;s Free
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex rounded-xl border border-emerald-400 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-emerald-700"
            >
              Register as Doctor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <span className="text-sm font-bold text-white">DS</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Doctor<span className="text-emerald-600">Sewa</span>
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/about" className="hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 DoctorSewa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
