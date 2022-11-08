import LoginRouter from './LoginRouter';
import UserRouter from './UserRouter';
import ExpenseRouter from './ExpenseRouter';

const userRouter = new UserRouter();
const loginRouter = new LoginRouter();
const expenseRouter = new ExpenseRouter();

export { loginRouter, userRouter, expenseRouter };