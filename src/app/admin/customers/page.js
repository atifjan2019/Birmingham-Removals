import prisma from "@/lib/prisma";
import { Users, Mail, Phone, CalendarDays } from "lucide-react";
import DeleteCustomerButton from "./DeleteCustomerButton";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      bookings: true, // so we see how many bookings they have
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">
            Customers
          </h1>
          <p className="text-muted mt-1">Manage your client database and history.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-muted font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Contact Details</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Total Bookings</th>
                <th className="px-6 py-4 whitespace-nowrap">Date Added</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {customer.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-gray-900">{customer.fullName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-muted" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-muted" />
                          {customer.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                        {customer.bookings.length} Moves
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-muted" />
                        {new Date(customer.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteCustomerButton customerId={customer.id} customerName={customer.fullName} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-8 h-8 text-gray-300 mb-3" />
                      <p>No customers found in the database.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
