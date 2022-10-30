import { renderNPCSheetPF2e } from './sheet.js'
import { registerLocalize } from './utils/handlebars.js'

Hooks.once('init', () => {
    registerLocalize()
})

Hooks.once('ready', () => {
    if (!game.user.isGM) return
    Hooks.on('renderNPCSheetPF2e', renderNPCSheetPF2e)
})
