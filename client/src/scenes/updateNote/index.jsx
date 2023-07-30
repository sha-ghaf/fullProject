import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import UpdateNoteWidget from "scenes/widgets/UpdateNoteWidget";
import GetNoteByIdWidget from "scenes/widgets/GetNoteByIdWidgets";
import UserWidget from "scenes/widgets/UserWidget";

const UpdateNote = () => {
    const { noteId } = useParams();
    const token = useSelector((state) => state.token);
    const { _id, picturePath } = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    console.log(noteId)
    return(
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                    <Box m="2rem 0" />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <UpdateNoteWidget picturePath={picturePath} noteId={noteId}/>
                    <Box m="2rem 0" />
                    {/**/}<GetNoteByIdWidget noteId={noteId} />
                </Box>
            </Box>
        </Box>
    )
}

export default UpdateNote;