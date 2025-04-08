import React, { useState } from 'react';
import { Bell, BarChart2, Package, Home, Layers, User, LogIn, QrCode, Settings, LayoutGrid, FileText, Leaf } from 'lucide-react';
import '../pages/Warehouseman.css'; 

const WarehouseManagementSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Demo data
  const warehouseData = {
    spaceUtilization: 78,
    totalItems: 3427,
    alerts: 7,
    sustainability: 92
  };

  const renderLogin = () => (
    <div className="login-container">
      <h2 className="login-title">Warehouse Management System</h2>
      
      <div className="form-group">
        <label>Username</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="button-group">
        <button 
          className="primary-button"
          onClick={() => setCurrentView('dashboard')}
        >
          Login
        </button>
        <button 
          className="secondary-button"
          onClick={() => setCurrentView('register')}
        >
          Register
        </button>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="login-container">
      <h2 className="login-title">Register New Account</h2>
      
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" />
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input type="email" />
      </div>
      
      <div className="form-group">
        <label>Username</label>
        <input type="text" />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <input type="password" />
      </div>
      
      <div className="button-group">
        <button 
          className="primary-button"
          onClick={() => setCurrentView('dashboard')}
        >
          Create Account
        </button>
        <button 
          className="secondary-button"
          onClick={() => setCurrentView('login')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">WMS Dashboard</div>
        <nav className="sidebar-nav">
          <SidebarItem icon={<Home />} text="Dashboard" isActive={true} />
          <SidebarItem icon={<Layers />} text="Warehouse Management" />
          <SidebarItem icon={<Package />} text="Inventory Management" />
          <SidebarItem icon={<BarChart2 />} text="Reports & Analytics" />
          <SidebarItem icon={<Leaf />} text="CSR Impact Metrics" />
          <SidebarItem icon={<Settings />} text="Settings" />
          <SidebarItem icon={<LogIn />} text="Logout" onClick={() => setCurrentView('login')} />
        </nav>
      </div>
      
      {/* Main content */}
      <div className="main-content">
        <header className="main-header">
          <h1 className="page-title">Dashboard</h1>
          <div className="header-actions">
            <button className="icon-button">
              <Bell />
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                <User size={16} />
              </div>
              <span className="user-name">Admin User</span>
            </div>
          </div>
        </header>
        
        <main className="dashboard-main">
          {/* Stats Cards */}
          <div className="stats-grid">
            <StatCard 
              title="Space Utilization" 
              value={`${warehouseData.spaceUtilization}%`}
              icon={<LayoutGrid size={24} />}
              color="blue"
            />
            <StatCard 
              title="Total Inventory" 
              value={warehouseData.totalItems.toLocaleString()}
              icon={<Package size={24} />}
              color="indigo"
            />
            <StatCard 
              title="Alerts" 
              value={warehouseData.alerts}
              icon={<Bell size={24} />}
              color="red"
            />
            <StatCard 
              title="Sustainability Score" 
              value={`${warehouseData.sustainability}%`}
              icon={<Leaf size={24} />}
              color="green"
            />
          </div>
          
          {/* Quick Actions */}
          <div className="card quick-actions">
            <h2 className="card-title">Quick Actions</h2>
            <div className="actions-grid">
              <ActionButton 
                text="Scan Item" 
                icon={<QrCode />} 
                color="blue"
              />
              <ActionButton 
                text="Add New Item" 
                icon={<Package />} 
                color="indigo"
              />
              <ActionButton 
                text="Generate Report" 
                icon={<FileText />} 
                color="purple"
              />
              <ActionButton 
                text="View Warehouse" 
                icon={<Layers />} 
                color="teal"
              />
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="card">
            <h2 className="card-title">Recent Activity</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Item ID</th>
                    <th>User</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <ActivityRow activity="Item Added" itemId="WH-1234" user="John Doe" time="10:23 AM" />
                  <ActivityRow activity="Item Removed" itemId="WH-5678" user="Jane Smith" time="09:45 AM" />
                  <ActivityRow activity="Zone Reconfigured" itemId="ZONE-A" user="Admin" time="Yesterday" />
                  <ActivityRow activity="Inventory Count" itemId="BATCH-001" user="System" time="Yesterday" />
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Helper components
  const SidebarItem = ({ icon, text, isActive = false, onClick }) => (
    <div 
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-text">{text}</span>
    </div>
  );

  const StatCard = ({ title, value, icon, color }) => {
    return (
      <div className="stat-card">
        <div className="stat-content">
          <div className={`stat-icon ${color}`}>
            {icon}
          </div>
          <div className="stat-info">
            <p className="stat-title">{title}</p>
            <p className="stat-value">{value}</p>
          </div>
        </div>
      </div>
    );
  };

  const ActionButton = ({ text, icon, color }) => {
    return (
      <button className={`action-button ${color}`}>
        <span className="action-icon">{icon}</span>
        <span className="action-text">{text}</span>
      </button>
    );
  };

  const ActivityRow = ({ activity, itemId, user, time }) => (
    <tr>
      <td>{activity}</td>
      <td>{itemId}</td>
      <td>{user}</td>
      <td>{time}</td>
    </tr>
  );

  // Render appropriate view based on state
  if (currentView === 'login') return renderLogin();
  if (currentView === 'register') return renderRegister();
  return renderDashboard();
};

export default WarehouseManagementSystem;