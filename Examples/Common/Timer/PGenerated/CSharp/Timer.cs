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
    public static partial class GlobalFunctions
    {
        public static PMachineValue CreateTimer(PMachineValue client, PMachine currentMachine)
        {
            PMachineValue TMP_tmp0 = null;
            PMachineValue TMP_tmp1 = null;
            TMP_tmp0 = (PMachineValue)(((PMachineValue)((IPrtValue)client)?.Clone()));
            TMP_tmp1 = (PMachineValue)(currentMachine.CreateInterface<I_Timer>( currentMachine, TMP_tmp0));
            return ((PMachineValue)((IPrtValue)TMP_tmp1)?.Clone());
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void StartTimer(PMachineValue timer, PMachine currentMachine)
        {
            PMachineValue TMP_tmp0_1 = null;
            PEvent TMP_tmp1_1 = null;
            TMP_tmp0_1 = (PMachineValue)(((PMachineValue)((IPrtValue)timer)?.Clone()));
            TMP_tmp1_1 = (PEvent)(new eStartTimer(null));
            currentMachine.TrySendEvent(TMP_tmp0_1, (Event)TMP_tmp1_1);
        }
    }
}
namespace PImplementation
{
    public static partial class GlobalFunctions
    {
        public static void CancelTimer(PMachineValue timer_1, PMachine currentMachine)
        {
            PMachineValue TMP_tmp0_2 = null;
            PEvent TMP_tmp1_2 = null;
            TMP_tmp0_2 = (PMachineValue)(((PMachineValue)((IPrtValue)timer_1)?.Clone()));
            TMP_tmp1_2 = (PEvent)(new eCancelTimer(null));
            currentMachine.TrySendEvent(TMP_tmp0_2, (Event)TMP_tmp1_2);
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
            this.sends.Add(nameof(eCancelTimer));
            this.sends.Add(nameof(eDelayedTimeOut));
            this.sends.Add(nameof(eStartTimer));
            this.sends.Add(nameof(eTimeOut));
            this.sends.Add(nameof(PHalt));
            this.receives.Add(nameof(eCancelTimer));
            this.receives.Add(nameof(eDelayedTimeOut));
            this.receives.Add(nameof(eStartTimer));
            this.receives.Add(nameof(eTimeOut));
            this.receives.Add(nameof(PHalt));
        }
        
        public void Anon(Event currentMachine_dequeuedEvent)
        {
            Timer currentMachine = this;
            PMachineValue _client = (PMachineValue)(gotoPayload ?? ((PEvent)currentMachine_dequeuedEvent).Payload);
            this.gotoPayload = null;
            client_1 = (PMachineValue)(((PMachineValue)((IPrtValue)_client)?.Clone()));
            currentMachine.TryGotoState<WaitForTimerRequests>();
            return;
        }
        public void Anon_1(Event currentMachine_dequeuedEvent)
        {
            Timer currentMachine = this;
            PrtBool TMP_tmp0_3 = ((PrtBool)false);
            PMachineValue TMP_tmp1_3 = null;
            PEvent TMP_tmp2 = null;
            PMachineValue TMP_tmp3 = null;
            PEvent TMP_tmp4 = null;
            TMP_tmp0_3 = (PrtBool)(((PrtBool)currentMachine.TryRandomBool()));
            if (TMP_tmp0_3)
            {
                TMP_tmp1_3 = (PMachineValue)(((PMachineValue)((IPrtValue)client_1)?.Clone()));
                TMP_tmp2 = (PEvent)(new eTimeOut(null));
                currentMachine.TrySendEvent(TMP_tmp1_3, (Event)TMP_tmp2);
                currentMachine.TryGotoState<WaitForTimerRequests>();
                return;
            }
            else
            {
                TMP_tmp3 = (PMachineValue)(currentMachine.self);
                TMP_tmp4 = (PEvent)(new eDelayedTimeOut(null));
                currentMachine.TrySendEvent(TMP_tmp3, (Event)TMP_tmp4);
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
        [OnEventGotoState(typeof(eStartTimer), typeof(TimerStarted))]
        [IgnoreEvents(typeof(eCancelTimer), typeof(eDelayedTimeOut))]
        class WaitForTimerRequests : State
        {
        }
        [OnEntry(nameof(Anon_1))]
        [OnEventGotoState(typeof(eDelayedTimeOut), typeof(TimerStarted))]
        [OnEventGotoState(typeof(eCancelTimer), typeof(WaitForTimerRequests))]
        [DeferEvents(typeof(eStartTimer))]
        class TimerStarted : State
        {
        }
    }
}
// TODO: NamedModule Timer_1
namespace PImplementation
{
    public class I_Timer : PMachineValue {
        public I_Timer (ActorId machine, List<string> permissions) : base(machine, permissions) { }
    }
    
    public partial class PHelper {
        public static void InitializeInterfaces() {
            PInterfaces.Clear();
            PInterfaces.AddInterface(nameof(I_Timer), nameof(eCancelTimer), nameof(eDelayedTimeOut), nameof(eStartTimer), nameof(eTimeOut), nameof(PHalt));
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
