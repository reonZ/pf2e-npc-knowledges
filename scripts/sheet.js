import { EditLores } from './apps/edit-lores.js'
import { getFlag } from './utils/foundry.js'
import { capitalize } from './utils/string.js'

/**
 * @param {NPCSheetPF2e} sheet
 * @param {JQuery} $html
 */
export function renderNPCSheetPF2e(sheet, $html) {
    const actor = sheet.actor

    replaceLores(actor, $html)
    addEditButton($html)
    addEvents(actor, $html)
}

/**
 * @param {JQuery} $html
 * @param {'header' | 'body'} section
 * @param {string} selector
 */
function knowledgeSelector($html, section, selector) {
    return $html.find(
        `[data-tab="main"] .recall-knowledge ${section === 'header' ? '.section-header' : '.section-body'} ${selector}`
    )
}

/** @param {NPCPF2e} actor */
function editLores(actor) {
    new EditLores(actor).render(true)
}

/**
 * @param {JQuery} $html
 * @param {string} lores
 * @param {string} selector
 */
function replaceLore($html, lores, selector) {
    const $lore = knowledgeSelector($html, 'body', selector)
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

/**
 * @param {NPCPF2e} actor
 * @param {JQuery} $html
 */
function replaceLores(actor, $html) {
    const unspecified = /** @type {string | undefined} */ (getFlag(actor, 'unspecified'))
    const specific = /** @type {string | undefined} */ (getFlag(actor, 'specific'))
    if (unspecified) replaceLore($html, unspecified, '.unspecified-lore')
    if (specific) replaceLore($html, specific, '.specific-lore')
}

/**
 * @param {NPCPF2e} actor
 * @param {JQuery} $html
 */
function addEvents(actor, $html) {
    const $edit = knowledgeSelector($html, 'header', 'button.edit')
    $edit.on('click', () => editLores(actor))
}

/** @param {JQuery} $html */
function addEditButton($html) {
    const $attempts = knowledgeSelector($html, 'header', 'button')
    const edit = '<button type="button" class="breakdown edit">Edit</button>'
    $attempts.before(edit)
}
