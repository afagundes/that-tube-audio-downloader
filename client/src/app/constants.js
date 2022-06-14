const dev = {
    url: {
        STREAM_API: 'http://localhost:8080'
    }
}

const prod = {
    url: {
        STREAM_API: 'http://localhost:8080'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
