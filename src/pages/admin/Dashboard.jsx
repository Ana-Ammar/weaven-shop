export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-rich-card shadow rounded-xl border-t-4 border-rich-accent">
          <div className="stat-title text-rich-text-muted">Total Products</div>
          <div className="stat-value text-rich-accent">124</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        
        <div className="stat bg-rich-card shadow rounded-xl border-t-4 border-rich-text-muted">
          <div className="stat-title text-rich-text-muted">Total Sales</div>
          <div className="stat-value text-rich-text-muted">$14,200</div>
          <div className="stat-desc">4% more than last month</div>
        </div>
        
        <div className="stat bg-rich-card shadow rounded-xl border-t-4 border-rich-accent-hover">
          <div className="stat-title text-rich-text-muted">Active Users</div>
          <div className="stat-value text-rich-accent-hover">1,200</div>
          <div className="stat-desc">8% more than last month</div>
        </div>
      </div>

      <div className="mt-12 bg-rich-card p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>John Doe</td>
                <td>Oct 24, 2026</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>$129.99</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>Jane Smith</td>
                <td>Oct 24, 2026</td>
                <td><span className="badge badge-warning">Processing</span></td>
                <td>$59.99</td>
              </tr>
              <tr>
                <td>#12347</td>
                <td>Bob Wilson</td>
                <td>Oct 23, 2026</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>$89.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
