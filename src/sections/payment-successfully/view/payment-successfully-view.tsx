import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { CheckCircle } from '@mui/icons-material'; // Assuming you're using Material UI
import { Box, Card, Button, Typography, CardContent, CardActions } from '@mui/material';

export const PaymentSuccessfullyView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [orderCode, setOrderCode] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const orderCodeFromUrl = params.get('orderCode');
        
        if (orderCodeFromUrl) {
            setOrderCode(orderCodeFromUrl);
        }
    }, [location]);

    const handleGoHome = () => {
        navigate('/'); 
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
                    <CheckCircle style={{ fontSize: 90, color: '#4caf50', marginBottom: '15px' }} />
                    
                    <Typography variant="h5" gutterBottom>
                        Payment Successful!
                    </Typography>
                    
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Thank you for your purchase. Your payment has been processed successfully.
                    </Typography>
                    
                    <Box marginY={2}>
                        <Typography variant="subtitle1">
                            Transaction Details
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Order Code: <strong>{orderCode || 'Loading...'}</strong>
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

export default PaymentSuccessfullyView;
