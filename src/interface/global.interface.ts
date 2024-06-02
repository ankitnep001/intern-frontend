
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
    email: string;
    role: "ADMIN" | "SUPER_ADMIN" | "SUDO_ADMIN";
    username: string;
    password: string;
    allowedFeature: string[];
    details: {
        firstName: {
            en: string;
            ne?: string;
        },

        lastName: {
            en: string;
            ne?: string;
        },
        phoneNumber: number;
    }
}
