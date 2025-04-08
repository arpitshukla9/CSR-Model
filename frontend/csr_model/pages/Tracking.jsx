import React, { useState } from 'react';
import { Search, MapPin, Package, TrendingUp, Calendar, Users, Settings, Menu, X, ChevronDown, ChevronUp, ArrowRight, Star, Phone, Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

const VendorTrackingApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showVendorModal, setShowVendorModal] = useState(false);

  // Sample data
  const vendors = [
    { id: 1, name: 'Global Logistics Inc.', status: 'active', rating: 4.8, location: { lat: 34.0522, lng: -118.2437 }, city: 'Los Angeles', lastDelivery: '2025-04-05', onTime: 96, category: 'Shipping', contact: '(213) 555-7890', email: 'contact@globallogistics.com', contracts: 24, joinedDate: '2023-01-15' },
    { id: 2, name: 'Express Supply Chain', status: 'active', rating: 4.5, location: { lat: 40.7128, lng: -74.0060 }, city: 'New York', lastDelivery: '2025-04-04', onTime: 92, category: 'Raw Materials', contact: '(212) 555-1234', email: 'info@expresssupply.com', contracts: 18, joinedDate: '2023-05-22' },
    { id: 3, name: 'Premier Parts Ltd.', status: 'inactive', rating: 3.9, location: { lat: 41.8781, lng: -87.6298 }, city: 'Chicago', lastDelivery: '2025-03-28', onTime: 84, category: 'Components', contact: '(312) 555-9876', email: 'support@premierparts.com', contracts: 12, joinedDate: '2022-11-10' },
    { id: 4, name: 'Pacific Distributors', status: 'active', rating: 4.7, location: { lat: 37.7749, lng: -122.4194 }, city: 'San Francisco', lastDelivery: '2025-04-06', onTime: 98, category: 'Packaging', contact: '(415) 555-2345', email: 'sales@pacificdist.com', contracts: 32, joinedDate: '2024-02-18' },
    { id: 5, name: 'Mountain Supply Co.', status: 'pending', rating: 4.2, location: { lat: 39.7392, lng: -104.9903 }, city: 'Denver', lastDelivery: '2025-04-01', onTime: 91, category: 'Equipment', contact: '(303) 555-6789', email: 'hello@mountainsupply.com', contracts: 8, joinedDate: '2024-03-05' },
  ];

  // Performance metrics data
  const performanceData = [
    { month: 'Jan', onTime: 92, quality: 88 },
    { month: 'Feb', onTime: 94, quality: 90 },
    { month: 'Mar', onTime: 91, quality: 92 },
    { month: 'Apr', onTime: 95, quality: 93 },
  ];

  // Stats data
  const stats = [
    { title: 'Active Vendors', value: '42', trend: '+12%', icon: <TrendingUp size={20} /> },
    { title: 'On-Time Rate', value: '94%', trend: '+3%', icon: <Clock size={20} /> },
    { title: 'Total Contracts', value: '156', trend: '+8%', icon: <Package size={20} /> },
  ];

  // Filter vendors based on search query
  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'rating') {
      comparison = a.rating - b.rating;
    } else if (sortBy === 'onTime') {
      comparison = a.onTime - b.onTime;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Handle vendor selection
  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorModal(true);
  };

  // Get status icon and color
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'inactive':
        return <AlertCircle size={16} className="text-red-600" />;
      case 'pending':
        return <HelpCircle size={16} className="text-yellow-600" />;
      default:
        return null;
    }
  };

  // CSS Styles
  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f5f5f7',
      fontFamily: "'Inter', sans-serif",
    },
    sidebar: {
      backgroundColor: '#4338ca',
      color: 'white',
      transition: 'width 0.3s ease',
      width: sidebarCollapsed ? '80px' : '280px',
      position: 'relative',
      overflow: 'hidden',
    },
    sidebarHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      height: '72px',
    },
    sidebarTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      opacity: sidebarCollapsed ? 0 : 1,
      transition: 'opacity 0.2s',
    },
    sidebarToggle: {
      padding: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: 'rgba(255,255,255,0.1)',
      border: 'none',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sidebarNav: {
      marginTop: '24px',
      padding: '0 12px',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: activeTab === 'dashboard' ? 'rgba(255,255,255,0.15)' : 'transparent',
      color: 'white',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    navItemActive: {
      backgroundColor: 'rgba(255,255,255,0.15)',
    },
    navIcon: {
      marginRight: sidebarCollapsed ? 0 : '12px',
      transition: 'margin 0.2s',
      flexShrink: 0,
    },
    navText: {
      opacity: sidebarCollapsed ? 0 : 1,
      transition: 'opacity 0.2s',
      fontSize: '14px',
      fontWeight: '500',
    },
    mainContent: {
      flex: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '16px 32px',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    pageTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937',
    },
    searchContainer: {
      position: 'relative',
      width: '360px',
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
    },
    searchInput: {
      paddingLeft: '48px',
      paddingRight: '16px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      outline: 'none',
      width: '100%',
      fontSize: '14px',
      transition: 'all 0.2s',
    },
    searchInputFocus: {
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)',
      borderColor: '#4f46e5',
    },
    main: {
      padding: '32px',
      flex: 1,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '24px',
    },
    gridFullWidth: {
      gridColumn: '1 / -1',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
    },
    viewAllButton: {
      color: '#4f46e5',
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    viewAllButtonHover: {
      color: '#3730a3',
    },
    table: {
      minWidth: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      borderBottom: '1px solid #e5e7eb',
      textAlign: 'left',
      padding: '12px 16px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      transition: 'color 0.2s',
    },
    tableHeaderHover: {
      color: '#4f46e5',
    },
    tableRow: {
      borderBottom: '1px solid #e5e7eb',
      transition: 'background-color 0.2s',
    },
    tableRowHover: {
      backgroundColor: '#f9fafb',
      cursor: 'pointer',
    },
    tableCell: {
      padding: '16px',
      fontSize: '14px',
    },
    vendorCell: {
      display: 'flex',
      alignItems: 'center',
    },
    vendorAvatar: {
      height: '40px',
      width: '40px',
      borderRadius: '50%',
      backgroundColor: '#e0e7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4f46e5',
      fontWeight: 'bold',
      fontSize: '16px',
      flexShrink: 0,
    },
    vendorInfo: {
      marginLeft: '16px',
    },
    vendorName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1f2937',
    },
    vendorCategory: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '2px',
    },
    locationCell: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#6b7280',
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
    },
    statusActive: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
    },
    statusInactive: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
    },
    statusPending: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
    },
    ratingCell: {
      display: 'flex',
      alignItems: 'center',
    },
    starRating: {
      color: '#fbbf24',
      display: 'flex',
      marginRight: '4px',
    },
    performanceBar: {
      display: 'flex',
      alignItems: 'center',
    },
    progressBg: {
      width: '96px',
      backgroundColor: '#e5e7eb',
      borderRadius: '9999px',
      height: '8px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '8px',
      borderRadius: '9999px',
      backgroundColor: '#10b981',
    },
    performanceText: {
      marginLeft: '8px',
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500',
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    statCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    statIcon: {
      backgroundColor: '#e0e7ff',
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4f46e5',
      marginRight: '16px',
      flexShrink: 0,
    },
    statContent: {
      flex: 1,
    },
    statTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6b7280',
      marginBottom: '4px',
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1f2937',
    },
    statTrend: {
      fontSize: '14px',
      color: '#10b981',
      marginLeft: '8px',
      display: 'flex',
      alignItems: 'center',
    },
    mapContainer: {
      height: '400px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e5e7eb',
      position: 'relative',
    },
    mapPlaceholder: {
      position: 'absolute',
      inset: 0,
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#6b7280',
    },
    mapPin: {
      position: 'absolute',
      padding: '8px',
      backgroundColor: '#4f46e5',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    mapPinInner: {
      width: '16px',
      height: '16px',
      backgroundColor: 'white',
      borderRadius: '50%',
    },
    nearbyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginTop: '24px',
    },
    nearbyCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
    },
    nearbyCardHover: {
      borderColor: '#a5b4fc',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    nearbyAvatar: {
      height: '40px',
      width: '40px',
      borderRadius: '50%',
      backgroundColor: '#e0e7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4f46e5',
      fontWeight: 'bold',
      marginRight: '12px',
      flexShrink: 0,
    },
    nearbyInfo: {
      flex: 1,
    },
    nearbyName: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '2px',
    },
    nearbyLocation: {
      fontSize: '12px',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      backdropFilter: 'blur(4px)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      transform: 'translateY(0)',
      transition: 'transform 0.3s ease',
    },
    modalContentHover: {
      transform: 'translateY(-4px)',
    },
    modalHeader: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 10,
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
    },
    modalClose: {
      padding: '8px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#f3f4f6',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s',
    },
    modalCloseHover: {
      backgroundColor: '#e5e7eb',
    },
    modalBody: {
      padding: '24px',
    },
    modalGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    infoGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '12px',
      borderBottom: '1px solid #f3f4f6',
    },
    infoLabel: {
      color: '#6b7280',
      fontSize: '14px',
    },
    infoValue: {
      color: '#1f2937',
      fontSize: '14px',
      fontWeight: '500',
    },
    chartContainer: {
      height: '200px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '24px',
    },
    barChart: {
      display: 'flex',
      height: '100%',
      alignItems: 'flex-end',
      gap: '16px',
    },
    chartColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    barContainer: {
      width: '100%',
      display: 'flex',
      gap: '4px',
      height: '100%',
    },
    bar1: {
      backgroundColor: '#4f46e5',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      width: '100%',
    },
    bar2: {
      backgroundColor: '#10b981',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      width: '100%',
    },
    chartLabel: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '8px',
    },
    chartLegend: {
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      fontSize: '12px',
      color: '#6b7280',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
    },
    legendColor: {
      width: '12px',
      height: '12px',
      marginRight: '4px',
      borderRadius: '2px',
    },
    modalFooter: {
      padding: '16px 24px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white',
    },
    primaryButton: {
      backgroundColor: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
    },
    primaryButtonHover: {
      backgroundColor: '#4338ca',
    },
    vendorHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px',
    },
    vendorAvatarLarge: {
      height: '80px',
      width: '80px',
      borderRadius: '50%',
      backgroundColor: '#e0e7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4f46e5',
      fontWeight: 'bold',
      fontSize: '32px',
      marginRight: '24px',
    },
    vendorHeaderInfo: {
      flex: 1,
    },
    vendorNameLarge: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '4px',
    },
    vendorStatusLarge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 16px',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: '500',
      marginRight: '12px',
    },
    vendorRatingLarge: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      color: '#1f2937',
    },
    vendorLocationLarge: {
      display: 'flex',
      alignItems: 'center',
      color: '#6b7280',
      marginTop: '8px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px',
    },
    sortIcon: {
      marginLeft: '4px',
    },
  };

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          {!sidebarCollapsed && <div style={styles.sidebarTitle}>VendorTrack</div>}
          <button 
            style={styles.sidebarToggle}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        <div style={styles.sidebarNav}>
          <a 
            style={{ ...styles.navItem, ...(activeTab === 'dashboard' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('dashboard')}
          >
            <div style={styles.navIcon}><TrendingUp size={20} /></div>
            <div style={styles.navText}>Dashboard</div>
          </a>
          <a 
            style={{ ...styles.navItem, ...(activeTab === 'vendors' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('vendors')}
          >
            <div style={styles.navIcon}><Users size={20} /></div>
            <div style={styles.navText}>Vendors</div>
          </a>
          <a 
            style={{ ...styles.navItem, ...(activeTab === 'orders' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('orders')}
          >
            <div style={styles.navIcon}><Package size={20} /></div>
            <div style={styles.navText}>Orders</div>
          </a>
          <a 
            style={{ ...styles.navItem, ...(activeTab === 'calendar' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('calendar')}
          >
            <div style={styles.navIcon}><Calendar size={20} /></div>
            <div style={styles.navText}>Calendar</div>
          </a>
          <a 
            style={{ ...styles.navItem, ...(activeTab === 'settings' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('settings')}
          >
            <div style={styles.navIcon}><Settings size={20} /></div>
            <div style={styles.navText}>Settings</div>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.pageTitle}>Vendor Dashboard</h1>
          <div style={styles.searchContainer}>
            <div style={styles.searchIcon}><Search size={18} /></div>
            <input
              type="text"
              placeholder="Search vendors..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Main */}
        <main style={styles.main}>
          {/* Stats Cards */}
          <div style={styles.grid}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                style={{ ...styles.statCard, ...styles.statCardHover }}
              >
                <div style={styles.statIcon}>
                  {stat.icon}
                </div>
                <div style={styles.statContent}>
                  <div style={styles.statTitle}>{stat.title}</div>
                  <div style={styles.statValue}>
                    {stat.value}
                    <span style={styles.statTrend}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vendor Table */}
          <div style={{ ...styles.card, ...styles.cardHover }}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Vendor Performance</h2>
              <button style={{ ...styles.viewAllButton, ...styles.viewAllButtonHover }}>
                View All <ArrowRight size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>
            
            <table style={styles.table}>
              <thead>
                <tr>
                  <th 
                    style={{ ...styles.tableHeader, ...(sortBy === 'name' ? styles.tableHeaderHover : {}) }}
                    onClick={() => handleSort('name')}
                  >
                    Vendor
                    {sortBy === 'name' && (
                      <span style={styles.sortIcon}>
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </th>
                  <th style={styles.tableHeader}>Location</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th 
                    style={{ ...styles.tableHeader, ...(sortBy === 'rating' ? styles.tableHeaderHover : {}) }}
                    onClick={() => handleSort('rating')}
                  >
                    Rating
                    {sortBy === 'rating' && (
                      <span style={styles.sortIcon}>
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </th>
                  <th 
                    style={{ ...styles.tableHeader, ...(sortBy === 'onTime' ? styles.tableHeaderHover : {}) }}
                    onClick={() => handleSort('onTime')}
                  >
                    On-Time %
                    {sortBy === 'onTime' && (
                      <span style={styles.sortIcon}>
                        {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </th>
                  <th style={styles.tableHeader}>Last Delivery</th>
                </tr>
              </thead>
              <tbody>
                {sortedVendors.map((vendor) => (
                  <tr 
                    key={vendor.id} 
                    style={{ ...styles.tableRow, ...styles.tableRowHover }}
                    onClick={() => handleVendorSelect(vendor)}
                  >
                    <td style={styles.tableCell}>
                      <div style={styles.vendorCell}>
                        <div style={styles.vendorAvatar}>
                          {vendor.name.charAt(0)}
                        </div>
                        <div style={styles.vendorInfo}>
                          <div style={styles.vendorName}>{vendor.name}</div>
                          <div style={styles.vendorCategory}>{vendor.category}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.locationCell}>
                        <MapPin size={16} style={{ marginRight: '8px' }} />
                        {vendor.city}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div 
                        style={{
                          ...styles.statusBadge,
                          ...(vendor.status === 'active' ? styles.statusActive : 
                              vendor.status === 'inactive' ? styles.statusInactive : 
                              styles.statusPending)
                        }}
                      >
                        {getStatusIcon(vendor.status)}
                        <span style={{ marginLeft: '6px' }}>{vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.ratingCell}>
                        <div style={styles.starRating}>
                          <Star size={16} fill="#fbbf24" />
                        </div>
                        {vendor.rating.toFixed(1)}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.performanceBar}>
                        <div style={styles.progressBg}>
                          <div 
                            style={{ 
                              ...styles.progressFill, 
                              width: `${vendor.onTime}%`,
                              backgroundColor: vendor.onTime > 90 ? '#10b981' : 
                                             vendor.onTime > 80 ? '#f59e0b' : 
                                             '#ef4444'
                            }} 
                          />
                        </div>
                        <div style={styles.performanceText}>{vendor.onTime}%</div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      {new Date(vendor.lastDelivery).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map and Nearby Vendors */}
          <div style={{ ...styles.grid, marginTop: '24px' }}>
            <div style={{ ...styles.card, ...styles.cardHover, gridColumn: 'span 2' }}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Vendor Locations</h2>
              </div>
              <div style={styles.mapContainer}>
                <div style={styles.mapPlaceholder}>
                  <MapPin size={48} color="#9ca3af" />
                  <p style={{ marginTop: '16px' }}>Interactive map would display here</p>
                </div>
                {vendors.map(vendor => (
                  <div 
                    key={vendor.id} 
                    style={{ 
                      ...styles.mapPin,
                      left: `${((vendor.location.lng + 180) / 360) * 100}%`,
                      top: `${((90 - vendor.location.lat) / 180) * 100}%`,
                      backgroundColor: vendor.status === 'active' ? '#4f46e5' : 
                                      vendor.status === 'inactive' ? '#ef4444' : 
                                      '#f59e0b'
                    }}
                  >
                    <div style={styles.mapPinInner} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...styles.card, ...styles.cardHover }}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Nearby Vendors</h2>
              </div>
              <div style={styles.nearbyGrid}>
                {vendors.slice(0, 3).map(vendor => (
                  <div 
                    key={vendor.id} 
                    style={{ ...styles.nearbyCard, ...styles.nearbyCardHover }}
                    onClick={() => handleVendorSelect(vendor)}
                  >
                    <div style={styles.nearbyAvatar}>
                      {vendor.name.charAt(0)}
                    </div>
                    <div style={styles.nearbyInfo}>
                      <div style={styles.nearbyName}>{vendor.name}</div>
                      <div style={styles.nearbyLocation}>
                        <MapPin size={14} style={{ marginRight: '4px' }} />
                        {vendor.city}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Vendor Detail Modal */}
      {showVendorModal && selectedVendor && (
        <div style={styles.modal}>
          <div style={{ ...styles.modalContent, ...styles.modalContentHover }}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Vendor Details</h2>
              <button 
                style={{ ...styles.modalClose, ...styles.modalCloseHover }}
                onClick={() => setShowVendorModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.vendorHeader}>
                <div style={styles.vendorAvatarLarge}>
                  {selectedVendor.name.charAt(0)}
                </div>
                <div style={styles.vendorHeaderInfo}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div 
                      style={{
                        ...styles.vendorStatusLarge,
                        ...(selectedVendor.status === 'active' ? styles.statusActive : 
                            selectedVendor.status === 'inactive' ? styles.statusInactive : 
                            styles.statusPending)
                      }}
                    >
                      {selectedVendor.status.charAt(0).toUpperCase() + selectedVendor.status.slice(1)}
                    </div>
                    <div style={styles.vendorRatingLarge}>
                      <Star size={18} fill="#fbbf24" style={{ marginRight: '4px' }} />
                      {selectedVendor.rating.toFixed(1)}
                    </div>
                  </div>
                  <h3 style={styles.vendorNameLarge}>{selectedVendor.name}</h3>
                  <div style={styles.vendorLocationLarge}>
                    <MapPin size={16} style={{ marginRight: '8px' }} />
                    {selectedVendor.city}
                  </div>
                </div>
              </div>

              <div style={styles.modalGrid}>
                <div>
                  <h4 style={styles.sectionTitle}>Vendor Information</h4>
                  <div style={styles.infoGrid}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Category</span>
                      <span style={styles.infoValue}>{selectedVendor.category}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Contact</span>
                      <span style={styles.infoValue}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Phone size={14} style={{ marginRight: '8px' }} />
                          {selectedVendor.contact}
                        </div>
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Email</span>
                      <span style={styles.infoValue}>{selectedVendor.email}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Contracts</span>
                      <span style={styles.infoValue}>{selectedVendor.contracts}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Joined Date</span>
                      <span style={styles.infoValue}>
                        {new Date(selectedVendor.joinedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={styles.sectionTitle}>Performance Metrics</h4>
                  <div style={styles.infoGrid}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>On-Time Rate</span>
                      <span style={{ ...styles.infoValue, color: selectedVendor.onTime > 90 ? '#10b981' : '#f59e0b' }}>
                        {selectedVendor.onTime}%
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Last Delivery</span>
                      <span style={styles.infoValue}>
                        {new Date(selectedVendor.lastDelivery).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div style={styles.chartContainer}>
                    <h4 style={styles.sectionTitle}>Performance Trend</h4>
                    <div style={styles.barChart}>
                      {performanceData.map((data, index) => (
                        <div key={index} style={styles.chartColumn}>
                          <div style={styles.barContainer}>
                            <div 
                              style={{ 
                                ...styles.bar1, 
                                height: `${data.onTime}%`,
                                backgroundColor: data.onTime > 90 ? '#4f46e5' : 
                                               data.onTime > 80 ? '#8b5cf6' : 
                                               '#a78bfa'
                              }} 
                            />
                            <div 
                              style={{ 
                                ...styles.bar2, 
                                height: `${data.quality}%`,
                                backgroundColor: data.quality > 90 ? '#10b981' : 
                                               data.quality > 80 ? '#34d399' : 
                                               '#6ee7b7'
                              }} 
                            />
                          </div>
                          <div style={styles.chartLabel}>{data.month}</div>
                        </div>
                      ))}
                    </div>
                    <div style={styles.chartLegend}>
                      <div style={styles.legendItem}>
                        <div style={{ ...styles.legendColor, backgroundColor: '#4f46e5' }} />
                        <span>On-Time %</span>
                      </div>
                      <div style={styles.legendItem}>
                        <div style={{ ...styles.legendColor, backgroundColor: '#10b981' }} />
                        <span>Quality %</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={{ ...styles.primaryButton, ...styles.primaryButtonHover }}>
                Contact Vendor <Phone size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorTrackingApp;