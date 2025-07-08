import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
    const mockAddTodo = jest.fn();

    beforeEach(() => {
        mockAddTodo.mockClear();
    });

    it("renders correctly", () => {
        render(<TodoForm addTodo={mockAddTodo} />);

        const input = screen.getByPlaceholderText("What needs to be done?");
        const form = input.closest("form");

        expect(input).toBeInTheDocument();
        expect(form).toBeInTheDocument();
    });

    it("calls addTodo when form is submitted with non-empty input", () => {
        render(<TodoForm addTodo={mockAddTodo} />);
        const input = screen.getByPlaceholderText("What needs to be done?");
        const form = input.closest("form");

        fireEvent.change(input, { target: { value: "New todo" } });
        fireEvent.submit(form!);

        expect(mockAddTodo).toHaveBeenCalledTimes(1);
        expect(mockAddTodo).toHaveBeenCalledWith("New todo");
    });

    it("clears input after form submission", () => {
        render(<TodoForm addTodo={mockAddTodo} />);
        const input = screen.getByPlaceholderText("What needs to be done?") as HTMLInputElement;
        const form = input.closest("form");

        fireEvent.change(input, { target: { value: "New todo" } });
        fireEvent.submit(form!);

        expect(input.value).toBe("");
    });

    it("does not call addTodo when form is submitted with empty input", () => {
        render(<TodoForm addTodo={mockAddTodo} />);
        const input = screen.getByPlaceholderText("What needs to be done?");
        const form = input.closest("form");

        fireEvent.change(input, { target: { value: "" } });
        fireEvent.submit(form!);

        expect(mockAddTodo).not.toHaveBeenCalled();
    });
});