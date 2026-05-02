import { Ticket, Calendar, MapPin, UserCheck, Mail } from "lucide-react";
import Link from "next/link";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { name?: string; email?: string; regId?: string };
}) {
  const { name, email, regId } = searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <UserCheck className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Registration Confirmed!
          </h1>
          <p className="text-emerald-600 mt-2 text-lg">
            You&apos;re all set for the event
          </p>
        </div>

        {/* Ticket */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-200 text-sm">EVENT TICKET</p>
                <h2 className="text-3xl font-bold mt-1">Main Event 2026</h2>
              </div>
              <Ticket className="w-12 h-12 opacity-80" />
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Attendee</p>
                <p className="font-semibold text-xl">
                  {name || "Valued Guest"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </p>
                <p className="font-medium break-all">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Registration ID
                </p>
                <p className="font-mono font-semibold text-emerald-700">
                  {regId}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="font-medium">
                    Venue: Kampala Conference Center
                  </p>
                  <p className="text-xs">Saturday, May 30th, 2026 • 9:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 text-center text-xs text-gray-500 border-t">
            Please save this ticket or screenshot it. You will need the
            Registration ID at entry.
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-indigo-600 hover:underline">
            ← Register another person
          </Link>
        </div>
      </div>
    </div>
  );
}
