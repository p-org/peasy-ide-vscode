import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const Timer = createMachine<Context>({
        id: "Timer",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "WaitForTimerRequests",
                    ]
                }
                ],
            },
            WaitForTimerRequests: {
                on: {
                    eStartTimer : { target: [
                        "TimerStarted",
                        ]
                    },
                }
            },
            TimerStarted: {
                always: [
                { target: [
                    "WaitForTimerRequests",
                    ]
                }
                ],
                on: {
                    eDelayedTimeOut : { target: [
                        "TimerStarted",
                        ]
                    },
                    eCancelTimer : { target: [
                        "WaitForTimerRequests",
                        ]
                    },
                }
            }
        }
});
