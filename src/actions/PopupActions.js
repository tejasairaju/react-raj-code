const requestPageLoader = ()=> ({
    type: 'REQUEST_PAGE_LOADER',
    resStatus: {
        type: 'loading',
        message: ''
    }
});

const closePageLoader = ()=> ({
    type: 'CLOSE_PAGE_LOADER',
    resStatus: {
        type: '',
        message: ''
    }
});

export default {
    requestPageLoader,
    closePageLoader
}