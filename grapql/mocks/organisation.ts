import {faker} from '@faker-js/faker'
import {Organisation} from "@/types/organisation";

export const generateMockOrganization = (): Organisation => {
    return {
        id: faker.string.uuid(),
        name: faker.location.city()
    };
}

export const generateMockOrganizations = (count: number): Organisation[] => {
    const organizations: Organisation[] = [];

    for (let i = 0; i < count; i++) {
        organizations.push(generateMockOrganization())
    }

    return organizations;
}