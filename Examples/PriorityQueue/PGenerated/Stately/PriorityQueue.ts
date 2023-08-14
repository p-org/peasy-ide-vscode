import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const Client = createMachine<Context>({
        id: "Client",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
