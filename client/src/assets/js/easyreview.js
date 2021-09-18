export const review_service_url = 'http://127.0.0.1:3000/api/v1/reviews/';

export function getAllReviews({ productId, skip, limit }) {
    const url = addSearchParams(review_service_url + productId, {
        skip,
        limit,
    });
    const request = new Request(url);

    return fetch(request)
        .then(response => response.json())
        .then((data) => {
            if (data.status !== 'ok') {
                return Promise.reject(data.data);
            }

            return data.data;
        });
}

export function addReview({ productId, rating, title, summary, email, nickname, isRecommend }) {
    const data = new URLSearchParams({
        rating,
        title,
        summary,
        email,
        nickname,
        isRecommend
    });

    const request = new Request(review_service_url + productId, {
        method: 'POST',
        mode: 'cors',
        body: data,
    });

    return fetch(request)
        .then(response => response.json())
        .then((data) => {
            if (data.status !== 'ok') {
                return Promise.reject(data);
            }
        });
}

function addSearchParams(url, params) {
    return url + '?' + new URLSearchParams(params);
}