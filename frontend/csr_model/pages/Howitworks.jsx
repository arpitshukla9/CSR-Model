import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent, 
  Paper,
  Avatar,
  Button,
  useTheme
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  Dashboard,
  ThumbUp,
  ArrowForward
} from '@mui/icons-material';

const steps = [
  {
    label: 'Create Your Account',
    description: 'Sign up in 30 seconds with just your email address.',
    icon: <AccountCircle />
  },
  {
    label: 'Configure Settings',
    description: 'Customize preferences to match your workflow needs.',
    icon: <Settings />
  },
  {
    label: 'Connect Your Data',
    description: 'Import existing data or connect to live sources via API.',
    icon: <Dashboard />
  },
  {
    label: 'Start Optimizing',
    description: 'Our AI begins analyzing and improving your processes immediately.',
    icon: <ThumbUp />
  }
];

const HowItWorks = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      py: 10,
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`
    }}>
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 800,
            mb: 3,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          How It Works
        </Typography>
        
        <Typography 
          variant="h5" 
          align="center" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 8, maxWidth: 700, mx: 'auto' }}
        >
          Get started in minutes and see results immediately
        </Typography>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 8 }}>
          <Stepper orientation="vertical" activeStep={-1}>
            {steps.map((step, index) => (
              <Step key={step.label} active={true} completed={false}>
                <StepLabel 
                  StepIconComponent={() => (
                    <Avatar sx={{ 
                      width: 48,
                      height: 48,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }}>
                      {step.icon}
                    </Avatar>
                  )}
                  sx={{ 
                    '& .MuiStepLabel-label': { 
                      fontWeight: 600,
                      fontSize: '1.2rem',
                      color: theme.palette.text.primary
                    } 
                  }}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 2,
                      pl: 6,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {step.description}
                  </Typography>
                  {index < steps.length - 1 && (
                    <Box sx={{ height: 30 }} /> // Spacer
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Ready to get started?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join thousands of businesses already optimizing with our platform
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1rem',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 4px 15px ${theme.palette.primary.light}`,
              '&:hover': {
                boxShadow: `0 6px 20px ${theme.palette.primary.light}`
              }
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;