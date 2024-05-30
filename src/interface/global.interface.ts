
export interface LoginFormProps {
    email: string,
    password: string,
}

export interface ChangePasswordProps {
    oldPassword: string,
    newPassword: string
}

export interface GetAdminListProps {

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
    firstName: string,
    lastName: string,
    email: string,
    role: string,
}