NodeFIX
=======

NodeJS FIX protocol message builder and parser

 Using the Fix.read() method parses the above FIX message and transform it into a javascript object like the following

```
{ BeginString: 'FIX.4.4',
  BodyLength: '168',
  MsgType: 'W',
  SenderCompID: 'LMXBDM',
  TargetCompID: 'sudak',
  MsgSeqNum: '202',
  SendingTime: '20140519-09:19:42.777',
  MDReqID: 'EURUSD',
  SecurityID: '4001',
  SecurityIDSource: '8',
  NoMDEntries: '2',
  MDEntryType: [ '0', '1' ],
  MDEntryPx: [ '1.3711', '1.37113' ],
  MDEntrySize: [ '60', '250' ],
  MDEntryDate: '20140519',
  MDEntryTime: '09:19:42.654',
  CheckSum: '010' 
  }
```

NodeFIX has been tested with demo account from LMAX
https://testapi.lmaxtrader.com/
 
