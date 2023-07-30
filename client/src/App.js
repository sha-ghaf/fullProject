import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import ProfilePage from "scenes/profilePage";
import LoginPage from "scenes/loginPage";
import UpdateNote from "scenes/updateNote";
import GetAllNote from "scenes/getAllNote";
import UpdateUser from "scenes/updateUser";
import Message from "scenes/extras/message";
import Help from "scenes/extras/help";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    const isAuth = Boolean(useSelector((state) => state.token));
    console.log(isAuth)
    console.log(useSelector((state) => state.token))
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route
                            path="/home"
                            element={isAuth ? <HomePage /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/message"
                            element={isAuth ? <Message /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/help"
                            element={isAuth ? <Help /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/profile/:userId"
                            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/updateUser/:userId"
                            element={isAuth ? <UpdateUser /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/updateNote/:noteId"
                            element={isAuth ? <UpdateNote/> : <Navigate to="/" />}
                        />
                        <Route
                            path="/getAllNotes"
                            element={isAuth ? <GetAllNote/> : <Navigate to="/" />}
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
//Orange1234*