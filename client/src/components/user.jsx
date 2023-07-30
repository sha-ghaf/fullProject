import { Box, FormControl, IconButton, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { DeleteForeverRounded, EditNote, ManageAccountsOutlined, PersonRemoveOutlined } from "@mui/icons-material";
//import { useEffect, useState } from "react";

const User = ({ 
    name, 
    subtitle, 
    userPicturePath, 
    noteId , 
    userId, 
    isUsersList=false, 
    isDeleteNote=false
}) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const primaryDark = palette.primary.dark;
    const neutralLight = palette.neutral.light;
    const deleteUser = async (_id) => {
        const response = await fetch(
            `http://localhost:5000/user/${_id}`,
            {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        console.log(data)
        window.location.reload()
    };
    const deleteNote = async (_id) => {
        console.log(_id)
        const response = await fetch(
            `http://localhost:5000/note/${_id}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        console.log(data)
        window.location.reload()
    };
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${userId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            { isUsersList ? (
                <FormControl variant="standard" >
                    <Select
                        sx={{
                            backgroundColor: neutralLight,
                            width: "2rem",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "2rem",
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight,
                            },
                        }}
                    >
                        <MenuItem 
                            onClick={() => {
                                navigate(`/profile/${userId}`);
                                navigate(0);
                            }}
                        >
                            <Typography>
                                <ManageAccountsOutlined sx={{ color: primaryDark }}/>
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={ () => deleteUser(userId) }
                        >
                            <Typography color={main} fontWeight="500">
                                <PersonRemoveOutlined sx={{ color: primaryDark }} />
                            </Typography>
                        </MenuItem>
                        <MenuItem 
                            onClick={() => {
                                navigate(`/updateUser/${userId}`);
                                navigate(0);
                            }}
                        >
                            <Typography color={main} fontWeight="500">
                                <EditNote sx={{ color: primaryDark }}/>
                            </Typography>
                        </MenuItem>
                    </Select>
                </FormControl>
            ) : (
                <f>
                    {isDeleteNote ? (
                        <FormControl variant="standard" >
                            <Select
                                value='Delete'
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "170px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                            >
                                <MenuItem value='Delete'>
                                    <Typography>Delete & Update</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => deleteNote(noteId) }
                                >
                                    <FlexBetween gap='10px'>
                                        <Typography>Delete Note</Typography>
                                        <Typography color={main} fontWeight="500">
                                            <DeleteForeverRounded/>
                                        </Typography>
                                    </FlexBetween>
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        navigate(`/updateNote/${noteId}`);
                                        navigate(0);
                                    }}
                                >
                                    <FlexBetween gap='10px'>
                                        <Typography>Update Note</Typography>
                                        <Typography color={main} fontWeight="500">
                                            <EditNote />
                                        </Typography>
                                    </FlexBetween>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    ) : (
                        <Box
                            onClick={() => {
                                navigate(`/updateNote/${noteId}`);
                                navigate(0);
                            }}
                        >
                        <Typography color={main} fontWeight="500">
                            <EditNote />
                        </Typography>
                        </Box>
                    )}
                </f>
            )}
        </FlexBetween>
    );
};

export default User;