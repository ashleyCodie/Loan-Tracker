import { faker } from "@faker-js/faker"


const generateFakeLoan = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        amount:  faker.number.int({ min: 100000, max: 999999 }),
        type: faker.helpers.arrayElement([ "Refinance" ]),
        status: faker.helpers.arrayElement([ "Pending" ]),
        department: faker.helpers.arrayElement([ "Closed" ]),
        loanManager: [""],
        loanOfficer: [],
        loanProcessor: [],
        loanUnderwriter: [],
        tasks: [],
        closingDate: faker.number.int({ min: 2024, max: 2024 }),
    }
}


export const generateFakeLoans = (length) => {
    const loans = []
    Array.from({ length: length }).forEach(() => {
        loans.push(generateFakeLoan())
    })
    return loans
}