import App from "./App";
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home";
import AllCountries from "./pages/AllCountries"
import OneCountry from "./pages/OneCountry"
import Favourite from "./pages/Favourite"
import TravelList from "./pages/TravelList"
import Registration from "./pages/Registration";
import LogIn from "./pages/LogIn";
import Reviews from "./pages/Reviews";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/:continent",
                element: <AllCountries />
            },
            {
                path: "/:continent/:singleCountry",
                element: <OneCountry />,
                children: [
                    {
                        path: "/:continent/:singleCountry/reviews",
                        element: <Reviews />
                    }
                ]
            },
            {
                path: "/favouriteCountries",
                element: <Favourite />
            },
            {
                path: "/travelList",
                element: <TravelList />
            },
            {
                path: "/register",
                element: <Registration />
            },
            {
                path: "/login",
                element: <LogIn />
            }
        ]
    }
];

export default routes;