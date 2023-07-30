import {
    ManageAccountsOutlined,
    EditNote,
    EditOutlined,
    Home,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath, isProfile=false }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const primaryLight = palette.primary.main;

    const getUserById = async () => {
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        //console.log(data)
        setUser(data);
    };
    useEffect(() => {
        getUserById();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    //console.log(user)
    if (!user) {
        return null;
    }
    const {
        username,
        roles,
        active,
    } = user.data;
    const isAdminOrManager = roles == "Admin" || roles == "Manager"
    //console.log(roles)
    //console.log(isAdminOrManager)
    //console.log(active.toString())
    return(
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                                },
                            }}
                        >
                            {username}
                        </Typography>
                        <Typography color={medium}>{roles}</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />
            {/* SECOND ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Is active</Typography>
                    <Typography color={primaryLight} fontWeight="500">
                        {active.toString()}
                    </Typography>
                </FlexBetween>
                { isAdminOrManager && (
                    <f>
                        <FlexBetween
                            onClick={() => navigate(`/updateUser/${userId}`)}
                        >
                            <Typography color={medium} mb='8px'>Update profile</Typography>
                            <Typography color={main} fontWeight="500">
                                <ManageAccountsOutlined />
                            </Typography>
                        </FlexBetween>
                        <FlexBetween
                            onClick={() => navigate(`/getAllNotes`)}
                        >
                            <Typography color={medium}>Get All Users Notes and Delete or Update anything </Typography>
                            <Typography color={main} fontWeight="500">
                                <EditNote />
                            </Typography>
                        </FlexBetween>
                    </f>
                )}
                
            </Box>
            <Divider />
            {/* SECOND ROW */}
            {isProfile && (
                <Box>
                    <Box 
                        p="1rem 0" 
                        onClick={() => navigate(`/home`)}
                    >
                        <FlexBetween mb="0.5rem">
                            <Typography color={medium}>Back to Home Page</Typography>
                            <Typography color={main} fontWeight="500">
                                <Home/>
                            </Typography>
                        </FlexBetween>
                    </Box>
                    <Divider />
                </Box>
            )}
            {/* THIRD ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                            Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    )
}

export default UserWidget;