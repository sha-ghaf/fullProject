import { Box, Typography, useTheme } from "@mui/material";
import User from "components/user";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";

const DeleteNoteWidget = ({ userId }) => {
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const main = palette.neutral.main;
    const [notes,setNotes] = useState([])
    //console.log(notes)
    const getNotes = async () => {
        const response = await fetch("http://localhost:5000/note/A_M", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.data)
            setNotes(data.data.note);
        } else {
            console.error('Failed to fetch notes');
        }
    };
    useEffect(() => {
        getNotes();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Delete Note or Update
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {notes.map((note) => (
                    <d>
                        <User
                            key={note._id}
                            noteId={note._id}
                            userId={note.userId}
                            name={note.userName}
                            subtitle={note.title}
                            userPicturePath={note.userPicturePath}
                            isDeleteNote
                        />
                        <FlexBetween>
                            <Typography color={main} sx={{ mt: "1rem" }}>
                                {note.text}
                            </Typography>
                        </FlexBetween>
                        
                    </d>
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default DeleteNoteWidget;