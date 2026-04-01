"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCustomer } from "@/app/actions/customer";

export default function DeleteCustomerButton({ customerId, customerName }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Are you absolutely sure you want to delete ${customerName} and ALL their bookings? This cannot be undone.`)) {
      setLoading(true);
      const res = await deleteCustomer(customerId);
      if (!res.success) {
        alert(res.error);
        setLoading(false);
      }
    }
  };

  return (
    <button 
      title="Delete Customer"
      disabled={loading}
      onClick={handleDelete}
      className={`p-2 rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-400 hover:bg-red-50 hover:text-red-600'}`}
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
