using PChecker;
using PChecker.Actors;
using PChecker.Actors.Events;
using PChecker.Runtime;
using PChecker.Specifications;
using System;
using System.Runtime;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Plang.CSharpRuntime;
using Plang.CSharpRuntime.Values;
using Plang.CSharpRuntime.Exceptions;
using System.Threading;
using System.Threading.Tasks;

#pragma warning disable 162, 219, 414, 1998
namespace PImplementation
{
}
namespace PImplementation
{
    internal partial class eDelayNodeFailure : PEvent
    {
        public eDelayNodeFailure() : base() {}
        public eDelayNodeFailure (IPrtValue payload): base(payload){ }
        public override IPrtValue Clone() { return new eDelayNodeFailure();}
    }
}
namespace PImplementation
{
    internal partial class eShutDown : PEvent
    {
        public eShutDown() : base() {}
        public eShutDown (PMachineValue payload): base(payload){ }
        public override IPrtValue Clone() { return new eShutDown();}
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void UnReliableSend(PMachineValue target, PEvent message, IPrtValue payload, PMachine currentMachine)
        {
            PrtBool TMP_tmp0 = ((PrtBool)false);
            PMachineValue TMP_tmp1 = null;
            PEvent TMP_tmp2 = null;
            IPrtValue TMP_tmp3 = null;
            TMP_tmp0 = (PrtBool)(((PrtBool)currentMachine.TryRandomBool()));
            if (TMP_tmp0)
            {
                TMP_tmp1 = (PMachineValue)(((PMachineValue)((IPrtValue)target)?.Clone()));
                TMP_tmp2 = (PEvent)(((PEvent)((IPrtValue)message)?.Clone()));
                TMP_tmp3 = (IPrtValue)(((IPrtValue)((IPrtValue)payload)?.Clone()));
                currentMachine.TrySendEvent(TMP_tmp1, (Event)TMP_tmp2, TMP_tmp3);
            }
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void UnReliableBroadCast(PrtSet ms, PEvent ev, IPrtValue payload_1, PMachine currentMachine)
        {
            PrtInt i = ((PrtInt)0);
            PrtInt TMP_tmp0_1 = ((PrtInt)0);
            PrtBool TMP_tmp1_1 = ((PrtBool)false);
            PrtBool TMP_tmp2_1 = ((PrtBool)false);
            PMachineValue TMP_tmp3_1 = null;
            PEvent TMP_tmp4 = null;
            IPrtValue TMP_tmp5 = null;
            PrtInt TMP_tmp6 = ((PrtInt)0);
            while (((PrtBool)true))
            {
                TMP_tmp0_1 = (PrtInt)(((PrtInt)(ms).Count));
                TMP_tmp1_1 = (PrtBool)((i) < (TMP_tmp0_1));
                TMP_tmp2_1 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp1_1)?.Clone()));
                if (TMP_tmp2_1)
                {
                }
                else
                {
                    break;
                }
                TMP_tmp3_1 = (PMachineValue)(((PrtSet)ms)[i]);
                TMP_tmp4 = (PEvent)(((PEvent)((IPrtValue)ev)?.Clone()));
                TMP_tmp5 = (IPrtValue)(((IPrtValue)((IPrtValue)payload_1)?.Clone()));
                GlobalFunctions.UnReliableSend(TMP_tmp3_1, TMP_tmp4, TMP_tmp5, currentMachine);
                TMP_tmp6 = (PrtInt)((i) + (((PrtInt)1)));
                i = TMP_tmp6;
            }
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void ReliableBroadCast(PrtSet ms_1, PEvent ev_1, IPrtValue payload_2, PMachine currentMachine)
        {
            PrtInt i_1 = ((PrtInt)0);
            PrtInt TMP_tmp0_2 = ((PrtInt)0);
            PrtBool TMP_tmp1_2 = ((PrtBool)false);
            PrtBool TMP_tmp2_2 = ((PrtBool)false);
            PMachineValue TMP_tmp3_2 = null;
            PMachineValue TMP_tmp4_1 = null;
            PEvent TMP_tmp5_1 = null;
            IPrtValue TMP_tmp6_1 = null;
            PrtInt TMP_tmp7 = ((PrtInt)0);
            while (((PrtBool)true))
            {
                TMP_tmp0_2 = (PrtInt)(((PrtInt)(ms_1).Count));
                TMP_tmp1_2 = (PrtBool)((i_1) < (TMP_tmp0_2));
                TMP_tmp2_2 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp1_2)?.Clone()));
                if (TMP_tmp2_2)
                {
                }
                else
                {
                    break;
                }
                TMP_tmp3_2 = (PMachineValue)(((PrtSet)ms_1)[i_1]);
                TMP_tmp4_1 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp3_2)?.Clone()));
                TMP_tmp5_1 = (PEvent)(((PEvent)((IPrtValue)ev_1)?.Clone()));
                TMP_tmp6_1 = (IPrtValue)(((IPrtValue)((IPrtValue)payload_2)?.Clone()));
                currentMachine.TrySendEvent(TMP_tmp4_1, (Event)TMP_tmp5_1, TMP_tmp6_1);
                TMP_tmp7 = (PrtInt)((i_1) + (((PrtInt)1)));
                i_1 = TMP_tmp7;
            }
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void CreateFailureInjector(PrtNamedTuple config, PMachine currentMachine)
        {
            PrtNamedTuple TMP_tmp0_3 = (new PrtNamedTuple(new string[]{"nodes","nFailures"},new PrtSet(), ((PrtInt)0)));
            TMP_tmp0_3 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)config)?.Clone()));
            currentMachine.CreateInterface<I_FailureInjector>(currentMachine, TMP_tmp0_3);
        }
    }
}
namespace PImplementation
{
    internal partial class FailureInjector : PMachine
    {
        private PrtInt nFailures = ((PrtInt)0);
        private PrtSet nodes = new PrtSet();
        public class ConstructorEvent : PEvent{public ConstructorEvent(PrtNamedTuple val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((PrtNamedTuple)value); }
        public FailureInjector() {
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(PHalt));
        }
        
