import {faker} from "@faker-js/faker";

export const OrganisationsListModelTypePolicy = {
    OrganisationsListMobileModel: {
        fields: {
            color: {
                read() {
                    return "#00803a"
                }
            }
        }
    }
}

export const SimplePagesTypePolicy = {
    ModuleSimplePageMobileModel: {
        fields: {
            name: {
                read() {
                    return faker.helpers.arrayElement(["História obce", "Kontakty", "Farnosť"])
                }
            },
            icon: {
                read() {
                    return faker.helpers.arrayElement(["info", "book"])
                }
            },
            featuredImage: {
                read() {
                    return faker.image.urlLoremFlickr({category: "nature"})
                }
            },
            context: {
                read() {
                    return faker.lorem.paragraphs({min: 5, max: 10})
                }
            },
            gallery: {
                read() {
                    return [
                        {
                            name: faker.lorem.sentence({min: 3, max: 8}),
                            urlLink: faker.image.urlLoremFlickr({category: "nature"})
                        },
                        {
                            name: faker.lorem.sentence({min: 3, max: 8}),
                            urlLink: faker.image.urlLoremFlickr({category: "fashion"})
                        },
                        {
                            name: faker.lorem.sentence({min: 3, max: 8}),
                            urlLink: faker.image.urlLoremFlickr({category: "people"})
                        },
                        {
                            name: faker.lorem.sentence({min: 3, max: 8}),
                            urlLink: faker.image.urlLoremFlickr({category: "sports"})
                        },
                        {
                            name: faker.lorem.sentence({min: 3, max: 8}),
                            urlLink: faker.image.urlLoremFlickr({category: "people"})
                        }]
                }
            },
        }
    }
}

export const EventTypePolicy = {
    ModuleEventMobileModel: {
        fields: {
            title: {
                read() {
                    return faker.lorem.sentence({min: 3, max: 8})
                }
            },
            featuredImage: {
                read() {
                    return faker.image.urlLoremFlickr({category: "nightlife"})
                }
            },
            shorText: {
                read() {
                    return faker.lorem.paragraph({min: 3, max: 5})
                }
            },
            context: {
                read() {
                    return faker.lorem.paragraphs({min: 5, max: 10})
                }
            },
            createdAt: {
                read() {
                    return faker.date.past()
                }
            },
            createdBy: {
                read() {
                    return faker.person.zodiacSign()
                }
            }
        }
    }
}

export const RadioMessageTypePolicy = {
    MessageModel: {
        fields: {
            message: {
                read() {
                    return faker.lorem.paragraph({min: 4, max: 8})
                }
            }
        }
    }
}