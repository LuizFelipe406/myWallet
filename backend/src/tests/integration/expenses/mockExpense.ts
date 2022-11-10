import Expense from "../../../database/models/Expense";

const mockExpense: Expense = new Expense({
    id: 1,
    name: "Mc Donalds",
    value: "21,90",
    date: "2022-11-10",
    category: "Food",
    userId: 1
});

export default mockExpense;