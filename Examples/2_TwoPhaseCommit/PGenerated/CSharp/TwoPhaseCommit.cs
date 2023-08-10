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
    internal partial class eWriteTransReq : PEvent
    {
        public eWriteTransReq() : base() {}
        public eWriteTransReq (PrtNamedTuple payload): base(payload){ }
        public override IPrtValue Clone() { return new eWriteTransReq();}
    }
}
namespace PImplementation
{
    internal partial class eWriteTransResp : PEvent
    {
        public eWriteTransResp() : base() {}
        public eWriteTransResp (PrtNamedTuple payload): base(payload){ }
        public override IPrtValue Clone() { return new eWriteTransResp();}
    }
}
namespace PImplementation
{
    internal partial class eReadTransReq : PEvent
    {
        public eReadTransReq() : base() {}
        public eReadTransReq (PrtNamedTuple payload): base(payload){ }
        public override IPrtValue Clone() { return new eReadTransReq();}
    }
}
namespace PImplementation
{
    internal partial class eReadTransResp : PEvent
    {
        public eReadTransResp() : base() {}
        public eReadTransResp (PrtNamedTuple payload): base(payload){ }
        public override IPrtValue Clone() { return new eReadTransResp();}
    }
}
namespace PImplementation
{
    internal partial class ePrepareReq : PEvent
    {
        public ePrepareReq() : base() {}
        public ePrepareReq (PrtNamedTuple payload): base(payload){ }
        public override IPrtValue Clone() { return new ePrepareReq();}
    }
}
namespace PImplementation
{
    internal partial class ePrepareResp : PEvent
    {
        public ePrepareResp() : base() {}
        public ePrepareResp (PrtNamedTuple payload): base(payload){ }
        public override IPrtValue Clone() { return new ePrepareResp();}
    }
}
namespace PImplementation
{
    internal partial class eCommitTrans : PEvent
    {
        public eCommitTrans() : base() {}
        public eCommitTrans (PrtInt payload): base(payload){ }
        public override IPrtValue Clone() { return new eCommitTrans();}
    }
}
namespace PImplementation
{
    internal partial class eAbortTrans : PEvent
    {
        public eAbortTrans() : base() {}
        public eAbortTrans (PrtInt payload): base(payload){ }
        public override IPrtValue Clone() { return new eAbortTrans();}
    }
}
namespace PImplementation
{
    internal partial class eInformCoordinator : PEvent
    {
        public eInformCoordinator() : base() {}
        public eInformCoordinator (PMachineValue payload): base(payload){ }
        public override IPrtValue Clone() { return new eInformCoordinator();}
    }
}
namespace PImplementation
{
    internal partial class eMonitor_AtomicityInitialize : PEvent
    {
        public eMonitor_AtomicityInitialize() : base() {}
        public eMonitor_AtomicityInitialize (PrtInt payload): base(payload){ }
        public override IPrtValue Clone() { return new eMonitor_AtomicityInitialize();}
    }
}
namespace PImplementation
{
    internal partial class eStartTimer : PEvent
    {
        public eStartTimer() : base() {}
        public eStartTimer (IPrtValue payload): base(payload){ }
        public override IPrtValue Clone() { return new eStartTimer();}
    }
}
namespace PImplementation
{
    internal partial class eCancelTimer : PEvent
    {
        public eCancelTimer() : base() {}
        public eCancelTimer (IPrtValue payload): base(payload){ }
        public override IPrtValue Clone() { return new eCancelTimer();}
    }
}
namespace PImplementation
{
    internal partial class eTimeOut : PEvent
    {
        public eTimeOut() : base() {}
        public eTimeOut (IPrtValue payload): base(payload){ }
        public override IPrtValue Clone() { return new eTimeOut();}
    }
}
namespace PImplementation
{
    internal partial class eDelayedTimeOut : PEvent
    {
        public eDelayedTimeOut() : base() {}
        public eDelayedTimeOut (IPrtValue payload): base(payload){ }
        public override IPrtValue Clone() { return new eDelayedTimeOut();}
    }
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
        public static void SetUpTwoPhaseCommitSystem(PrtNamedTuple config, PMachine currentMachine)
        {
            PMachineValue coordinator = null;
            PrtSet participants = new PrtSet();
            PrtInt i = ((PrtInt)0);
            PrtInt TMP_tmp0 = ((PrtInt)0);
            PrtBool TMP_tmp1 = ((PrtBool)false);
            PrtBool TMP_tmp2 = ((PrtBool)false);
            PMachineValue TMP_tmp3 = null;
            PrtInt TMP_tmp4 = ((PrtInt)0);
            PrtInt TMP_tmp5 = ((PrtInt)0);
            PrtSet TMP_tmp6 = new PrtSet();
            PMachineValue TMP_tmp7 = null;
            PrtInt TMP_tmp8 = ((PrtInt)0);
            PrtBool TMP_tmp9 = ((PrtBool)false);
            PrtBool TMP_tmp10 = ((PrtBool)false);
            PMachineValue TMP_tmp11 = null;
            PrtInt TMP_tmp12 = ((PrtInt)0);
            PrtInt TMP_tmp13 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp14 = (new PrtNamedTuple(new string[]{"coordinator","n","id"},null, ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp15 = ((PrtInt)0);
            PrtInt TMP_tmp16 = ((PrtInt)0);
            PrtBool TMP_tmp17 = ((PrtBool)false);
            PrtSet TMP_tmp18 = new PrtSet();
            PrtInt TMP_tmp19 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp20 = (new PrtNamedTuple(new string[]{"nodes","nFailures"},new PrtSet(), ((PrtInt)0)));
            while (((PrtBool)true))
            {
                TMP_tmp0 = (PrtInt)(((PrtNamedTuple)config)["numParticipants"]);
                TMP_tmp1 = (PrtBool)((i) < (TMP_tmp0));
                TMP_tmp2 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp1)?.Clone()));
                if (TMP_tmp2)
                {
                }
                else
                {
                    break;
                }
                TMP_tmp3 = (PMachineValue)(currentMachine.CreateInterface<I_Participant>( currentMachine));
                ((PrtSet)participants).Add(TMP_tmp3);
                TMP_tmp4 = (PrtInt)((i) + (((PrtInt)1)));
                i = TMP_tmp4;
            }
            TMP_tmp5 = (PrtInt)(((PrtNamedTuple)config)["numParticipants"]);
            GlobalFunctions.InitializeTwoPhaseCommitSpecifications(TMP_tmp5, currentMachine);
            TMP_tmp6 = (PrtSet)(((PrtSet)((IPrtValue)participants)?.Clone()));
            TMP_tmp7 = (PMachineValue)(currentMachine.CreateInterface<I_Coordinator>( currentMachine, TMP_tmp6));
            coordinator = TMP_tmp7;
            i = (PrtInt)(((PrtInt)0));
            while (((PrtBool)true))
            {
                TMP_tmp8 = (PrtInt)(((PrtNamedTuple)config)["numClients"]);
                TMP_tmp9 = (PrtBool)((i) < (TMP_tmp8));
                TMP_tmp10 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp9)?.Clone()));
                if (TMP_tmp10)
                {
                }
                else
                {
                    break;
                }
                TMP_tmp11 = (PMachineValue)(((PMachineValue)((IPrtValue)coordinator)?.Clone()));
                TMP_tmp12 = (PrtInt)(((PrtNamedTuple)config)["numTransPerClient"]);
                TMP_tmp13 = (PrtInt)((i) + (((PrtInt)1)));
                TMP_tmp14 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"coordinator","n","id"}, TMP_tmp11, TMP_tmp12, TMP_tmp13)));
                currentMachine.CreateInterface<I_Client>(currentMachine, TMP_tmp14);
                TMP_tmp15 = (PrtInt)((i) + (((PrtInt)1)));
                i = TMP_tmp15;
            }
            TMP_tmp16 = (PrtInt)(((PrtNamedTuple)config)["failParticipants"]);
            TMP_tmp17 = (PrtBool)((TMP_tmp16) > (((PrtInt)0)));
            if (TMP_tmp17)
            {
                TMP_tmp18 = (PrtSet)(((PrtSet)((IPrtValue)participants)?.Clone()));
                TMP_tmp19 = (PrtInt)(((PrtNamedTuple)config)["failParticipants"]);
                TMP_tmp20 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"nodes","nFailures"}, TMP_tmp18, TMP_tmp19)));
                GlobalFunctions.CreateFailureInjector(TMP_tmp20, currentMachine);
            }
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void InitializeTwoPhaseCommitSpecifications(PrtInt numParticipants, PMachine currentMachine)
        {
            currentMachine.Announce((Event)new eMonitor_AtomicityInitialize(((PrtInt)0)), numParticipants);
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static PMachineValue CreateTimer(PMachineValue client, PMachine currentMachine)
        {
            PMachineValue TMP_tmp0_1 = null;
            PMachineValue TMP_tmp1_1 = null;
            TMP_tmp0_1 = (PMachineValue)(((PMachineValue)((IPrtValue)client)?.Clone()));
            TMP_tmp1_1 = (PMachineValue)(currentMachine.CreateInterface<I_Timer>( currentMachine, TMP_tmp0_1));
            return ((PMachineValue)((IPrtValue)TMP_tmp1_1)?.Clone());
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void StartTimer(PMachineValue timer, PMachine currentMachine)
        {
            PMachineValue TMP_tmp0_2 = null;
            PEvent TMP_tmp1_2 = null;
            TMP_tmp0_2 = (PMachineValue)(((PMachineValue)((IPrtValue)timer)?.Clone()));
            TMP_tmp1_2 = (PEvent)(new eStartTimer(null));
            currentMachine.TrySendEvent(TMP_tmp0_2, (Event)TMP_tmp1_2);
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void CancelTimer(PMachineValue timer_1, PMachine currentMachine)
        {
            PMachineValue TMP_tmp0_3 = null;
            PEvent TMP_tmp1_3 = null;
            TMP_tmp0_3 = (PMachineValue)(((PMachineValue)((IPrtValue)timer_1)?.Clone()));
            TMP_tmp1_3 = (PEvent)(new eCancelTimer(null));
            currentMachine.TrySendEvent(TMP_tmp0_3, (Event)TMP_tmp1_3);
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void UnReliableSend(PMachineValue target, PEvent message, IPrtValue payload, PMachine currentMachine)
        {
            PrtBool TMP_tmp0_4 = ((PrtBool)false);
            PMachineValue TMP_tmp1_4 = null;
            PEvent TMP_tmp2_1 = null;
            IPrtValue TMP_tmp3_1 = null;
            TMP_tmp0_4 = (PrtBool)(((PrtBool)currentMachine.TryRandomBool()));
            if (TMP_tmp0_4)
            {
                TMP_tmp1_4 = (PMachineValue)(((PMachineValue)((IPrtValue)target)?.Clone()));
                TMP_tmp2_1 = (PEvent)(((PEvent)((IPrtValue)message)?.Clone()));
                TMP_tmp3_1 = (IPrtValue)(((IPrtValue)((IPrtValue)payload)?.Clone()));
                currentMachine.TrySendEvent(TMP_tmp1_4, (Event)TMP_tmp2_1, TMP_tmp3_1);
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
            PrtInt i_1 = ((PrtInt)0);
            PrtInt TMP_tmp0_5 = ((PrtInt)0);
            PrtBool TMP_tmp1_5 = ((PrtBool)false);
            PrtBool TMP_tmp2_2 = ((PrtBool)false);
            PMachineValue TMP_tmp3_2 = null;
            PEvent TMP_tmp4_1 = null;
            IPrtValue TMP_tmp5_1 = null;
            PrtInt TMP_tmp6_1 = ((PrtInt)0);
            while (((PrtBool)true))
            {
                TMP_tmp0_5 = (PrtInt)(((PrtInt)(ms).Count));
                TMP_tmp1_5 = (PrtBool)((i_1) < (TMP_tmp0_5));
                TMP_tmp2_2 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp1_5)?.Clone()));
                if (TMP_tmp2_2)
                {
                }
                else
                {
                    break;
                }
                TMP_tmp3_2 = (PMachineValue)(((PrtSet)ms)[i_1]);
                TMP_tmp4_1 = (PEvent)(((PEvent)((IPrtValue)ev)?.Clone()));
                TMP_tmp5_1 = (IPrtValue)(((IPrtValue)((IPrtValue)payload_1)?.Clone()));
                GlobalFunctions.UnReliableSend(TMP_tmp3_2, TMP_tmp4_1, TMP_tmp5_1, currentMachine);
                TMP_tmp6_1 = (PrtInt)((i_1) + (((PrtInt)1)));
                i_1 = TMP_tmp6_1;
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
            PrtInt i_2 = ((PrtInt)0);
            PrtInt TMP_tmp0_6 = ((PrtInt)0);
            PrtBool TMP_tmp1_6 = ((PrtBool)false);
            PrtBool TMP_tmp2_3 = ((PrtBool)false);
            PMachineValue TMP_tmp3_3 = null;
            PMachineValue TMP_tmp4_2 = null;
            PEvent TMP_tmp5_2 = null;
            IPrtValue TMP_tmp6_2 = null;
            PrtInt TMP_tmp7_1 = ((PrtInt)0);
            while (((PrtBool)true))
            {
                TMP_tmp0_6 = (PrtInt)(((PrtInt)(ms_1).Count));
                TMP_tmp1_6 = (PrtBool)((i_2) < (TMP_tmp0_6));
                TMP_tmp2_3 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp1_6)?.Clone()));
                if (TMP_tmp2_3)
                {
                }
                else
                {
                    break;
                }
                TMP_tmp3_3 = (PMachineValue)(((PrtSet)ms_1)[i_2]);
                TMP_tmp4_2 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp3_3)?.Clone()));
                TMP_tmp5_2 = (PEvent)(((PEvent)((IPrtValue)ev_1)?.Clone()));
                TMP_tmp6_2 = (IPrtValue)(((IPrtValue)((IPrtValue)payload_2)?.Clone()));
                currentMachine.TrySendEvent(TMP_tmp4_2, (Event)TMP_tmp5_2, TMP_tmp6_2);
                TMP_tmp7_1 = (PrtInt)((i_2) + (((PrtInt)1)));
                i_2 = TMP_tmp7_1;
            }
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void CreateFailureInjector(PrtNamedTuple config_1, PMachine currentMachine)
        {
            PrtNamedTuple TMP_tmp0_7 = (new PrtNamedTuple(new string[]{"nodes","nFailures"},new PrtSet(), ((PrtInt)0)));
            TMP_tmp0_7 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)config_1)?.Clone()));
            currentMachine.CreateInterface<I_FailureInjector>(currentMachine, TMP_tmp0_7);
        }
    }
}
namespace PImplementation
{
    internal partial class Coordinator : PMachine
    {
        private PrtSet participants_1 = new PrtSet();
        private PrtNamedTuple currentWriteTransReq = (new PrtNamedTuple(new string[]{"client","trans"},null, (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)))));
        private PrtSet seenTransIds = new PrtSet();
        private PMachineValue timer_2 = null;
        private PrtInt countPrepareResponses = ((PrtInt)0);
        public class ConstructorEvent : PEvent{public ConstructorEvent(PrtSet val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((PrtSet)value); }
        public Coordinator() {
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
            this.creates.Add(nameof(I_Timer));
        }
        
        public void Anon(Event currentMachine_dequeuedEvent)
        {
            Coordinator currentMachine = this;
            PrtSet payload_3 = (PrtSet)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PMachineValue TMP_tmp0_8 = null;
            PMachineValue TMP_tmp1_7 = null;
            PEvent TMP_tmp2_4 = null;
            PMachineValue TMP_tmp3_4 = null;
            participants_1 = (PrtSet)(((PrtSet)((IPrtValue)payload_3)?.Clone()));
            TMP_tmp0_8 = (PMachineValue)(currentMachine.self);
            TMP_tmp1_7 = (PMachineValue)(GlobalFunctions.CreateTimer(TMP_tmp0_8, currentMachine));
            timer_2 = TMP_tmp1_7;
            TMP_tmp2_4 = (PEvent)(new eInformCoordinator(null));
            TMP_tmp3_4 = (PMachineValue)(currentMachine.self);
            BroadcastToAllParticipants(TMP_tmp2_4, TMP_tmp3_4);
            currentMachine.TryGotoState<WaitForTransactions>();
            return;
        }
        public void Anon_1(Event currentMachine_dequeuedEvent)
        {
            Coordinator currentMachine = this;
            PrtNamedTuple wTrans = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtNamedTuple TMP_tmp0_9 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp1_8 = ((PrtInt)0);
            PrtBool TMP_tmp2_5 = ((PrtBool)false);
            PMachineValue TMP_tmp3_5 = null;
            PMachineValue TMP_tmp4_3 = null;
            PEvent TMP_tmp5_3 = null;
            PrtNamedTuple TMP_tmp6_3 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp7_2 = ((PrtInt)0);
            PrtInt TMP_tmp8_1 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp9_1 = (new PrtNamedTuple(new string[]{"transId","status"},((PrtInt)0), ((PrtInt)0)));
            PEvent TMP_tmp10_1 = null;
            PrtNamedTuple TMP_tmp11_1 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PMachineValue TMP_tmp12_1 = null;
            TMP_tmp0_9 = (PrtNamedTuple)(((PrtNamedTuple)wTrans)["trans"]);
            TMP_tmp1_8 = (PrtInt)(((PrtNamedTuple)TMP_tmp0_9)["transId"]);
            TMP_tmp2_5 = (PrtBool)(((PrtBool)(((PrtSet)seenTransIds).Contains(TMP_tmp1_8))));
            if (TMP_tmp2_5)
            {
                TMP_tmp3_5 = (PMachineValue)(((PrtNamedTuple)wTrans)["client"]);
                TMP_tmp4_3 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp3_5)?.Clone()));
                TMP_tmp5_3 = (PEvent)(new eWriteTransResp((new PrtNamedTuple(new string[]{"transId","status"},((PrtInt)0), ((PrtInt)0)))));
                TMP_tmp6_3 = (PrtNamedTuple)(((PrtNamedTuple)wTrans)["trans"]);
                TMP_tmp7_2 = (PrtInt)(((PrtNamedTuple)TMP_tmp6_3)["transId"]);
                TMP_tmp8_1 = (PrtInt)((PrtEnum.Get("TIMEOUT")));
                TMP_tmp9_1 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"transId","status"}, TMP_tmp7_2, TMP_tmp8_1)));
                currentMachine.TrySendEvent(TMP_tmp4_3, (Event)TMP_tmp5_3, TMP_tmp9_1);
                return ;
            }
            currentWriteTransReq = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)wTrans)?.Clone()));
            TMP_tmp10_1 = (PEvent)(new ePrepareReq((new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)))));
            TMP_tmp11_1 = (PrtNamedTuple)(((PrtNamedTuple)wTrans)["trans"]);
            BroadcastToAllParticipants(TMP_tmp10_1, TMP_tmp11_1);
            TMP_tmp12_1 = (PMachineValue)(((PMachineValue)((IPrtValue)timer_2)?.Clone()));
            GlobalFunctions.StartTimer(TMP_tmp12_1, currentMachine);
            currentMachine.TryGotoState<WaitForPrepareResponses>();
            return;
        }
        public void Anon_2(Event currentMachine_dequeuedEvent)
        {
            Coordinator currentMachine = this;
            PrtNamedTuple rTrans = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PMachineValue TMP_tmp0_10 = null;
            PMachineValue TMP_tmp1_9 = null;
            PEvent TMP_tmp2_6 = null;
            PrtNamedTuple TMP_tmp3_6 = (new PrtNamedTuple(new string[]{"client","key"},null, ((PrtString)"")));
            TMP_tmp0_10 = (PMachineValue)(((PMachineValue)currentMachine.TryRandom(participants_1)));
            TMP_tmp1_9 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp0_10)?.Clone()));
            TMP_tmp2_6 = (PEvent)(new eReadTransReq((new PrtNamedTuple(new string[]{"client","key"},null, ((PrtString)"")))));
            TMP_tmp3_6 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)rTrans)?.Clone()));
            currentMachine.TrySendEvent(TMP_tmp1_9, (Event)TMP_tmp2_6, TMP_tmp3_6);
        }
        public void Anon_3(Event currentMachine_dequeuedEvent)
        {
            Coordinator currentMachine = this;
            PrtNamedTuple resp = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtNamedTuple TMP_tmp0_11 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp1_10 = ((PrtInt)0);
            PrtInt TMP_tmp2_7 = ((PrtInt)0);
            PrtBool TMP_tmp3_7 = ((PrtBool)false);
            PrtInt TMP_tmp4_4 = ((PrtInt)0);
            PrtBool TMP_tmp5_4 = ((PrtBool)false);
            PrtInt TMP_tmp6_4 = ((PrtInt)0);
            PrtInt TMP_tmp7_3 = ((PrtInt)0);
            PrtBool TMP_tmp8_2 = ((PrtBool)false);
            PrtInt TMP_tmp9_2 = ((PrtInt)0);
            TMP_tmp0_11 = (PrtNamedTuple)(((PrtNamedTuple)currentWriteTransReq)["trans"]);
            TMP_tmp1_10 = (PrtInt)(((PrtNamedTuple)TMP_tmp0_11)["transId"]);
            TMP_tmp2_7 = (PrtInt)(((PrtNamedTuple)resp)["transId"]);
            TMP_tmp3_7 = (PrtBool)((PrtValues.SafeEquals(TMP_tmp1_10,TMP_tmp2_7)));
            if (TMP_tmp3_7)
            {
                TMP_tmp4_4 = (PrtInt)(((PrtNamedTuple)resp)["status"]);
                TMP_tmp5_4 = (PrtBool)((PrtValues.SafeEquals(PrtValues.Box((long) TMP_tmp4_4),PrtValues.Box((long) (PrtEnum.Get("SUCCESS"))))));
                if (TMP_tmp5_4)
                {
                    TMP_tmp6_4 = (PrtInt)((countPrepareResponses) + (((PrtInt)1)));
                    countPrepareResponses = TMP_tmp6_4;
                    TMP_tmp7_3 = (PrtInt)(((PrtInt)(participants_1).Count));
                    TMP_tmp8_2 = (PrtBool)((PrtValues.SafeEquals(countPrepareResponses,TMP_tmp7_3)));
                    if (TMP_tmp8_2)
                    {
                        DoGlobalCommit();
                        currentMachine.TryGotoState<WaitForTransactions>();
                        return;
                    }
                }
                else
                {
                    TMP_tmp9_2 = (PrtInt)((PrtEnum.Get("ERROR")));
                    DoGlobalAbort(TMP_tmp9_2);
                    currentMachine.TryGotoState<WaitForTransactions>();
                    return;
                }
            }
        }
        public void Anon_4(Event currentMachine_dequeuedEvent)
        {
            Coordinator currentMachine = this;
            PrtInt TMP_tmp0_12 = ((PrtInt)0);
            TMP_tmp0_12 = (PrtInt)((PrtEnum.Get("TIMEOUT")));
            DoGlobalAbort(TMP_tmp0_12);
        }
        public void Anon_5(Event currentMachine_dequeuedEvent)
        {
            Coordinator currentMachine = this;
            PrtNamedTuple rTrans_1 = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PMachineValue TMP_tmp0_13 = null;
            PMachineValue TMP_tmp1_11 = null;
            PEvent TMP_tmp2_8 = null;
            PrtNamedTuple TMP_tmp3_8 = (new PrtNamedTuple(new string[]{"client","key"},null, ((PrtString)"")));
            TMP_tmp0_13 = (PMachineValue)(((PMachineValue)currentMachine.TryRandom(participants_1)));
            TMP_tmp1_11 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp0_13)?.Clone()));
            TMP_tmp2_8 = (PEvent)(new eReadTransReq((new PrtNamedTuple(new string[]{"client","key"},null, ((PrtString)"")))));
            TMP_tmp3_8 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)rTrans_1)?.Clone()));
            currentMachine.TrySendEvent(TMP_tmp1_11, (Event)TMP_tmp2_8, TMP_tmp3_8);
        }
        public void Anon_6(Event currentMachine_dequeuedEvent)
        {
            Coordinator currentMachine = this;
            countPrepareResponses = (PrtInt)(((PrtInt)0));
        }
        public void DoGlobalAbort(PrtInt respStatus)
        {
            Coordinator currentMachine = this;
            PEvent TMP_tmp0_14 = null;
            PrtNamedTuple TMP_tmp1_12 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp2_9 = ((PrtInt)0);
            PMachineValue TMP_tmp3_9 = null;
            PMachineValue TMP_tmp4_5 = null;
            PEvent TMP_tmp5_5 = null;
            PrtNamedTuple TMP_tmp6_5 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp7_4 = ((PrtInt)0);
            PrtInt TMP_tmp8_3 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp9_3 = (new PrtNamedTuple(new string[]{"transId","status"},((PrtInt)0), ((PrtInt)0)));
            PrtBool TMP_tmp10_2 = ((PrtBool)false);
            PMachineValue TMP_tmp11_2 = null;
            TMP_tmp0_14 = (PEvent)(new eAbortTrans(((PrtInt)0)));
            TMP_tmp1_12 = (PrtNamedTuple)(((PrtNamedTuple)currentWriteTransReq)["trans"]);
            TMP_tmp2_9 = (PrtInt)(((PrtNamedTuple)TMP_tmp1_12)["transId"]);
            BroadcastToAllParticipants(TMP_tmp0_14, TMP_tmp2_9);
            TMP_tmp3_9 = (PMachineValue)(((PrtNamedTuple)currentWriteTransReq)["client"]);
            TMP_tmp4_5 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp3_9)?.Clone()));
            TMP_tmp5_5 = (PEvent)(new eWriteTransResp((new PrtNamedTuple(new string[]{"transId","status"},((PrtInt)0), ((PrtInt)0)))));
            TMP_tmp6_5 = (PrtNamedTuple)(((PrtNamedTuple)currentWriteTransReq)["trans"]);
            TMP_tmp7_4 = (PrtInt)(((PrtNamedTuple)TMP_tmp6_5)["transId"]);
            TMP_tmp8_3 = (PrtInt)(((PrtInt)((IPrtValue)respStatus)?.Clone()));
            TMP_tmp9_3 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"transId","status"}, TMP_tmp7_4, TMP_tmp8_3)));
            currentMachine.TrySendEvent(TMP_tmp4_5, (Event)TMP_tmp5_5, TMP_tmp9_3);
            TMP_tmp10_2 = (PrtBool)((!PrtValues.SafeEquals(PrtValues.Box((long) respStatus),PrtValues.Box((long) (PrtEnum.Get("TIMEOUT"))))));
            if (TMP_tmp10_2)
            {
                TMP_tmp11_2 = (PMachineValue)(((PMachineValue)((IPrtValue)timer_2)?.Clone()));
                GlobalFunctions.CancelTimer(TMP_tmp11_2, currentMachine);
            }
        }
        public void DoGlobalCommit()
        {
            Coordinator currentMachine = this;
            PEvent TMP_tmp0_15 = null;
            PrtNamedTuple TMP_tmp1_13 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp2_10 = ((PrtInt)0);
            PMachineValue TMP_tmp3_10 = null;
            PMachineValue TMP_tmp4_6 = null;
            PEvent TMP_tmp5_6 = null;
            PrtNamedTuple TMP_tmp6_6 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp7_5 = ((PrtInt)0);
            PrtInt TMP_tmp8_4 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp9_4 = (new PrtNamedTuple(new string[]{"transId","status"},((PrtInt)0), ((PrtInt)0)));
            PMachineValue TMP_tmp10_3 = null;
            TMP_tmp0_15 = (PEvent)(new eCommitTrans(((PrtInt)0)));
            TMP_tmp1_13 = (PrtNamedTuple)(((PrtNamedTuple)currentWriteTransReq)["trans"]);
            TMP_tmp2_10 = (PrtInt)(((PrtNamedTuple)TMP_tmp1_13)["transId"]);
            BroadcastToAllParticipants(TMP_tmp0_15, TMP_tmp2_10);
            TMP_tmp3_10 = (PMachineValue)(((PrtNamedTuple)currentWriteTransReq)["client"]);
            TMP_tmp4_6 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp3_10)?.Clone()));
            TMP_tmp5_6 = (PEvent)(new eWriteTransResp((new PrtNamedTuple(new string[]{"transId","status"},((PrtInt)0), ((PrtInt)0)))));
            TMP_tmp6_6 = (PrtNamedTuple)(((PrtNamedTuple)currentWriteTransReq)["trans"]);
            TMP_tmp7_5 = (PrtInt)(((PrtNamedTuple)TMP_tmp6_6)["transId"]);
            TMP_tmp8_4 = (PrtInt)((PrtEnum.Get("SUCCESS")));
            TMP_tmp9_4 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"transId","status"}, TMP_tmp7_5, TMP_tmp8_4)));
            currentMachine.TrySendEvent(TMP_tmp4_6, (Event)TMP_tmp5_6, TMP_tmp9_4);
            TMP_tmp10_3 = (PMachineValue)(((PMachineValue)((IPrtValue)timer_2)?.Clone()));
            GlobalFunctions.CancelTimer(TMP_tmp10_3, currentMachine);
        }
        public void BroadcastToAllParticipants(PEvent message_1, IPrtValue payload_4)
        {
            Coordinator currentMachine = this;
            PrtInt i_3 = ((PrtInt)0);
            PrtInt TMP_tmp0_16 = ((PrtInt)0);
            PrtBool TMP_tmp1_14 = ((PrtBool)false);
            PrtBool TMP_tmp2_11 = ((PrtBool)false);
            PMachineValue TMP_tmp3_11 = null;
            PMachineValue TMP_tmp4_7 = null;
            PEvent TMP_tmp5_7 = null;
            IPrtValue TMP_tmp6_7 = null;
            PrtInt TMP_tmp7_6 = ((PrtInt)0);
            while (((PrtBool)true))
            {
                TMP_tmp0_16 = (PrtInt)(((PrtInt)(participants_1).Count));
                TMP_tmp1_14 = (PrtBool)((i_3) < (TMP_tmp0_16));
                TMP_tmp2_11 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp1_14)?.Clone()));
                if (TMP_tmp2_11)
                {
                }
                else
                {
                    break;
                }
                TMP_tmp3_11 = (PMachineValue)(((PrtSet)participants_1)[i_3]);
                TMP_tmp4_7 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp3_11)?.Clone()));
                TMP_tmp5_7 = (PEvent)(((PEvent)((IPrtValue)message_1)?.Clone()));
                TMP_tmp6_7 = (IPrtValue)(((IPrtValue)((IPrtValue)payload_4)?.Clone()));
                currentMachine.TrySendEvent(TMP_tmp4_7, (Event)TMP_tmp5_7, TMP_tmp6_7);
                TMP_tmp7_6 = (PrtInt)((i_3) + (((PrtInt)1)));
                i_3 = TMP_tmp7_6;
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
        [OnEventDoAction(typeof(eWriteTransReq), nameof(Anon_1))]
        [OnEventDoAction(typeof(eReadTransReq), nameof(Anon_2))]
        [IgnoreEvents(typeof(ePrepareResp), typeof(eTimeOut))]
        class WaitForTransactions : State
        {
        }
        [OnEventDoAction(typeof(ePrepareResp), nameof(Anon_3))]
        [OnEventGotoState(typeof(eTimeOut), typeof(WaitForTransactions), nameof(Anon_4))]
        [OnEventDoAction(typeof(eReadTransReq), nameof(Anon_5))]
        [DeferEvents(typeof(eWriteTransReq))]
        [OnExit(nameof(Anon_6))]
        class WaitForPrepareResponses : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class Participant : PMachine
    {
        private PrtMap kvStore = new PrtMap();
        private PrtMap pendingWriteTrans = new PrtMap();
        private PMachineValue coordinator_1 = null;
        public class ConstructorEvent : PEvent{public ConstructorEvent(IPrtValue val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((IPrtValue)value); }
        public Participant() {
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
        }
        
        public void Anon_7(Event currentMachine_dequeuedEvent)
        {
            Participant currentMachine = this;
            PMachineValue coor = (PMachineValue)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            coordinator_1 = (PMachineValue)(((PMachineValue)((IPrtValue)coor)?.Clone()));
        }
        public void Anon_8(Event currentMachine_dequeuedEvent)
        {
            Participant currentMachine = this;
            PrtInt transId = (PrtInt)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtBool TMP_tmp0_17 = ((PrtBool)false);
            PrtString TMP_tmp1_15 = ((PrtString)"");
            PrtInt TMP_tmp2_12 = ((PrtInt)0);
            PrtMap TMP_tmp3_12 = new PrtMap();
            PrtString TMP_tmp4_8 = ((PrtString)"");
            PrtString TMP_tmp5_8 = ((PrtString)"");
            TMP_tmp0_17 = (PrtBool)(((PrtBool)(((PrtMap)pendingWriteTrans).ContainsKey(transId))));
            TMP_tmp1_15 = (PrtString)(((PrtString) String.Format("PSrc/Participant.p:26:7")));
            TMP_tmp2_12 = (PrtInt)(((PrtInt)((IPrtValue)transId)?.Clone()));
            TMP_tmp3_12 = (PrtMap)(((PrtMap)((IPrtValue)pendingWriteTrans)?.Clone()));
            TMP_tmp4_8 = (PrtString)(((PrtString) String.Format("Abort request for a non-pending transaction, transId: {0}, pendingTrans set: {1}",TMP_tmp2_12,TMP_tmp3_12)));
            TMP_tmp5_8 = (PrtString)(((PrtString) String.Format("{0} {1}",TMP_tmp1_15,TMP_tmp4_8)));
            currentMachine.TryAssert(TMP_tmp0_17,"Assertion Failed: " + TMP_tmp5_8);
            ((PrtMap)pendingWriteTrans).Remove(transId);
        }
        public void Anon_9(Event currentMachine_dequeuedEvent)
        {
            Participant currentMachine = this;
            PrtInt transId_1 = (PrtInt)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtBool TMP_tmp0_18 = ((PrtBool)false);
            PrtString TMP_tmp1_16 = ((PrtString)"");
            PrtInt TMP_tmp2_13 = ((PrtInt)0);
            PrtMap TMP_tmp3_13 = new PrtMap();
            PrtString TMP_tmp4_9 = ((PrtString)"");
            PrtString TMP_tmp5_9 = ((PrtString)"");
            PrtNamedTuple TMP_tmp6_8 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtString TMP_tmp7_7 = ((PrtString)"");
            PrtNamedTuple TMP_tmp8_5 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtNamedTuple TMP_tmp9_5 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            TMP_tmp0_18 = (PrtBool)(((PrtBool)(((PrtMap)pendingWriteTrans).ContainsKey(transId_1))));
            TMP_tmp1_16 = (PrtString)(((PrtString) String.Format("PSrc/Participant.p:35:7")));
            TMP_tmp2_13 = (PrtInt)(((PrtInt)((IPrtValue)transId_1)?.Clone()));
            TMP_tmp3_13 = (PrtMap)(((PrtMap)((IPrtValue)pendingWriteTrans)?.Clone()));
            TMP_tmp4_9 = (PrtString)(((PrtString) String.Format("Commit request for a non-pending transaction, transId: {0}, pendingTrans set: {1}",TMP_tmp2_13,TMP_tmp3_13)));
            TMP_tmp5_9 = (PrtString)(((PrtString) String.Format("{0} {1}",TMP_tmp1_16,TMP_tmp4_9)));
            currentMachine.TryAssert(TMP_tmp0_18,"Assertion Failed: " + TMP_tmp5_9);
            TMP_tmp6_8 = (PrtNamedTuple)(((PrtMap)pendingWriteTrans)[transId_1]);
            TMP_tmp7_7 = (PrtString)(((PrtNamedTuple)TMP_tmp6_8)["key"]);
            TMP_tmp8_5 = (PrtNamedTuple)(((PrtMap)pendingWriteTrans)[transId_1]);
            TMP_tmp9_5 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)TMP_tmp8_5)?.Clone()));
            ((PrtMap)kvStore)[TMP_tmp7_7] = TMP_tmp9_5;
            ((PrtMap)pendingWriteTrans).Remove(transId_1);
        }
        public void Anon_10(Event currentMachine_dequeuedEvent)
        {
            Participant currentMachine = this;
            PrtNamedTuple prepareReq = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtInt TMP_tmp0_19 = ((PrtInt)0);
            PrtBool TMP_tmp1_17 = ((PrtBool)false);
            PrtBool TMP_tmp2_14 = ((PrtBool)false);
            PrtString TMP_tmp3_14 = ((PrtString)"");
            PrtInt TMP_tmp4_10 = ((PrtInt)0);
            PrtMap TMP_tmp5_10 = new PrtMap();
            PrtString TMP_tmp6_9 = ((PrtString)"");
            PrtString TMP_tmp7_8 = ((PrtString)"");
            PrtInt TMP_tmp8_6 = ((PrtInt)0);
            PrtString TMP_tmp9_6 = ((PrtString)"");
            PrtBool TMP_tmp10_4 = ((PrtBool)false);
            PrtBool TMP_tmp11_3 = ((PrtBool)false);
            PrtString TMP_tmp12_2 = ((PrtString)"");
            PrtBool TMP_tmp13_1 = ((PrtBool)false);
            PrtInt TMP_tmp14_1 = ((PrtInt)0);
            PrtString TMP_tmp15_1 = ((PrtString)"");
            PrtNamedTuple TMP_tmp16_1 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp17_1 = ((PrtInt)0);
            PrtBool TMP_tmp18_1 = ((PrtBool)false);
            PrtBool TMP_tmp19_1 = ((PrtBool)false);
            PrtBool TMP_tmp20_1 = ((PrtBool)false);
            PMachineValue TMP_tmp21 = null;
            PEvent TMP_tmp22 = null;
            PMachineValue TMP_tmp23 = null;
            PrtInt TMP_tmp24 = ((PrtInt)0);
            PrtInt TMP_tmp25 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp26 = (new PrtNamedTuple(new string[]{"participant","transId","status"},null, ((PrtInt)0), ((PrtInt)0)));
            PMachineValue TMP_tmp27 = null;
            PEvent TMP_tmp28 = null;
            PMachineValue TMP_tmp29 = null;
            PrtInt TMP_tmp30 = ((PrtInt)0);
            PrtInt TMP_tmp31 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp32 = (new PrtNamedTuple(new string[]{"participant","transId","status"},null, ((PrtInt)0), ((PrtInt)0)));
            TMP_tmp0_19 = (PrtInt)(((PrtNamedTuple)prepareReq)["transId"]);
            TMP_tmp1_17 = (PrtBool)(((PrtBool)(((PrtMap)pendingWriteTrans).ContainsKey(TMP_tmp0_19))));
            TMP_tmp2_14 = (PrtBool)(!(TMP_tmp1_17));
            TMP_tmp3_14 = (PrtString)(((PrtString) String.Format("PSrc/Participant.p:46:7")));
            TMP_tmp4_10 = (PrtInt)(((PrtNamedTuple)prepareReq)["transId"]);
            TMP_tmp5_10 = (PrtMap)(((PrtMap)((IPrtValue)pendingWriteTrans)?.Clone()));
            TMP_tmp6_9 = (PrtString)(((PrtString) String.Format("Duplicate transaction ids not allowed!, received transId: {0}, pending transactions: {1}",TMP_tmp4_10,TMP_tmp5_10)));
            TMP_tmp7_8 = (PrtString)(((PrtString) String.Format("{0} {1}",TMP_tmp3_14,TMP_tmp6_9)));
            currentMachine.TryAssert(TMP_tmp2_14,"Assertion Failed: " + TMP_tmp7_8);
            TMP_tmp8_6 = (PrtInt)(((PrtNamedTuple)prepareReq)["transId"]);
            ((PrtMap)pendingWriteTrans)[TMP_tmp8_6] = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)prepareReq)?.Clone()));
            TMP_tmp9_6 = (PrtString)(((PrtNamedTuple)prepareReq)["key"]);
            TMP_tmp10_4 = (PrtBool)(((PrtBool)(((PrtMap)kvStore).ContainsKey(TMP_tmp9_6))));
            TMP_tmp11_3 = (PrtBool)(!(TMP_tmp10_4));
            TMP_tmp20_1 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp11_3)?.Clone()));
            if (TMP_tmp20_1)
            {
            }
            else
            {
                TMP_tmp12_2 = (PrtString)(((PrtNamedTuple)prepareReq)["key"]);
                TMP_tmp13_1 = (PrtBool)(((PrtBool)(((PrtMap)kvStore).ContainsKey(TMP_tmp12_2))));
                TMP_tmp19_1 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp13_1)?.Clone()));
                if (TMP_tmp19_1)
                {
                    TMP_tmp14_1 = (PrtInt)(((PrtNamedTuple)prepareReq)["transId"]);
                    TMP_tmp15_1 = (PrtString)(((PrtNamedTuple)prepareReq)["key"]);
                    TMP_tmp16_1 = (PrtNamedTuple)(((PrtMap)kvStore)[TMP_tmp15_1]);
                    TMP_tmp17_1 = (PrtInt)(((PrtNamedTuple)TMP_tmp16_1)["transId"]);
                    TMP_tmp18_1 = (PrtBool)((TMP_tmp14_1) > (TMP_tmp17_1));
                    TMP_tmp19_1 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp18_1)?.Clone()));
                }
                TMP_tmp20_1 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp19_1)?.Clone()));
            }
            if (TMP_tmp20_1)
            {
                TMP_tmp21 = (PMachineValue)(((PMachineValue)((IPrtValue)coordinator_1)?.Clone()));
                TMP_tmp22 = (PEvent)(new ePrepareResp((new PrtNamedTuple(new string[]{"participant","transId","status"},null, ((PrtInt)0), ((PrtInt)0)))));
                TMP_tmp23 = (PMachineValue)(currentMachine.self);
                TMP_tmp24 = (PrtInt)(((PrtNamedTuple)prepareReq)["transId"]);
                TMP_tmp25 = (PrtInt)((PrtEnum.Get("SUCCESS")));
                TMP_tmp26 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"participant","transId","status"}, TMP_tmp23, TMP_tmp24, TMP_tmp25)));
                currentMachine.TrySendEvent(TMP_tmp21, (Event)TMP_tmp22, TMP_tmp26);
            }
            else
            {
                TMP_tmp27 = (PMachineValue)(((PMachineValue)((IPrtValue)coordinator_1)?.Clone()));
                TMP_tmp28 = (PEvent)(new ePrepareResp((new PrtNamedTuple(new string[]{"participant","transId","status"},null, ((PrtInt)0), ((PrtInt)0)))));
                TMP_tmp29 = (PMachineValue)(currentMachine.self);
                TMP_tmp30 = (PrtInt)(((PrtNamedTuple)prepareReq)["transId"]);
                TMP_tmp31 = (PrtInt)((PrtEnum.Get("ERROR")));
                TMP_tmp32 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"participant","transId","status"}, TMP_tmp29, TMP_tmp30, TMP_tmp31)));
                currentMachine.TrySendEvent(TMP_tmp27, (Event)TMP_tmp28, TMP_tmp32);
            }
        }
        public void Anon_11(Event currentMachine_dequeuedEvent)
        {
            Participant currentMachine = this;
            PrtNamedTuple req = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtString TMP_tmp0_20 = ((PrtString)"");
            PrtBool TMP_tmp1_18 = ((PrtBool)false);
            PMachineValue TMP_tmp2_15 = null;
            PMachineValue TMP_tmp3_15 = null;
            PEvent TMP_tmp4_11 = null;
            PrtString TMP_tmp5_11 = ((PrtString)"");
            PrtString TMP_tmp6_10 = ((PrtString)"");
            PrtNamedTuple TMP_tmp7_9 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp8_7 = ((PrtInt)0);
            PrtInt TMP_tmp9_7 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp10_5 = (new PrtNamedTuple(new string[]{"key","val","status"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PMachineValue TMP_tmp11_4 = null;
            PMachineValue TMP_tmp12_3 = null;
            PEvent TMP_tmp13_2 = null;
            PrtString TMP_tmp14_2 = ((PrtString)"");
            PrtInt TMP_tmp15_2 = ((PrtInt)0);
            PrtInt TMP_tmp16_2 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp17_2 = (new PrtNamedTuple(new string[]{"key","val","status"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            TMP_tmp0_20 = (PrtString)(((PrtNamedTuple)req)["key"]);
            TMP_tmp1_18 = (PrtBool)(((PrtBool)(((PrtMap)kvStore).ContainsKey(TMP_tmp0_20))));
            if (TMP_tmp1_18)
            {
                TMP_tmp2_15 = (PMachineValue)(((PrtNamedTuple)req)["client"]);
                TMP_tmp3_15 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp2_15)?.Clone()));
                TMP_tmp4_11 = (PEvent)(new eReadTransResp((new PrtNamedTuple(new string[]{"key","val","status"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)))));
                TMP_tmp5_11 = (PrtString)(((PrtNamedTuple)req)["key"]);
                TMP_tmp6_10 = (PrtString)(((PrtNamedTuple)req)["key"]);
                TMP_tmp7_9 = (PrtNamedTuple)(((PrtMap)kvStore)[TMP_tmp6_10]);
                TMP_tmp8_7 = (PrtInt)(((PrtNamedTuple)TMP_tmp7_9)["val"]);
                TMP_tmp9_7 = (PrtInt)((PrtEnum.Get("SUCCESS")));
                TMP_tmp10_5 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"key","val","status"}, TMP_tmp5_11, TMP_tmp8_7, TMP_tmp9_7)));
                currentMachine.TrySendEvent(TMP_tmp3_15, (Event)TMP_tmp4_11, TMP_tmp10_5);
            }
            else
            {
                TMP_tmp11_4 = (PMachineValue)(((PrtNamedTuple)req)["client"]);
                TMP_tmp12_3 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp11_4)?.Clone()));
                TMP_tmp13_2 = (PEvent)(new eReadTransResp((new PrtNamedTuple(new string[]{"key","val","status"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)))));
                TMP_tmp14_2 = (PrtString)(((PrtString) String.Format("")));
                TMP_tmp15_2 = (PrtInt)(-(((PrtInt)1)));
                TMP_tmp16_2 = (PrtInt)((PrtEnum.Get("ERROR")));
                TMP_tmp17_2 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"key","val","status"}, TMP_tmp14_2, TMP_tmp15_2, TMP_tmp16_2)));
                currentMachine.TrySendEvent(TMP_tmp12_3, (Event)TMP_tmp13_2, TMP_tmp17_2);
            }
        }
        public void Anon_12(Event currentMachine_dequeuedEvent)
        {
            Participant currentMachine = this;
            PEvent TMP_tmp0_21 = null;
            TMP_tmp0_21 = (PEvent)(new PHalt(null));
            currentMachine.TryRaiseEvent((Event)TMP_tmp0_21);
            return;
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEventGotoState(typeof(eInformCoordinator), typeof(WaitForRequests), nameof(Anon_7))]
        [DeferEvents(typeof(eShutDown))]
        class Init : State
        {
        }
        [OnEventDoAction(typeof(eAbortTrans), nameof(Anon_8))]
        [OnEventDoAction(typeof(eCommitTrans), nameof(Anon_9))]
        [OnEventDoAction(typeof(ePrepareReq), nameof(Anon_10))]
        [OnEventDoAction(typeof(eReadTransReq), nameof(Anon_11))]
        [OnEventDoAction(typeof(eShutDown), nameof(Anon_12))]
        class WaitForRequests : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class AtomicityInvariant : PMonitor
    {
        private PrtMap participantsResponse = new PrtMap();
        private PrtInt numParticipants_1 = ((PrtInt)0);
        static AtomicityInvariant() {
            observes.Add(nameof(eMonitor_AtomicityInitialize));
            observes.Add(nameof(ePrepareResp));
            observes.Add(nameof(eWriteTransResp));
        }
        
        public void Anon_13(Event currentMachine_dequeuedEvent)
        {
            AtomicityInvariant currentMachine = this;
            PrtInt n = (PrtInt)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            numParticipants_1 = (PrtInt)(((PrtInt)((IPrtValue)n)?.Clone()));
        }
        public void Anon_14(Event currentMachine_dequeuedEvent)
        {
            AtomicityInvariant currentMachine = this;
            PrtNamedTuple resp_1 = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtInt transId_2 = ((PrtInt)0);
            PrtInt TMP_tmp0_22 = ((PrtInt)0);
            PrtInt TMP_tmp1_19 = ((PrtInt)0);
            PrtBool TMP_tmp2_16 = ((PrtBool)false);
            PrtBool TMP_tmp3_16 = ((PrtBool)false);
            PrtMap TMP_tmp4_12 = new PrtMap();
            PrtInt TMP_tmp5_12 = ((PrtInt)0);
            PrtMap TMP_tmp6_11 = new PrtMap();
            PrtInt TMP_tmp7_10 = ((PrtInt)0);
            PrtInt TMP_tmp8_8 = ((PrtInt)0);
            PrtInt TMP_tmp9_8 = ((PrtInt)0);
            TMP_tmp0_22 = (PrtInt)(((PrtNamedTuple)resp_1)["transId"]);
            TMP_tmp1_19 = (PrtInt)(((PrtInt)((IPrtValue)TMP_tmp0_22)?.Clone()));
            transId_2 = TMP_tmp1_19;
            TMP_tmp2_16 = (PrtBool)(((PrtBool)(((PrtMap)participantsResponse).ContainsKey(transId_2))));
            TMP_tmp3_16 = (PrtBool)(!(TMP_tmp2_16));
            if (TMP_tmp3_16)
            {
                TMP_tmp4_12 = (PrtMap)(new PrtMap());
                ((PrtMap)participantsResponse)[transId_2] = TMP_tmp4_12;
                ((PrtMap)((PrtMap)participantsResponse)[transId_2])[(PrtEnum.Get("SUCCESS"))] = (PrtInt)(((PrtInt)0));
                ((PrtMap)((PrtMap)participantsResponse)[transId_2])[(PrtEnum.Get("ERROR"))] = (PrtInt)(((PrtInt)0));
            }
            TMP_tmp5_12 = (PrtInt)(((PrtNamedTuple)resp_1)["status"]);
            TMP_tmp6_11 = (PrtMap)(((PrtMap)participantsResponse)[transId_2]);
            TMP_tmp7_10 = (PrtInt)(((PrtNamedTuple)resp_1)["status"]);
            TMP_tmp8_8 = (PrtInt)(((PrtMap)TMP_tmp6_11)[TMP_tmp7_10]);
            TMP_tmp9_8 = (PrtInt)((TMP_tmp8_8) + (((PrtInt)1)));
            ((PrtMap)((PrtMap)participantsResponse)[transId_2])[TMP_tmp5_12] = TMP_tmp9_8;
        }
        public void Anon_15(Event currentMachine_dequeuedEvent)
        {
            AtomicityInvariant currentMachine = this;
            PrtNamedTuple resp_2 = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtInt TMP_tmp0_23 = ((PrtInt)0);
            PrtBool TMP_tmp1_20 = ((PrtBool)false);
            PrtInt TMP_tmp2_17 = ((PrtInt)0);
            PrtBool TMP_tmp3_17 = ((PrtBool)false);
            PrtBool TMP_tmp4_13 = ((PrtBool)false);
            PrtString TMP_tmp5_13 = ((PrtString)"");
            PrtString TMP_tmp6_12 = ((PrtString)"");
            PrtString TMP_tmp7_11 = ((PrtString)"");
            PrtInt TMP_tmp8_9 = ((PrtInt)0);
            PrtBool TMP_tmp9_9 = ((PrtBool)false);
            PrtInt TMP_tmp10_6 = ((PrtInt)0);
            PrtMap TMP_tmp11_5 = new PrtMap();
            PrtInt TMP_tmp12_4 = ((PrtInt)0);
            PrtBool TMP_tmp13_3 = ((PrtBool)false);
            PrtString TMP_tmp14_3 = ((PrtString)"");
            PrtString TMP_tmp15_3 = ((PrtString)"");
            PrtInt TMP_tmp16_3 = ((PrtInt)0);
            PrtMap TMP_tmp17_3 = new PrtMap();
            PrtInt TMP_tmp18_2 = ((PrtInt)0);
            PrtInt TMP_tmp19_2 = ((PrtInt)0);
            PrtMap TMP_tmp20_2 = new PrtMap();
            PrtInt TMP_tmp21_1 = ((PrtInt)0);
            PrtString TMP_tmp22_1 = ((PrtString)"");
            PrtString TMP_tmp23_1 = ((PrtString)"");
            PrtString TMP_tmp24_1 = ((PrtString)"");
            PrtInt TMP_tmp25_1 = ((PrtInt)0);
            PrtBool TMP_tmp26_1 = ((PrtBool)false);
            PrtInt TMP_tmp27_1 = ((PrtInt)0);
            PrtMap TMP_tmp28_1 = new PrtMap();
            PrtInt TMP_tmp29_1 = ((PrtInt)0);
            PrtBool TMP_tmp30_1 = ((PrtBool)false);
            PrtString TMP_tmp31_1 = ((PrtString)"");
            PrtInt TMP_tmp32_1 = ((PrtInt)0);
            PrtString TMP_tmp33 = ((PrtString)"");
            PrtInt TMP_tmp34 = ((PrtInt)0);
            PrtMap TMP_tmp35 = new PrtMap();
            PrtInt TMP_tmp36 = ((PrtInt)0);
            PrtInt TMP_tmp37 = ((PrtInt)0);
            PrtMap TMP_tmp38 = new PrtMap();
            PrtInt TMP_tmp39 = ((PrtInt)0);
            PrtString TMP_tmp40 = ((PrtString)"");
            PrtString TMP_tmp41 = ((PrtString)"");
            PrtString TMP_tmp42 = ((PrtString)"");
            PrtInt TMP_tmp43 = ((PrtInt)0);
            TMP_tmp0_23 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
            TMP_tmp1_20 = (PrtBool)(((PrtBool)(((PrtMap)participantsResponse).ContainsKey(TMP_tmp0_23))));
            TMP_tmp4_13 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp1_20)?.Clone()));
            if (TMP_tmp4_13)
            {
            }
            else
            {
                TMP_tmp2_17 = (PrtInt)(((PrtNamedTuple)resp_2)["status"]);
                TMP_tmp3_17 = (PrtBool)((PrtValues.SafeEquals(PrtValues.Box((long) TMP_tmp2_17),PrtValues.Box((long) (PrtEnum.Get("TIMEOUT"))))));
                TMP_tmp4_13 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp3_17)?.Clone()));
            }
            TMP_tmp5_13 = (PrtString)(((PrtString) String.Format("PSpec/Atomicity.p:34:7")));
            TMP_tmp6_12 = (PrtString)(((PrtString) String.Format("Write transaction was responded to the client without receiving any responses from the participants!")));
            TMP_tmp7_11 = (PrtString)(((PrtString) String.Format("{0} {1}",TMP_tmp5_13,TMP_tmp6_12)));
            currentMachine.TryAssert(TMP_tmp4_13,"Assertion Failed: " + TMP_tmp7_11);
            TMP_tmp8_9 = (PrtInt)(((PrtNamedTuple)resp_2)["status"]);
            TMP_tmp9_9 = (PrtBool)((PrtValues.SafeEquals(PrtValues.Box((long) TMP_tmp8_9),PrtValues.Box((long) (PrtEnum.Get("SUCCESS"))))));
            if (TMP_tmp9_9)
            {
                TMP_tmp10_6 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
                TMP_tmp11_5 = (PrtMap)(((PrtMap)participantsResponse)[TMP_tmp10_6]);
                TMP_tmp12_4 = (PrtInt)(((PrtMap)TMP_tmp11_5)[(PrtEnum.Get("SUCCESS"))]);
                TMP_tmp13_3 = (PrtBool)((PrtValues.SafeEquals(TMP_tmp12_4,numParticipants_1)));
                TMP_tmp14_3 = (PrtString)(((PrtString) String.Format("PSpec/Atomicity.p:39:9")));
                TMP_tmp15_3 = (PrtString)(((PrtString) String.Format("Write transaction was responded as committed before receiving success from all participants. ")));
                TMP_tmp16_3 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
                TMP_tmp17_3 = (PrtMap)(((PrtMap)participantsResponse)[TMP_tmp16_3]);
                TMP_tmp18_2 = (PrtInt)(((PrtMap)TMP_tmp17_3)[(PrtEnum.Get("SUCCESS"))]);
                TMP_tmp19_2 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
                TMP_tmp20_2 = (PrtMap)(((PrtMap)participantsResponse)[TMP_tmp19_2]);
                TMP_tmp21_1 = (PrtInt)(((PrtMap)TMP_tmp20_2)[(PrtEnum.Get("ERROR"))]);
                TMP_tmp22_1 = (PrtString)(((PrtString) String.Format("participants sent success: {0}, participants sent error: {1}",TMP_tmp18_2,TMP_tmp21_1)));
                TMP_tmp23_1 = (PrtString)((TMP_tmp15_3) + (TMP_tmp22_1));
                TMP_tmp24_1 = (PrtString)(((PrtString) String.Format("{0} {1}",TMP_tmp14_3,TMP_tmp23_1)));
                currentMachine.TryAssert(TMP_tmp13_3,"Assertion Failed: " + TMP_tmp24_1);
            }
            else
            {
                TMP_tmp25_1 = (PrtInt)(((PrtNamedTuple)resp_2)["status"]);
                TMP_tmp26_1 = (PrtBool)((PrtValues.SafeEquals(PrtValues.Box((long) TMP_tmp25_1),PrtValues.Box((long) (PrtEnum.Get("ERROR"))))));
                if (TMP_tmp26_1)
                {
                    TMP_tmp27_1 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
                    TMP_tmp28_1 = (PrtMap)(((PrtMap)participantsResponse)[TMP_tmp27_1]);
                    TMP_tmp29_1 = (PrtInt)(((PrtMap)TMP_tmp28_1)[(PrtEnum.Get("ERROR"))]);
                    TMP_tmp30_1 = (PrtBool)((TMP_tmp29_1) > (((PrtInt)0)));
                    TMP_tmp31_1 = (PrtString)(((PrtString) String.Format("PSpec/Atomicity.p:46:9")));
                    TMP_tmp32_1 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
                    TMP_tmp33 = (PrtString)(((PrtString) String.Format("Write transaction {0} was responded as failed before receiving error from atleast one participant.",TMP_tmp32_1)));
                    TMP_tmp34 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
                    TMP_tmp35 = (PrtMap)(((PrtMap)participantsResponse)[TMP_tmp34]);
                    TMP_tmp36 = (PrtInt)(((PrtMap)TMP_tmp35)[(PrtEnum.Get("SUCCESS"))]);
                    TMP_tmp37 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
                    TMP_tmp38 = (PrtMap)(((PrtMap)participantsResponse)[TMP_tmp37]);
                    TMP_tmp39 = (PrtInt)(((PrtMap)TMP_tmp38)[(PrtEnum.Get("ERROR"))]);
                    TMP_tmp40 = (PrtString)(((PrtString) String.Format("participants sent success: {0}, participants sent error: {1}",TMP_tmp36,TMP_tmp39)));
                    TMP_tmp41 = (PrtString)((TMP_tmp33) + (TMP_tmp40));
                    TMP_tmp42 = (PrtString)(((PrtString) String.Format("{0} {1}",TMP_tmp31_1,TMP_tmp41)));
                    currentMachine.TryAssert(TMP_tmp30_1,"Assertion Failed: " + TMP_tmp42);
                }
            }
            TMP_tmp43 = (PrtInt)(((PrtNamedTuple)resp_2)["transId"]);
            ((PrtMap)participantsResponse).Remove(TMP_tmp43);
        }
        [Start]
        [OnEventGotoState(typeof(eMonitor_AtomicityInitialize), typeof(WaitForEvents), nameof(Anon_13))]
        class Init : State
        {
        }
        [OnEventDoAction(typeof(ePrepareResp), nameof(Anon_14))]
        [OnEventDoAction(typeof(eWriteTransResp), nameof(Anon_15))]
        class WaitForEvents : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class Progress : PMonitor
    {
        private PrtInt pendingTransactions = ((PrtInt)0);
        static Progress() {
            observes.Add(nameof(eWriteTransReq));
            observes.Add(nameof(eWriteTransResp));
        }
        
        public void Anon_16(Event currentMachine_dequeuedEvent)
        {
            Progress currentMachine = this;
            PrtInt TMP_tmp0_24 = ((PrtInt)0);
            TMP_tmp0_24 = (PrtInt)((pendingTransactions) + (((PrtInt)1)));
            pendingTransactions = TMP_tmp0_24;
        }
        public void Anon_17(Event currentMachine_dequeuedEvent)
        {
            Progress currentMachine = this;
            PrtInt TMP_tmp0_25 = ((PrtInt)0);
            PrtBool TMP_tmp1_21 = ((PrtBool)false);
            TMP_tmp0_25 = (PrtInt)((pendingTransactions) - (((PrtInt)1)));
            pendingTransactions = TMP_tmp0_25;
            TMP_tmp1_21 = (PrtBool)((PrtValues.SafeEquals(pendingTransactions,((PrtInt)0))));
            if (TMP_tmp1_21)
            {
                currentMachine.TryGotoState<AllTransactionsFinished>();
                return;
            }
        }
        public void Anon_18(Event currentMachine_dequeuedEvent)
        {
            Progress currentMachine = this;
            PrtInt TMP_tmp0_26 = ((PrtInt)0);
            TMP_tmp0_26 = (PrtInt)((pendingTransactions) + (((PrtInt)1)));
            pendingTransactions = TMP_tmp0_26;
        }
        public void Anon_19(Event currentMachine_dequeuedEvent)
        {
            Progress currentMachine = this;
            PrtInt TMP_tmp0_27 = ((PrtInt)0);
            TMP_tmp0_27 = (PrtInt)((pendingTransactions) + (((PrtInt)1)));
            pendingTransactions = TMP_tmp0_27;
        }
        [Start]
        [OnEventGotoState(typeof(eWriteTransReq), typeof(WaitForResponses), nameof(Anon_16))]
        class Init : State
        {
        }
        [Hot]
        [OnEventDoAction(typeof(eWriteTransResp), nameof(Anon_17))]
        [OnEventDoAction(typeof(eWriteTransReq), nameof(Anon_18))]
        class WaitForResponses : State
        {
        }
        [Cold]
        [OnEventGotoState(typeof(eWriteTransReq), typeof(WaitForResponses), nameof(Anon_19))]
        class AllTransactionsFinished : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class SingleClientNoFailure : PMachine
    {
        public class ConstructorEvent : PEvent{public ConstructorEvent(IPrtValue val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((IPrtValue)value); }
        public SingleClientNoFailure() {
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
            this.creates.Add(nameof(I_Client));
            this.creates.Add(nameof(I_Coordinator));
            this.creates.Add(nameof(I_FailureInjector));
            this.creates.Add(nameof(I_Participant));
        }
        
        public void Anon_20(Event currentMachine_dequeuedEvent)
        {
            SingleClientNoFailure currentMachine = this;
            PrtNamedTuple config_2 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp0_28 = ((PrtInt)0);
            PrtInt TMP_tmp1_22 = ((PrtInt)0);
            PrtInt TMP_tmp2_18 = ((PrtInt)0);
            PrtInt TMP_tmp3_18 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp4_14 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            PrtNamedTuple TMP_tmp5_14 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            TMP_tmp0_28 = (PrtInt)(((PrtInt)1));
            TMP_tmp1_22 = (PrtInt)(((PrtInt)3));
            TMP_tmp2_18 = (PrtInt)(((PrtInt)2));
            TMP_tmp3_18 = (PrtInt)(((PrtInt)0));
            TMP_tmp4_14 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"}, TMP_tmp0_28, TMP_tmp1_22, TMP_tmp2_18, TMP_tmp3_18)));
            config_2 = TMP_tmp4_14;
            TMP_tmp5_14 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)config_2)?.Clone()));
            GlobalFunctions.SetUpTwoPhaseCommitSystem(TMP_tmp5_14, currentMachine);
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEntry(nameof(Anon_20))]
        class Init : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class MultipleClientsNoFailure : PMachine
    {
        public class ConstructorEvent : PEvent{public ConstructorEvent(IPrtValue val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((IPrtValue)value); }
        public MultipleClientsNoFailure() {
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
            this.creates.Add(nameof(I_Client));
            this.creates.Add(nameof(I_Coordinator));
            this.creates.Add(nameof(I_FailureInjector));
            this.creates.Add(nameof(I_Participant));
        }
        
        public void Anon_21(Event currentMachine_dequeuedEvent)
        {
            MultipleClientsNoFailure currentMachine = this;
            PrtNamedTuple config_3 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp0_29 = ((PrtInt)0);
            PrtInt TMP_tmp1_23 = ((PrtInt)0);
            PrtInt TMP_tmp2_19 = ((PrtInt)0);
            PrtInt TMP_tmp3_19 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp4_15 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            PrtNamedTuple TMP_tmp5_15 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            TMP_tmp0_29 = (PrtInt)(((PrtInt)2));
            TMP_tmp1_23 = (PrtInt)(((PrtInt)3));
            TMP_tmp2_19 = (PrtInt)(((PrtInt)2));
            TMP_tmp3_19 = (PrtInt)(((PrtInt)0));
            TMP_tmp4_15 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"}, TMP_tmp0_29, TMP_tmp1_23, TMP_tmp2_19, TMP_tmp3_19)));
            config_3 = TMP_tmp4_15;
            TMP_tmp5_15 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)config_3)?.Clone()));
            GlobalFunctions.SetUpTwoPhaseCommitSystem(TMP_tmp5_15, currentMachine);
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEntry(nameof(Anon_21))]
        class Init : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class MultipleClientsWithFailure : PMachine
    {
        public class ConstructorEvent : PEvent{public ConstructorEvent(IPrtValue val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((IPrtValue)value); }
        public MultipleClientsWithFailure() {
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
            this.creates.Add(nameof(I_Client));
            this.creates.Add(nameof(I_Coordinator));
            this.creates.Add(nameof(I_FailureInjector));
            this.creates.Add(nameof(I_Participant));
        }
        
        public void Anon_22(Event currentMachine_dequeuedEvent)
        {
            MultipleClientsWithFailure currentMachine = this;
            PrtNamedTuple config_4 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            PrtInt TMP_tmp0_30 = ((PrtInt)0);
            PrtInt TMP_tmp1_24 = ((PrtInt)0);
            PrtInt TMP_tmp2_20 = ((PrtInt)0);
            PrtInt TMP_tmp3_20 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp4_16 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            PrtNamedTuple TMP_tmp5_16 = (new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"},((PrtInt)0), ((PrtInt)0), ((PrtInt)0), ((PrtInt)0)));
            TMP_tmp0_30 = (PrtInt)(((PrtInt)2));
            TMP_tmp1_24 = (PrtInt)(((PrtInt)3));
            TMP_tmp2_20 = (PrtInt)(((PrtInt)2));
            TMP_tmp3_20 = (PrtInt)(((PrtInt)1));
            TMP_tmp4_16 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"numClients","numParticipants","numTransPerClient","failParticipants"}, TMP_tmp0_30, TMP_tmp1_24, TMP_tmp2_20, TMP_tmp3_20)));
            config_4 = TMP_tmp4_16;
            TMP_tmp5_16 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)config_4)?.Clone()));
            GlobalFunctions.SetUpTwoPhaseCommitSystem(TMP_tmp5_16, currentMachine);
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEntry(nameof(Anon_22))]
        class Init : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class Client : PMachine
    {
        private PMachineValue coordinator_2 = null;
        private PrtNamedTuple currTransaction = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
        private PrtInt N = ((PrtInt)0);
        private PrtInt id = ((PrtInt)0);
        public class ConstructorEvent : PEvent{public ConstructorEvent(PrtNamedTuple val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((PrtNamedTuple)value); }
        public Client() {
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
        }
        
        public void Anon_23(Event currentMachine_dequeuedEvent)
        {
            Client currentMachine = this;
            PrtNamedTuple payload_5 = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PMachineValue TMP_tmp0_31 = null;
            PMachineValue TMP_tmp1_25 = null;
            PrtInt TMP_tmp2_21 = ((PrtInt)0);
            PrtInt TMP_tmp3_21 = ((PrtInt)0);
            PrtInt TMP_tmp4_17 = ((PrtInt)0);
            PrtInt TMP_tmp5_17 = ((PrtInt)0);
            TMP_tmp0_31 = (PMachineValue)(((PrtNamedTuple)payload_5)["coordinator"]);
            TMP_tmp1_25 = (PMachineValue)(((PMachineValue)((IPrtValue)TMP_tmp0_31)?.Clone()));
            coordinator_2 = TMP_tmp1_25;
            TMP_tmp2_21 = (PrtInt)(((PrtNamedTuple)payload_5)["n"]);
            TMP_tmp3_21 = (PrtInt)(((PrtInt)((IPrtValue)TMP_tmp2_21)?.Clone()));
            N = TMP_tmp3_21;
            TMP_tmp4_17 = (PrtInt)(((PrtNamedTuple)payload_5)["id"]);
            TMP_tmp5_17 = (PrtInt)(((PrtInt)((IPrtValue)TMP_tmp4_17)?.Clone()));
            id = TMP_tmp5_17;
            currentMachine.TryGotoState<SendWriteTransaction>();
            return;
        }
        public void Anon_24(Event currentMachine_dequeuedEvent)
        {
            Client currentMachine = this;
            PrtInt TMP_tmp0_32 = ((PrtInt)0);
            PrtInt TMP_tmp1_26 = ((PrtInt)0);
            PrtNamedTuple TMP_tmp2_22 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PMachineValue TMP_tmp3_22 = null;
            PEvent TMP_tmp4_18 = null;
            PMachineValue TMP_tmp5_18 = null;
            PrtNamedTuple TMP_tmp6_13 = (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)));
            PrtNamedTuple TMP_tmp7_12 = (new PrtNamedTuple(new string[]{"client","trans"},null, (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)))));
            TMP_tmp0_32 = (PrtInt)((id) * (((PrtInt)100)));
            TMP_tmp1_26 = (PrtInt)((TMP_tmp0_32) + (N));
            TMP_tmp2_22 = (PrtNamedTuple)(GlobalFunctions.ChooseRandomTransaction(TMP_tmp1_26, currentMachine));
            currTransaction = TMP_tmp2_22;
            TMP_tmp3_22 = (PMachineValue)(((PMachineValue)((IPrtValue)coordinator_2)?.Clone()));
            TMP_tmp4_18 = (PEvent)(new eWriteTransReq((new PrtNamedTuple(new string[]{"client","trans"},null, (new PrtNamedTuple(new string[]{"key","val","transId"},((PrtString)""), ((PrtInt)0), ((PrtInt)0)))))));
            TMP_tmp5_18 = (PMachineValue)(currentMachine.self);
            TMP_tmp6_13 = (PrtNamedTuple)(((PrtNamedTuple)((IPrtValue)currTransaction)?.Clone()));
            TMP_tmp7_12 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"client","trans"}, TMP_tmp5_18, TMP_tmp6_13)));
            currentMachine.TrySendEvent(TMP_tmp3_22, (Event)TMP_tmp4_18, TMP_tmp7_12);
        }
        public async Task Anon_25(Event currentMachine_dequeuedEvent)
        {
            Client currentMachine = this;
            PrtNamedTuple writeResp = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtInt TMP_tmp0_33 = ((PrtInt)0);
            PrtBool TMP_tmp1_27 = ((PrtBool)false);
            PMachineValue TMP_tmp2_23 = null;
            PEvent TMP_tmp3_23 = null;
            PMachineValue TMP_tmp4_19 = null;
            PrtString TMP_tmp5_19 = ((PrtString)"");
            PrtNamedTuple TMP_tmp6_14 = (new PrtNamedTuple(new string[]{"client","key"},null, ((PrtString)"")));
            PrtString TMP_tmp7_13 = ((PrtString)"");
            PrtString TMP_tmp8_10 = ((PrtString)"");
            PrtBool TMP_tmp9_10 = ((PrtBool)false);
            PrtInt TMP_tmp10_7 = ((PrtInt)0);
            PrtInt TMP_tmp11_6 = ((PrtInt)0);
            PrtBool TMP_tmp12_5 = ((PrtBool)false);
            PrtBool TMP_tmp13_4 = ((PrtBool)false);
            PrtString TMP_tmp14_4 = ((PrtString)"");
            PrtInt TMP_tmp15_4 = ((PrtInt)0);
            PrtInt TMP_tmp16_4 = ((PrtInt)0);
            PrtString TMP_tmp17_4 = ((PrtString)"");
            PrtString TMP_tmp18_3 = ((PrtString)"");
            PrtBool TMP_tmp19_3 = ((PrtBool)false);
            PrtInt TMP_tmp20_3 = ((PrtInt)0);
            TMP_tmp0_33 = (PrtInt)(((PrtNamedTuple)writeResp)["status"]);
            TMP_tmp1_27 = (PrtBool)((PrtValues.SafeEquals(PrtValues.Box((long) TMP_tmp0_33),PrtValues.Box((long) (PrtEnum.Get("SUCCESS"))))));
            if (TMP_tmp1_27)
            {
                TMP_tmp2_23 = (PMachineValue)(((PMachineValue)((IPrtValue)coordinator_2)?.Clone()));
                TMP_tmp3_23 = (PEvent)(new eReadTransReq((new PrtNamedTuple(new string[]{"client","key"},null, ((PrtString)"")))));
                TMP_tmp4_19 = (PMachineValue)(currentMachine.self);
                TMP_tmp5_19 = (PrtString)(((PrtNamedTuple)currTransaction)["key"]);
                TMP_tmp6_14 = (PrtNamedTuple)((new PrtNamedTuple(new string[]{"client","key"}, TMP_tmp4_19, TMP_tmp5_19)));
                currentMachine.TrySendEvent(TMP_tmp2_23, (Event)TMP_tmp3_23, TMP_tmp6_14);
                var PGEN_recvEvent = await currentMachine.TryReceiveEvent(typeof(eReadTransResp), typeof(PHalt));
                switch (PGEN_recvEvent) {
                    case PHalt _hv: { currentMachine.TryRaiseEvent(_hv); break;} 
                    case eReadTransResp PGEN_evt: {
                        PrtNamedTuple readResp = (PrtNamedTuple)(PGEN_evt.Payload);
                        TMP_tmp7_13 = (PrtString)(((PrtNamedTuple)readResp)["key"]);
                        TMP_tmp8_10 = (PrtString)(((PrtNamedTuple)currTransaction)["key"]);
                        TMP_tmp9_10 = (PrtBool)((PrtValues.SafeEquals(TMP_tmp7_13,TMP_tmp8_10)));
                        TMP_tmp13_4 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp9_10)?.Clone()));
                        if (TMP_tmp13_4)
                        {
                            TMP_tmp10_7 = (PrtInt)(((PrtNamedTuple)readResp)["val"]);
                            TMP_tmp11_6 = (PrtInt)(((PrtNamedTuple)currTransaction)["val"]);
                            TMP_tmp12_5 = (PrtBool)((PrtValues.SafeEquals(TMP_tmp10_7,TMP_tmp11_6)));
                            TMP_tmp13_4 = (PrtBool)(((PrtBool)((IPrtValue)TMP_tmp12_5)?.Clone()));
                        }
                        TMP_tmp14_4 = (PrtString)(((PrtString) String.Format("PTst/Client.p:42:13")));
                        TMP_tmp15_4 = (PrtInt)(((PrtNamedTuple)readResp)["val"]);
                        TMP_tmp16_4 = (PrtInt)(((PrtNamedTuple)currTransaction)["val"]);
                        TMP_tmp17_4 = (PrtString)(((PrtString) String.Format("Record read is not same as what was written by the client:: read - {0}, written - {1}",TMP_tmp15_4,TMP_tmp16_4)));
                        TMP_tmp18_3 = (PrtString)(((PrtString) String.Format("{0} {1}",TMP_tmp14_4,TMP_tmp17_4)));
                        currentMachine.TryAssert(TMP_tmp13_4,"Assertion Failed: " + TMP_tmp18_3);
                    } break;
                }
            }
            TMP_tmp19_3 = (PrtBool)((N) > (((PrtInt)0)));
            if (TMP_tmp19_3)
            {
                TMP_tmp20_3 = (PrtInt)((N) - (((PrtInt)1)));
                N = TMP_tmp20_3;
                currentMachine.TryGotoState<SendWriteTransaction>();
                return;
            }
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEntry(nameof(Anon_23))]
        class Init : State
        {
        }
        [OnEntry(nameof(Anon_24))]
        [OnEventGotoState(typeof(eWriteTransResp), typeof(ConfirmTransaction))]
        class SendWriteTransaction : State
        {
        }
        [OnEntry(nameof(Anon_25))]
        class ConfirmTransaction : State
        {
        }
    }
}
namespace PImplementation
{
    internal partial class Timer : PMachine
    {
        private PMachineValue client_1 = null;
        public class ConstructorEvent : PEvent{public ConstructorEvent(PMachineValue val) : base(val) { }}
        