        public void Anon(Event currentMachine_dequeuedEvent)
        {
            FailureInjector currentMachine = this;
            PrtNamedTuple config_1 = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtInt TMP_tmp0_4 = ((PrtInt)0);
            PrtInt TMP_tmp1_3 = ((PrtInt)0);
            PrtSet TMP_tmp2_3 = new PrtSet();
            PrtSet TMP_tmp3_3 = new PrtSet();
            PrtInt TMP_tmp4_2 = ((PrtInt)0);
            PrtBool TMP_tmp5_2 = ((PrtBool)false);
            PrtString TMP_tmp6_2 = ((PrtString)"");
            TMP_tmp0_4 = (PrtInt)(((PrtNamedTuple)config_1)["nFailures"]);
            TMP_tmp1_3 = (PrtInt)(((PrtInt)((IPrtValue)TMP_tmp0_4)?.Clone()));
            nFailures = TMP_tmp1_3;
            TMP_tmp2_3 = (PrtSet)(((PrtNamedTuple)config_1)["nodes"]);
            TMP_tmp3_3 = (PrtSet)(((PrtSet)((IPrtValue)TMP_tmp2_3)?.Clone()));
            nodes = TMP_tmp3_3;
            TMP_tmp4_2 = (PrtInt)(((PrtInt)(nodes).Count));
            TMP_tmp5_2 = (PrtBool)((nFailures) < (TMP_tmp4_2));
            TMP_tmp6_2 = (PrtString)(((PrtString) String.Format("PSrc/FailureInjector.p:16:7")));
            currentMachine.TryAssert(TMP_tmp5_2,"Assertion Failed: " + TMP_tmp6_2);
            currentMachine.TryGotoState<FailOneNode>();
            return;
        }
        public void Anon_1(Event currentMachine_dequeuedEvent)
        {
            FailureInjector currentMachine = this;
            PMachineValue fail = null;
            PrtBool TMP_tmp0_5 = ((PrtBool)false);
            PEvent TMP_tmp1_4 = null;
            PrtBool TMP_tmp2_4 = ((PrtBool)false);
            PMachineValue TMP_tmp3_4 = null;
            PMachineValue TMP_tmp4_3 = null;
            PEvent TMP_tmp5_3 = null;
            PMachineValue TMP_tmp6_3 = null;
            PrtInt TMP_tmp7_1 = ((PrtInt)0);
            PMachineValue TMP_tmp8 = null;
            PEvent TMP_tmp9 = null;
            TMP_tmp0_5 = (PrtBool)((PrtValues.SafeEquals(nFailures,((PrtInt)0))));
            if (TMP_tmp0_5)
            {
                TMP_tmp1_4 = (PEvent)(new PHalt(null));
                currentMachine.TryRaiseEvent((Event)TMP_tmp1_4);
                return;
            }
            else
            {
                TMP_tmp2_4 = (PrtBool)(((PrtBool)currentMachine.TryRandomBool()));
                if (TMP_tmp2_4)
                {
                    TMP_tmp3_4 = (PMachineValue)(((PMachineValue)currentMachine.TryRandom(nodes)));
                    fail = TMP_tmp3_4;
                    TMP_tmp4_3 = (PMachineValue)(((PMachineValue)((IPrtValue)fail)?.Clone()));
                    TMP_tmp5_3 = (PEvent)(new eShutDown(null));
                    TMP_tmp6_3 = (PMachineValue)(((PMachineValue)((IPrtValue)fail)?.Clone()));
                    currentMachine.TrySendEvent(TMP_tmp4_3, (Event)TMP_tmp5_3, TMP_tmp6_3);
                    ((PrtSet)nodes).Remove(fail);
                    TMP_tmp7_1 = (PrtInt)((nFailures) - (((PrtInt)1)));
                    nFailures = TMP_tmp7_1;
                }
                else
                {
                    TMP_tmp8 = (PMachineValue)(currentMachine.self);
                    TMP_tmp9 = (PEvent)(new eDelayNodeFailure(null));
                    currentMachine.TrySendEvent(TMP_tmp8, (Event)TMP_tmp9);
                }
            }
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEntry(nameof(Anon))]
        class Init : State
        {
        }
        [OnEntry(nameof(Anon_1))]
        [OnEventGotoState(typeof(eDelayNodeFailure), typeof(FailOneNode))]
        class FailOneNode : State
        {
        }
    }
}
// TODO: NamedModule FailureInjector_1
namespace PImplementation
{
    public class I_FailureInjector : PMachineValue {
        public I_FailureInjector (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public partial class PHelper {
        public static void InitializeInterfaces() {
            PInterfaces.Clear();
            PInterfaces.AddInterface(nameof(I_FailureInjector), nameof(eDelayNodeFailure), nameof(eShutDown), nameof(PHalt));
        }
    }
    
}
namespace PImplementation
{
    public partial class PHelper {
        public static void InitializeEnums() {
            PrtEnum.Clear();
        }
    }
    
}
#pragma warning restore 162, 219, 414
