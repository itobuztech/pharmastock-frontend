export interface RegisterPayload {
    confirmationToken?: string;
    email: string;
    name?: string;
    orgId: string;
    password: string;
    username: string
}