import Article from "@/pages/Article";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Publish from "@/pages/Publish";
const { createBrowserRouter } = require("react-router-dom");


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/article",
                element: <Article />
            },
            {
                path: "/publish",
                element: <Publish />
            }
        ]
    }
])

export default router