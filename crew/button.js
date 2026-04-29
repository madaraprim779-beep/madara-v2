case 'menu': {
    const sendButton = require('./button.js')
    
    const myButtons = [
        { id: '.crew', text: '👤 INFOS MADARA' },
        { id: '.ping', text: '⚡ VITESSE' },
        { id: '.runtime', text: '⏳ TEMPS ACTIF' }
    ]

    await sendButton(
        client, 
        from, 
        "🌀 *BIENVENUE DANS MON MONDE*\n\nJe suis Madara-V2. Choisis ton action ci-dessous.", 
        "Madara-V2 Official System", 
        myButtons, 
        m
    )
}
break
