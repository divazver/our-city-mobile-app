import {generateMockOrganization, generateMockOrganizations} from "@/grapql/mocks/organisation";

export const organizationsResolver = () => generateMockOrganizations(10);

export const organizationResolver = () => generateMockOrganization();

