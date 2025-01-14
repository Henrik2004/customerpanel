export const customers = [{
    name: 'Baumer Baum 2',
    email: 'test@test.de',
    phone: '01234567',
    address: 'Baumstraße 7',
    city: 'Baumstadt',
    country: 'Baumland',
    zip: '2839',
    company: 'Baumann',
    createdBy: 1,
}, {
    name: 'Baumer Baum 3',
    email: 'test3@test.de',
    phone: '01234567',
    address: 'Baumstraße 7',
    city: 'Baumstadt',
    country: 'Baumland',
    zip: '2839',
    company: 'Baumann',
    createdBy: 1
}]

export const roles = [{
    name: 'Account-Manager',
    canEdit: 1,
    createdBy: 1,
    updatedBy: 1
}, {
    name: 'Developer',
    canEdit: 1,
    createdBy: 1,
    updatedBy: 1
}, {
    name: 'User',
    canEdit: 0,
    createdBy: 1,
    updatedBy: 1
}]

export const users = [{
    name: 'Test Account Manager',
    password: 'test',
    role: 1,
    createdBy: 1,
    updatedBy: 1
}, {
    name: 'Test Developer',
    password: 'test',
    role: 2,
    createdBy: 1,
    updatedBy: 1
}, {
    name: 'Test User',
    password: 'test',
    role: 3,
    createdBy: 1,
    updatedBy: 1
}]

export const offers = [{
    customerId: 1,
    title: 'Test Offer',
    description: 'Test Offer Description',
    price: 100,
    status: 'active',
    createdBy: 1,
    updatedBy: 1
}, {
    customerId: 2,
    title: 'Test Offer 2',
    description: 'Test Offer Description 2',
    price: 200,
    status: 'active',
    createdBy: 1,
    updatedBy: 1
}]