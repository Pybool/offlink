import connectors from './web3connector.js'
import handlers from './contract_event_handlers_methods.js'

const sellerOrderPlacedEvent = connectors.contract.events.SellOrderPlaced();
const OrderAcceptedEvent = connectors.contract.events.OrderAccepted();
const FundsReleasedEvent = connectors.contract.events.FundsReleased();
const OrderCancelledEvent = connectors.contract.events.OrderCancelled();
const OrderCompletedEvent = connectors.contract.events.OrderCompleted();

sellerOrderPlacedEvent.on('data', async(eventData) => {
    try{
        console.log('SellOrderPlaced event received:', eventData.returnValues);    
        const orderId = eventData.returnValues?.orderId.toString();
        const sellerAddress = String(eventData.returnValues?.seller)
        await handlers.SellerOrderPlaced(eventData.returnValues?.signature || '',orderId, sellerAddress)
    }
    catch(err){
        console.log("sellerOrderPlacedEventHandler ERROR ", err)
    }
});

OrderAcceptedEvent.on('data', async(eventData) => {
    try{
        console.log('OrderAccepted event received:', eventData.returnValues);
        const orderId = eventData.returnValues?.orderId.toString()
        const buyerAddress = eventData.returnValues?.buyer
        await handlers.OrderAccepted(orderId, buyerAddress)
        
    }
    catch(err){
        console.log("OrderAcceptedEventHandler ERROR ", err)
    }
});

OrderCompletedEvent.on('data', async(eventData) => {
    try{
        console.log('OrderCompleted event received:', eventData.returnValues);
        const orderId = eventData.returnValues?.orderId.toString()
        await handlers.OrderCompleted(orderId)
        
    }
    catch(err){
        console.log("OrderCompletedEventHandler ERROR ", err)
    }
});

FundsReleasedEvent.on('data', async(eventData) => {
    try{
        console.log('FundsReleased event received:', eventData.returnValues);
        const orderId = eventData.returnValues?.orderId.toString()
        await handlers.FundsReleased(orderId,eventData.returnValues?.amountInToken)
    }
    catch(error){
        console.log("FundsReleasedEventHandler ERROR ", err)
    }
});

OrderCancelledEvent.on('data', async(eventData) => {
    try{
        console.log('OrderCancelled event received:', eventData.returnValues);
        const orderId = eventData.returnValues?.orderId.toString()
        await handlers.OrderCancelled(orderId)
    }
    catch(err){
        console.log("OrderCancelledEventHandler ERROR ", err)
    }
});

connectors.web3.provider.on('connect',()=>{
    console.log("CONNECTED TO CONTRACT EVENTS")
})

connectors.web3.provider.on('disconnect',()=>{
    console.log("Websocker provider disconnected")
})
