import { setModuleID } from '@utils/module'
import { renderNPCSheetPF2e } from './sheet'

export const MODULE_ID = 'pf2e-npc-knowledges'
setModuleID(MODULE_ID)

Hooks.once('ready', () => {
    if (!game.user.isGM) return
    Hooks.on('renderNPCSheetPF2e', renderNPCSheetPF2e)
})
