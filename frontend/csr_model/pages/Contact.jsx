import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  Avatar,
  useTheme,
  Fade,
  Slide,
  Zoom,
  Chip,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
  InputAdornment
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  LinkedIn,
  Twitter,
  GitHub,
  WhatsApp,
  Message
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Contact = () => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [windowHeight, setWindowHeight] = useState(0);

  // Track window height for full height layouts
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSnackbarMessage('Your message has been sent successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Responsive icon sizes
  const getIconSize = () => {
    if (isXSmall) return "small";
    if (isMobile) return "medium";
    return "large";
  };

  // Responsive spacing
  const getSpacing = (mobile, tablet, desktop) => {
    if (isXSmall) return mobile * 0.75;
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const contactMethods = [
    {
      icon: <Email fontSize={getIconSize()} />,
      title: "Email Us",
      details: ["support@company.com", "sales@company.com"],
      color: theme.palette.primary.main,
      action: "mailto:support@company.com"
    },
    {
      icon: <Phone fontSize={getIconSize()} />,
      title: "Call Us",
      details: ["+1 (800) 123-4567", "Mon-Fri, 9am-5pm EST"],
      color: theme.palette.success.main,
      action: "tel:+18001234567"
    },
    {
      icon: <LocationOn fontSize={getIconSize()} />,
      title: "Visit Us",
      details: ["GLA UNIVERSITY, MATHURA"],
      color: theme.palette.warning.main,
      action: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    { icon: <LinkedIn fontSize={isMobile ? "small" : "medium"} />, name: "LinkedIn", url: "#" },
    { icon: <Twitter fontSize={isMobile ? "small" : "medium"} />, name: "Twitter", url: "#" },
    { icon: <GitHub fontSize={isMobile ? "small" : "medium"} />, name: "GitHub", url: "#" },
    { icon: <WhatsApp fontSize={isMobile ? "small" : "medium"} />, name: "WhatsApp", url: "#" }
  ];

  // Responsive font sizes
  const getFontSize = (base, scaleFactor = 0.2) => {
    if (isXSmall) return `${base * (1 - scaleFactor * 2)}rem`;
    if (isMobile) return `${base * (1 - scaleFactor)}rem`;
    if (isTablet) return `${base}rem`;
    if (isLaptop) return `${base * (1 + scaleFactor)}rem`;
    return `${base * (1 + scaleFactor * 2)}rem`;
  };

  return (
    <Box sx={{ 
      py: getSpacing(3, 6, 10),
      px: getSpacing(1, 2, 0),
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        {/* Responsive Header */}
        <Box textAlign="center" mb={getSpacing(3, 5, 8)}>
          <Slide in={true} direction="down" timeout={500}>
            <Typography 
              variant={isMobile ? "h3" : isTablet ? "h2" : "h1"} 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: getFontSize(isXSmall ? 1.6 : isMobile ? 2 : isTablet ? 2.5 : 3)
              }}
            >
              Let's Connect
            </Typography>
          </Slide>
          <Fade in={true} timeout={800}>
            <Typography 
              variant={isMobile ? "body1" : "h5"} 
              color="text.secondary" 
              maxWidth="md"
              mx="auto"
              sx={{
                fontSize: getFontSize(isXSmall ? 0.8 : isMobile ? 0.9 : isTablet ? 1.1 : 1.2),
                px: getSpacing(2, 1, 0)
              }}
            >
              We're excited to hear from you! Whether you have questions, feedback, or partnership opportunities, our team is ready to help.
            </Typography>
          </Fade>
        </Box>

        <Grid container spacing={getSpacing(3, 4, 6)}>
          {/* Contact Methods - Stack on mobile */}
          <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <Grid container spacing={getSpacing(2, 3, 4)}>
              {contactMethods.map((method, index) => (
                <Grid item xs={12} sm={isMobile ? 12 : isTablet ? 4 : 12} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Paper 
                      elevation={isMobile ? 2 : 3} 
                      sx={{ 
                        p: getSpacing(2, 3, 4),
                        borderRadius: getSpacing(2, 3, 4),
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: isMobile ? 'none' : 'translateY(-5px)',
                          boxShadow: isMobile ? 'none' : '0 10px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex',
                          flexDirection: isTablet && !isMobile ? 'column' : 'row',
                          alignItems: isTablet && !isMobile ? 'center' : 'flex-start',
                          mb: getSpacing(1, 2, 3)
                        }}
                      >
                        <Avatar sx={{ 
                          bgcolor: `${method.color}20`,
                          color: method.color,
                          width: isXSmall ? 40 : isMobile ? 48 : isTablet ? 54 : 60,
                          height: isXSmall ? 40 : isMobile ? 48 : isTablet ? 54 : 60,
                          mr: isTablet && !isMobile ? 0 : getSpacing(1, 2, 3),
                          mb: isTablet && !isMobile ? 2 : 0
                        }}>
                          {method.icon}
                        </Avatar>
                        <Typography 
                          variant={isXSmall ? "subtitle1" : isMobile ? "h6" : isTablet ? "subtitle1" : "h5"} 
                          fontWeight={700}
                          align={isTablet && !isMobile ? "center" : "left"}
                        >
                          {method.title}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        ml: isTablet && !isMobile ? 0 : getSpacing(6, 7, 9),
                        textAlign: isTablet && !isMobile ? "center" : "left"
                      }}>
                        {method.details.map((detail, i) => (
                          <Typography 
                            key={i} 
                            color="text.secondary" 
                            paragraph
                            sx={{ 
                              mb: 1,
                              fontSize: getFontSize(isXSmall ? 0.7 : isMobile ? 0.8 : 0.9, 0.1)
                            }}
                          >
                            {detail}
                          </Typography>
                        ))}
                        <Button 
                          variant="outlined" 
                          href={method.action}
                          size={isMobile ? "small" : "medium"}
                          sx={{ 
                            mt: 1,
                            borderColor: method.color,
                            color: method.color,
                            '&:hover': {
                              backgroundColor: `${method.color}10`,
                              borderColor: method.color
                            },
                            fontSize: getFontSize(isXSmall ? 0.7 : isMobile ? 0.75 : 0.8, 0.1)
                          }}
                        >
                          Contact via {method.title.split(' ')[0]}
                        </Button>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Social Links */}
            <Fade in={true} timeout={1500}>
              <Box sx={{ mt: getSpacing(3, 4, 6), textAlign: 'center' }}>
                <Typography 
                  variant={isXSmall ? "body1" : isMobile ? "subtitle1" : "h6"} 
                  mb={getSpacing(1, 1.5, 2)}
                >
                  Follow Us On Social Media
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  justifyContent: 'center', 
                  gap: getSpacing(0.5, 0.75, 1) 
                }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: isMobile ? 1 : 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          bgcolor: 'background.paper',
                          width: isXSmall ? 36 : isMobile ? 44 : isTablet ? 50 : 56,
                          height: isXSmall ? 36 : isMobile ? 44 : isTablet ? 50 : 56,
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText'
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Contact Form - Top on mobile */}
          <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
            <Zoom in={true} timeout={800}>
              <Paper 
                elevation={isMobile ? 2 : isTablet ? 4 : 6} 
                sx={{ 
                  p: getSpacing(2, 4, 6), 
                  borderRadius: getSpacing(2, 3, 4),
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(145deg, #1E1E1E 0%, #2C2C2C 100%)' 
                    : 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)',
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: isMobile ? 'none' : '0 15px 30px -10px rgba(0,0,0,0.1)'
                }}
              >
                <Box sx={{ mb: getSpacing(2, 3, 4), textAlign: 'center' }}>
                  <Chip 
                    label="We usually respond within 24 hours" 
                    color="primary" 
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{ mb: getSpacing(1, 1.5, 2) }}
                  />
                  <Typography 
                    variant={isXSmall ? "h6" : isMobile ? "h5" : isTablet ? "h5" : "h4"} 
                    fontWeight={700} 
                    gutterBottom
                  >
                    Send Us a Message
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    variant={isXSmall ? "caption" : isMobile ? "body2" : "body1"}
                    sx={{ 
                      fontSize: getFontSize(isXSmall ? 0.7 : isMobile ? 0.8 : 0.9, 0.1),
                      px: getSpacing(1, 0, 0)
                    }}
                  >
                    Fill out the form below and we'll get back to you as soon as possible
                  </Typography>
                </Box>

                <Divider sx={{ my: getSpacing(2, 3, 4) }} />

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={getSpacing(1.5, 2, 3)}>
                    <Grid item xs={12} sm={6}>
                      <motion.div
                        whileFocus={{ scale: isMobile ? 1 : 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData.firstName}
                          onChange={handleChange}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                          InputProps={{
                            sx: { borderRadius: getSpacing(1, 1.5, 2) }
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <motion.div
                        whileFocus={{ scale: isMobile ? 1 : 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData.lastName}
                          onChange={handleChange}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                          InputProps={{
                            sx: { borderRadius: getSpacing(1, 1.5, 2) }
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div
                        whileFocus={{ scale: isMobile ? 1 : 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            sx: { borderRadius: getSpacing(1, 1.5, 2) }
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div
                        whileFocus={{ scale: isMobile ? 1 : 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <TextField
                          fullWidth
                          label="Subject (Optional)"
                          name="subject"
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData.subject}
                          onChange={handleChange}
                          InputProps={{
                            sx: { borderRadius: getSpacing(1, 1.5, 2) }
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div
                        whileFocus={{ scale: isMobile ? 1 : 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          multiline
                          minRows={2}
                          maxRows={3}
                          InputProps={{
                            sx: { 
                              borderRadius: getSpacing(1, 1.5, 2),
                              paddingRight: '4px'
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="send message"
                                  color="primary"
                                  sx={{
                                    my: 0.5,
                                    p: 1.5,
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                    color: '#fff',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                    '&:hover': {
                                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
                                    }
                                  }}
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  <Send fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div
                        whileHover={{ scale: isMobile ? 1 : 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size={isMobile ? "medium" : "large"}
                          fullWidth
                          endIcon={<Send />}
                          disabled={isSubmitting}
                          sx={{ 
                            py: isXSmall ? 0.75 : isMobile ? 1 : isTablet ? 1.5 : 2,
                            borderRadius: getSpacing(1, 1.5, 2),
                            fontWeight: 700,
                            fontSize: getFontSize(isXSmall ? 0.8 : isMobile ? 0.9 : 1, 0.1),
                            background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            boxShadow: `0 4px 15px ${theme.palette.primary.light}`,
                            '&:hover': {
                              boxShadow: `0 6px 20px ${theme.palette.primary.light}`
                            }
                          }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>
      </Container>

      {/* Responsive Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ 
          vertical: isMobile ? 'bottom' : 'bottom',
          horizontal: isMobile ? 'center' : 'right'
        }}
        sx={{
          width: isXSmall ? '90%' : isMobile ? '80%' : 'auto',
          '& .MuiPaper-root': {
            width: isXSmall ? '100%' : 'auto'
          }
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;