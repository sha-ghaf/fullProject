import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "state";
import { useState } from "react";
import NoteWidget from "./NoteWidget"

const NotesWidget = ({ noteId }) => {
    const [notes,setNotes] = useState([])
    //console.log(notes[1])
    const token = useSelector((state) => state.token);
    //console.log(notes)
    const getNotesById = async () => {
        const response = await fetch(
            `http://localhost:5000/note/${noteId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (response.ok) {
            const data = await response.json();
            //console.log(data.data)
            setNotes(data.data.note);
            //dispatch(setNotes({ Notes: data }));
        } else {
            console.error('Failed to fetch notes');
        }
    };
    useEffect(() => {
        getNotesById ();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    //console.log(notes)
    const {
        _id,
        userName,
        userId,
        text,
        title,
        userPicturePath
    } = notes;
    return (
        <div>
            <NoteWidget
                key={_id}
                noteId={_id}
                title={title}
                userId={userId}
                name={userName}
                description={text}
                userPicturePath={userPicturePath}
            />
        </div>
    );
}

export default NotesWidget;