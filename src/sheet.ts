import { EditLores } from '@apps/lores'
import { getFlag } from '@utils/foundry/flags'
import { capitalize } from '@utils/string'

export function renderNPCSheetPF2e(sheet: NPCSheetPF2e, $html: JQuery) {
    const actor = sheet.actor

    replaceLores(actor, $html)
    addEditButton($html)
    addEvents(actor, $html)
}

function knowledgeSelector(html: JQuery, section: 'header' | 'body', selector: string) {
    return html.find(
        `[data-tab="main"] .recall-knowledge ${section === 'header' ? '.section-header' : '.section-body'} ${selector}`
    )
}

function editLores(actor: NPCPF2e) {
    new EditLores(actor).render(true)
}

function replaceLores(actor: NPCPF2e, html: JQuery) {
    const unspecifics = getFlag<string>(actor, 'unspecified')
    const specifics = getFlag<string>(actor, 'specific')
    if (!unspecifics && !specifics) return

    const lores = actor.identificationDCs.lore
    const body = knowledgeSelector(html, 'body', '')
    body.find('.identification-skills').last().remove()

    function tag(skills: string, dc: number, adjustment: string) {
        const content = game.i18n.format('PF2E.Actor.NPC.Identification.Skills.Label', { skills, dc, adjustment })
        return `<div class="tag-legacy identification-skills tooltipstered">${content}</div>`
    }

    function addTags(lores: string, { dc, start }: { dc: number; start: string }) {
        const tags = lores
            .split(',')
            .filter(lore => lore.trim())
            .map(lore => tag(lore, dc, start))
            .join('')
        body.append(tags)
    }

    addTags(unspecifics || 'Unspecific', lores[0])
    addTags(specifics || 'Specific', lores[1])
}

function addEvents(actor: NPCPF2e, html: JQuery) {
    const $edit = knowledgeSelector(html, 'header', 'button.edit')
    $edit.on('click', () => editLores(actor))
}

function addEditButton(html: JQuery) {
    const $attempts = knowledgeSelector(html, 'header', 'button')
    const edit = '<button type="button" class="breakdown edit">Edit</button>'
    $attempts.before(edit)
}
