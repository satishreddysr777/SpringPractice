import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate,
    Routes,
} from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import Toast from "./components/Toast";
import PageErrorHandler from "./components/PageErrorHandler";
import ToastManager from "./components/Toast/ToastManager";
import ApiService from "./services/ApiService";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUp from "./Pages/Signup/SignUp";
import SignIn from "./Pages/Signin/SignIn";
import Logout from "./Pages/Logout";
import SignUpSuccess from "./Pages/Signup/SignUpSuccess";
import SignUpCancel from "./Pages/Signup/SignUpCancel";
import SignUpOffline from "./Pages/Signup/signUpOffline";
import Home from "./Pages/Home";
import Payments from "./Pages/Admin/payments/payments";
import ApplicationParamaters from "./Pages/Admin/ApplicationParameters";
import MyProfile from "./Pages/Profile/MyProfile/MyProfile";
import VerificationMail from "./Pages/Signin/VerificationMail";
import SendVerificationMail from "./Pages/Signin/SendVerificationMail";
import MembershipRenewal from "./Pages/Signin/MembershipRenewal";
import MyMembership from "./Pages/Profile/MyMembership";
import MembershipRenewalSuccess from "./Pages/Profile/MyMembership/renewalSuccess";
import MembershipRenewalOffline from "./Pages/Profile/MyMembership/renewalOffline";
import Members from "./Pages/Admin/members";
import Volunteer from "./Pages/Volunteer";
import ContactUs from "./Pages/ContactUs";
import Volunteers from "./Pages/Admin/Volunteers";
import AddProject from "./Pages/Projects/AddProject";
import DeleteProject from "./Pages/Projects/DeleteProject";
import PreviousProjects from "./Pages/Projects/PreviousProjects";
import PresentProjects from "./Pages/Projects/PresentProjects";
import ViewProject from "./Pages/Projects/ViewProject";
import EventCalender from "./Pages/Events/EventCalender";
import CurrentEvents from "./Pages/Events/CurrEvents";
import PrevEvents from "./Pages/Events/PrevEvents";
import UpcomingEvents from "./Pages/Events/UpcomingEvents";
import EventRegistration from "./Pages/Events/EventRegistration"
import EventRegistrations from "./Pages/Admin/EventRegistrations";
import EventRegistrationSuccess from "./Pages/Events/EventRegistration/EventRegistrationSuccess";
import EventRegistrationOffline from "./Pages/Events/EventRegistration/EventRegistrationOffline";
import EventRegistrationCancel from "./Pages/Events/EventRegistration/EventRegistrationCancel";
import AddCause from "./Pages/Causes/AddCause";
import MySubmittedCauses from "./Pages/Profile/MySubmittedCauses"
import ViewCause from "./Pages/Causes/ViewCause"
import SubmittedCauses from "./Pages/Admin/SubmittedCauses"
import Causes from "./Pages/Causes/Causes"
import FinancialDocuments from "./Pages/Admin/FinancialDocuments"
import Donate from "./Pages/Donate"
import DonateSuccess from "./Pages/Donate/success"
import DonateCancel from "./Pages/Donate/cancel"
import AboutUs from "./Pages/WhoWeAre/AboutUs";
import Gallery from "./Pages/WhoWeAre/Gallery";
import Mission from "./Pages/WhoWeAre/Mission";
import Privacy from "./Pages/Legal/Privacy";
import Copyright from "./Pages/Legal/Copyright";
import TermsConditions from "./Pages/Legal/TermsConditions";
import Offline from "./Pages/Donate/offline"
import ForgotPassword from "./Pages/Signin/ForgotPassword"
import ResetPassword from "./Pages/Signin/ResetPassword"

import VaddiCal from "./Pages/VaddiCal";

