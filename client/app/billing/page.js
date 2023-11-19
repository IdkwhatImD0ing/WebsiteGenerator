"use client";
import TopBar from "../topbar";
import { Box } from "@mui/material";
import { Typography } from '@mui/material';


export default function Page() {
    return (
        <div>
            <TopBar />
            <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h2" margin={5}>
                    Find a plan that's right for you
                </Typography>

                <Box width="90%" display="flex" flexDirection="row" justifyContent="space-around">
                    <Box width={300} height={500} display="flex" flexDirection="column" border="2px solid black">
                        <Typography variant="h4" margin={5}>
                            FREE
                        </Typography>
                        <Typography variant="h4" margin={5}>
                            $0/month
                        </Typography>
                        <Typography variant="h4" margin={5}>
                            1 website
                        </Typography>
                    </Box>
                    <Box width={300} height={500} display="flex" flexDirection="column" border="2px solid black">
                        <Typography variant="h4" margin={5}>
                            CASUAL
                        </Typography>
                        <Typography variant="h4" margin={5}>
                            $1/month
                        </Typography>
                        <Typography variant="h4" margin={5}>
                            5 website
                        </Typography>
                    </Box>
                    <Box width={300} height={500} display="flex" flexDirection="column" border="2px solid black">
                        <Typography variant="h4" margin={5}>
                            PRO
                        </Typography>
                        <Typography variant="h4" margin={5}>
                            $5/month
                        </Typography>
                        <Typography variant="h4" margin={5}>
                            Unlimited websites
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}