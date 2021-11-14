import React from "react";

export class AuthorizationContext {
    public users: string[];
    public token: string[];

    constructor(users: string[], token: string[]) {
        this.users = users;
        this.token = token;
    }

}

export const AuthContext = React.createContext<AuthorizationContext | null>(null);