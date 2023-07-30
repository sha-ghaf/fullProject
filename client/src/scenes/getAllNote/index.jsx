import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import DeleteNoteWidget from "scenes/widgets/DeleteNoteWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, roles } = useSelector((state) => state.user);
    const isAdminOrManager = roles === "Admin" || roles === "Manager"
    //console.log(roles)
    //console.log('3456')
    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={"block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    { isAdminOrManager && (
                        <DeleteNoteWidget userId={_id} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;