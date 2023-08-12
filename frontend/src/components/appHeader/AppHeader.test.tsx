import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureMockStore()
const initialState = {
    authModule: {
        loggedinUser: {
            id: '1',
            email: 'dor@gmail.com',
            password: '1234'
        }
    }
}
const store = mockStore(initialState)

describe('AppHeader', () => {
    test('renders the logo', () => {
        render(<Provider store={store}> <MemoryRouter><AppHeader /></MemoryRouter></ Provider>)
        const logo = screen.getByRole('link', { name: /tinyurl/i })
        expect(logo).toBeInTheDocument()
    })

    // test('renders the roadmap', () => {
    //     render(<Provider store={store}> <MemoryRouter><AppHeader /></MemoryRouter></ Provider>)
    //     const roadmap = screen.getByRole('button', { name: /roadmap/i })
    //     expect(roadmap).toBeInTheDocument()
    // })
})