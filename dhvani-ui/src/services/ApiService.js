import axios from "axios";
import Constants from "../utils/Constants";
import { extractFileInfo } from "../utils/CommonFunctions"

const instance = axios.create({
    baseURL: Constants.HOST_API,
    
});

const RequestHandler = async (options) => {
    options['headers'] = {
        "access-token": localStorage.getItem("access-token"),
    }

    return instance(options)
        .then((res) => {
            return res;
        })
        .catch((error) => {
            const err = error.response.data;
            console.log(err);
            const { errorCode } = err;

            if (errorCode === "TOKEN_EXPIRED") {
                // Do logout
                console.log("LOGOUT");
                window.location.href = "/logout";
            }
            return Promise.reject(error);
        });
};

// Requests
class ApiService {
    login = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/login",
            data: data,
        });
    };

    signup = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/register",
            data: data,
        });
    };

    signupOffline = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/signUpOffline",
            data: data,
        });
    };

    signUpSuccess = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/signUpSuccess",
            data: data,
        });
    };

    getMyProfile = (userId) => {
        return RequestHandler({
            method: "GET",
            url: `profile/${userId}`,
        });
    };

    updateProfile = (body) => {
        return RequestHandler({
            method: "POST",
            url: "profile/update",
            data: body,
        });
    };

    sendVerificationMail = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/sendVerificationMail",
            data: data,
        });
    };

    send_pass_reset_mail = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/send_password_reset_mail",
            data: data,
        });
    }

    verify_reset_password_link = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/verify_reset_password_link",
            data: data,
        });
    }

    reset_password = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/reset_password",
            data: data,
        });
    }

    change_password= (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/direct_reset_password",
            data: data,
        });
    }

    verifyMail = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/verifyMail",
            data: data,
        });
    };

    addSubmission = (data) => {
        return RequestHandler({
            method: "POST",
            url: "submissions/add",
            data: data,
        });
    };

    getLatestSubmission = () => {
        return RequestHandler({
            method: "GET",
            url: "submissions/getLatestSubmission",
        });
    };

    membershipRenewal = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/membershipRenewal",
            data: data,
        });
    };

    membershipRenewalSuccess = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/membershipRenewalSuccess",
            data: data,
        });
    };

    membershipRenewalOffline = (data) => {
        return RequestHandler({
            method: "POST",
            url: "auth/membershipRenewalOffline",
            data: data,
        });
    };

    getAllMembers = () => {
        return RequestHandler({
            method: "GET",
            url: "members/getAllMembers",
        });
    };

    addVolunteer = (body) => {
        return RequestHandler({
            method: "POST",
            url: "volunteer/add",
            data: body,
        });
    };

    getAllPayments = () => {
        return RequestHandler({
            method: "GET",
            url: "payments/getAllPayments",
        });
    };

    updatePaymentStatus = (body) => {
        return RequestHandler({
            method: "POST",
            url: "payments/updatePaymentStatus",
            data: body,
        });
    };

    addContact = (body) => {
        return RequestHandler({
            method: "POST",
            url: "contact/add",
            data: body,
        });
    };

    addProject = (body) => {
        return RequestHandler({
            method: "POST",
            url: "project/add",
            data: body,
        });
    };

    deleteProject = (projectId) => {
        return RequestHandler({
            method: "DELETE",
            url: "project/delete",
            data: { projectId },
        });
    };

    getProjects = () => {
        return RequestHandler({
            method: "GET",
            url: "project/getProjects",
        });
    };

    getPresentProjects = () => {
        return RequestHandler({
            method: "GET",
            url: "project/getPresentProjects",
        });
    };

    getPreviousProjects = () => {
        return RequestHandler({
            method: "GET",
            url: "project/getPreviousProjects",
        });
    };

    uploadPreviousProjects = (projects) => {
        return RequestHandler({
            method: "POST",
            url: "project/uploadPreviousProjects",
            data: { projects },
        });
    };

    getProjectById = (id) => {
        return RequestHandler({
            method: "GET",
            url: `project/getProject/${id}`,
        });
    };

    updateProject = (project) => {
        return RequestHandler({
            method: 'PUT',
            url: 'project/update',
            data: project
        })
    }

    addEvent = (event) => {
        return RequestHandler({
            method: 'POST',
            url: 'event/add',
            data: event
        })
    }

    editEvent = (event) => {
        return RequestHandler({
            method: 'POST',
            url: 'event/edit',
            data: event
        })
    }

    setOnHold = (data) => {
        return RequestHandler({
            method: 'PUT',
            url: 'event/hold',
            data: data
        })
    }

    getAllEvents = () => {
        return RequestHandler({
            method: 'GET',
            url: 'event/get'
        })
    }

    deleteEvent = (eventId) => {
        return RequestHandler({
            method: 'DELETE',
            url: 'event/delete',
            data: { eventId }
        })
    }

    getCurrentEvents = () => {
        return RequestHandler({
            method: 'GET',
            url: 'event/getCurrentEvents',
        })
    }

    getUpcomingEvents = () => {
        return RequestHandler({
            method: 'GET',
            url: 'event/getUpcomingEvents',
        })
    }

    getPreviousEvents = () => {
        return RequestHandler({
            method: 'GET',
            url: 'event/getPreviousEvents',
        })
    }

    getEventById = eventId => {
        return RequestHandler({
            method: 'GET',
            url: `event/getEvent/${eventId}`
        })
    }

    registerEventPaypal = (data) => {
        return RequestHandler({
            method: 'POST',
            url: 'event/registerEventPaypal',
            data: data
        })
    }
    
    registerEventPaypalSuccess = (data) => {
        return RequestHandler({
            method: 'POST',
            url: 'event/registerEventSuccess',
            data: data
        })
    }

    registerEventOffline = (data) => {
        return RequestHandler({
            method: 'POST',
            url: 'event/registerEventOffline',
            data: data
        })
    }

    addCause = (formData) => {
        return RequestHandler({
            method: 'POST',
            url: 'causes/add',
            data: formData
        })
    }

    getMyCauses = () => {
        return RequestHandler({
            method: 'GET',
            url: 'causes/getMyCauses'
        })
    }

    getCauseById = (causeId) => {
        return RequestHandler({
            method: 'GET',
            url: `causes/getCause/${causeId}`
        })
    }

    updateCause = (cause) => {
        return RequestHandler({
            method: 'POST',
            url: `causes/update`,
            data: cause
        })
    }

    addCauseDocuments = (formData) => {
        return RequestHandler({
            method: 'POST',
            url: 'causes/addDocuments',
            data: formData
        })
    }

    downloadMedia = filename => {
        window.open(Constants.HOST_API + `media/download/${filename}?access-token=${localStorage.getItem("access-token")}`)
    }

    getMedia = filename => {
        return Constants.HOST_API + `media/public/getImage/${filename}?access-token=${localStorage.getItem("access-token")}`
    }

    deleteMedia = fileid => {
        return RequestHandler({
            method: 'DELETE',
            url: `media/delete/${fileid}?access-token=${localStorage.getItem("access-token")}`
        })
    }

    getAdminCauses = () => {
        return RequestHandler({
            method: 'GET',
            url: 'causes/getAdminCauses'
        })
    }

    getCauses = () => {
        return RequestHandler({
            method: 'GET',
            url: 'causes/getCauses'
        })
    }

    changeCauseStatus = (data) => {
        return RequestHandler({
            method: 'POST',
            url: 'causes/changeStatus',
            data: data
        })
    }

    voteForCause = (data) => {
        return RequestHandler({
            method: 'POST',
            url: 'causes/vote',
            data: data
        })
    }

    canSubmitCause = () => {
        return RequestHandler({
            method: 'GET',
            url: 'causes/canSubmitCause'
        })
    }

    getVolunteersByEventId = (eventId) => {
        return RequestHandler({
            method: 'GET',
            url: `volunteer/getVolunteersByEventId/${eventId}`
        })
    }

    getEventRegistrations = eventId => {
        return RequestHandler({
            method: 'GET',
            url: `event/getEventRegistrations/${eventId}`
        })
    }

    addFinancialDocuments = (formData) => {
        return RequestHandler({
            method: 'POST',
            url: 'financial/addDocuments',
            data: formData
        })
    }

    getFinancialDocuments = () => {
        return RequestHandler({
            method: 'GET',
            url: 'financial/getDocuments'
        })
    }

    getDonationForItems = () => {
        return RequestHandler({
            method: 'GET',
            url: 'donate/getDonationForItems'
        })
    }

    donate = (body) => {
        return RequestHandler({
            method: 'POST',
            url: 'donate/pay',
            data: body
        })
    }

    donateSuccess = body => {
        return RequestHandler({
            method: 'POST',
            url: 'donate/execute',
            data: body
        })
    }

    donateOffline = body => {
        return RequestHandler({
            method: 'POST',
            url: 'donate/offline',
            data: body
        })
    }

    addFolder = body => {
        return RequestHandler({
            method: 'POST',
            url: 'gallery/createFolder',
            data: body
        })
    }

    delete_folders = folders => {
        return RequestHandler({
            method: 'POST',
            url: 'gallery/delete_folders',
            data: folders
        })
    }

    getFolders = (path) => {
        return RequestHandler({
            method: 'POST',
            url: 'gallery/get',
            data: { path }
        })
    }

    uploadGalleryFiles = (formData) => {
        return RequestHandler({
            method: 'POST',
            url: 'gallery/uploadFiles',
            data: formData
        })
    }

}

export default new ApiService();
