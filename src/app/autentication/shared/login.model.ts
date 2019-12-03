export class LoginModel {

    email: string;
    password: string;

    public static Create(emailInput: string, passwordInput: string): LoginModel {
        return {
            email: emailInput,
            password: passwordInput
        };
    }
}