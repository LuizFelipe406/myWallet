import LoginRouter from './LoginRouter';
import UserRouter from './UserRouter';

const userRouter = new UserRouter();
const loginRouter = new LoginRouter();

export { loginRouter, userRouter };