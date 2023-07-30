import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "./Forme";
import Navbar from "scenes/navbar";
import UsersListWidget from "scenes/widgets/UsersListWidgets";

const UpdateUser = () => {
    const { _id, picturePath, roles } = useSelector((state) => state.user);
    const { userId } = useParams();
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="4rem"
                justifyContent="space-between"
            >
                <Box
                    width={isNonMobileScreens ? "50%" : "93%"}
                    padding="2rem"
                    //margin="2rem auto"
                    borderRadius="1.5rem"
                    backgroundColor={theme.palette.background.alt}
                >
                    <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                        Update User 
                    </Typography>
                    <Form userId={userId}/>
                </Box>
                <Box
                    width={isNonMobileScreens ? "50%" : "93%"}
                    //flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <UsersListWidget userId={_id} />
                </Box>
            </Box>
            
        </Box>
    );
}

export default UpdateUser;