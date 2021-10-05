import React from 'react';
import BadgeData from './badge.json';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    media: {
        height: 100,
      },
});

export default function Badges() {
    console.log(Badges);
    const classes = useStyles();
    return (
        <>
    <Grid container spacing={2} justifyContent="center">
    {
    BadgeData.map((props) => {
    return (        
        <Card sx={{ minWidth: 275, m: 3 }}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    />
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography variant="body2">
                    {props.award}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    )})
    }</Grid>
        </>
    );
};