import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';
import { v4 as uuidv4 } from 'uuid';

// Мокаем uuidv4 для предсказуемых ID в тестах
jest.mock('uuid', () => ({
    v4: jest.fn()
}));

const mockUuidv4 = uuidv4 as jest.Mock;

describe('useTodos hook', () => {
    beforeEach(() => {
        mockUuidv4.mockReturnValue('mocked-uuid');
    });

    it('should initialize with default todos', () => {
        const { result } = renderHook(() => useTodos());

        expect(result.current.todoList).toHaveLength(3);
        expect(result.current.itemsLeft).toBe(1);
        expect(result.current.filter).toBe('all');
    });

    it('should add new todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('New task');
        });

        expect(result.current.todoList).toHaveLength(4);
        expect(result.current.todoList[3]).toEqual({
            id: 'mocked-uuid',
            title: 'New task',
            completed: false
        });
        expect(result.current.itemsLeft).toBe(2);
    });

    it('should not add empty todo', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('');
            result.current.addTodo('   ');
        });

        expect(result.current.todoList).toHaveLength(3);
    });

    it('should toggle todo completed status', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.toggleCompleted('1');
        });

        expect(result.current.todoList[0].completed).toBe(false);
        expect(result.current.itemsLeft).toBe(2);

        act(() => {
            result.current.toggleCompleted('3');
        });

        expect(result.current.todoList[2].completed).toBe(true);
        expect(result.current.itemsLeft).toBe(1);
    });

    it('should delete completed todos', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.deleteCompleted();
        });

        expect(result.current.todoList).toHaveLength(1);
        expect(result.current.todoList[0].id).toBe('3');
        expect(result.current.itemsLeft).toBe(1);
    });

    it('should filter todos correctly', () => {
        const { result } = renderHook(() => useTodos());

        // All filter (default)
        expect(result.current.filteredList).toHaveLength(3);

        // Active filter
        act(() => {
            result.current.setFilter('active');
        });
        expect(result.current.filteredList).toHaveLength(1);
        expect(result.current.filteredList[0].id).toBe('3');

        // Completed filter
        act(() => {
            result.current.setFilter('completed');
        });
        expect(result.current.filteredList).toHaveLength(2);
        expect(result.current.filteredList.map(t => t.id)).toEqual(['1', '2']);

        // Back to all filter
        act(() => {
            result.current.setFilter('all');
        });
        expect(result.current.filteredList).toHaveLength(3);
    });

    it('should update itemsLeft counter when todos change', () => {
        const { result } = renderHook(() => useTodos());

        expect(result.current.itemsLeft).toBe(1);

        act(() => {
            result.current.toggleCompleted('3');
        });
        expect(result.current.itemsLeft).toBe(0);

        act(() => {
            result.current.addTodo('Another task');
        });
        expect(result.current.itemsLeft).toBe(1);

        act(() => {
            result.current.deleteCompleted();
        });
        expect(result.current.itemsLeft).toBe(1);
    });
});
