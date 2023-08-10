import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const Coordinator = createMachine<Context>({
        id: "Coordinator",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "WaitForTransactions",
                    ]
                }
                ],
            },
            WaitForTransactions: {
                on: {
                    eWriteTransReq : { target: [
                        "WaitForPrepareResponses",
                        ]
                    },
                    eReadTransReq : { target: [
                        ]
                    },
                }
            },
            WaitForPrepareResponses: {
                on: {
                    ePrepareResp : { target: [
                        "WaitForTransactions",
                        "WaitForTransactions",
                        ]
                    },
                    eTimeOut : { target: [
                        "WaitForTransactions",
                        ]
                    },
                    eReadTransReq : { target: [
                        ]
                    },
                }
            }
        }
});
const Participant = createMachine<Context>({
        id: "Participant",
        initial: "Init", 
        states: {
            Init: {
                on: {
                    eInformCoordinator : { target: [
                        "WaitForRequests",
                        ]
                    },
                }
            },
            WaitForRequests: {
                on: {
                    eAbortTrans : { target: [
                        ]
                    },
                    eCommitTrans : { target: [
                        ]
                    },
                    ePrepareReq : { target: [
                        ]
                    },
                    eReadTransReq : { target: [
                        ]
                    },
                    eShutDown : { target: [
                        ]
                    },
                }
            }
        }
});
const SingleClientNoFailure = createMachine<Context>({
        id: "SingleClientNoFailure",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
const MultipleClientsNoFailure = createMachine<Context>({
        id: "MultipleClientsNoFailure",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
const MultipleClientsWithFailure = createMachine<Context>({
        id: "MultipleClientsWithFailure",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
const Client = createMachine<Context>({
        id: "Client",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "SendWriteTransaction",
                    ]
                }
                ],
            },
            SendWriteTransaction: {
                on: {
                    eWriteTransResp : { target: [
                        "ConfirmTransaction",
                        ]
                    },
                }
            },
            ConfirmTransaction: {
                always: [
                { target: [
                    "SendWriteTransaction",
                    ]
                }
                ],
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
