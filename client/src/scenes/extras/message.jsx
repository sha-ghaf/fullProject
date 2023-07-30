import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import WidgetWrapper from "components/WidgetWrapper";

const Message = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { palette } = useTheme();
    const medium = palette.neutral.medium;
    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="3rem"
                justifyContent="space-between"
            >
                <WidgetWrapper flexBasis="71%" mb='3rem' textAlign='center' >
                    <Typography 
                        color="primary" 
                        fontWeight="bold"
                        fontSize="clamp(1rem, 1.5rem, 2rem)"
                    >
                        I hope this message finds you smiling! 
                    </Typography>
                    <Typography color={medium}>
                        <br/>
                        I just wanted to drop by and remind you how incredible you are! Your 
                        uniqueness, your talents, and your kindness make the world a 
                        brighter place. Embrace the wonderful person that you are and never 
                        forget the amazing impact you have on those around you.<br/>
                        <br/>
                        Life may have its ups and downs, but remember that you possess the 
                        strength to overcome any challenge that comes your way. Believe in 
                        yourself, and you'll find that the possibilities are endless.<br/>
                        <br/>
                        Take a moment to appreciate the little things that bring you joy, 
                        for it's these moments that make life truly special. Surround yourself 
                        with positivity, love, and laughter, and you'll see how happiness can 
                        radiate from within you.<br/>
                        <br/>
                        You're on a journey, and every step you take matters. Be proud of 
                        how far you've come, and be excited about where you're headed. 
                        Remember, you are capable of achieving greatness.<br/>
                        <br/>
                        Today, let go of worries, embrace your passions, and find delight in 
                        the simple pleasures. Take a deep breath, and let happiness flow through you.<br/>
                        <br/>
                        Keep shining brightly and spread your positivity to the world! <br/>
                        <br/>
                        Wishing you a day filled with smiles and laughter!<br/>
                        <br/>
                        With warmest regards,<br/>
                    </Typography>
                </WidgetWrapper>
                <Box flexBasis="26%">
                    <AdvertWidget />
                </Box>
            </Box>
        </Box>
    )
}

export default Message;