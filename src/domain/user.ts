export interface UserId {
    readonly id: string;
}

export interface FullName {
    readonly firstName: string;
    readonly lastName: string;
}

interface Phone {
    readonly phone: string;
}

export interface User {
    readonly id: UserId;
    readonly fullName: FullName;
    readonly phone: Phone;
}