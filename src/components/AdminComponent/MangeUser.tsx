import React, { useEffect, useState } from "react";
import { getUsers, updateUser } from "../../services/admin.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  code: string;
  status: boolean;
}

const MangeUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers(page, pageSize);
      const userList = Array.isArray(res.data?.items) ? res.data.items : [];
      setUsers(userList);
      setTotal(res.data?.totalCount || 0);
    } catch (error: any) {
      toast.error("Failed to load user list!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page]);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleConfirmStatus = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await updateUser(selectedUser.id, { status: !selectedUser.status });
      toast.success("Update successful!");
      fetchUsers();
    } catch (error: any) {
      toast.error("Update failed!");
    } finally {
      setActionLoading(false);
      handleCloseModal();
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Manage Users</h2>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800">
              <th className="py-3 px-4 text-left font-semibold">Full Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Role</th>
              <th className="py-3 px-4 text-left font-semibold">Code</th>
              <th className="py-3 px-4 text-center font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50 transition">
                <td className="py-2 px-4">{user.fullName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.code}</td>
                <td className="py-2 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${user.status ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
                    {user.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleOpenModal(user)}
                    className={`px-4 py-1 rounded-full font-semibold shadow transition text-white ${user.status ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                    disabled={loading}
                  >
                    {user.status ? "Set Inactive" : "Set Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold text-blue-700">
          Page {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => (totalPages ? Math.min(totalPages, p + 1) : p + 1))}
          disabled={page === totalPages || totalPages === 0 || loading}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold shadow hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {/* Modal Confirm */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Status Change</h3>
            <p className="mb-6 text-gray-700 text-center">
              Are you sure you want to {selectedUser.status ? "set this user to Inactive" : "set this user to Active"}?
            </p>
            <div className="flex gap-4 w-full justify-center">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStatus}
                className={`px-4 py-2 rounded-lg font-semibold shadow transition text-white ${selectedUser.status ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangeUser;
