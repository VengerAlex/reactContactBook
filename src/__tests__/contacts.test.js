import React from 'react'

import '@testing-library/jest-dom'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {Contacts} from "../pages/Contacts";

import {rest} from 'msw'
import {setupServer} from "msw/node";

const users = [
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Teresa",
            "last": "Long"
        },
        "location": {
            "street": {
                "number": 3526,
                "name": "Plum St"
            },
            "city": "Scurry",
            "state": "Hawaii",
            "country": "United States",
            "postcode": 36239,
            "coordinates": {
                "latitude": "87.4905",
                "longitude": "170.2993"
            },
            "timezone": {
                "offset": "-10:00",
                "description": "Hawaii"
            }
        },
        "email": "teresa.long@example.com",
        "login": {
            "uuid": "e8d15ad3-4749-4bcd-99eb-9ecb4552a434",
            "username": "sadmouse931",
            "password": "valencia",
            "salt": "BrJRU3eL",
            "md5": "b902fe08021e24a2da06ceb4c7fcd97e",
            "sha1": "852fcab190e7baa93b717579cbc427b09a1a67de",
            "sha256": "e25a681486052c22d4183f4abe36d8e59cd112a9274dfb77ca81c49754bfe7af"
        },
        "dob": {
            "date": "1986-08-09T12:53:30.210Z",
            "age": 35
        },
        "registered": {
            "date": "2014-08-14T01:21:04.906Z",
            "age": 7
        },
        "phone": "(331)-622-2501",
        "cell": "(844)-668-7430",
        "id": {
            "name": "SSN",
            "value": "276-17-6807"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/29.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/29.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/29.jpg"
        },
        "nat": "US"
    },
]

const handlers = [
    rest.get("https://randomuser.me/api/?results=10", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                results: users
            })
        )
    })
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe(`contacts get data success`, () => {

    test(`loading`,  () => {
        render(<Contacts />);

        const loader = screen.getByTestId("contacts-loader");

        expect(loader).toBeInTheDocument();
    })

    test(`success`,async () => {
        render(<Contacts />);
        const loader = screen.getByTestId("contacts-loader");

        await waitForElementToBeRemoved(loader)

        expect(loader).not.toBeInTheDocument()
        expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument()
    })

    test(`fail`,async () => {
        server.use(
            rest.get("https://randomuser.me/api/?results=10", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({
                        error: "Internal server error"
                    })
                )
            })
        )

        render(<Contacts />);
        const loader = screen.getByTestId("contacts-loader");

        await waitForElementToBeRemoved(loader)

        expect(loader).not.toBeInTheDocument()
        expect(screen.getByTestId("contacts-error")).toBeInTheDocument()
    })
})