        protected override Event GetConstructorEvent(IPrtValue value) { return new ConstructorEvent((PMachineValue)value); }
        public Timer() {
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
        }
        
        public void Anon_26(Event currentMachine_dequeuedEvent)
        {
            Timer currentMachine = this;
            PMachineValue _client = (PMachineValue)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            client_1 = (PMachineValue)(((PMachineValue)((IPrtValue)_client)?.Clone()));
            currentMachine.TryGotoState<WaitForTimerRequests>();
            return;
        }
        public void Anon_27(Event currentMachine_dequeuedEvent)
        {
            Timer currentMachine = this;
            PrtBool TMP_tmp0_34 = ((PrtBool)false);
            PMachineValue TMP_tmp1_28 = null;
            PEvent TMP_tmp2_24 = null;
            PMachineValue TMP_tmp3_24 = null;
            PEvent TMP_tmp4_20 = null;
            TMP_tmp0_34 = (PrtBool)(((PrtBool)currentMachine.TryRandomBool()));
            if (TMP_tmp0_34)
            {
                TMP_tmp1_28 = (PMachineValue)(((PMachineValue)((IPrtValue)client_1)?.Clone()));
                TMP_tmp2_24 = (PEvent)(new eTimeOut(null));
                currentMachine.TrySendEvent(TMP_tmp1_28, (Event)TMP_tmp2_24);
                currentMachine.TryGotoState<WaitForTimerRequests>();
                return;
            }
            else
            {
                TMP_tmp3_24 = (PMachineValue)(currentMachine.self);
                TMP_tmp4_20 = (PEvent)(new eDelayedTimeOut(null));
                currentMachine.TrySendEvent(TMP_tmp3_24, (Event)TMP_tmp4_20);
            }
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEntry(nameof(Anon_26))]
        class Init : State
        {
        }
        [OnEventGotoState(typeof(eStartTimer), typeof(TimerStarted))]
        [IgnoreEvents(typeof(eCancelTimer), typeof(eDelayedTimeOut))]
        class WaitForTimerRequests : State
        {
        }
        [OnEntry(nameof(Anon_27))]
        [OnEventGotoState(typeof(eDelayedTimeOut), typeof(TimerStarted))]
        [OnEventGotoState(typeof(eCancelTimer), typeof(WaitForTimerRequests))]
        [DeferEvents(typeof(eStartTimer))]
        class TimerStarted : State
        {
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
            this.sends.Add(nameof(eAbortTrans));
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eCommitTrans));
            this.sends.Add(nameof(eDelayNodeFailure));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eInformCoordinator));
            this.sends.Add(nameof(eMonitor_AtomicityInitialize));
            this.sends.Add(nameof(ePrepareReq));
            this.sends.Add(nameof(ePrepareResp));
            this.sends.Add(nameof(eReadTransReq));
            this.sends.Add(nameof(eReadTransResp));
            this.sends.Add(nameof(eShutDown));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(eWriteTransReq));
            this.sends.Add(nameof(eWriteTransResp));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eAbortTrans));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eCommitTrans));
            this.receives.Add(nameof(eDelayNodeFailure));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eInformCoordinator));
            this.receives.Add(nameof(eMonitor_AtomicityInitialize));
            this.receives.Add(nameof(ePrepareReq));
            this.receives.Add(nameof(ePrepareResp));
            this.receives.Add(nameof(eReadTransReq));
            this.receives.Add(nameof(eReadTransResp));
            this.receives.Add(nameof(eShutDown));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(eWriteTransReq));
            this.receives.Add(nameof(eWriteTransResp));
            this.receives.Add(nameof(PHalt));
        }
        
        public void Anon_28(Event currentMachine_dequeuedEvent)
        {
            FailureInjector currentMachine = this;
            PrtNamedTuple config_5 = (PrtNamedTuple)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            PrtInt TMP_tmp0_35 = ((PrtInt)0);
            PrtInt TMP_tmp1_29 = ((PrtInt)0);
            PrtSet TMP_tmp2_25 = new PrtSet();
            PrtSet TMP_tmp3_25 = new PrtSet();
            PrtInt TMP_tmp4_21 = ((PrtInt)0);
            PrtBool TMP_tmp5_20 = ((PrtBool)false);
            PrtString TMP_tmp6_15 = ((PrtString)"");
            TMP_tmp0_35 = (PrtInt)(((PrtNamedTuple)config_5)["nFailures"]);
            TMP_tmp1_29 = (PrtInt)(((PrtInt)((IPrtValue)TMP_tmp0_35)?.Clone()));
            nFailures = TMP_tmp1_29;
            TMP_tmp2_25 = (PrtSet)(((PrtNamedTuple)config_5)["nodes"]);
            TMP_tmp3_25 = (PrtSet)(((PrtSet)((IPrtValue)TMP_tmp2_25)?.Clone()));
            nodes = TMP_tmp3_25;
            TMP_tmp4_21 = (PrtInt)(((PrtInt)(nodes).Count));
            TMP_tmp5_20 = (PrtBool)((nFailures) < (TMP_tmp4_21));
            TMP_tmp6_15 = (PrtString)(((PrtString) String.Format("../Common/FailureInjector/PSrc/FailureInjector.p:16:7")));
            currentMachine.TryAssert(TMP_tmp5_20,"Assertion Failed: " + TMP_tmp6_15);
            currentMachine.TryGotoState<FailOneNode>();
            return;
        }
        public void Anon_29(Event currentMachine_dequeuedEvent)
        {
            FailureInjector currentMachine = this;
            PMachineValue fail = null;
            PrtBool TMP_tmp0_36 = ((PrtBool)false);
            PEvent TMP_tmp1_30 = null;
            PrtBool TMP_tmp2_26 = ((PrtBool)false);
            PMachineValue TMP_tmp3_26 = null;
            PMachineValue TMP_tmp4_22 = null;
            PEvent TMP_tmp5_21 = null;
            PMachineValue TMP_tmp6_16 = null;
            PrtInt TMP_tmp7_14 = ((PrtInt)0);
            PMachineValue TMP_tmp8_11 = null;
            PEvent TMP_tmp9_11 = null;
            TMP_tmp0_36 = (PrtBool)((PrtValues.SafeEquals(nFailures,((PrtInt)0))));
            if (TMP_tmp0_36)
            {
                TMP_tmp1_30 = (PEvent)(new PHalt(null));
                currentMachine.TryRaiseEvent((Event)TMP_tmp1_30);
                return;
            }
            else
            {
                TMP_tmp2_26 = (PrtBool)(((PrtBool)currentMachine.TryRandomBool()));
                if (TMP_tmp2_26)
                {
                    TMP_tmp3_26 = (PMachineValue)(((PMachineValue)currentMachine.TryRandom(nodes)));
                    fail = TMP_tmp3_26;
                    TMP_tmp4_22 = (PMachineValue)(((PMachineValue)((IPrtValue)fail)?.Clone()));
                    TMP_tmp5_21 = (PEvent)(new eShutDown(null));
                    TMP_tmp6_16 = (PMachineValue)(((PMachineValue)((IPrtValue)fail)?.Clone()));
                    currentMachine.TrySendEvent(TMP_tmp4_22, (Event)TMP_tmp5_21, TMP_tmp6_16);
                    ((PrtSet)nodes).Remove(fail);
                    TMP_tmp7_14 = (PrtInt)((nFailures) - (((PrtInt)1)));
                    nFailures = TMP_tmp7_14;
                }
                else
                {
                    TMP_tmp8_11 = (PMachineValue)(currentMachine.self);
                    TMP_tmp9_11 = (PEvent)(new eDelayNodeFailure(null));
                    currentMachine.TrySendEvent(TMP_tmp8_11, (Event)TMP_tmp9_11);
                }
            }
        }
        [Start]
        [OnEntry(nameof(InitializeParametersFunction))]
        [OnEventGotoState(typeof(ConstructorEvent), typeof(Init))]
        class __InitState__ : State { }
        
        [OnEntry(nameof(Anon_28))]
        class Init : State
        {
        }
        [OnEntry(nameof(Anon_29))]
        [OnEventGotoState(typeof(eDelayNodeFailure), typeof(FailOneNode))]
        class FailOneNode : State
        {
        }
    }
}
namespace PImplementation
{
    public class tcSingleClientNoFailure {
        public static void InitializeLinkMap() {
            PModule.linkMap.Clear();
            PModule.linkMap[nameof(I_Coordinator)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Coordinator)].Add(nameof(I_Timer), nameof(I_Timer));
            PModule.linkMap[nameof(I_Participant)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Timer)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Client)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_FailureInjector)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_SingleClientNoFailure)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_SingleClientNoFailure)].Add(nameof(I_Client), nameof(I_Client));
            PModule.linkMap[nameof(I_SingleClientNoFailure)].Add(nameof(I_Coordinator), nameof(I_Coordinator));
            PModule.linkMap[nameof(I_SingleClientNoFailure)].Add(nameof(I_FailureInjector), nameof(I_FailureInjector));
            PModule.linkMap[nameof(I_SingleClientNoFailure)].Add(nameof(I_Participant), nameof(I_Participant));
        }
        
        public static void InitializeInterfaceDefMap() {
            PModule.interfaceDefinitionMap.Clear();
            PModule.interfaceDefinitionMap.Add(nameof(I_Coordinator), typeof(Coordinator));
            PModule.interfaceDefinitionMap.Add(nameof(I_Participant), typeof(Participant));
            PModule.interfaceDefinitionMap.Add(nameof(I_Timer), typeof(Timer));
            PModule.interfaceDefinitionMap.Add(nameof(I_Client), typeof(Client));
            PModule.interfaceDefinitionMap.Add(nameof(I_FailureInjector), typeof(FailureInjector));
            PModule.interfaceDefinitionMap.Add(nameof(I_SingleClientNoFailure), typeof(SingleClientNoFailure));
        }
        
        public static void InitializeMonitorObserves() {
            PModule.monitorObserves.Clear();
        }
        
        public static void InitializeMonitorMap(IActorRuntime runtime) {
            PModule.monitorMap.Clear();
        }
        
        
        [PChecker.SystematicTesting.Test]
        public static void Execute(IActorRuntime runtime) {
            runtime.RegisterLog(new PLogFormatter());
            PModule.runtime = runtime;
            PHelper.InitializeInterfaces();
            PHelper.InitializeEnums();
            InitializeLinkMap();
            InitializeInterfaceDefMap();
            InitializeMonitorMap(runtime);
            InitializeMonitorObserves();
            runtime.CreateActor(typeof(_GodMachine), new _GodMachine.Config(typeof(SingleClientNoFailure)));
        }
    }
}
namespace PImplementation
{
    public class tcMultipleClientsNoFailure {
        public static void InitializeLinkMap() {
            PModule.linkMap.Clear();
            PModule.linkMap[nameof(I_Coordinator)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Coordinator)].Add(nameof(I_Timer), nameof(I_Timer));
            PModule.linkMap[nameof(I_Participant)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Timer)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Client)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_FailureInjector)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_MultipleClientsNoFailure)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_MultipleClientsNoFailure)].Add(nameof(I_Client), nameof(I_Client));
            PModule.linkMap[nameof(I_MultipleClientsNoFailure)].Add(nameof(I_Coordinator), nameof(I_Coordinator));
            PModule.linkMap[nameof(I_MultipleClientsNoFailure)].Add(nameof(I_FailureInjector), nameof(I_FailureInjector));
            PModule.linkMap[nameof(I_MultipleClientsNoFailure)].Add(nameof(I_Participant), nameof(I_Participant));
        }
        
        public static void InitializeInterfaceDefMap() {
            PModule.interfaceDefinitionMap.Clear();
            PModule.interfaceDefinitionMap.Add(nameof(I_Coordinator), typeof(Coordinator));
            PModule.interfaceDefinitionMap.Add(nameof(I_Participant), typeof(Participant));
            PModule.interfaceDefinitionMap.Add(nameof(I_Timer), typeof(Timer));
            PModule.interfaceDefinitionMap.Add(nameof(I_Client), typeof(Client));
            PModule.interfaceDefinitionMap.Add(nameof(I_FailureInjector), typeof(FailureInjector));
            PModule.interfaceDefinitionMap.Add(nameof(I_MultipleClientsNoFailure), typeof(MultipleClientsNoFailure));
        }
        
        public static void InitializeMonitorObserves() {
            PModule.monitorObserves.Clear();
            PModule.monitorObserves[nameof(AtomicityInvariant)] = new List<string>();
            PModule.monitorObserves[nameof(AtomicityInvariant)].Add(nameof(eMonitor_AtomicityInitialize));
            PModule.monitorObserves[nameof(AtomicityInvariant)].Add(nameof(ePrepareResp));
            PModule.monitorObserves[nameof(AtomicityInvariant)].Add(nameof(eWriteTransResp));
            PModule.monitorObserves[nameof(Progress)] = new List<string>();
            PModule.monitorObserves[nameof(Progress)].Add(nameof(eWriteTransReq));
            PModule.monitorObserves[nameof(Progress)].Add(nameof(eWriteTransResp));
        }
        
        public static void InitializeMonitorMap(IActorRuntime runtime) {
            PModule.monitorMap.Clear();
            PModule.monitorMap[nameof(I_Coordinator)] = new List<Type>();
            PModule.monitorMap[nameof(I_Coordinator)].Add(typeof(AtomicityInvariant));
            PModule.monitorMap[nameof(I_Coordinator)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_Participant)] = new List<Type>();
            PModule.monitorMap[nameof(I_Participant)].Add(typeof(AtomicityInvariant));
            PModule.monitorMap[nameof(I_Participant)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_Timer)] = new List<Type>();
            PModule.monitorMap[nameof(I_Timer)].Add(typeof(AtomicityInvariant));
            PModule.monitorMap[nameof(I_Timer)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_Client)] = new List<Type>();
            PModule.monitorMap[nameof(I_Client)].Add(typeof(AtomicityInvariant));
            PModule.monitorMap[nameof(I_Client)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_FailureInjector)] = new List<Type>();
            PModule.monitorMap[nameof(I_FailureInjector)].Add(typeof(AtomicityInvariant));
            PModule.monitorMap[nameof(I_FailureInjector)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_MultipleClientsNoFailure)] = new List<Type>();
            PModule.monitorMap[nameof(I_MultipleClientsNoFailure)].Add(typeof(AtomicityInvariant));
            PModule.monitorMap[nameof(I_MultipleClientsNoFailure)].Add(typeof(Progress));
            runtime.RegisterMonitor<AtomicityInvariant>();
            runtime.RegisterMonitor<Progress>();
        }
        
        
        [PChecker.SystematicTesting.Test]
        public static void Execute(IActorRuntime runtime) {
            runtime.RegisterLog(new PLogFormatter());
            PModule.runtime = runtime;
            PHelper.InitializeInterfaces();
            PHelper.InitializeEnums();
            InitializeLinkMap();
            InitializeInterfaceDefMap();
            InitializeMonitorMap(runtime);
            InitializeMonitorObserves();
            runtime.CreateActor(typeof(_GodMachine), new _GodMachine.Config(typeof(MultipleClientsNoFailure)));
        }
    }
}
namespace PImplementation
{
    public class tcMultipleClientsWithFailure {
        public static void InitializeLinkMap() {
            PModule.linkMap.Clear();
            PModule.linkMap[nameof(I_Coordinator)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Coordinator)].Add(nameof(I_Timer), nameof(I_Timer));
            PModule.linkMap[nameof(I_Participant)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Timer)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_Client)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_FailureInjector)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_MultipleClientsWithFailure)] = new Dictionary<string, string>();
            PModule.linkMap[nameof(I_MultipleClientsWithFailure)].Add(nameof(I_Client), nameof(I_Client));
            PModule.linkMap[nameof(I_MultipleClientsWithFailure)].Add(nameof(I_Coordinator), nameof(I_Coordinator));
            PModule.linkMap[nameof(I_MultipleClientsWithFailure)].Add(nameof(I_FailureInjector), nameof(I_FailureInjector));
            PModule.linkMap[nameof(I_MultipleClientsWithFailure)].Add(nameof(I_Participant), nameof(I_Participant));
        }
        
        public static void InitializeInterfaceDefMap() {
            PModule.interfaceDefinitionMap.Clear();
            PModule.interfaceDefinitionMap.Add(nameof(I_Coordinator), typeof(Coordinator));
            PModule.interfaceDefinitionMap.Add(nameof(I_Participant), typeof(Participant));
            PModule.interfaceDefinitionMap.Add(nameof(I_Timer), typeof(Timer));
            PModule.interfaceDefinitionMap.Add(nameof(I_Client), typeof(Client));
            PModule.interfaceDefinitionMap.Add(nameof(I_FailureInjector), typeof(FailureInjector));
            PModule.interfaceDefinitionMap.Add(nameof(I_MultipleClientsWithFailure), typeof(MultipleClientsWithFailure));
        }
        
        public static void InitializeMonitorObserves() {
            PModule.monitorObserves.Clear();
            PModule.monitorObserves[nameof(Progress)] = new List<string>();
            PModule.monitorObserves[nameof(Progress)].Add(nameof(eWriteTransReq));
            PModule.monitorObserves[nameof(Progress)].Add(nameof(eWriteTransResp));
        }
        
        public static void InitializeMonitorMap(IActorRuntime runtime) {
            PModule.monitorMap.Clear();
            PModule.monitorMap[nameof(I_Coordinator)] = new List<Type>();
            PModule.monitorMap[nameof(I_Coordinator)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_Participant)] = new List<Type>();
            PModule.monitorMap[nameof(I_Participant)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_Timer)] = new List<Type>();
            PModule.monitorMap[nameof(I_Timer)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_Client)] = new List<Type>();
            PModule.monitorMap[nameof(I_Client)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_FailureInjector)] = new List<Type>();
            PModule.monitorMap[nameof(I_FailureInjector)].Add(typeof(Progress));
            PModule.monitorMap[nameof(I_MultipleClientsWithFailure)] = new List<Type>();
            PModule.monitorMap[nameof(I_MultipleClientsWithFailure)].Add(typeof(Progress));
            runtime.RegisterMonitor<Progress>();
        }
        
        
        [PChecker.SystematicTesting.Test]
        public static void Execute(IActorRuntime runtime) {
            runtime.RegisterLog(new PLogFormatter());
            PModule.runtime = runtime;
            PHelper.InitializeInterfaces();
            PHelper.InitializeEnums();
            InitializeLinkMap();
            InitializeInterfaceDefMap();
            InitializeMonitorMap(runtime);
            InitializeMonitorObserves();
            runtime.CreateActor(typeof(_GodMachine), new _GodMachine.Config(typeof(MultipleClientsWithFailure)));
        }
    }
}
// TODO: NamedModule TwoPhaseCommit
// TODO: NamedModule TwoPCClient
// TODO: NamedModule Timer_1
// TODO: NamedModule FailureInjector_1
namespace PImplementation
{
    public class I_Coordinator : PMachineValue {
        public I_Coordinator (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public class I_Participant : PMachineValue {
        public I_Participant (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public class I_SingleClientNoFailure : PMachineValue {
        public I_SingleClientNoFailure (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public class I_MultipleClientsNoFailure : PMachineValue {
        public I_MultipleClientsNoFailure (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public class I_MultipleClientsWithFailure : PMachineValue {
        public I_MultipleClientsWithFailure (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public class I_Client : PMachineValue {
        public I_Client (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public class I_Timer : PMachineValue {
        public I_Timer (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public class I_FailureInjector : PMachineValue {
        public I_FailureInjector (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public partial class PHelper {
        public static void InitializeInterfaces() {
            PInterfaces.Clear();
            PInterfaces.AddInterface(nameof(I_Coordinator), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
            PInterfaces.AddInterface(nameof(I_Participant), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
            PInterfaces.AddInterface(nameof(I_SingleClientNoFailure), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
            PInterfaces.AddInterface(nameof(I_MultipleClientsNoFailure), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
            PInterfaces.AddInterface(nameof(I_MultipleClientsWithFailure), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
            PInterfaces.AddInterface(nameof(I_Client), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
            PInterfaces.AddInterface(nameof(I_Timer), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
            PInterfaces.AddInterface(nameof(I_FailureInjector), nameof(eAbortTrans), nameof(eCancelTimer), nameof(eCommitTrans), nameof(eDelayNodeFailure), nameof(eDelayedTimeOut), nameof(eInformCoordinator), nameof(eMonitor_AtomicityInitialize), nameof(ePrepareReq), nameof(ePrepareResp), nameof(eReadTransReq), nameof(eReadTransResp), nameof(eShutDown), nameof(eStartTimer), nameof(eTimeOut), nameof(eWriteTransReq), nameof(eWriteTransResp), nameof(PHalt));
        }
    }
    
}
namespace PImplementation
{
    public partial class PHelper {
        public static void InitializeEnums() {
            PrtEnum.Clear();
            PrtEnum.AddEnumElements(new [] {"SUCCESS","ERROR","TIMEOUT"}, new [] {0,1,2});
        }
    }
    
}
#pragma warning restore 162, 219, 414
