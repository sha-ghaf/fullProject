import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import NoteWidget from "./NoteWidget"

const NotesWidget = () => {
    const [notes,setNotes] = useState([])
    console.log(notes[1])
    const token = useSelector((state) => state.token);
    const getNotes = async () => {
        const response = await fetch("http://localhost:5000/note", {
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
    //console.log(getNotes)
    useEffect(() => {
        getNotes();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    //console.log(notes)
    return (
        <div>
            {notes.map(
                ( {
                    _id,
                    userName,
                    userId,
                    text,
                    title,
                    userPicturePath
                }) => (
                    <NoteWidget
                        key={_id}
                        noteId={_id}
                        title={title}
                        userId={userId}
                        name={userName}
                        description={text}
                        userPicturePath={userPicturePath}
                    />
                )
            )}
        </div>
    );
}

export default NotesWidget;