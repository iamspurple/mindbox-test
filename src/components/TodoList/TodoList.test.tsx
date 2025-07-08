import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import type { ITodoItem } from '../../types';

jest.mock('./TodoList.module.css', () => ({
    list: 'list',
    item: 'item',
    checkbox: 'checkbox',
    completed: 'completed',
}));

describe('TodoList', () => {
    const mockToggleCompleted = jest.fn();
    const sampleTodos: ITodoItem[] = [
        { id: '1', title: 'First todo', completed: false },
        { id: '2', title: 'Second todo', completed: true },
    ];

    beforeEach(() => {
        mockToggleCompleted.mockClear();
    });

    it('renders list of todos', () => {
        render(<TodoList list={sampleTodos} toggleCompleted={mockToggleCompleted} />);

        expect(screen.getByText('First todo')).toBeInTheDocument();
        expect(screen.getByText('Second todo')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem').length).toBe(2);
    });

    it('applies completed class for completed items', () => {
        render(<TodoList list={sampleTodos} toggleCompleted={mockToggleCompleted} />);

        const completedItem = screen.getByText('Second todo');
        const activeItem = screen.getByText('First todo');

        expect(completedItem).toHaveClass('completed');
        expect(activeItem).not.toHaveClass('completed');
    });

    it('renders checkboxes with correct checked state', () => {
        render(<TodoList list={sampleTodos} toggleCompleted={mockToggleCompleted} />);

        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes[0]).not.toBeChecked();
        expect(checkboxes[1]).toBeChecked();
    });

    it('calls toggleCompleted with correct id when checkbox is clicked', () => {
        render(<TodoList list={sampleTodos} toggleCompleted={mockToggleCompleted} />);

        const firstCheckbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(firstCheckbox);

        expect(mockToggleCompleted).toHaveBeenCalledTimes(1);
        expect(mockToggleCompleted).toHaveBeenCalledWith('1');
    });

    it('renders empty state when list is empty', () => {
        render(<TodoList list={[]} toggleCompleted={mockToggleCompleted} />);

        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(
            <TodoList list={sampleTodos} toggleCompleted={mockToggleCompleted} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});