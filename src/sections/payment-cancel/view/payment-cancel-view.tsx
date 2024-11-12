import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cancel } from '@mui/icons-material';
import { Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';

export const PaymentCanceledView: React.FC = () => {
    const navigate = useNavigate();

    // Handler to redirect the user back to the home or orders page
    const handleGoHome = () => {
        navigate('/'); // Change this path to your desired home or orders page
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f6f6f6"
            padding={3}
        >
            <Card sx={{ maxWidth: 600, width: '90%', boxShadow: 5, borderRadius: 3, padding: 4 }}>
                <CardContent sx={{ textAlign: 'center', padding: 4 }}>
                    <Cancel style={{ fontSize: 80, color: '#f44336', marginBottom: '15px' }} />
                    
                    <Typography variant="h4" gutterBottom>
                        Payment Canceled
                    </Typography>
                    
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Your payment has been canceled. If this was a mistake, please try again.
                    </Typography>
                    
                    <Box marginY={4}>
                        <Typography variant="h6">
                            Transaction Details
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Transaction ID: <strong>123456789</strong>
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Amount Attempted: <strong>$99.99</strong>
                        </Typography>
                    </Box>
                </CardContent>
                
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleGoHome}
                        size="large"
                    >
                        Go to Home
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default PaymentCanceledView;