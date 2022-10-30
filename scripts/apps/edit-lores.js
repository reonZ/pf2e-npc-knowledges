import { getFlag, setFlag, templatePath } from '../utils/foundry.js'

export class EditLores extends FormApplication {
    /**
     * @param {NPCPF2e} actor
     * @param {FormApplicationOptions} [options]
     */
    constructor(actor, options = {}) {
        const id = `npc-edit-lores-${actor.id}`
        super({}, { ...options, id })
        this._actor = actor
    }

    /** @returns {FormApplicationOptions} */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: 'Edit Lores',
            template: templatePath('edit-lores.html'),
            width: 400,
        })
    }

    getData() {
        return {
            unspecified: getFlag(this._actor, 'unspecified') ?? '',
            specific: getFlag(this._actor, 'specific') ?? '',
        }
    }

    /**
     * @param {Event} event
     * @param {{unspecified: string, specific: string}} formData
     */
    async _updateObject(event, { unspecified, specific }) {
        setFlag(this._actor, 'unspecified', unspecified.trim())
        setFlag(this._actor, 'specific', specific.trim())
    }

    /** @param {JQuery} $html */
    activateListeners($html) {
        $html.find('button.cancel').on('click', this.#onCancel.bind(this))
    }

    /** @param {JQuery.ClickEvent} event */
    #onCancel(event) {
        event.preventDefault()
        this.close()
    }
}
