export const handleEmailChange = (event, stateHandler) => {
    fixEmailInput(event);
    stateHandler(event);
}

export const fixEmailInput = e => {
    const [el, inputType] = [e.target, e.inputType];
    const containsEndava = el.value.indexOf('endava.com');

    console.log(e);

    if (inputType === 'deleteContentBackward' || inputType === 'insertReplacementText') {
        return;
    }

    if (inputType === 'insertFromPaste') {
        el.value = '';
    }

    if (e.data === ' ') {
        el.value = el.value.replace(/\s/g, '');
        e.preventDefault()
    }

    if (containsEndava !== -1) {
        el.value = (e.data === ' ') ? el.value.trim() : el.value.slice(0, -1);
    }

    if (el.value.indexOf('@') !== -1) {

        const emailParts = el.value.split('@');

        if (emailParts[1].length > 0) {
            el.value = (e.data === ' ') ? el.value.trim() : el.value.slice(0, -1);
        } else {
            if (containsEndava === -1) {
                el.value += 'endava.com'
            }
        }
    }
}

export const setPageTitle = (title, authState) => {
    const titleParts = title.split('|');
    let newTitle = ''
    switch (authState) {
        case 'signup':
            newTitle = titleParts[0] + '| Create your account'
            break;
        case 'signin':
            newTitle = titleParts[0] + '| Log in to your account'
            break;
        case 'forgotpassword':
            newTitle = titleParts[0] + '| Reset your account'
            break;
        case 'confirmSignUp':
            newTitle = titleParts[0] + '| Confirm your new account'
            break;
        case 'signedin':
            newTitle = titleParts[0] + '| Manage your benefits'
            break;

        default:
            break;

    }
    return newTitle;
}