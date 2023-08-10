import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const BankServer = createMachine<Context>({
        id: "BankServer",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "WaitForWithdrawRequests",
                    ]
                }
                ],
            },
            WaitForWithdrawRequests: {
                on: {
                    eWithDrawReq : { target: [
                        ]
                    },
                }
            }
        }
});
const Database = createMachine<Context>({
        id: "Database",
        initial: "Init", 
        states: {
            Init: {
                on: {
                    eUpdateQuery : { target: [
                        ]
                    },
                    eReadQuery : { target: [
                        ]
                    },
                }
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
                    "WithdrawMoney",
                    ]
                }
                ],
            },
            WithdrawMoney: {
                always: [
                { target: [
                    "NoMoneyToWithDraw",
                    ]
                }
                ],
                on: {
                    eWithDrawResp : { target: [
                        "WithdrawMoney",
                        ]
                    },
                }
            },
            NoMoneyToWithDraw: {
            }
        }
});
const AbstractBankServer = createMachine<Context>({
        id: "AbstractBankServer",
        initial: "WaitForWithdrawRequests", 
        states: {
            WaitForWithdrawRequests: {
                on: {
                    eWithDrawReq : { target: [
                        ]
                    },
                }
            }
        }
});
const TestWithSingleClient = createMachine<Context>({
        id: "TestWithSingleClient",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
const TestWithMultipleClients = createMachine<Context>({
        id: "TestWithMultipleClients",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
