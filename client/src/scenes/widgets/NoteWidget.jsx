import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import User from "components/user";
import WidgetWrapper from "components/WidgetWrapper";

const NoteWidget = ({
    noteId,
    userId,
    name,
    description,
    title,
    userPicturePath,
}) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    return (
        <WidgetWrapper m="2rem 0">
            <User
                userId={userId}
                name={name}
                subtitle={title}
                userPicturePath={userPicturePath}
                noteId={noteId}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
        </WidgetWrapper>
    )
}

export default NoteWidget;