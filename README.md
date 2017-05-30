VoipDemoPTT (voice over ip demonstration using Push-To-Talk) 

Node demo for voice over ip with ptt. 

Uses express not included.

Url: http://localhost:50552/voipDemoPTT

This project is a user experiment with the aim of improving a voip system (namely voipDemo) that has terrible quality of service (qos). The idea is that while using voip, critical data can be sent using PTT. For example, Les say you are having strained a conversation where the latency is horrible, audio chunks are getting dropped, and the programmer doesn't really understand the in intricacies of audio buffering. This problem can be solved by sending your phone number using PTT. That way you and can send your partner your phone and can give up on voip all together.

The idea is to record a complete chunk, send it along a reliable channel perhaps with error correction, and play it when the entire chunk has arrived at the destination. At the moment (May 29 2017) voipDemo has no buffering. It plays a sound chunk as soon as it gets it. This means the chunk may arrive out of order or the next chunk may start playing before the last is complete. This leads to terrible qos for less than perfect connections. 
