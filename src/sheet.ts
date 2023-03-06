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

function replaceLore(html: JQuery, lores: string, selector: string) {
    const $lore = knowledgeSelector(html, 'body', selector)
    const title = $lore.attr('title')
    const classes = $lore.attr('class')
    const suffix = $lore
        .text()
        .replace('\n', '')
        .trim()
        .replace(/^.+? (\d+.+)$/, '$1')
    const replacement = lores
        .split(',')
        .filter(lore => lore.trim())
        .map(lore => `<div class="${classes}" title="${title}">${capitalize(lore.trim())} ${suffix}</div>`)
        .join('')
    $lore.replaceWith(replacement)
}

function replaceLores(actor: NPCPF2e, html: JQuery) {
    const unspecified = getFlag<string>(actor, 'unspecified')
    const specific = getFlag<string>(actor, 'specific')
    if (unspecified) replaceLore(html, unspecified, '.unspecified-lore')
    if (specific) replaceLore(html, specific, '.specific-lore')
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
