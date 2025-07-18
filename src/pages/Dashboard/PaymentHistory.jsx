import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure()
    useEffect(() => {

        axiosSecure("/api/payments")
            .then((res) => {
                console.log(res.data)
                setPayments(res.data)
            })
            .catch((err) => console.error("Failed to fetch payments", err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-4 mt-8">
  <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
    Payment History
  </h2>

  <div className="overflow-x-auto shadow-lg rounded-lg">
    <table className="w-full text-sm text-left text-gray-700">
      <thead className="text-xs uppercase bg-blue-100 text-blue-600">
        <tr>
          <th className="py-3 px-4">SL</th>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">Transaction ID</th>
          <th className="py-3 px-4">Amount</th>
          <th className="py-3 px-4">Payment Method</th>
          <th className="py-3 px-4">Payment Date</th>
        </tr>
      </thead>
      <tbody>
        {payments.length > 0 ? (
          payments.map((payment, index) => (
            <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{payment.name}</td>
              <td className="py-3 px-4">{payment.email}</td>
              <td className="py-3 px-4 text-blue-500 font-mono">{payment.transactionId}</td>
              <td className="py-3 px-4 font-semibold">${payment.amount}</td>
              <td className="py-3 px-4 capitalize">{payment?.paymentMethod?.map(method => <p>{method}</p>)}</td>
              <td className="py-3 px-4">
                {payment.paidAt}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="py-4 px-4 text-center text-gray-500" colSpan="7">
              No payment records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    );
};

export default PaymentHistory;
