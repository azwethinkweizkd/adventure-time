import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Badges from '../Badges';

const BadgeDashboard = () => {

    return (
        <Grid item xs={6}>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: 'lightblue', height: '100vh' }}>
                        <Typography className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#404040', fontFamily: 'JetBrains Mono' }} align="center">
                            Your Collected Badges
                        </Typography>
                            <Badges />
                    </Box>
                </Container>
            </React.Fragment>
        </Grid>
    )
};

export default BadgeDashboard;