import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyNoteWidget from "scenes/widgets/MyNoteWidget";
import NotesWidget from "scenes/widgets/NotesWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import UsersListWidgets from "scenes/widgets/UsersListWidgets";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath, roles } = useSelector((state) => state.user);
    const isAdminOrManager = roles === "Admin" || roles === "Manager"
    //console.log(roles)
    //console.log('3456')
    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyNoteWidget picturePath={picturePath} />
                    <NotesWidget userId={_id} />
                </Box>
            {isNonMobileScreens && (
                <Box flexBasis="26%">
                    <AdvertWidget />
                    <Box m="2rem 0" />
                    { isAdminOrManager && (
                        <UsersListWidgets userId={_id} />
                    )}{/**/}
                </Box>
            )}
            </Box>
        </Box>
    )
}

export default HomePage;