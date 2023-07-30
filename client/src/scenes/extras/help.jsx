import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

const Message = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { username } = useSelector((state) => state.user);
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
                        Dear {username} 
                    </Typography>
                    <Typography color={medium}>
                    <br/>
                        Life can be a beautiful journey, but it's not without its challenges. 
                        I want you to know that you are not alone, and I'm here to offer you some 
                        guidance and support to help you navigate through the ups and downs.<br/>
                        <br/>
                        First and foremost, remember to be kind to yourself. We all make mistakes, 
                        and that's part of being human. Embrace those moments as opportunities for 
                        growth and learning. Forgive yourself, and let go of any self-criticism that 
                        may hold you back.<br/>
                        <br/>
                        When you encounter obstacles, don't be afraid to ask for help. Reach out to 
                        friends, family, or even professionals who can provide advice and assistance. 
                        There is strength in seeking support, and it's a sign of courage, not weakness.<br/>
                        <br/>
                        Set clear goals for yourself, both short-term and long-term. Break them down 
                        into manageable steps and celebrate each achievement, no matter how small. 
                        These milestones will keep you motivated and focused on your journey.<br/>
                        <br/>
                        Remember to take care of your physical and mental well-being. Make time for 
                        activities that bring you joy and relaxation. Nurture your passions and hobbies, 
                        as they are essential for a balanced and fulfilling life.<br/>
                        <br/>
                        Sometimes life can be overwhelming, and that's okay. Allow yourself to take 
                        breaks and rest when needed. Listen to your body and mind, and practice 
                        self-care regularly.<br/>
                        <br/>
                        Stay open to change and embrace new opportunities. Life is ever-evolving, 
                        and being adaptable will help you thrive in different situations. Trust in 
                        your abilities, and believe in your potential.<br/>
                        <br/>
                        Surround yourself with positive influences and cherish the relationships 
                        that uplift and inspire you. Be there for others as they are there for you, 
                        and remember that human connections are precious.<br/>
                        <br/>
                        Lastly, know that it's okay to seek professional help if you feel overwhelmed, 
                        stressed, or uncertain about your path. Speaking to a therapist or counselor 
                        can provide valuable insights and strategies to cope with life's challenges.<br/>
                        <br/>
                        You are capable, resilient, and worthy of a fulfilling life. Embrace each 
                        day with hope and determination, and remember that your journey is unique 
                        and meaningful.<br/>
                        <br/>
                        I'm here cheering you on, supporting you every step of the way. You've got this!<br/>
                        <br/>
                        With warmest wishes,<br/>
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