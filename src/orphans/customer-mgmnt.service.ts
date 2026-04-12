import { Customer } from "@/vo/customer";
import { FIVE_SECONDS, TEN_SECONDS } from "../constants/time.constants";
import { randomDelay } from "./common";

const mockCustomers: Array<Customer> = [
    {
        id: 1,
        name: "Customer 1",
        description: "Customer 1 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "",
        phoneNumber: "",
        notes: "",
        subscriptions: "HTTP Analytics, Incident Management"
    },
    {
        id: 2,
        name: "Customer 2",
        description: "Customer 2 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "",
        phoneNumber: "",
        notes: "",
        subscriptions: "HTTP Analytics, Incident Management"
    },
    {
        id: 3,
        name: "Customer 3",
        description: "Customer 3 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "",
        phoneNumber: "",
        notes: "",
        subscriptions: "HTTP Analytics, Incident Management"
    },
    {
        id: 4,
        name: "Customer 4",
        description: "Customer 4 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "",
        phoneNumber: "",
        notes: "",
        subscriptions: "HTTP Analytics, Incident Management"
    },
    {
        id: 5,
        name: "Customer 5",
        description: "Customer 5 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "",
        phoneNumber: "",
        notes: "",
        subscriptions: "HTTP Analytics, Incident Management"
    },
];

export const getCustomers = () => {
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, mockCustomers);
}

export const getCustomerById = (id: number) => {
    const sel = mockCustomers.find((customer) => customer.id === id);

    return randomDelay(FIVE_SECONDS, TEN_SECONDS, sel);
}

export const addCustomer = (customer: Customer) => {


    customer.id = mockCustomers.length + 1;
    customer.createdAt = new Date();
    customer.updatedAt = new Date();
    mockCustomers.push(customer);
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, customer);
}

export const updateCustomer = (customer: Customer) => {
    const index = mockCustomers.findIndex((c) => c.id === customer.id);
    if (index !== -1) {
        mockCustomers[index] = customer;
    }
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, customer);
}