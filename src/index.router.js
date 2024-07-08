import { connectToDB } from '../Database/connection.js';
import MemberModule from './modules/Member/Member.router.js'
import TaskModule from './modules/Task/Task.Router.js'
import globalErrorHandler from './utils/globalErrorHandler.js';

const bootstrap = (app, express, globalPrefix = '/api') => {
    app.use(express.json());


    const router = express.Router();

    router.use("/member", MemberModule);
    router.use("/task", TaskModule);

    // Apply global prefix
    app.use(globalPrefix, router);

    app.use("*", (_, res) => {
        return res.status(404).json({ message: "Invalid Routing" });
    });

    connectToDB();

    app.use(globalErrorHandler);
}

export default bootstrap;