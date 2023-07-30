import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const updateSchema = yup.object().shape({
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    roles: yup.string().required("required"),
    active: yup.boolean().required("required"),
    picture: yup.string().required("required"),
});

const initialValuesUpdate = {
    username: "",
    email: "",
    password: "",
    roles: "",
    active: "",
    picture: "",
};

const Form = ({userId}) => {
    //const [pageType, setPageType] = useState("login");
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // update
    const update = async (values, onSubmitProps) => {
        // this allows us to send form info with image
        console.log(values)
        const formData = {
                username: values.username,
                active: values.active,
                roles: values.roles,
                email: values.email,
                password: values.password,
                picturePath:values.picture.name
            }
        console.log(formData)
        const id = userId
        console.log(id)
        const savedUserResponse = await fetch(
            `http://localhost:5000/user/${id}`,
            {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm()
        console.log(savedUser)
        if (savedUser) {
            // dispatch(
            //     setLogin({
            //         user: savedUser.data.user,
            //         token: savedUser.data.token,
            //     })
            // );
            //navigate(`/profile/${userId}`);
            window.location.reload()
        }
    };
    const handleFormSubmit = async (values, onSubmitProps) => {
        await update(values, onSubmitProps);
    };
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesUpdate}
            validationSchema={updateSchema}
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
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                label="User Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={
                                    Boolean(touched.username) && Boolean(errors.username)
                                }
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Roles"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.roles}
                                name="roles"
                                error={Boolean(touched.roles) && Boolean(errors.roles)}
                                helperText={touched.roles && errors.roles}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Active"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.active}
                                name="active"
                                error={Boolean(touched.active) && Boolean(errors.active)}
                                helperText={touched.active && errors.active}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                        setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        {/* BUTTONS */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}
                            >
                                UPDATE USER
                            </Button>
                        </Box>
                    </form>
                )
            }
        </Formik>
    )
}

export default Form;