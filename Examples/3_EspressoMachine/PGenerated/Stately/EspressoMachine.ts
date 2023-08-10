import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const EspressoCoffeeMaker = createMachine<Context>({
        id: "EspressoCoffeeMaker",
        initial: "WaitForRequests", 
        states: {
            WaitForRequests: {
                on: {
                    eWarmUpReq : { target: [
                        ]
                    },
                    eGrindBeansReq : { target: [
                        ]
                    },
                    eStartEspressoReq : { target: [
                        ]
                    },
                    eStartSteamerReq : { target: [
                        ]
                    },
                }
            }
        }
});
const CoffeeMakerControlPanel = createMachine<Context>({
        id: "CoffeeMakerControlPanel",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "WarmUpCoffeeMaker",
                    ]
                }
                ],
            },
            WarmUpCoffeeMaker: {
                on: {
                    eWarmUpCompleted : { target: [
                        "CoffeeMakerReady",
                        ]
                    },
                }
            },
            CoffeeMakerReady: {
                on: {
                    eOpenGroundsDoor : { target: [
                        "CoffeeMakerDoorOpened",
                        ]
                    },
                    eEspressoButtonPressed : { target: [
                        "CoffeeMakerRunGrind",
                        ]
                    },
                    eSteamerButtonOn : { target: [
                        "CoffeeMakerRunSteam",
                        ]
                    },
                }
            },
            CoffeeMakerRunGrind: {
                on: {
                    eNoBeansError : { target: [
                        "EncounteredError",
                        ]
                    },
                    eNoWaterError : { target: [
                        "EncounteredError",
                        ]
                    },
                    eGrindBeansCompleted : { target: [
                        "CoffeeMakerRunEspresso",
                        ]
                    },
                }
            },
            CoffeeMakerRunEspresso: {
                on: {
                    eEspressoCompleted : { target: [
                        "CoffeeMakerReady",
                        ]
                    },
                    eNoWaterError : { target: [
                        "EncounteredError",
                        ]
                    },
                }
            },
            CoffeeMakerRunSteam: {
                on: {
                    eSteamerButtonOff : { target: [
                        "CoffeeMakerReady",
                        ]
                    },
                    eNoWaterError : { target: [
                        "EncounteredError",
                        ]
                    },
                }
            },
            CoffeeMakerDoorOpened: {
                on: {
                    eCloseGroundsDoor : { target: [
                        "CoffeeMakerReady",
                        ]
                    },
                }
            },
            EncounteredError: {
                on: {
                    eResetCoffeeMaker : { target: [
                        "WarmUpCoffeeMaker",
                        ]
                    },
                }
            }
        }
});
const SaneUser = createMachine<Context>({
        id: "SaneUser",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "LetsMakeCoffee",
                    ]
                }
                ],
            },
            LetsMakeCoffee: {
            }
        }
});
const CrazyUser = createMachine<Context>({
        id: "CrazyUser",
        initial: "StartPressingButtons", 
        states: {
            StartPressingButtons: {
            }
        }
});
const TestWithSaneUser = createMachine<Context>({
        id: "TestWithSaneUser",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
const TestWithCrazyUser = createMachine<Context>({
        id: "TestWithCrazyUser",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
