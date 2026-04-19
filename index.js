import connectToWhatsapp from './MADARA☠️/V2.js'
import handleIncomingMessage from './events/messageHandler.js'

(async() => {
    await connectToWhatsapp(handleIncomingMessage)
        console.log('established !')
})()