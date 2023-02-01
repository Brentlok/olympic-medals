export const confirm = (fn: () => void, message = 'Are you sure?') => {
    if (!window.confirm(message)) {
        return;
    }

    fn();
}