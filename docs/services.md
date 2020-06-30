# Services
The dApp divides functionality into services, abstracting away the actual implementation. These could be external services of various types, or handled locally.
For the first iterate as much functionality as possible will be local.
___
#### CkbNodeService
Provides a connection to a ckb node and exposes RPC methods.
___
#### CodeLibraryService
Maintains knowledge of deps. Such as what a Sepc256k1 code cell looks like, and where to find it. Used in transaction generation.
___
#### TxGeneratorService
Common helper functions for generating transactions. Used by the 'API' services.
___
#### WalletService
Handles user keys & signatures. Should integrate with the emerging wallets down the line.
___
#### CkbTransferService
'API' service to transfer CKB between accounts, using a familiar interface.
`transferCKB(sender, recipient, amount)`
___
#### DAOAggregatorService
See [Aggregator]('./aggregator.md')
___
#### UDTService
'API' service to transfer UDT  between accounts, using a familiar interface.
`transferUDT(sender, recipient, amount)`