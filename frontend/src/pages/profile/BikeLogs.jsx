import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import supabase from '../../utils/supabaseClient';

export default function BikeLogs() {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({ serviceName: '', price: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [bikeName, setBikeName] = useState('');

  useEffect(() => {
    fetchBike();
    fetchLogs();
  }, [bikeId]);

  const fetchBike = async () => {
    const { data, error } = await supabase
      .from('user_bike')
      .select('*')
      .eq('id', bikeId)
      .single();

    if (!error && data) setBikeName(data.name || 'Unnamed Bike');
  };

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('maintenance_log')
      .select('*')
      .eq('user_bike_id', bikeId)
      .order('created_at', { ascending: false });

    if (!error) setLogs(data);
  };

  const addLog = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('maintenance_log').insert([
      {
        user_bike_id: bikeId,
        service_name: newLog.serviceName,
        price: parseInt(newLog.price),
        notes: newLog.notes,
      },
    ]);

    setLoading(false);
    if (!error) {
      setNewLog({ serviceName: '', price: '', notes: '' });
      fetchLogs();
    }
  };

  const deleteLog = async (logId) => {
    const { error } = await supabase
      .from('maintenance_log')
      .delete()
      .eq('id', logId);

    if (!error) {
      fetchLogs();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-green-500">
            Maintenance Logs for {bikeName}
          </h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Log History */}
          <motion.div
            className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Maintenance History</h2>
            {logs.length === 0 ? (
              <p className="text-gray-400">No maintenance logs yet.</p>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-green-500">{log.service_name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          {new Date(log.created_at).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deleteLog(log.id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                          title="Delete log"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-2">price: {log.price} rupees</p>
                    {log.notes && (
                      <p className="text-gray-400 text-sm">
                        <span className="text-green-500">Notes:</span> {log.notes}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Add New Log Form */}
          <motion.div
            className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Add New Log</h2>
            <form onSubmit={addLog} className="space-y-4">
              <div className="flex items-center bg-zinc-800 border border-zinc-700 px-4 rounded-lg">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newLog.serviceName}
                  onChange={(e) => setNewLog({ ...newLog, serviceName: e.target.value })}
                  className="w-full text-sm bg-transparent py-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 px-4 rounded-lg">
                <input
                  type="number"
                  placeholder="Price"
                  value={newLog.price}
                  onChange={(e) => setNewLog({ ...newLog, price: e.target.value })}
                  className="w-full text-sm bg-transparent py-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 px-4 rounded-lg">
                <textarea
                  placeholder="Notes (optional)"
                  value={newLog.notes}
                  onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                  className="w-full text-sm bg-transparent py-3 rounded border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-white placeholder-gray-400 resize-none"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {loading ? 'Adding...' : 'Add Log'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}