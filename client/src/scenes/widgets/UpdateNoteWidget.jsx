import {
    Box,
    Divider,
    InputBase,
    useTheme,
    Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
//import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { setNotes } from "state";
import { useNavigate } from "react-router-dom";

const NoteSchema = yup.object().shape({
    text: yup.string().required("required"),
    completed: yup.string().required("required"),
    title: yup.string().required("required"),
});

const initialValuesNotes = {
    text: "",
    completed: "",
    title: "",
};

const UpdateNoteWidget = ({ picturePath, noteId }) => {
    console.log(noteId)
    const id = noteId
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { palette } = useTheme();
    //const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const handleNote = async (values, onSubmitProps) => {
        console.log(values.text)
        const response = await fetch(`http://localhost:5000/note/${id}`, {
            method: "PATCH",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
                
            },
            body: JSON.stringify(values)
        });
        //console.log('23lllk45')
        console.log(JSON.stringify(values))
        const notes = await response.json();
        console.log(notes)
        dispatch(setNotes({ notes }));
        window.location.reload()
    };
    console.log('2345')
    const handleFormSubmit = async (values, onSubmitProps) => {
        await handleNote(values, onSubmitProps);
    };
    return (
        <WidgetWrapper>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesNotes}
                validationSchema={NoteSchema}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FlexBetween gap="1.5rem">
                                <UserImage image={picturePath} />
                                <Box>
                                    <FlexBetween gap="0.25rem">
                                        <InputBase
                                            placeholder="New title..."
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.title}
                                            
                                            name="title"
                                            error={
                                                Boolean(touched.title) && Boolean(errors.title)
                                            }
                                            helperText={touched.title && errors.title}
                                            sx={{
                                                width: "50%",
                                                backgroundColor: palette.neutral.light,
                                                borderRadius: "2rem",
                                                padding: "0.5rem 1rem",
                                            }}
                                        />
                                        <InputBase
                                            placeholder="Is the note complete..."
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.completed}
                                            name="completed"
                                            error={
                                                Boolean(touched.completed) && Boolean(errors.completed)
                                            }
                                            helperText={touched.completed && errors.completed}
                                            sx={{
                                                width: "50%",
                                                backgroundColor: palette.neutral.light,
                                                borderRadius: "2rem",
                                                padding: "0.5rem 1rem",
                                            }}
                                        />
                                    </FlexBetween>
                                    <Box m="1rem 0" />
                                    <InputBase
                                        placeholder="New text..."
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.text}
                                        name="text"
                                        error={
                                            Boolean(touched.text) && Boolean(errors.text)
                                        }
                                        helperText={touched.text && errors.text}
                                        sx={{
                                            width: "100%",
                                            backgroundColor: palette.neutral.light,
                                            borderRadius: "2rem",
                                            padding: "1rem 2rem",
                                        }}
                                    />
                                </Box>
                            </FlexBetween>
                            <Divider sx={{ margin: "1.25rem 0" }} />
                            <FlexBetween>
                                <Button
                                    disabled={!values.text}
                                    type="submit"
                                    //onClick={() => navigate('/home')}
                                    sx={{
                                        width:"100%",
                                        color: palette.background.alt,
                                        backgroundColor: palette.primary.main,
                                        borderRadius: "3rem",
                                    }}
                                >
                                    UPDATE NOTE
                                </Button>
                            </FlexBetween>
                        </form>
                    ) 
                }
            </Formik>
        </WidgetWrapper>
    )
}

export default UpdateNoteWidget;