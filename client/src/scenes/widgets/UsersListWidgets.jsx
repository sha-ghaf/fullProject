import { Box, Typography, useTheme } from "@mui/material";
import User from "components/user";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersListWidget = ({ userId, isUpdate=false }) => {
    //const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    console.log(users)
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    //const users = useSelector((state) => state.user);
    const getUsers = async () => {
        const response = await fetch(
            `http://localhost:5000/user`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.data)
            setUsers(data.data.users);
        } else {
            console.error('Failed to fetch notes');
        }
    };
    useEffect(() => {
        getUsers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Users List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {users.map((user) => (
                    <User
                        key={user._id}
                        userId={user._id}
                        name={user.username}
                        subtitle={user.active.toString()}
                        userPicturePath={user.picturePath}
                        isUsersList
                        is
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default UsersListWidget;