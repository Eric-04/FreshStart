import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Container, CircularProgress } from '@mui/material';
import './Layout.css'; // Import the CSS file

const Organization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        // Simulate a network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = [
          { id: 1, name: 'The Salvation Army of Connecticut and Rhode Island', street: '123 Main St', city: 'Providence', openingTime: '9:00 AM', closingTime: '5:00 PM', image: '/food-market.jpg' },
          { id: 2, name: 'Federal Hill House (FHH)', street: '456 Elm St', city: 'Providence', openingTime: '10:00 AM', closingTime: '6:00 PM', image: '/food-market.jpg' },
          { id: 3, name: 'Maranatha Food Pantry Of Church Of God', street: '789 Oak St', city: 'Providence', openingTime: '8:00 AM', closingTime: '4:00 PM', image: '/food-market.jpg' },
        ];

        setOrganizations(data);
      } catch (error) {
        setError('Failed to fetch organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container className="organization-container"> {/* Apply the CSS class */}
      <Typography className="organization-text white-text" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        After Selecting Your Restaurant, Please Deliver To Any Of The Following Organizations
      </Typography>
      <Grid container spacing={3}>
        {organizations.map((org) => (
          <Grid item xs={12} sm={6} md={4} key={org.id}>
            <Card raised>
              <CardMedia
                component="img"
                height="140"
                image={org.image}
                alt={`${org.name} logo`}
              />
              <CardContent>
                <Typography className="white-text" variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {org.name}
                </Typography>
                <Typography className="white-text" variant="body2" sx={{ fontWeight: 'bold' }}>
                  {org.street}
                </Typography>
                <Typography className="white-text" variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {org.city}
                </Typography>
                <Typography className="white-text" variant="body2" sx={{ fontWeight: 'bold' }}>
                  Open: {org.openingTime} - Close: {org.closingTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Organization;
