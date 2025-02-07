export const customers = [{
    name: 'Mario Pfeiffer',
    email: 'mario.pfeiffer@gmail.com',
    phone: '01234567',
    address: 'Pfeifferstraße 7',
    city: 'Pfeifferstadt',
    country: 'Pfeifferland',
    zip: '2839',
    company: 'Pfeiffer GmbH',
    createdBy: 1,
}, {
    name: 'Petra Meier',
    email: 'petra.meier@web.de',
    phone: '98765432',
    address: 'Meierstraße 9',
    city: 'Meierstadt',
    country: 'Meierland',
    zip: '2839',
    company: 'Meier GmbH',
    createdBy: 1,
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
    name: 'Accountmanager',
    password: 'test',
    role: 1,
    createdBy: 1,
    updatedBy: 1
}, {
    name: 'Developer',
    password: 'test',
    role: 2,
    createdBy: 1,
    updatedBy: 1
}, {
    name: 'User',
    password: 'test',
    role: 3,
    createdBy: 1,
    updatedBy: 1
}]

export const offers = [{
    customerId: 1,
    title: 'Pfeiffer Offer',
    description: 'Pfeiffer Offer Description',
    price: 100,
    status: 'active',
    createdBy: 1,
    updatedBy: 1
}, {
    customerId: 2,
    title: 'Meier Offer',
    description: 'Meier Offer Description',
    price: 200,
    status: 'draft',
    createdBy: 1,
    updatedBy: 1
}, {
    customerId: 1,
    title: 'Pfeiffer Offer 2',
    description: 'Pfeiffer Offer Description 2',
    price: 300,
    status: 'onice',
    createdBy: 1,
    updatedBy: 1
}, {
    customerId: 2,
    title: 'Meier Offer 2',
    description: 'Meier Offer Description 2',
    price: 400,
    status: 'onice',
    createdBy: 1,
    updatedBy: 1
}]