import { useEffect, useState } from 'react';

interface Complaint {
  id: number;
  name: string;
  email: string;
  complaint: string;
  status: string;
  created_at: string;
}

export default function ComplaintTable() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaints = async () => {
    try {
      const res = await fetch('/api/complaints');
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to fetch complaints');
      }
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch complaints');
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const res = await fetch(`/api/complaints/${id}`, { method: 'PATCH' });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to update status');
      }
      await fetchComplaints();
    } catch (err) {
      console.error('Error toggling status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const deleteComplaint = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) {
      return;
    }

    try {
      const res = await fetch(`/api/complaints/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to delete complaint');
      }
      await fetchComplaints();
    } catch (err) {
      console.error('Error deleting complaint:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete complaint');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="space-y-6 min-w-full">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Manage Complaints</h2>
          <p className="mt-2 text-sm text-gray-700 sm:mt-0">
            Total complaints: {complaints.length}
          </p>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Complaint</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {complaints.map((complaint) => (
                      <tr key={complaint.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {complaint.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {complaint.email}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <div className="line-clamp-2">{complaint.complaint}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            complaint.status === 'Resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => toggleStatus(complaint.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Toggle Status
                          </button>
                          <button
                            onClick={() => deleteComplaint(complaint.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}