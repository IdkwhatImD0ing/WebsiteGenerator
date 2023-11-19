'use client';
import { Box, Pagination, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
    const [version, setVersion] = useState(1);
    const [versionsList, setVersionsList] = useState([]);

    useEffect(() => {
        fetchVersions();
    }, []);

    const fetchVersions = async () => {
        try {
            // const response = await axios.post(
            //     'http://localhost:8000/versions',
            //     {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            // )
            // console.log(response);
            // setVersionsList(response.data);
        } catch (error) {
            console.error('Error fetching versions:', error);
        }
    };

    const handleChange = (event, value) => {
        setVersion(value);
    };

    return (
        <Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
            <Box
            width="50vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            >
                <Pagination count={10} page={version} onChange={handleChange} />
                <Typography variant='h2'>Version {version}</Typography>
            </Box>
        </Box>
    );
}
