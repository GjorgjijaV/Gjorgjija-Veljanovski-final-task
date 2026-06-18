export interface User{
    password: string,
    day: number,
    month: string,
    year: number,
    firstName: string,
    lastName: string,
    address: string,
    country: string,
    state: string,
    city: string,
    zipCode: number,
    mobileNumber: number,
    cardName: string,
    cardNumber: number,
    cvc: number,
    expirationMonth: number,
    expirationYear: number
}

export const firstUser: User = {
    password: "password",
    day: 10,
    month: "March",
    year: 2010,
    firstName: "Gjorgjija",
    lastName: "Test",
    address: "Test address",
    country: "Canada",
    state: "Green State",
    city: "Toronto",
    zipCode: 100000,
    mobileNumber: 9998880,
    cardName: "Gjorgjija Tester",
    cardNumber: 1000200030004000,
    cvc: 100,
    expirationMonth: 10,
    expirationYear: 2030
}

export const secondUser: User = {
    password: "password123",
    day: 11,
    month: "April",
    year: 2011,
    firstName: "George",
    lastName: "Testing",
    address: "Test address 1",
    country: "New Zealand",
    state: "Green State",
    city: "NZ",
    zipCode: 11111,
    mobileNumber: 23458889,
    cardName: "George The Tester",
    cardNumber: 5000600070008000,
    cvc: 200,
    expirationMonth: 11,
    expirationYear: 2031
}