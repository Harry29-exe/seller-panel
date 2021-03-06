import React from "react";
import backendAddress from "../logic/ServerAddress";

export class AuthHolder {
    public users?: string[];
    public activeUser?: string;
    public token?: string;

    constructor(users?: string[], activeUser?: string, token?: string) {
        this.users = users;
        this.token = token;
        this.activeUser = activeUser;
    }

    public clone(): AuthHolder {
        return new AuthHolder(this.users, this.activeUser, this.token);
    }

}

export class AuthContextHolder {
    public authHolder: AuthHolder;
    private readonly updateFunction: (auth: AuthHolder) => void;

    constructor(authHolder: AuthHolder, updateFunction: (auth: AuthHolder) => void) {
        this.authHolder = authHolder;
        this.updateFunction = updateFunction;
    }

    public isLogged(): boolean {
        return !!this.authHolder.users;
    }

    public login(username: string, password: string) {
        fetch(`${backendAddress}/login`, {
            headers: {
                username: username,
                password: password
            }
        }).then(response => {
            if (response.status == 200) {
                response.json()
                    .then(response => this.parseResponse(response))
            }
        });
    }

    public logout() {
        this.authHolder = new AuthHolder();
        this.updateFunction(this.authHolder);
    }

    public changeActiveUser(user: string) {
        const authHolder = this.authHolder;
        if (authHolder.users !== undefined && authHolder.users.find((u) => u == user)) {
            authHolder.activeUser = user;
            this.updateFunction(authHolder.clone());
        } else {
            console.error("No such user: " + user);
        }
    }

    private parseResponse(response: any) {
        const authHolder = this.authHolder.clone();
        authHolder.users = response.users;
        authHolder.token = response.token;
        if (authHolder.users !== undefined) {
            authHolder.activeUser = authHolder.users[0];
        }
        this.updateFunction(authHolder);
    }

}

export const AuthContext = React.createContext<AuthContextHolder>({} as AuthContextHolder);