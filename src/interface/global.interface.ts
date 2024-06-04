
export interface LoginFormProps {
    email: string,
    password: string,
}

export interface ChangePasswordProps {
    oldPassword: string,
    newPassword: string
}

export interface GetAdminListProps {
    id: string;
    email: string,
    role: string,
    username: string,
    details: {
        firstName: {
            en: string,
            ne: string
        },
        middleName: {
            en: string,
            ne: string
        },
        lastName: {
            en: string,
            ne: string
        },
        phoneNumber: null
    }
}

export interface CreateAdminProps {
    id?: string
    email: string;
    role: "ADMIN" | "SUPER_ADMIN" | "SUDO_ADMIN" | "USER";
    username: string;
    firstPassword: string;
    password: string;
    allowedFeature: [];
    details: {
        firstName: {
            en: string;
            ne?: string | undefined;
        },

        lastName: {
            en: string;
            ne?: string | undefined;
        },
        phoneNumber: string;
    }
}

export interface EditAdminInterface {

    id: string;
    username?: string;
    email?: string;
    role: "ADMIN" | "SUPER_ADMIN" | "SUDO_ADMIN" | "USER";
    allowedFeature: [];
    details: {
        firstName: {
            en: string;
            ne?: string;
        },

        lastName: {
            en: string;
            ne?: string;
        },
        phoneNumber: string;
    }
}
