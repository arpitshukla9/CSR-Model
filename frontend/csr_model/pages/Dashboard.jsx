import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import {
  ArrowUpward,
  ArrowDownward,
  InfoOutlined,
  Visibility,
  TrendingUp,
  Assessment,
  Star,
  GppGood,
  
  GppBad
} from '@mui/icons-material';



const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('quarterly');
  const [vendorData, setVendorData] = useState(null);
  const [csrMetrics, setCsrMetrics] = useState([]);
  const [complianceStatus, setComplianceStatus] = useState([]);
  const [topVendors, setTopVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with skeleton loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Enhanced mock data with more realistic values
        const mockVendorData = {
          totalVendors: 142,
          compliantVendors: 98,
          nonCompliantVendors: 12,
          underReview: 32,
          averageScore: 82.5,
          improvement: 4.2,
          previousScore: 79.1
        };

        const mockCsrMetrics = [
          { name: 'Environmental', value: 78, trend: 2.1 },
          { name: 'Social', value: 85, trend: 1.4 },
          { name: 'Governance', value: 76, trend: -0.8 },
          { name: 'Ethical Sourcing', value: 89, trend: 3.2 },
          { name: 'Community Impact', value: 81, trend: 1.7 }
        ];

        const mockComplianceStatus = [
          { status: 'Fully Compliant', value: 98, color: theme.palette.success.main },
          { status: 'Partially Compliant', value: 32, color: theme.palette.warning.main },
          { status: 'Non-Compliant', value: 12, color: theme.palette.error.main }
        ];

        const mockTopVendors = [
          { id: 1, name: 'GreenTech Solutions', score: 95, category: 'Environmental', trend: 'up' },
          { id: 2, name: 'FairSource Inc.', score: 93, category: 'Ethical Sourcing', trend: 'up' },
          { id: 3, name: 'Community First', score: 91, category: 'Community Impact', trend: 'steady' },
          { id: 4, name: 'EqualWork Co.', score: 89, category: 'Social', trend: 'up' },
          { id: 5, name: 'Transparent Ltd.', score: 87, category: 'Governance', trend: 'down' }
        ];

        setVendorData(mockVendorData);
        setCsrMetrics(mockCsrMetrics);
        setComplianceStatus(mockComplianceStatus);
        setTopVendors(mockTopVendors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange, theme]);

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <Typography variant="subtitle2" gutterBottom>
            {payload[0].payload.name}
          </Typography>
          <Typography>
            Score: <strong>{payload[0].value}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Trend: {payload[0].payload.trend > 0 ? '+' : ''}{payload[0].payload.trend}%
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          CSR Vendor Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Select time period for data">
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
          
          <Tooltip title="View dashboard documentation">
            <IconButton color="primary">
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ 
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Assessment color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="subtitle2">
                  Total Vendors
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {vendorData.totalVendors}
              </Typography>
              <Chip 
                label={`${vendorData.underReview} under review`} 
                size="small" 
                variant="outlined" 
                color="info"
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ 
            borderLeft: `4px solid ${theme.palette.success.main}`,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GppGood color="success" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="subtitle2">
                  Compliant Vendors
                </Typography>
              </Box>
              <Typography variant="h4" color="success.main" sx={{ mb: 1 }}>
                {vendorData.compliantVendors}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {Math.round((vendorData.compliantVendors / vendorData.totalVendors) * 100)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ 
            borderLeft: `4px solid ${theme.palette.error.main}`,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GppBad color="error" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="subtitle2">
                  Non-Compliant
                </Typography>
              </Box>
              <Typography variant="h4" color="error.main" sx={{ mb: 1 }}>
                {vendorData.nonCompliantVendors}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {Math.round((vendorData.nonCompliantVendors / vendorData.totalVendors) * 100)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ 
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp color="warning" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="subtitle2">
                  Avg. CSR Score
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mr: 1 }}>
                  {vendorData.averageScore}
                </Typography>
                {vendorData.improvement >= 0 ? (
                  <ArrowUpward color="success" fontSize="small" />
                ) : (
                  <ArrowDownward color="error" fontSize="small" />
                )}
                <Typography 
                  variant="subtitle2" 
                  color={vendorData.improvement >= 0 ? "success.main" : "error.main"}
                >
                  {Math.abs(vendorData.improvement)}%
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Previous: {vendorData.previousScore}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  CSR Performance by Category
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={csrMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: theme.palette.text.primary }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fill: theme.palette.text.primary }}
                  />
                  <RechartsTooltip 
                    content={<CustomTooltip />} 
                    cursor={{ fill: theme.palette.action.hover }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="CSR Score" 
                    radius={[4, 4, 0, 0]}
                  >
                    {csrMetrics.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GppGood color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Compliance Status
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={complianceStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="status"
                  >
                    {complianceStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value, name, props) => [
                      value, 
                      `${name} (${Math.round((value / vendorData.totalVendors) * 100)}%)`
                    ]}
                  />
                  <Legend 
                    layout={isMobile ? 'horizontal' : 'vertical'} 
                    verticalAlign={isMobile ? 'bottom' : 'middle'} 
                    align="right"
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Top Vendors Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Star color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Top Performing Vendors
                </Typography>
              </Box>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Vendor</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">CSR Score</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Category Strength</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Trend</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topVendors.map((vendor) => (
                      <TableRow 
                        key={vendor.id}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography fontWeight="medium">{vendor.name}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box 
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: vendor.score >= 90 
                                ? theme.palette.success.light 
                                : vendor.score >= 75 
                                  ? theme.palette.warning.light 
                                  : theme.palette.error.light,
                              color: theme.palette.getContrastText(
                                vendor.score >= 90 
                                  ? theme.palette.success.light 
                                  : vendor.score >= 75 
                                    ? theme.palette.warning.light 
                                    : theme.palette.error.light
                              ),
                              fontWeight: 'bold'
                            }}
                          >
                            {vendor.score}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={vendor.category} 
                            size="small" 
                            sx={{ 
                              backgroundColor: theme.palette.grey[200],
                              fontWeight: 'medium'
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {vendor.trend === 'up' ? (
                            <ArrowUpward color="success" />
                          ) : vendor.trend === 'down' ? (
                            <ArrowDownward color="error" />
                          ) : (
                            <Typography color="textSecondary">—</Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View details">
                            <IconButton color="primary" size="small">
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;