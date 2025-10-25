import { AuthRouter } from "@/components/AuthRouter";
import Article from "@/pages/Article";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Publish from "@/pages/Publish";
const { createBrowserRouter } = require("react-router-dom");


const router = createBrowserRouter([
    {
        path: '/',
        element:<AuthRouter><Layout /></AuthRouter>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "article",
                element: <Article />
            },
            {
                path: "publish",
                element: <Publish />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router