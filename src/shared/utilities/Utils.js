export const handleEmailChange = (event, stateHandler) => {
    fixEmailInput(event);
    stateHandler(event);
}

export const fixEmailInput = e => {
    const [el, inputType] = [e.target, e.inputType];
    const containsEndava = el.value.indexOf('endava.com');

    if (e.data === ' ') {
        e.preventDefault()
        el.value = el.value.trim()
    }

    if (inputType === 'deleteContentBackward') {
        return;
    }

    if (containsEndava !== -1) {
        el.value = (e.data === ' ') ? el.value : el.value.slice(0, -1);
    }

    if (el.value.indexOf('@') !== -1) {
        if (containsEndava === -1) {
            el.value += 'endava.com'
        }
    }
}