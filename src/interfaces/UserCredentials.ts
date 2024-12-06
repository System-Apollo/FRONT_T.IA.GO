export interface User{
    username?: string
    name?: string;
    last_name?: string;
    company_name?: string;
    email?: string;
    password?: string;
    cpf_cnpj?: string;
    is_activity?: boolean | undefined;
    used_requests?: string;
    limit_requests?: string;
}