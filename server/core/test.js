import {customers, users, roles, offers} from "../database/testdata.js";
import {createCustomer} from "./customer.js";
import {createRole} from "./role.js";
import {createUser} from "./user.js";
import {createOffer} from "./offer.js";

export function loadTestData(fastify) {
    customers.forEach(customer => {
        createCustomer(fastify, customer);
    })
    roles.forEach(role => {
        createRole(fastify, role);
    })
    users.forEach(user => {
        createUser(fastify, user);
    })
    offers.forEach(offer => {
        createOffer(fastify, offer);
    })
    return {success: "Test data loaded successfully"};
}