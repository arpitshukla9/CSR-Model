import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  useTheme,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Grow,
  Zoom,
  Chip
} from '@mui/material';
import { 
  CheckCircle,
  Star,
  Bolt,
  Diamond
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const pricingPlans = [
  {
    icon: <Bolt color="warning" fontSize="large" />,
    title: 'Starter',
    price: '$299',
    period: '/month',
    description: 'Perfect for small operations',
    features: [
      "Up to 5 users",
      "Basic inventory tracking",
      "Email support",
      "10,000 SKU limit"
    ],
    popular: false,
    color: 'warning'
  },
  {
    icon: <Star color="primary" fontSize="large" />,
    title: 'Professional',
    price: '$599',
    period: '/month',
    description: 'Best for growing businesses',
    features: [
      "Up to 20 users",
      "Advanced analytics",
      "Priority support",
      "100,000 SKU limit",
      "API access"
    ],
    popular: true,
    color: 'primary'
  },
  {
    icon: <Diamond color="secondary" fontSize="large" />,
    title: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions',
    features: [
      "Unlimited users",
      "Dedicated account manager",
      "24/7 support",
      "Unlimited SKUs",
      "Custom integrations"
    ],
    popular: false,
    color: 'secondary'
  }
];

const Pricing = () => {
  const theme = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box sx={{
      py: 10,
      background: theme.palette.mode === 'dark' 
        ? 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)' 
        : 'radial-gradient(circle at center, #f9f9f9 0%, #e0e0e0 100%)'
    }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Fade in timeout={800}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Choose Your Plan
            </Typography>
          </Fade>
          <Zoom in timeout={1000}>
            <Typography 
              variant="h6" 
              color="text.secondary"
              maxWidth="md"
              mx="auto"
            >
              Flexible pricing designed to scale with your business needs
            </Typography>
          </Zoom>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in timeout={500 + index * 200}>
                <motion.div
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card 
                    sx={{
                      height: '100%',
                      position: 'relative',
                      overflow: 'visible',
                      border: `1px solid ${theme.palette.divider}`,
                      background: theme.palette.background.paper,
                      boxShadow: hoveredCard === index 
                        ? `0 20px 40px -10px ${theme.palette[plan.color].light}`
                        : '0 8px 16px -5px rgba(0,0,0,0.1)',
                      transform: hoveredCard === index ? 'translateY(-5px)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {plan.popular && (
                      <Box sx={{
                        position: 'absolute',
                        top: -15,
                        right: 20,
                        px: 2,
                        py: 0.5,
                        bgcolor: theme.palette[plan.color].main,
                        color: theme.palette[plan.color].contrastText,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        boxShadow: `0 4px 12px ${theme.palette[plan.color].light}`
                      }}>
                        MOST POPULAR
                      </Box>
                    )}
                    
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box textAlign="center" mb={3}>
                        <Avatar sx={{
                          width: 80,
                          height: 80,
                          bgcolor: `${theme.palette[plan.color].light}20`,
                          color: theme.palette[plan.color].main,
                          mx: 'auto',
                          mb: 3
                        }}>
                          {plan.icon}
                        </Avatar>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                          {plan.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          {plan.description}
                        </Typography>
                      </Box>

                      <Box textAlign="center" my={3}>
                        <Typography 
                          variant="h2" 
                          component="div" 
                          sx={{ 
                            fontWeight: 800,
                            color: theme.palette[plan.color].main
                          }}
                        >
                          {plan.price}
                          <Typography 
                            component="span" 
                            variant="h5" 
                            color="text.secondary"
                          >
                            {plan.period}
                          </Typography>
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <List dense sx={{ mb: 4, flexGrow: 1 }}>
                        {plan.features.map((feature, idx) => (
                          <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircle color={plan.color} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature} 
                              primaryTypographyProps={{ variant: 'body1' }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          fullWidth
                          variant={plan.popular ? 'contained' : 'outlined'}
                          color={plan.color}
                          size="large"
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 700,
                            fontSize: '1rem',
                            mt: 'auto',
                            ...(plan.popular && {
                              background: `linear-gradient(45deg, ${theme.palette[plan.color].main} 0%, ${theme.palette[plan.color].dark} 100%)`,
                              boxShadow: `0 4px 15px ${theme.palette[plan.color].light}`
                            })
                          }}
                        >
                          {plan.title === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grow>
            </Grid>
          ))}
        </Grid>

        <Fade in timeout={1500}>
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Need help choosing the right plan?
            </Typography>
            <Button 
              variant="text" 
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              Compare all features
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Pricing;