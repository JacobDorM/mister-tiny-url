

export {}
describe('RoomPreview component', () => {
    it('renders without throwing errors', () => {
        
    });

})

// it('passes the correct props to RoomPreview components', () => {
//     const { container } = render(<RoomList rooms={mockRooms} onRemoveRoom={mockRemoveRoom} />);
//     const roomPreviewComponents = container.querySelectorAll('[role="mock-room-preview"]');
    // console.log("roomPreviewComponents", roomPreviewComponents)
    // const roomPreviewComponents = getAllByRole('mock-room-preview');
    // roomPreviewComponents.forEach((component, index) => {
    //     const {room, onRemoveRoom} = component.props.room
    //     expect(component.room).toEqual(mockRooms[index]);
    //     expect(component.onRemoveRoom).toEqual(mockRemoveRoom);
    // });
// });


//     it('renders an empty state when rooms array is empty', () => {
    //         render(<RoomList rooms={[]} onRemoveRoom={mockRemoveRoom} />);
    //         const emptyStateElement = screen.getByTestId('empty-state');
    //         expect(emptyStateElement).toBeInTheDocument();
    //     });

    //     it('renders room names correctly in RoomPreview components', () => {
    //         render(<RoomList rooms={mockRooms} onRemoveRoom={mockRemoveRoom} />);
    //         const roomPreviewComponents = screen.getAllByTestId('room-preview');
    //         roomPreviewComponents.forEach((_component, index) => {
    //             const roomNameElement = screen.getByText(mockRooms[index].name);
    //             expect(roomNameElement).toBeInTheDocument();
    //         });
    //     });

        // it('calls the onRemoveRoom callback with the correct roomId', () => {
        //     render(<RoomList rooms={mockRooms} onRemoveRoom={mockRemoveRoom} />);
        //     const removeButtons = screen.getAllByRole(/remove-button-.+/);
        //     removeButtons.forEach((button, index) => {
        //         fireEvent.click(button);
        //         expect(mockRemoveRoom).toHaveBeenCalledWith(mockRooms[index]._id);
        //     });
        // });