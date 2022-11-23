export const userData = {
    userValid: {
        id: 1,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
    }
}

export const login = {
    userValid: {
        email: 'user@user.com',
        password: 'secret_user'
    },
    userInvalidEmail: {
        email: 'userinvalid.com',
        password: 'anonymous'
    },
    userNotExist: {
        email: 'usernotexist@email.com',
        password: 'anonymous2'
    },
    userIncorrectPassword: {
        email: 'user@user.com',
        password: 'incorrect_password'
    }
}