import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const Client = createMachine<Context>({
        id: "Client",
        initial: "Init", 
        states: {
            Init: {
                on: {
                    eNotifyNodesDown : { target: [
                        ]
                    },
                }
            }
        }
});
const FailureDetector = createMachine<Context>({
        id: "FailureDetector",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "SendPingsToAllNodes",
                    ]
                }
                ],
            },
            SendPingsToAllNodes: {
                on: {
                    ePong : { target: [
                        "ResetAndStartAgain",
                        ]
                    },
                    eTimeOut : { target: [
                        "ResetAndStartAgain",
                        "SendPingsToAllNodes",
                        ]
                    },
                }
            },
            ResetAndStartAgain: {
                on: {
                    eTimeOut : { target: [
                        "SendPingsToAllNodes",
                        ]
                    },
                }
            }
        }
});
const Node = createMachine<Context>({
        id: "Node",
        initial: "WaitForPing", 
        states: {
            WaitForPing: {
                on: {
                    ePing : { target: [
                        ]
                    },
                    eShutDown : { target: [
                        ]
                    },
                }
            }
        }
});
const TestMultipleClients = createMachine<Context>({
        id: "TestMultipleClients",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
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