const routes = [
    {
        path: "signup",
        component: <SignUp />,
        protected: false,
    },
    {
        path: "logout",
        component: <Logout />,
        protected: false,
    },
    {
        path: "signin",
        component: <SignIn />,
        protected: false,
    },
    {
        path: "/signup/success",
        component: <SignUpSuccess />,
        protected: false,
    },
    {
        path: "/signup/cancel",
        component: <SignUpCancel />,
        protected: false,
    },
    {
        path: "/signup/offline",
        component: <SignUpOffline />,
        protected: false,
    },
    {
        path: "/send-verify-email",
        component: <SendVerificationMail />,
        protected: false,
    },
    {
        path: "/verify-email/:token",
        component: <VerificationMail />,
        protected: false,
    },
    {
        path: "/membership-renewal",
        component: <MembershipRenewal />,
        protected: false,
    },
    {
        path: "/",
        component: <Home />,
        protected: false,
    },
    {
        path: "/my-profile",
        component: <MyProfile />,
        protected: true,
    },
    {
        path: "/my-membership",
        component: <MyMembership />,
        protected: true,
    },
    {
        path: "/membership-renewal/:user_id/success",
        component: <MembershipRenewalSuccess />,
        protected: false,
    },
    {
        path: "/membership-renewal/offline",
        component: <MembershipRenewalOffline />,
        protected: false,
    },
    {
        path: "/cause-submissions",
        component: <ApplicationParamaters />,
        protected: true,
    },
    {
        path: "/payments",
        component: <Payments />,
        protected: true,
    },
    {
        path: "/members",
        component: <Members />,
        protected: true,
    },
    {
        path: "/volunteer",
        component: <Volunteer />,
        protected: false,
    },
    {
        path: "/contact-us",
        component: <ContactUs />,
        protected: false,
    },
    {
        path: "/volunteers",
        component: <Volunteers />,
        protected: true,
    },
    {
        path: "/add-project",
        component: <AddProject />,
        protected: true,
    },
    {
        path: "/delete-project",
        component: <DeleteProject />,
        protected: true,
    },
    {
        path: "/previous-projects",
        component: <PreviousProjects />,
        protected: false,
    },
    {
        path: "/present-projects",
        component: <PresentProjects />,
        protected: false,
    },
    {
        path: "/view-project/:projectId",
        component: <ViewProject />,
        protected: false,
    },
    {
        path: "/event-calender",
        component: <EventCalender />,
        protected: false
    },
    {
        path: "current-events",
        component: <CurrentEvents />,
        protected: false
    },
    {
        path: "previous-events",
        component: <PrevEvents />,
        protected: false
    },
    {
        path: "upcoming-events",
        component: <UpcomingEvents />,
        protected: false
    },
    {
        path: "event-registration/:eventId",
        component: <EventRegistration />,
        protected: false
    },
    {
        path: "event-registration-success",
        component: <EventRegistrationSuccess />,
        protected: false
    },
    {
        path: "event-registration-offline",
        component: <EventRegistrationOffline />,
        protected: false
    },
    {
        path: "event-registration-cancel",
        component: <EventRegistrationCancel />,
        protected: false
    },
    {
        path: "submit-cause",
        component: <AddCause />,
        protected: true
    },
    {
        path: 'my-submitted-causes',
        component: <MySubmittedCauses />,
        protected: true
    },
    {
        path: 'view-cause/:causeId',
        component: <ViewCause />,
        protected: true
    },
    {
        path: '/admin/submitted-causes',
        component: <SubmittedCauses />,
        protected: true
    },
    {
        path: '/view-causes',
        component: <Causes />,
        protected: true
    },
    {
        path: '/event-registrations',
        component: <EventRegistrations />,
        protected: true
    },
    {
        path: '/financial-documents',
        component: <FinancialDocuments />,
        protected: true
    },
    {
        path: '/donate',
        component: <Donate />,
        protected: false
    },
    {
        path: '/donate/success',
        component: <DonateSuccess />,
        protected: false
    },
    {
        path: '/donate/cancel',
        component: <DonateCancel />,
        protected: false
    },
    {
        path: '/donate/offline',
        component: <Offline />,
        protected: false
    },
    {
        path: '/about-us',
        component: <AboutUs />,
        protected: false
    },
    {
        path: '/mission',
        component: <Mission />,
        protected: false
    },
    {
        path: '/gallery',
        component: <Gallery />,
        protected: false
    },
    {
        path: '/privacy',
        component: <Privacy />,
        protected: false
    },
    {
        path: '/copyright',
        component: <Copyright />,
        protected: false
    },
    {
        path: '/terms',
        component: <TermsConditions />,
        protected: false
    },
    {
        path: '/forgot-password',
        component: <ForgotPassword />,
        protected: false
    },
    {
        path: '/reset_password/:token',
        component: <ResetPassword />,
        protected: false
    },

    {
        path: '/vc',
        component: <VaddiCal />,
        protected: false
    },
];

const ProtectedRoute = ({ children }) => {
    const authState = useSelector((state) => state.auth);
    const isLoggedIn = authState.isLoggedIn;

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

const App = () => {

    const [canSubmitCause, setCanSubmitCause] = useState(false)

    useEffect(() => {
        getCanSubmitCause()
    })

    const getCanSubmitCause = async () => {
        try {
            let res = await ApiService.canSubmitCause()
            setCanSubmitCause(res.data.isCauseSubmissionAllowed)
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div className="App bg-gray-50">
            <ToastContainer />
            <ToastManager />
            <PageErrorHandler />
            <Header canSubmitCause={canSubmitCause} />

            <main style={{ minHeight: "70vh" }}>
                <Routes>
                    {routes.map((ele, idx) => {
                        if (!ele.protected) {
                            return (
                                <Route
                                    key={idx}
                                    path={ele.path}
                                    element={ele.component}
                                />
                            );
                        }

                        if (ele.protected) {
                            return (
                                <Route
                                    key={idx}
                                    path={ele.path}
                                    element={
                                        <ProtectedRoute>
                                            {ele.component}
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        }
                    })}
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;
