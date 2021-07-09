import { UsernamePasswordInput } from 'src/resolvers/UsernamePasswordInput'

export const validateRegister = (options: UsernamePasswordInput) => {
    if (options.username.length <= 3) {
        return [{ field: 'username', message: 'too short username' }]
    }
    if (options.username.includes('@')) {
        return [{ field: 'username', message: 'username cannot inclued @' }]
    }
    if (!options.email.includes('@')) {
        return [{ field: 'email', message: 'email invalid' }]
    }
    if (options.password.length <= 3) {
        return [{ field: 'password', message: 'too short password' }]
    }
    return null
}
