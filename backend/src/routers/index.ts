import LoginRouter from './LoginRouter';
import UserRouter from './UserRouter';
import ExpenseRouter from './ExpenseRouter';
import RevenueRouter from './RevenueRouter';

const userRouter = new UserRouter();
const loginRouter = new LoginRouter();
const expenseRouter = new ExpenseRouter();
const revenueRouter = new RevenueRouter();

export { loginRouter, userRouter, expenseRouter, revenueRouter };