import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const FailureInjector = createMachine<Context>({
        id: "FailureInjector",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "FailOneNode",
                    ]
                }
                ],
            },
            FailOneNode: {
                on: {
                    eDelayNodeFailure : { target: [
                        "FailOneNode",
                        ]
                    },
                }
            }
        }
});
