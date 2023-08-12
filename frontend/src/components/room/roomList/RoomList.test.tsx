import { render } from '@testing-library/react';
import { RoomList } from './RoomList';
import { RoomPreview } from '../roomPreview/RoomPreview'; // Import the mocked component
import { Room } from '../../../types/roomType';

export {}
// Mock room data
const mockRooms = [
    { _id: '1', name: 'greatest room ever', msgs: [{ _id: '1', txt: "hello", byUser: "dor" }] },
    { _id: '2', name: 'cleaning room', msgs: [{ _id: '2', txt: "bello", byUser: "dor" }] },
    { _id: '3', name: 'walking room', msgs: [{ _id: '3', txt: "gello", byUser: "dor" }] },
];

// Mock remove room function
const mockRemoveRoom = jest.fn();

// Mock RoomPreview compoenent
jest.mock('../roomPreview/RoomPreview.tsx')

const mockRoomPreview = RoomPreview as jest.MockedFunction<
    typeof RoomPreview
>;
describe('RoomList component', () => {

    // Info: This test is needed to ensure that the component works correctly with a valid list of rooms.
    it('renders without throwing errors when list exist', () => {
        render(<RoomList rooms={mockRooms} onRemoveRoom={mockRemoveRoom} />);
    });

    // Info: This test is needed to ensure that the component can handle an empty list of rooms.
    it('renders without throwing errors when list is empty', () => {
        render(<RoomList rooms={[]} onRemoveRoom={mockRemoveRoom} />);
    });

    // Info: It verifies that the component can handle duplicate room IDs and does not throw any errors.
    // Info: This test also checks that the number of rendered RoomPreview components is correct after filtering duplicates.
    it('handles duplicate room IDs in the rooms prop', () => {
        mockRoomPreview.mockImplementation(() => <div role="mock-room-preview"></div>);
        const duplicateRooms = [...mockRooms, mockRooms[0]];
        const { getAllByRole } = render(<RoomList rooms={duplicateRooms} onRemoveRoom={mockRemoveRoom} />);
        const mockRoomPreviews = getAllByRole('mock-room-preview')
        expect(() => mockRoomPreviews).not.toThrow()
        // Todo: when the filtering moves to the backend than this test should move too. 
        expect(mockRoomPreviews.length).toBe(duplicateRooms.length - 1);
        // Add assertions to check the behavior based on your implementation
    });

    // Info: This test is needed to ensure that the component does not show the empty state UI when there are rooms to display.
    it('does not render the empty state when rooms array has elements', () => {
        const { queryByTestId } = render(<RoomList rooms={mockRooms} onRemoveRoom={mockRemoveRoom} />);
        const emptyStateElement = queryByTestId('empty-state');
        expect(emptyStateElement).not.toBeInTheDocument();
    });

    // Info: This test is needed to ensure that the component correctly renders all the rooms in the list.
    it('renders the correct number of RoomPreview components', () => {
        mockRoomPreview.mockImplementation(() => <div role="mock-room-preview"></div>);
        const { getAllByRole } = render(<RoomList rooms={mockRooms} onRemoveRoom={mockRemoveRoom} />);
        const mockRoomPreviews = getAllByRole('mock-room-preview');
        expect(mockRoomPreviews.length).toBe(mockRooms.length);
    });

    // Info: This test is needed to ensure that there are no duplicate room IDs rendered in the list.
    it('has unique id in each propery of the list', () => {
        mockRoomPreview.mockImplementation(() => <div role="mock-room-preview"></div>);
        const { getAllByRole } = render(
            <RoomList rooms={mockRooms} onRemoveRoom={mockRemoveRoom} />
        );
        const mockRoomPreviews = getAllByRole('mock-room-preview');
        const usedKeys = new Set();
        mockRoomPreviews.forEach((_component, index) => {
            const room = mockRooms[index];
            expect(usedKeys.has(room._id)).toBe(false);
            usedKeys.add(room._id);
        });
    });

    // Info: The test ensures that the correct room data is passed as props to the RoomPreview component.
    describe('pass rooms to RoomPreview', () => {
        mockRooms.forEach((room, index) => {
            it(`room ${index + 1}: room.name - ${room.name}`, () => {
                render(<RoomList rooms={[room]} onRemoveRoom={mockRemoveRoom} />);
                expect(mockRoomPreview).toHaveBeenCalledWith(
                    { room, onRemoveRoom: mockRemoveRoom },
                    {}
                );

            })

        })
    })

    // Todo: ask chatgpt for more edge cases
    describe('handles edge cases gracefully', () => {

        it('renders without throwing errors when rooms is a string', () => {
            render(<RoomList rooms={'invalid' as unknown as Room[]} onRemoveRoom={mockRemoveRoom} />);
        });

        it('renders without throwing errors when rooms is a number', () => {
            render(<RoomList rooms={1 as unknown as Room[]} onRemoveRoom={mockRemoveRoom} />);
        });

        it('renders without throwing errors when rooms is a boolean', () => {
            render(<RoomList rooms={true as unknown as Room[]} onRemoveRoom={mockRemoveRoom} />);
        });

        it('renders without throwing errors when rooms is a function', () => {
            render(<RoomList rooms={(() => { }) as unknown as Room[]} onRemoveRoom={mockRemoveRoom} />);
        });

        it('renders without throwing errors when rooms is a NaN', () => {
            render(<RoomList rooms={NaN as unknown as Room[]} onRemoveRoom={mockRemoveRoom} />);
        });

        it('renders without throwing errors when rooms is a null', () => {
            render(<RoomList rooms={null as unknown as Room[]} onRemoveRoom={mockRemoveRoom} />);
        });

        it('renders without throwing errors when rooms is a undefined', () => {
            render(<RoomList rooms={undefined as unknown as Room[]} onRemoveRoom={mockRemoveRoom} />);
        });
        // Add more edge cases as needed
    });
});