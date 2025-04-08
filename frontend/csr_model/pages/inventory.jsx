import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './inventory.css';

function App() {
  // State for inventory items
  const [inventory, setInventory] = useState([]);
  // State for form data
  const [formData, setFormData] = useState({
    id: '',
    sku: '',
    name: '',
    quantity: 0,
    price: 0,
    category: '',
    location: '',
    spacePerUnit: 0,
    broughtBy: '',
    dateAdded: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  });
  // State for current mode (create or update)
  const [currentMode, setCurrentMode] = useState('create');
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for alert
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  // State for QR scanner
  const [scanner, setScanner] = useState(null);
  // State for scanning status
  const [scanning, setScanning] = useState(false);
  // State for showing the action modal after QR scan
  const [showActionModal, setShowActionModal] = useState(false);
  // State for scanned item
  const [scannedItem, setScannedItem] = useState(null);
  // State for active tab
  const [activeTab, setActiveTab] = useState('inventory');
  // Ref for QR reader div
  const qrReaderRef = useRef(null);
  // Ref for inventory table
  const inventoryTableRef = useRef(null);
  // State for auto-generate QR setting
  const [autoGenerateQR, setAutoGenerateQR] = useState(true);
  // State for showing QR modal
  const [showQRModal, setShowQRModal] = useState(false);
  // State for current QR code URL
  const [currentQRUrl, setCurrentQRUrl] = useState('');
  // State for current QR item name
  const [currentQRItemName, setCurrentQRItemName] = useState('');
  // State for total warehouse space (in cubic meters)
  const [totalWarehouseSpace, setTotalWarehouseSpace] = useState(1000);
  // State for category colors
  const [categoryColors, setCategoryColors] = useState({
    'Electronics': '#3498db',
    'Furniture': '#e74c3c',
    'Clothing': '#2ecc71',
    'Food': '#f39c12',
    'Office Supplies': '#9b59b6',
    'Default': '#95a5a6'
  });

  // Load inventory from localStorage on component mount
  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
    
    // Set auto-generate QR preference
    const autoQRPref = localStorage.getItem('autoGenerateQR');
    if (autoQRPref !== null) {
      setAutoGenerateQR(JSON.parse(autoQRPref));
    }

    // Load warehouse space
    const storedSpace = localStorage.getItem('totalWarehouseSpace');
    if (storedSpace !== null) {
      setTotalWarehouseSpace(parseFloat(storedSpace));
    }

    // Load category colors
    const storedColors = localStorage.getItem('categoryColors');
    if (storedColors !== null) {
      setCategoryColors(JSON.parse(storedColors));
    }
  }, []);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Save auto-generate QR preference
  useEffect(() => {
    localStorage.setItem('autoGenerateQR', JSON.stringify(autoGenerateQR));
  }, [autoGenerateQR]);

  // Save warehouse space
  useEffect(() => {
    localStorage.setItem('totalWarehouseSpace', totalWarehouseSpace.toString());
  }, [totalWarehouseSpace]);

  // Save category colors
  useEffect(() => {
    localStorage.setItem('categoryColors', JSON.stringify(categoryColors));
  }, [categoryColors]);

  // Initialize QR scanner
  useEffect(() => {
    return () => {
      // Cleanup scanner on component unmount
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ 
      ...formData, 
      [id]: (id === 'quantity' || id === 'price' || id === 'spacePerUnit') ? parseFloat(value) : value 
    });
  };

  // Show alert message
  const showAlert = (message, type = 'error') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      id: '',
      sku: '',
      name: '',
      quantity: 0,
      price: 0,
      category: '',
      location: '',
      spacePerUnit: 0,
      broughtBy: '',
      dateAdded: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });
    setCurrentMode('create');
  };

  // Populate form with item data (for edits)
  const populateForm = (item) => {
    setFormData({ 
      ...item,
      spacePerUnit: item.spacePerUnit || 0,
      broughtBy: item.broughtBy || ''
    });
    setCurrentMode('update');
    setActiveTab('form');
  };

  // Calculate total space used by inventory
  const calculateTotalSpaceUsed = () => {
    return inventory.reduce((total, item) => {
      return total + ((item.spacePerUnit || 0) * item.quantity);
    }, 0);
  };

  // Get space used percentage
  const getSpaceUsedPercentage = () => {
    const usedSpace = calculateTotalSpaceUsed();
    return (usedSpace / totalWarehouseSpace) * 100;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const item = {
      sku: formData.sku,
      name: formData.name,
      quantity: parseFloat(formData.quantity) || 0,
      price: parseFloat(formData.price) || 0,
      category: formData.category || '',
      location: formData.location || '',
      spacePerUnit: parseFloat(formData.spacePerUnit) || 0,
      broughtBy: formData.broughtBy || '',
      dateAdded: formData.dateAdded || new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    if (currentMode === 'create') {
      // Create new item with unique ID
      item.id = Date.now().toString();
      const newInventory = [...inventory, item];
      setInventory(newInventory);
      showAlert('Item added successfully', 'success');
      
      // Auto-generate QR if enabled
      if (autoGenerateQR) {
        const qrCodeUrl = generateQRCodeUrl(item);
        setCurrentQRUrl(qrCodeUrl);
        setCurrentQRItemName(item.name);
        setShowQRModal(true);
      }
    } else {
      // Update existing item
      item.id = formData.id;
      item.dateAdded = formData.dateAdded; // Preserve original date added
      const updatedInventory = inventory.map(i => 
        i.id === item.id ? item : i
      );
      setInventory(updatedInventory);
      showAlert('Item updated successfully', 'success');
    }
    
    resetForm();
  };

  // Delete an item
  const deleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
      showAlert('Item deleted', 'success');
    }
  };

  // Start QR scanner
  const startScanner = () => {
    // Clear previous instance if exists
    if (scanner) {
      scanner.clear();
    }
    
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", 
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }, 
      false
    );
    
    html5QrcodeScanner.render((decodedText) => {
      try {
        const itemData = JSON.parse(decodedText);
        
        // Check if item exists in inventory
        const existingItem = inventory.find(item => item.id === itemData.id);
        
        if (existingItem) {
          // Navigate to inventory tab and highlight the item
          setActiveTab('inventory');
          setSearchTerm(existingItem.sku);
          
          // Scroll to the item after a small delay to allow rendering
          setTimeout(() => {
            const table = inventoryTableRef.current;
            if (table) {
              const row = table.querySelector(`tr[data-id="${existingItem.id}"]`);
              if (row) {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                row.classList.add('highlighted');
                setTimeout(() => row.classList.remove('highlighted'), 2000);
              }
            }
          }, 100);
          
          // Stop scanner after successful scan
          html5QrcodeScanner.clear();
          setScanner(null);
          setScanning(false);
        } else {
          // Auto-create new item if it doesn't exist
          const newItem = {
            ...itemData,
            id: Date.now().toString(),
            dateAdded: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          };
          setInventory([...inventory, newItem]);
          showAlert('New item added from QR code', 'success');
          
          // Stop scanner
          html5QrcodeScanner.clear();
          setScanner(null);
          setScanning(false);
          
          // Navigate to the new item
          setActiveTab('inventory');
          setSearchTerm(newItem.sku);
        }
      } catch (error) {
        console.error('Invalid QR data:', error);
        showAlert('Invalid QR code format');
      }
    }, (errorMessage) => {
      // Handling errors - can be ignored for continuous scanning
    });
    
    setScanner(html5QrcodeScanner);
    setScanning(true);
  };

  // Stop QR scanner
  const stopScanner = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
      setScanning(false);
    }
  };

  // Generate QR code URL for an item
  const generateQRCodeUrl = (item) => {
    // Create a URL pointing to your inventory item page with the item ID as a parameter
    const inventoryItemUrl = `${window.location.origin}/inventoryitem.jsx?id=${item.id}`;
    
    // Encode this URL for the QR code generator
    const encodedUrl = encodeURIComponent(inventoryItemUrl);
    
    // Return the QR code image URL
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedUrl}&size=300x300`;
  };

  // Generate QR code for current form item
  const generateQRForCurrentItem = () => {
    if (!formData.sku || !formData.name) {
      showAlert('Please fill out at least SKU and Name fields');
      return;
    }
    
    const item = {
      id: formData.id || Date.now().toString(),
      sku: formData.sku,
      name: formData.name,
      quantity: parseFloat(formData.quantity) || 0,
      price: parseFloat(formData.price) || 0,
      category: formData.category || '',
      location: formData.location || '',
      spacePerUnit: parseFloat(formData.spacePerUnit) || 0,
      broughtBy: formData.broughtBy || '',
      dateAdded: formData.dateAdded || new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    const qrCodeUrl = generateQRCodeUrl(item);
    setCurrentQRUrl(qrCodeUrl);
    setCurrentQRItemName(item.name);
    setShowQRModal(true);
  };

  // Generate and show QR code for an item
  const showItemQR = (item) => {
    const qrCodeUrl = generateQRCodeUrl(item);
    setCurrentQRUrl(qrCodeUrl);
    setCurrentQRItemName(item.name);
    setShowQRModal(true);
  };

  // Get color for a category
  const getCategoryColor = (category) => {
    if (!category) return categoryColors['Default'];
    return categoryColors[category] || categoryColors['Default'];
  };

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.sku.toLowerCase().includes(searchLower) ||
      item.name.toLowerCase().includes(searchLower) ||
      (item.category && item.category.toLowerCase().includes(searchLower)) ||
      (item.location && item.location.toLowerCase().includes(searchLower)) ||
      (item.broughtBy && item.broughtBy.toLowerCase().includes(searchLower))
    );
  });

  // Prepare data for inventory chart
  const chartData = inventory.length > 0 
    ? inventory
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5)
        .map(item => ({
          name: item.name,
          quantity: item.quantity,
          value: item.price * item.quantity,
          fill: getCategoryColor(item.category)
        }))
    : [];

  // Update warehouse space
  const updateWarehouseSpace = (newSpace) => {
    setTotalWarehouseSpace(parseFloat(newSpace));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="material-icons">qr_code_scanner</span>
          <h1>QR Inventory Pro</h1>
        </div>
        <div className="header-actions">
          <div className="auto-qr-toggle">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={autoGenerateQR} 
                onChange={() => setAutoGenerateQR(!autoGenerateQR)} 
              />
              <span className="slider round"></span>
            </label>
            <span>Auto-generate QR</span>
          </div>
          <button 
            className="scan-btn" 
            onClick={() => {
              setActiveTab('scanner');
              setTimeout(() => {
                if (qrReaderRef.current) {
                  startScanner();
                }
              }, 100);
            }}
          >
            <span className="material-icons">qr_code_scanner</span>
            Scan QR
          </button>
        </div>
      </header>
      
      {alert.show && (
        <div className={`alert ${alert.type === 'success' ? 'success' : 'error'}`}>
          <span className="material-icons">
            {alert.type === 'success' ? 'check_circle' : 'error'}
          </span>
          {alert.message}
        </div>
      )}
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="material-icons">dashboard</span>
          Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          <span className="material-icons">inventory_2</span>
          Inventory
        </button>
        <button 
          className={`tab ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <span className="material-icons">add_circle</span>
          {currentMode === 'create' ? 'Add Item' : 'Edit Item'}
        </button>
        <button 
          className={`tab ${activeTab === 'scanner' ? 'active' : ''}`}
          onClick={() => setActiveTab('scanner')}
        >
          <span className="material-icons">qr_code_scanner</span>
          Scanner
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <span className="material-icons">settings</span>
          Settings
        </button>
      </div>
      
      <div className="tab-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>Total Items</h3>
                <div className="card-value">{inventory.length}</div>
                <span className="material-icons">category</span>
              </div>
              <div className="dashboard-card">
                <h3>Total Value</h3>
                <div className="card-value">
                  ₹{inventory.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                </div>
                <span className="material-icons">currency_rupee</span>
              </div>
              <div className="dashboard-card">
                <h3>Low Stock Items</h3>
                <div className="card-value">
                  {inventory.filter(item => item.quantity < 5).length}
                </div>
                <span className="material-icons">warning</span>
              </div>
            </div>
            
            {/* Space Utilization Card */}
            <div className="space-utilization">
              <h3>Warehouse Space Utilization</h3>
              <div className="space-stats">
                <div className="space-used">
                  <span className="stat-label">Space Used:</span>
                  <span className="stat-value">{calculateTotalSpaceUsed().toFixed(2)} m³</span>
                </div>
                <div className="space-available">
                  <span className="stat-label">Space Available:</span>
                  <span className="stat-value">{(totalWarehouseSpace - calculateTotalSpaceUsed()).toFixed(2)} m³</span>
                </div>
                <div className="space-total">
                  <span className="stat-label">Total Space:</span>
                  <span className="stat-value">{totalWarehouseSpace.toFixed(2)} m³</span>
                </div>
              </div>
              <div className="space-bar-container">
                <div 
                  className="space-bar" 
                  style={{ 
                    width: `${Math.min(getSpaceUsedPercentage(), 100)}%`,
                    backgroundColor: getSpaceUsedPercentage() > 90 ? '#e74c3c' : 
                                    getSpaceUsedPercentage() > 70 ? '#f39c12' : '#2ecc71'
                  }}
                ></div>
              </div>
              <div className="space-percentage">
                {getSpaceUsedPercentage().toFixed(1)}% Used
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Top Items by Quantity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value, name === 'value' ? `₹${value}` : name]} />
                  <Bar dataKey="quantity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Category Distribution Chart */}
            <div className="category-distribution">
              <h3>Category Distribution</h3>
              <div className="category-list">
                {Object.entries(
                  inventory.reduce((acc, item) => {
                    const category = item.category || 'Uncategorized';
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([category, count]) => (
                  <div 
                    key={category} 
                    className="category-item"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  >
                    <span className="category-name">{category}</span>
                    <span className="category-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="recent-items">
              <h3>Recently Updated Items</h3>
              <ul className="recent-items-list">
                {inventory
                  .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                  .slice(0, 5)
                  .map(item => (
                    <li 
                      key={item.id} 
                      className="recent-item"
                      style={{ borderLeft: `4px solid ${getCategoryColor(item.category)}` }}
                    >
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-details">
                          SKU: {item.sku} | Qty: {item.quantity} | ₹{item.price.toFixed(2)}
                          {item.spacePerUnit > 0 && ` | Space: ${(item.spacePerUnit * item.quantity).toFixed(2)} m³`}
                          {item.broughtBy && ` | Brought by: ${item.broughtBy}`}
                        </div>
                      </div>
                      <button 
                        className="view-btn"
                        onClick={() => populateForm(item)}
                      >
                        View
                      </button>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        )}
        
        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="inventory-tab">
            <div className="inventory-header">
              <div className="search-bar">
                <span className="material-icons">search</span>
                <input 
                  type="text" 
                  placeholder="Search inventory..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="add-btn"
                onClick={() => {
                  resetForm();
                  setActiveTab('form');
                }}
              >
                <span className="material-icons">add</span>
                Add New Item
              </button>
            </div>
            
            {inventory.length === 0 ? (
              <div className="empty-state">
                <span className="material-icons large-icon">inventory</span>
                <p>Your inventory is empty</p>
                <button 
                  className="add-btn"
                  onClick={() => {
                    resetForm();
                    setActiveTab('form');
                  }}
                >
                  Add First Item
                </button>
              </div>
            ) : filteredInventory.length === 0 ? (
              <div className="empty-state">
                <span className="material-icons large-icon">search_off</span>
                <p>No items match your search</p>
                <button 
                  className="secondary-btn"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="inventory-table-container" ref={inventoryTableRef}>
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Brought By</th>
                      <th>Qty</th>
                      <th>Price (₹)</th>
                      <th>Space (m³)</th>
                      <th>Location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map(item => (
                      <tr 
                        key={item.id}
                        data-id={item.id}
                        style={{ 
                          borderLeft: `4px solid ${getCategoryColor(item.category)}`,
                        }}
                      >
                        <td>{item.sku}</td>
                        <td>{item.name}</td>
                        <td>{item.category || '-'}</td>
                        <td>{item.broughtBy || '-'}</td>
                        <td className={item.quantity < 5 ? 'low-stock' : ''}>
                          {item.quantity}
                        </td>
                        <td>₹{parseFloat(item.price).toFixed(2)}</td>
                        <td>
                          {item.spacePerUnit ? (item.spacePerUnit * item.quantity).toFixed(2) : '-'}
                        </td>
                        <td>{item.location || '-'}</td>
                        <td>
                          <div className="table-actions">
                            <button 
                              className="action-btn edit"
                              onClick={() => populateForm(item)}
                              title="Edit"
                            >
                              <span className="material-icons">edit</span>
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => deleteItem(item.id)}
                              title="Delete"
                            >
                              <span className="material-icons">delete</span>
                            </button>
                            <button 
                              className="action-btn qr"
                              onClick={() => showItemQR(item)}
                              title="Show QR"
                            >
                              <span className="material-icons">qr_code</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {/* Form Tab */}
        {activeTab === 'form' && (
          <div className="form-tab">
            <div className="form-header">
              <h2>{currentMode === 'create' ? 'Add New Item' : 'Edit Item'}</h2>
              {currentMode === 'update' && (
                <button 
                  className="secondary-btn"
                  onClick={resetForm}
                >
                  Switch to Create
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="item-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sku">SKU / Product Code</label>
                  <input 
                    type="text" 
                    id="sku" 
                    value={formData.sku} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter SKU or product code"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="name">Item Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter item name"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input 
                    type="text" 
                    id="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    placeholder="Enter category (optional)"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Storage Location</label>
                  <input 
                    type="text" 
                    id="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    placeholder="Enter storage location (optional)"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    value={formData.quantity} 
                    onChange={handleInputChange} 
                    min="0" 
                    step="any"
                    required 
                    placeholder="0"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Price (₹)</label>
                  <input 
                    type="number" 
                    id="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    min="0" 
                    step="any"
                    required 
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="spacePerUnit">Space per Unit (m³)</label>
                  <input 
                    type="number" 
                    id="spacePerUnit" 
                    value={formData.spacePerUnit} 
                    onChange={handleInputChange} 
                    min="0" 
                    step="any"
                    placeholder="0.00"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="broughtBy">Brought By</label>
                  <input 
                    type="text" 
                    id="broughtBy" 
                    value={formData.broughtBy} 
                    onChange={handleInputChange} 
                    placeholder="Person who brought this item"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {currentMode === 'create' ? 'Save Item' : 'Update Item'}
                </button>
                <button 
                  type="button" 
                  className="secondary-btn" 
                  onClick={resetForm}
                >
                  Reset Form
                </button>
                <button 
                  type="button" 
                  className="qr-btn" 
                  onClick={generateQRForCurrentItem}
                >
                  Generate QR Code
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Scanner Tab */}
        {activeTab === 'scanner' && (
          <div className="scanner-tab" ref={qrReaderRef}>
            <div className="scanner-header">
              <h2>QR Code Scanner</h2>
              {scanning ? (
                <button className="stop-btn" onClick={stopScanner}>
                  <span className="material-icons">stop</span>
                  Stop Scanning
                </button>
              ) : (
                <button className="start-btn" onClick={startScanner}>
                  <span className="material-icons">play_arrow</span>
                  Start Scanning
                </button>
              )}
            </div>
            
            <div className="scanner-container">
              <div id="reader" className="qr-reader"></div>
              <div className="scanner-instructions">
                <p>Point your camera at a QR code to automatically load item details</p>
                <p>Make sure the QR code is well-lit and clearly visible</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h2>System Settings</h2>
            
            <div className="settings-section">
              <h3>Warehouse Configuration</h3>
              <div className="form-group">
                <label htmlFor="warehouseSpace">Total Warehouse Space (m³)</label>
                <input 
                  type="number" 
                  id="warehouseSpace" 
                  value={totalWarehouseSpace} 
                  onChange={(e) => updateWarehouseSpace(e.target.value)} 
                  min="1" 
                  step="any"
                  required 
                />
              </div>
            </div>
            
            <div className="settings-section">
              <h3>QR Code Settings</h3>
              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={autoGenerateQR} 
                    onChange={() => setAutoGenerateQR(!autoGenerateQR)} 
                  />
                  Automatically generate QR code after adding item
                </label>
              </div>
            </div>
            
            <div className="settings-section">
              <h3>Category Color Settings</h3>
              <div className="category-colors">
                {Object.entries(categoryColors).map(([category, color]) => (
                  <div key={category} className="color-picker-group">
                    <label>{category}</label>
                    <input 
                      type="color" 
                      value={color} 
                      onChange={(e) => {
                        setCategoryColors({...categoryColors, [category]: e.target.value});
                      }} 
                    />
                  </div>
                ))}
              </div>
              <button className="add-category-btn">
                <span className="material-icons">add</span>
                Add New Category
              </button>
            </div>
            
            <div className="settings-section">
              <h3>Data Management</h3>
              <div className="data-buttons">
                <button 
                  className="export-btn"
                  onClick={() => {
                    const dataStr = JSON.stringify(inventory);
                    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                    
                    const exportFileDefaultName = 'inventory-data.json';
                    
                    let linkElement = document.createElement('a');
                    linkElement.setAttribute('href', dataUri);
                    linkElement.setAttribute('download', exportFileDefaultName);
                    linkElement.click();
                  }}
                >
                  <span className="material-icons">cloud_download</span>
                  Export Inventory Data
                </button>
                
                <input
                  type="file"
                  id="importFile"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = function(event) {
                        try {
                          const importedData = JSON.parse(event.target.result);
                          if (Array.isArray(importedData)) {
                            setInventory(importedData);
                            showAlert('Inventory data imported successfully', 'success');
                          } else {
                            showAlert('Invalid import file format');
                          }
                        } catch (error) {
                          showAlert('Error importing data');
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
                
                <button 
                  className="import-btn"
                  onClick={() => {
                    document.getElementById('importFile').click();
                  }}
                >
                  <span className="material-icons">cloud_upload</span>
                  Import Inventory Data
                </button>
                
                <button 
                  className="danger-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all inventory data? This cannot be undone.')) {
                      setInventory([]);
                      showAlert('All inventory data has been cleared', 'success');
                    }
                  }}
                >
                  <span className="material-icons">delete_forever</span>
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="modal-overlay">
          <div className="modal qr-modal">
            <div className="modal-header">
              <h3>QR Code for {currentQRItemName}</h3>
              <button 
                className="close-btn" 
                onClick={() => setShowQRModal(false)}
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="qr-container">
                <img src={currentQRUrl} alt="QR Code" className="qr-image" />
              </div>
              <p className="qr-instructions">
                Scan this QR code with the app to quickly access this item
              </p>
              <div className="qr-actions">
                <a 
                  href={currentQRUrl} 
                  download={`qr-${currentQRItemName.replace(/\s+/g, '-').toLowerCase()}.png`}
                  className="download-btn"
                >
                  <span className="material-icons">download</span>
                  Download QR
                </a>
                <button 
                  className="print-btn"
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Print QR Code</title>
                          <style>
                            body { 
                              font-family: Arial, sans-serif;
                              text-align: center;
                            }
                            .print-container {
                              max-width: 400px;
                              margin: 20px auto;
                              padding: 20px;
                              border: 1px solid #ddd;
                            }
                            img {
                              max-width: 300px;
                              height: auto;
                            }
                            h2 {
                              margin-bottom: 5px;
                            }
                            p {
                              color: #666;
                              margin-top: 5px;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="print-container">
                            <h2>${currentQRItemName}</h2>
                            <img src="${currentQRUrl}" alt="QR Code" />
                            <p>Scan with QR Inventory Pro</p>
                          </div>
                          <script>
                            window.onload = function() {
                              window.print();
                              window.onfocus = function() { window.close(); }
                            }
                          </script>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                  }}
                >
                  <span className="material-icons">print</span>
                  Print QR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;