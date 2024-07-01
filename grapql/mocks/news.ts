import {faker} from '@faker-js/faker'

export const generateMockNews = (): {[key: string]: any} => {
    return {
            id: faker.string.uuid(),
            name: faker.location.city()
        };
}

export const generateMockNewsList = (count: number): {[key: string]: any}[] => {
    const news: {[key: string]: any}[] = [];

    for (let i = 0; i < count; i++) {
        news.push(generateMockNews())
    }

    return news;
}