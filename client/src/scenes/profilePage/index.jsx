import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import MyNoteWidget from "scenes/widgets/MyNoteWidget";
import NotesWidget from "scenes/widgets/NotesWidget";
import UserWidget from "scenes/widgets/UserWidget";
import UsersListWidget from "scenes/widgets/UsersListWidgets";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { roles } = useSelector((state) => state.user);
    const isAdminOrManager = roles === "Admin" || roles === "Manager"
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    if (!user) return null;
    console.log(user.data)
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.data.picturePath} isProfile />
                    <Box m="2rem 0" />
                    { isAdminOrManager && (
                        <UsersListWidget userId={userId} />
                    )}
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyNoteWidget picturePath={user.data.picturePath} />
                    <Box m="2rem 0" />
                    <NotesWidget />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage;