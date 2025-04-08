import React from 'react';

const Features = () => {
  const styles = {
    section: {
      padding: '64px 0',
      backgroundColor: '#f9f9f9',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '16px',
    },
    sectionSubtitle: {
      fontSize: '18px',
      textAlign: 'center',
      color: '#666',
      maxWidth: '700px',
      margin: '0 auto 48px',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      '@media (min-width: 600px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (min-width: 960px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
    cardWrapper: {
      display: 'flex',
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      width: '100%',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80px',
      height: '80px',
      backgroundColor: '#3f51b5',
      color: 'white',
      borderRadius: '50%',
      marginBottom: '24px',
      fontSize: '28px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '16px',
      textAlign: 'center',
    },
    description: {
      fontSize: '16px',
      color: '#666',
      textAlign: 'center',
      margin: 0,
    },
  };

  const features = [
    {
      icon: "⚡",
      title: "Blazing Fast Performance",
      description: "Optimized algorithms deliver results in milliseconds, even with large datasets."
    },
    {
      icon: "🔒",
      title: "Enterprise-Grade Security",
      description: "End-to-end encryption and SOC 2 compliant infrastructure."
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Real-time dashboards with customizable reporting tools."
    },
    {
      icon: "🔌",
      title: "Seamless Integrations",
      description: "Connect with 100+ popular tools via our API and native integrations."
    },
    {
      icon: "🛠️",
      title: "24/7 Priority Support",
      description: "Dedicated support team with average response time under 15 minutes."
    },
    {
      icon: "🚀",
      title: "Scalable Architecture",
      description: "Built to grow with your business, handling millions of users effortlessly."
    }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Powerful Features</h2>
        <p style={styles.sectionSubtitle}>
          Everything you need to streamline operations and drive growth.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px',
          '@media (min-width: 600px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (min-width: 960px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        }}>
          {features.map((feature, index) => (
            <div style={styles.cardWrapper} key={index}>
              <div 
                style={styles.card}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={styles.iconContainer}>{feature.icon}</div>
                <h3 style={styles.title}>{feature.title}</h3>
                <p style={styles.description}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;