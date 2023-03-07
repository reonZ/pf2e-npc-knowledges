import { templatePath } from '@utils/foundry/path'
import { getFlag, setFlag } from '@utils/foundry/flags'
import { subLocalize } from '@utils/foundry/localize'

export class EditLores extends FormApplication<NPCPF2e> {
    constructor(actor: NPCPF2e, options: Partial<FormApplicationOptions> = {}) {
        const id = `npc-edit-lores-${actor.id}`
        super(actor, { ...options, id })
    }

    static get defaultOptions(): FormApplicationOptions {
        return mergeObject(super.defaultOptions, {
            title: 'Edit Lores',
            template: templatePath('edit-lores.hbs'),
            width: 400,
        })
    }

    getData(options?: Partial<FormApplicationOptions> | undefined) {
        const actor = this.object

        return mergeObject(super.getData(options), {
            unspecified: getFlag(actor, 'unspecified') ?? '',
            specific: getFlag(actor, 'specific') ?? '',
            i18n: subLocalize('templates.editLore'),
        })
    }

    async _updateObject(event: Event, { unspecified, specific }: { unspecified: string; specific: string }) {
        const actor = this.object
        setFlag(actor, 'unspecified', unspecified.trim())
        setFlag(actor, 'specific', specific.trim())
    }

    activateListeners(html: JQuery) {
        html.find('button.cancel').on('click', this.#onCancel.bind(this))
    }

    #onCancel(event: JQuery.ClickEvent) {
        event.preventDefault()
        this.close()
    }
}
